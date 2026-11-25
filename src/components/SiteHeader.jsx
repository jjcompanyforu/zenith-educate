import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../data/site.js';

// Keep the primary navigation focused on the decisions visitors need to make.
const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/programmes', label: 'Programmes', dropdown: true },
  { to: '/results', label: 'Results' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/contact', label: 'Contact' },
];

// One entry per programme family. Individual courses remain discoverable in
// the catalogue, avoiding a long, duplicated list in the global navigation.
const PROGRAMME_GROUPS = [
  { label: 'Government Exams', cat: 'govt' },
  { label: 'CUET Entrance', cat: 'cuet' },
  { label: 'Technology Courses', cat: 'tech' },
  { label: 'Logistics & Supply Chain', cat: 'logistics' },
  { label: 'Accounting & IT', cat: 'acc' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const [megaHold, setMegaHold] = useState(false);

  useEffect(() => {
    setOpen(false);
    setProgOpen(false);
    setMegaHold(true);
    if (document.activeElement?.closest?.('.site-header')) document.activeElement.blur();
  }, [location.key]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 24 : y > 90));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label={`${SITE.name} home`}>
          <span className="brand-mark">
            <img src="/assets/img/logo/1.jpeg" alt="" width="890" height="845" />
          </span>
          <span className="brand-word" aria-hidden="true">
            <b>ZENITH <em>EDUCATE</em></b>
            <small>Education that moves you forward</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav className={`links${open ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {LINKS.map((l) =>
            l.dropdown ? (
              <div
                className={`nav-dropdown nav-mega${progOpen ? ' is-open' : ''}${megaHold ? ' is-held' : ''}`}
                key={l.to}
                onMouseLeave={() => setMegaHold(false)}
                onFocus={() => setMegaHold(false)}
              >
                <div className="nav-drop-row">
                  <NavLink to={l.to} className="nav-drop-trigger">
                    {l.label} <span aria-hidden="true">⌄</span>
                  </NavLink>
                  <button
                    type="button"
                    className="nav-drop-toggle"
                    aria-expanded={progOpen}
                    aria-controls="programmes-menu"
                    aria-label={progOpen ? 'Hide programmes' : 'Show programmes'}
                    onClick={() => setProgOpen((o) => !o)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="nav-submenu" id="programmes-menu">
                  {PROGRAMME_GROUPS.map((g) => (
                    <div className="mega-col" key={g.cat}>
                      <Link className="mega-head" to={`/programmes?cat=${g.cat}`}>
                        {g.label}
                      </Link>
                    </div>
                  ))}
                  <Link className="mega-all" to="/programmes">Explore all programmes →</Link>
                </div>
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
            ),
          )}
          <Link className="cta nav-cta" to="/admissions#apply">Book free counselling</Link>
        </nav>
      </div>
    </header>
  );
}
