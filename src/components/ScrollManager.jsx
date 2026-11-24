import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Single-page apps don't scroll on navigation by themselves:
// - new page without a hash -> scroll to top
// - link with a hash (e.g. /#why) -> scroll to that section once it has rendered
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // No hash, or a course link (its pop-up handles itself): start at the top.
    // 'instant' overrides the CSS smooth scrolling.
    if (!hash || hash.startsWith('#course-')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
