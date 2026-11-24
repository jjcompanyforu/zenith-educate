import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { whatsappLink } from '../../data/site.js';
import { Icon } from './icons.jsx';

GlobalWorkerOptions.workerSrc = workerUrl;

// Font/CMap/decoder data is only fetched when a PDF actually needs it.
const CDN = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}`;
const ZOOM_STEPS = [0.5, 0.67, 0.8, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const AUTO_MAX = 1.35; // "Auto" fits the width but never blows small text up past this
const STAGE_PAD = 24;
const MAX_CANVAS_PIXELS = 16_777_216; // keeps mobile browsers from running out of canvas memory

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fileName = (url) => decodeURIComponent(url.split('/').pop() || 'document.pdf');

// One page: a sized placeholder that renders its canvas only while it is near
// the visible area, and swaps in the new canvas when ready (no blank flash on zoom).
function PdfPage({ doc, number, size, scale, root, keep = false, className = '', pageRef, onClick, active }) {
  const box = useRef(null);
  const holder = useRef(null);
  const [near, setNear] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || !root) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        else if (!keep) setNear(false);
      },
      { root, rootMargin: '120% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [root, keep]);

  useEffect(() => {
    if (!near) {
      if (!keep && holder.current) holder.current.replaceChildren();
      setRendered(false);
      return undefined;
    }
    let cancelled = false;
    let task;
    doc.getPage(number).then((page) => {
      if (cancelled) return;
      const viewport = page.getViewport({ scale });
      let ratio = Math.min(window.devicePixelRatio || 1, 3);
      const area = viewport.width * viewport.height;
      if (area * ratio * ratio > MAX_CANVAS_PIXELS) ratio = Math.sqrt(MAX_CANVAS_PIXELS / area);
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      task = page.render({
        canvas,
        viewport,
        transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : undefined,
      });
      task.promise
        .then(() => {
          if (cancelled || !holder.current) return;
          holder.current.replaceChildren(canvas);
          setRendered(true);
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, number, scale, near, keep]);

  const setRefs = (el) => {
    box.current = el;
    if (pageRef) pageRef(el);
  };

  const style = { width: Math.floor(size.w * scale), height: Math.floor(size.h * scale) };
  const content = (
    <>
      <span className="pv-canvas" ref={holder} />
      {!rendered && <span className="pv-page-spin" aria-hidden="true" />}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        ref={setRefs}
        className={`pv-thumb ${active ? 'is-active' : ''}`}
        onClick={onClick}
        aria-label={`Go to page ${number}`}
        aria-current={active ? 'page' : undefined}
      >
        <span className="pv-thumb-page" style={style}>
          {content}
        </span>
        <span className="pv-thumb-num">{number}</span>
      </button>
    );
  }
  return (
    <div
      ref={setRefs}
      className={`pv-page ${className}`}
      style={style}
      data-page={number}
      aria-label={`Page ${number}`}
    >
      {content}
    </div>
  );
}

export default function PdfViewer({ resource, onClose, categoryLabel }) {
  const rootRef = useRef(null);
  const [stage, setStage] = useState(null); // scroll container element (state so children re-observe)
  const pageEls = useRef([]);
  const thumbsRef = useRef(null);
  const [thumbs, setThumbs] = useState(null);
  const toastTimer = useRef(0);

  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [doc, setDoc] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [fit, setFit] = useState('auto'); // 'auto' | 'width' | 'page' | null (manual zoom)
  const [zoom, setZoom] = useState(1);
  const [box, setBox] = useState({ w: 800, h: 600 });
  const [sidebar, setSidebar] = useState(() => window.matchMedia('(min-width: 1000px)').matches);
  const [fullscreen, setFullscreen] = useState(false);
  const [toast, setToast] = useState('');

  // --- Load the document ---------------------------------------------------
  useEffect(() => {
    setStatus('loading');
    setProgress(0);
    setDoc(null);
    let alive = true;
    const task = getDocument({
      url: resource.file,
      cMapUrl: `${CDN}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${CDN}/standard_fonts/`,
      wasmUrl: `${CDN}/wasm/`,
      iccUrl: `${CDN}/iccs/`,
    });
    task.onProgress = ({ loaded, total }) => {
      if (alive && total) setProgress(loaded / total);
    };
    task.promise
      .then(async (pdf) => {
        const dims = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, i) =>
            pdf.getPage(i + 1).then((p) => {
              const v = p.getViewport({ scale: 1 });
              return { w: v.width, h: v.height };
            }),
          ),
        );
        if (!alive) return;
        pageEls.current = [];
        setSizes(dims);
        setDoc(pdf);
        setPage(1);
        setPageInput('1');
        setStatus('ready');
      })
      .catch(() => {
        if (alive) setStatus('error');
      });
    return () => {
      alive = false;
      task.destroy();
    };
  }, [resource.file, attempt]);

  // --- Track the stage size for the fit modes -------------------------------
  useEffect(() => {
    if (!stage) return undefined;
    const ro = new ResizeObserver(() => setBox({ w: stage.clientWidth, h: stage.clientHeight }));
    ro.observe(stage);
    return () => ro.disconnect();
  }, [stage]);

  const maxW = sizes.length ? Math.max(...sizes.map((s) => s.w)) : 612;
  const first = sizes[page - 1] || sizes[0] || { w: 612, h: 792 };
  const fitWidth = Math.max(MIN_ZOOM, (box.w - STAGE_PAD * 2) / maxW);
  const fitPage = Math.max(MIN_ZOOM, Math.min((box.w - STAGE_PAD * 2) / first.w, (box.h - STAGE_PAD * 2) / first.h));
  const scale =
    fit === 'width' ? fitWidth : fit === 'page' ? fitPage : fit === 'auto' ? Math.min(fitWidth, AUTO_MAX) : zoom;
  const scaleRef = useRef(scale);

  // Keep the reading position when the scale changes.
  useLayoutEffect(() => {
    const prev = scaleRef.current;
    scaleRef.current = scale;
    if (!stage || !prev || prev === scale) return;
    const k = scale / prev;
    const cy = stage.scrollTop + stage.clientHeight / 2;
    const cx = stage.scrollLeft + stage.clientWidth / 2;
    stage.scrollTop = cy * k - stage.clientHeight / 2;
    stage.scrollLeft = cx * k - stage.clientWidth / 2;
  }, [scale, stage]);

  const setManualZoom = useCallback((next) => {
    setZoom(clamp(Math.round(next * 100) / 100, MIN_ZOOM, MAX_ZOOM));
    setFit(null);
  }, []);
  const zoomIn = useCallback(() => {
    const cur = scaleRef.current;
    setManualZoom(ZOOM_STEPS.find((z) => z > cur + 0.01) ?? MAX_ZOOM);
  }, [setManualZoom]);
  const zoomOut = useCallback(() => {
    const cur = scaleRef.current;
    setManualZoom([...ZOOM_STEPS].reverse().find((z) => z < cur - 0.01) ?? MIN_ZOOM);
  }, [setManualZoom]);

  // --- Current page tracking & navigation ------------------------------------
  useEffect(() => {
    if (!stage || status !== 'ready') return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = stage.scrollTop + stage.clientHeight * 0.35;
        let current = 1;
        pageEls.current.forEach((el, i) => {
          if (el && el.offsetTop <= line) current = i + 1;
        });
        setPage(current);
      });
    };
    stage.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      stage.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stage, status]);

  useEffect(() => setPageInput(String(page)), [page]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    thumbsRef.current?.querySelector('.pv-thumb.is-active')?.scrollIntoView({ block: 'nearest' });
  }, [page, sidebar]);

  const numPages = sizes.length;
  const goTo = useCallback(
    (n, smooth = true) => {
      const target = clamp(n, 1, numPages || 1);
      const el = pageEls.current[target - 1];
      if (el && stage) stage.scrollTo({ top: el.offsetTop - STAGE_PAD / 2, behavior: smooth ? 'smooth' : 'auto' });
      setPage(target);
    },
    [numPages, stage],
  );

  // --- Fullscreen ---------------------------------------------------------------
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled;
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);
  const toggleFullscreen = useCallback(() => {
    const target = rootRef.current?.closest('dialog') || rootRef.current;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else target?.requestFullscreen?.().catch(() => {});
  }, []);

  // --- Keyboard shortcuts & ctrl/pinch-wheel zoom ----------------------------
  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.altKey) return;
      const mod = e.ctrlKey || e.metaKey;
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        setFit('auto');
      } else if (mod) {
        return;
      } else if (e.key === 'ArrowRight' || e.key === 'n') {
        e.preventDefault();
        goTo(page + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'p') {
        e.preventDefault();
        goTo(page - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(numPages);
      } else if (e.key === 'f' && canFullscreen) {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomIn, zoomOut, goTo, page, numPages, canFullscreen, toggleFullscreen]);

  useEffect(() => {
    if (!stage) return undefined;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setManualZoom(scaleRef.current * Math.exp(-e.deltaY * 0.0025));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [stage, setManualZoom]);

  // --- Share -------------------------------------------------------------------
  const flash = (msg) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2200);
  };
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: resource.title, text: `${resource.title} – free from Zenith Educate`, url });
      } else {
        await navigator.clipboard.writeText(url);
        flash('Link copied');
      }
    } catch {
      /* user cancelled */
    }
  };

  const submitPage = (e) => {
    e.preventDefault();
    const n = parseInt(pageInput, 10);
    if (Number.isFinite(n)) goTo(n, false);
    else setPageInput(String(page));
  };

  const zoomLabel = `${Math.round(scale * 100)}%`;
  const ready = status === 'ready' && doc;

  return (
    <div className={`pv ${sidebar && ready ? 'has-sidebar' : ''}`} ref={rootRef}>
      {/* Top bar */}
      <header className="pv-bar">
        <div className="pv-bar-start">
          {ready && numPages > 1 && (
            <button
              type="button"
              className="pv-icon-btn pv-only-wide"
              onClick={() => setSidebar((s) => !s)}
              aria-pressed={sidebar}
              title={sidebar ? 'Hide page thumbnails' : 'Show page thumbnails'}
            >
              <Icon name="sidebar" />
            </button>
          )}
          <span className="pv-doc-badge" aria-hidden="true">
            PDF
          </span>
          <div className="pv-title">
            <h2 id="pv-title">{resource.title}</h2>
            <small>
              {categoryLabel}
              {ready ? ` · ${numPages} page${numPages === 1 ? '' : 's'}` : ''}
              {resource.updated ? ` · Updated ${resource.updated}` : ''}
            </small>
          </div>
        </div>
        <div className="pv-bar-end">
          <button type="button" className="pv-icon-btn" onClick={share} title="Share">
            <Icon name="share" />
          </button>
          {status !== 'error' && (
            <>
              <a
                className="pv-icon-btn pv-hide-xs"
                href={resource.file}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
              >
                <Icon name="external" />
              </a>
              {canFullscreen && (
                <button
                  type="button"
                  className="pv-icon-btn pv-hide-xs"
                  onClick={toggleFullscreen}
                  title={fullscreen ? 'Exit full screen (F)' : 'Full screen (F)'}
                >
                  <Icon name={fullscreen ? 'collapse' : 'expand'} />
                </button>
              )}
              <a className="pv-download" href={resource.file} download={fileName(resource.file)}>
                <Icon name="download" />
                <span>Download</span>
              </a>
            </>
          )}
          <button
            type="button"
            className="pv-icon-btn pv-close"
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close viewer"
          >
            <Icon name="close" />
          </button>
        </div>
        {status === 'loading' && (
          <span
            className="pv-progress"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
            aria-hidden="true"
          />
        )}
      </header>

      <div className="pv-body">
        {ready && numPages > 1 && (
          <aside
            className="pv-sidebar"
            ref={(el) => {
              thumbsRef.current = el;
              setThumbs(el);
            }}
            aria-label="Page thumbnails"
            hidden={!sidebar}
          >
            {sizes.map((s, i) => (
              <PdfPage
                key={i}
                doc={doc}
                number={i + 1}
                size={s}
                scale={112 / s.w}
                root={thumbs}
                keep
                active={page === i + 1}
                onClick={() => goTo(i + 1)}
              />
            ))}
          </aside>
        )}

        <div className="pv-stage" ref={setStage} tabIndex={-1}>
          {status === 'loading' && (
            <div className="pv-state" role="status">
              <div className="pv-skeleton" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p>
                Opening {resource.title}… {progress > 0 ? `${Math.round(progress * 100)}%` : ''}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="pv-state pv-error" role="alert">
              <span className="pv-error-icon" aria-hidden="true">
                <Icon name="file" size={34} />
              </span>
              <h3>This PDF isn’t available right now</h3>
              <p>
                We’re refreshing our free study material. Message us on WhatsApp and we’ll send you{' '}
                <b>{resource.title}</b> directly.
              </p>
              <div className="pv-error-actions">
                <a
                  className="pv-btn pv-btn-wa"
                  href={whatsappLink(`Hi Zenith Educate, please share the free resource: ${resource.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask on WhatsApp
                </a>
                <button type="button" className="pv-btn pv-btn-ghost" onClick={() => setAttempt((a) => a + 1)}>
                  Try again
                </button>
              </div>
            </div>
          )}

          {ready && (
            <div className="pv-pages">
              {sizes.map((s, i) => (
                <PdfPage
                  key={i}
                  doc={doc}
                  number={i + 1}
                  size={s}
                  scale={scale}
                  root={stage}
                  pageRef={(el) => {
                    pageEls.current[i] = el;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating controls */}
        {ready && (
          <div className="pv-dock" role="toolbar" aria-label="Page and zoom controls">
            <button
              type="button"
              className="pv-dock-btn"
              onClick={() => goTo(page - 1)}
              disabled={page <= 1}
              title="Previous page (←)"
            >
              <Icon name="up" />
            </button>
            <form className="pv-pageform" onSubmit={submitPage}>
              <input
                aria-label="Page number"
                inputMode="numeric"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
                onBlur={submitPage}
                onFocus={(e) => e.target.select()}
                size={String(numPages).length}
              />
              <span>/ {numPages}</span>
            </form>
            <button
              type="button"
              className="pv-dock-btn"
              onClick={() => goTo(page + 1)}
              disabled={page >= numPages}
              title="Next page (→)"
            >
              <Icon name="down" />
            </button>
            <span className="pv-dock-sep" aria-hidden="true" />
            <button
              type="button"
              className="pv-dock-btn"
              onClick={zoomOut}
              disabled={scale <= MIN_ZOOM}
              title="Zoom out (−)"
            >
              <Icon name="minus" />
            </button>
            <button
              type="button"
              className="pv-zoom-label"
              onClick={() => setFit('auto')}
              title="Reset zoom (0)"
              aria-label={`Zoom ${zoomLabel}, reset`}
            >
              {zoomLabel}
            </button>
            <button
              type="button"
              className="pv-dock-btn"
              onClick={zoomIn}
              disabled={scale >= MAX_ZOOM}
              title="Zoom in (+)"
            >
              <Icon name="plus" />
            </button>
            <span className="pv-dock-sep pv-hide-xs" aria-hidden="true" />
            <button
              type="button"
              className={`pv-dock-btn pv-hide-xs ${fit === 'width' ? 'is-on' : ''}`}
              onClick={() => setFit(fit === 'width' ? 'auto' : 'width')}
              aria-pressed={fit === 'width'}
              title="Fit to width"
            >
              <Icon name="fitWidth" />
            </button>
            <button
              type="button"
              className={`pv-dock-btn pv-hide-xs ${fit === 'page' ? 'is-on' : ''}`}
              onClick={() => setFit(fit === 'page' ? 'auto' : 'page')}
              aria-pressed={fit === 'page'}
              title="Fit whole page"
            >
              <Icon name="fitPage" />
            </button>
          </div>
        )}
        {toast && (
          <div className="pv-toast" role="status">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
