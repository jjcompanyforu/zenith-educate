import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Single-page apps don't scroll on navigation by themselves:
// - new page without a hash -> scroll to top
// - link with a hash (e.g. /#why) -> scroll to that section once it has rendered
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || hash.startsWith('#course-')) {
      if (!hash) window.scrollTo(0, 0);
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView();
      else if (tries++ < 10) timer = setTimeout(tryScroll, 50);
    };
    tryScroll();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
