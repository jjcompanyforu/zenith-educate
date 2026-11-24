import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/courses.js';
import { SITE } from '../data/site.js';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/programmes', label: 'Courses', dropdown: true },
  { to: '/results', label: 'Results' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/resources', label: 'Free Resources' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname, location.search, location.hash]);

  // Compact header once the page is scrolled. Two thresholds (hysteresis) stop
  // it flickering when the scroll position sits right at the boundary.
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
          <img className="brand-logo" src="/assets/img/logo/1.jpeg" alt={`${SITE.name} logo`} />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`links${open ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {LINKS.map((l) =>
            l.dropdown ? (
              <div className="nav-dropdown" key={l.to}>
                <NavLink to={l.to} className="nav-drop-trigger">
                  {l.label} <span aria-hidden="true">⌄</span>
                </NavLink>
                <div className="nav-submenu">
                  {CATEGORIES.map((c) => (
                    <Link key={c.id} to={`/programmes?cat=${c.id}`}>
                      {c.tab}
                    </Link>
                  ))}
                </div>
              </div>
            ) : l.to.includes('#') ? (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {l.label}
              </NavLink>
            ),
          )}
          <Link className="cta nav-cta" to="/admissions#apply">
            Book free counselling
          </Link>
        </nav>
      </div>
    </header>
  );
}
