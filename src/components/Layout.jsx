import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import SiteHeader from './SiteHeader.jsx';
import Footer from './Footer.jsx';
import ScrollManager from './ScrollManager.jsx';
import { SITE, whatsappLink } from '../data/site.js';

// Phone bar: on the homepage it waits until the hero's own buttons have
// scrolled away, so the first screen isn't cluttered; elsewhere it shows at once.
function useMobileBar(pathname) {
  const [shown, setShown] = useState(pathname !== '/');
  useEffect(() => {
    const target = pathname === '/' && document.querySelector('#home .actions');
    if (!target || !('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);
  return shown;
}

export default function Layout() {
  const { pathname } = useLocation();
  const barShown = useMobileBar(pathname);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (barShown) setPulse(true);
  }, [barShown]);

  // Fade each new page in, but not on the very first load (the hero has its own intro).
  const firstLoad = useRef(true);
  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <>
      <ScrollManager />
      <TopBar />
      <SiteHeader />
      <div key={pathname} className={firstLoad.current ? 'route' : 'route route-in'}>
        <Outlet />
      </div>
      <Footer />
      {/* Desktop: floating WhatsApp button */}
      <a className="wa" href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noreferrer">
        WhatsApp us
      </a>
      {/* Phones: the three things visitors want, always one tap away */}
      <nav className={`mbar${barShown ? ' is-shown' : ''}${pulse ? ' is-pulse' : ''}`} aria-label="Quick contact">
        <a href={SITE.phoneHref}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
          Call
        </a>
        <a className="mbar-wa" href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
          </svg>
          WhatsApp
        </a>
        <Link className="mbar-cta" to="/admissions#apply">
          Free counselling
        </Link>
      </nav>
    </>
  );
}
