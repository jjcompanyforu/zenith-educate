import { useEffect } from 'react';

const BASE_URL = 'https://zenith-educate-jithincj4-1220s-projects.vercel.app';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Updates <title>, description and canonical URL for each route.
export default function useDocumentMeta(title, description, path) {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('link[rel="canonical"]', 'href', BASE_URL + path);
    setMeta('meta[property="og:url"]', 'content', BASE_URL + path);
  }, [title, description, path]);
}
