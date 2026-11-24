import { lazy, Suspense, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import { Icon } from '../components/pdf/icons.jsx';
import { RESOURCE_CATEGORIES, RESOURCES, findResource, isAvailable } from '../data/resources.js';
import { whatsappLink } from '../data/site.js';

// pdf.js is large, so the viewer is only downloaded when someone opens a PDF.
const PdfViewer = lazy(() => import('../components/pdf/PdfViewer.jsx'));

const CATEGORY = Object.fromEntries(RESOURCE_CATEGORIES.map((c) => [c.id, c]));
const KIND_ICON = { pdf: 'file', test: 'test', article: 'article' };
const KIND_LABEL = { pdf: 'PDF', test: 'Mock test', article: 'Article' };

function ResourceCard({ item, onOpen }) {
  const available = isAvailable(item);
  const cat = CATEGORY[item.category];
  return (
    <article className={`rs-card rs-${item.kind} ${available ? '' : 'is-soon'}`}>
      <div className="rs-cover" aria-hidden="true">
        <span className="rs-cover-icon">
          <Icon name={KIND_ICON[item.kind]} size={26} />
        </span>
        <span className="rs-cover-kind">{KIND_LABEL[item.kind]}</span>
        {!available && <span className="rs-soon">Coming soon</span>}
      </div>
      <div className="rs-body">
        <small className="rs-cat">{cat?.label}</small>
        <h3>
          {available ? (
            <button type="button" className="rs-title-btn" onClick={() => onOpen(item)}>
              {item.title}
            </button>
          ) : (
            item.title
          )}
        </h3>
        <p>{item.text}</p>
        <ul className="rs-tags" aria-label="Useful for">
          {item.exams.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <div className="rs-foot">
          {item.updated && (
            <span className="rs-meta">
              <Icon name="clock" size={14} /> {item.updated}
            </span>
          )}
          <div className="rs-actions">
            {available ? (
              <>
                <button type="button" className="rs-btn rs-btn-primary" onClick={() => onOpen(item)}>
                  <Icon name="eye" size={16} /> Read now
                </button>
                <a
                  className="rs-btn rs-btn-icon"
                  href={item.file}
                  download
                  title={`Download ${item.title}`}
                  aria-label={`Download ${item.title}`}
                >
                  <Icon name="download" size={17} />
                </a>
              </>
            ) : (
              <a
                className="rs-btn rs-btn-ghost"
                href={whatsappLink(`Hi Zenith Educate, please notify me when "${item.title}" is available.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="bell" size={15} /> Notify me
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ViewerFallback({ onClose }) {
  return (
    <div className="pv pv-fallback" role="status">
      <button type="button" className="pv-icon-btn pv-close" onClick={onClose} aria-label="Close viewer">
        <Icon name="close" />
      </button>
      <span className="pv-page-spin" aria-hidden="true" />
      <p>Loading viewer…</p>
    </div>
  );
}

export default function FreeResources() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const viewing = findResource(params.get('pdf'));

  // Opening pushes a history entry, so the phone/browser Back button closes the
  // viewer. Closing goes back to that entry; a shared deep link just drops ?pdf.
  const open = (item) => {
    const next = new URLSearchParams(params);
    next.set('pdf', item.id);
    navigate({ search: `?${next}` }, { state: { pdfFromList: true }, preventScrollReset: true });
  };
  const close = () => {
    if (!viewing) return; // already closed via Back
    if (location.state?.pdfFromList) {
      navigate(-1);
      return;
    }
    const next = new URLSearchParams(params);
    next.delete('pdf');
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      RESOURCES.filter(
        (r) =>
          (category === 'all' || r.category === category) &&
          (!q || [r.title, r.text, ...r.exams, CATEGORY[r.category].label].join(' ').toLowerCase().includes(q)),
      ),
    [q, category],
  );
  const counts = useMemo(() => {
    const c = { all: RESOURCES.length };
    RESOURCES.forEach((r) => {
      c[r.category] = (c[r.category] || 0) + 1;
    });
    return c;
  }, []);
  const groups = RESOURCE_CATEGORIES.map((c) => ({ ...c, items: matches.filter((r) => r.category === c.id) })).filter(
    (g) => g.items.length,
  );
  const pdfCount = RESOURCES.filter(isAvailable).length;

  return (
    <div className="section rs" id="free-resources">
      <div className="rs-head">
        <div>
          <span className="rs-eyebrow">100% free · No sign-up</span>
          <h2>Free study resources</h2>
          <p className="muted">
            {pdfCount} study PDFs for Banking, SSC, CUET and other competitive exams. Read them right here or download
            for offline revision.
          </p>
        </div>
        <label className="rs-search">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Search banking, GK, SSC…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search free resources"
          />
        </label>
      </div>

      <div className="rs-chips" role="group" aria-label="Filter by category">
        {[{ id: 'all', label: 'All resources' }, ...RESOURCE_CATEGORIES].map((c) => (
          <button
            type="button"
            key={c.id}
            className={category === c.id ? 'is-active' : ''}
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
            <span>{counts[c.id] || 0}</span>
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <div className="rs-empty">
          <p>
            No resources match “{query}”.{' '}
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
            >
              Clear filters
            </button>
          </p>
        </div>
      )}

      {groups.map((g) => (
        <section className="rs-group" key={g.id} aria-labelledby={`rs-${g.id}`}>
          <div className="rs-group-head">
            <h3 id={`rs-${g.id}`}>{g.title}</h3>
            <p>{g.text}</p>
          </div>
          <div className="rs-grid">
            {g.items.map((item) => (
              <ResourceCard key={item.id} item={item} onOpen={open} />
            ))}
          </div>
        </section>
      ))}

      <Modal open={Boolean(viewing)} onClose={close} className="pv-dialog" labelledBy="pv-title">
        {viewing && (
          <Suspense fallback={<ViewerFallback onClose={close} />}>
            <PdfViewer
              key={viewing.id}
              resource={viewing}
              categoryLabel={CATEGORY[viewing.category]?.label}
              onClose={close}
            />
          </Suspense>
        )}
      </Modal>
    </div>
  );
}
