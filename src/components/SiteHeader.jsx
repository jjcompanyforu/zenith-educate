import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../data/site.js';

// Same items and order as the menu on zenitheducate.in.
const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/programmes', label: 'Programmes', dropdown: true },
  { to: '/admissions', label: 'Admissions' },
  { to: '/results', label: 'Results' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

// Programmes menu: groups and courses in the same order as the original site.
// Each course opens its details pop-up on the Programmes page.
const PROGRAMME_GROUPS = [
  {
    label: 'Accounting & IT',
    cat: 'acc',
    items: [
      ['Tally Prime', 'tally'],
      ['SAP FICO', 'sap-fico'],
      ['Advanced Excel', 'advanced-excel'],
      ['Microsoft Office Specialist', 'mos'],
      ['Python for Data Analysis', 'python'],
      ['DCA', 'dca'],
    ],
  },
  {
    label: 'Government Exams',
    cat: 'govt',
    items: [
      ['Bank Coaching', 'bank'],
      ['SSC Coaching', 'ssc'],
      ['Railway Coaching', 'railway'],
      ['Insurance Exams', 'insurance'],
      ['Central Govt. Jobs', 'central-govt'],
    ],
  },
  {
    label: 'Tech Courses',
    cat: 'tech',
    items: [
      ['Data Science', 'data-science'],
      ['Cyber Security', 'cyber-security'],
      ['Artificial Intelligence', 'ai'],
    ],
  },
  {
    label: 'Entrance Coaching',
    cat: 'cuet',
    items: [['CUET Programme', 'cuet']],
  },
  {
    label: 'Logistics & Supply Chain',
    cat: 'logistics',
    items: [
      ['Certificate in Logistics', 'logistics-certificate'],
      ['Diploma in Logistics', 'logistics-diploma'],
      ['Advanced Diploma', 'logistics-advanced'],
    ],
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [progOpen, setProgOpen] = useState(false); // Programmes list on phones
  const [megaHold, setMegaHold] = useState(false); // keep desktop menu shut after a click until the pointer leaves

  // Close the menus whenever the route changes. Dropping focus closes the
  // desktop Programmes menu, which otherwise stays open via :focus-within.
  useEffect(() => {
    setOpen(false);
    setProgOpen(false);
    setMegaHold(true);
    if (document.activeElement?.closest?.('.site-header')) document.activeElement.blur();
  }, [location.key]);

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
          {/* Emblem cropped from the logo, with the name set large beside it */}
          <span className="brand-mark">
            <img src="/assets/img/logo/1.jpeg" alt="" width="890" height="845" />
          </span>
          <span className="brand-word" aria-hidden="true">
            <b>
              ZENITH <em>EDUCATE</em>
            </b>
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
          <span />
          <span />
          <span />
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
                      {g.items.map(([label, id]) => (
                        <Link key={id} to={`/programmes?cat=${g.cat}#course-${id}`}>
                          {label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link className="mega-all" to="/programmes">
                    View all programmes →
                  </Link>
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
