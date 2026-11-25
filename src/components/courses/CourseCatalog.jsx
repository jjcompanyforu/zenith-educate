import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CourseCard from './CourseCard.jsx';
import CourseDetailDialog from './CourseDetailDialog.jsx';
import ApplyDialog from './ApplyDialog.jsx';
import { CATEGORIES, COURSES, courseById } from '../../data/courses.js';

const TABS = [['all', 'All programmes'], ['open', 'Admissions open'], ...CATEGORIES.map((c) => [c.id, c.tab])];

function setCourseHash(id) {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, '', `${pathname}${search}${id ? `#course-${id}` : ''}`);
}

export default function CourseCatalog() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('cat');
  const active = TABS.some(([id]) => id === requested) ? requested : 'all';
  const [detailId, setDetailId] = useState(null);
  const [applyRequest, setApplyRequest] = useState(null);
  const { key: navKey } = useLocation();

  useEffect(() => {
    const id = window.location.hash.startsWith('#course-') ? window.location.hash.slice(8) : null;
    if (id && courseById(id)) {
      setDetailId(id);
      document.getElementById('programmes')?.scrollIntoView();
    }
  }, [navKey]);

  const selectTab = (id) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (id === 'all') next.delete('cat');
      else next.set('cat', id);
      return next;
    }, { replace: true, preventScrollReset: true });

  const showDetails = (id) => { setDetailId(id); setCourseHash(id); };
  const closeDetails = () => { setDetailId(null); setCourseHash(null); };
  const apply = (courseId) => { setDetailId(null); setCourseHash(null); setApplyRequest({ courseId }); };

  const grid = (list) => (
    <div className="cx-grid">
      {list.map((c) => <CourseCard key={c.id} course={c} onDetails={showDetails} onApply={apply} />)}
    </div>
  );

  return (
    <div className="cx-catalog">
      <div className="cx-tabs" role="tablist" aria-label="Programme categories">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" role="tab" className={id === 'open' ? 'cx-tab-open' : undefined}
            aria-selected={active === id} onClick={() => selectTab(id)}>{label}</button>
        ))}
      </div>
      <div aria-live="polite">
        {active === 'open' ? (
          <div className="cx-cat">
            <div className="cx-cat-head">
              <h3><span>Programmes accepting</span> enquiries</h3>
              <p>Explore programmes currently marked as open and contact the team to confirm eligibility, fees and the next available batch.</p>
            </div>
            {grid(COURSES.filter((c) => c.open))}
          </div>
        ) : (
          CATEGORIES.filter((cat) => active === 'all' || cat.id === active).map((cat) => (
            <div className="cx-cat" id={`cat-${cat.id}`} key={cat.id}>
              <div className="cx-cat-head"><h3><span>{cat.lead}</span>{cat.rest}</h3><p>{cat.sub}</p></div>
              {grid(COURSES.filter((c) => c.cat === cat.id))}
            </div>
          ))
        )}
      </div>
      <CourseDetailDialog course={detailId ? courseById(detailId) : null} onClose={closeDetails} onApply={apply} />
      <ApplyDialog request={applyRequest} onClose={() => setApplyRequest(null)} />
    </div>
  );
}
