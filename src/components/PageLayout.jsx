import useDocumentMeta from '../hooks/useDocumentMeta.js';

// Shared frame for inner pages: coloured hero with title + intro, then content.
export default function PageLayout({ title, metaTitle, intro, path, children }) {
  useDocumentMeta(metaTitle || `${title} | Zenith Educate`, intro, path);
  return (
    <main className="page">
      <header className="page-hero">
        <small className="page-brand">
          <b>
            ZENITH <em>EDUCATE</em>
          </b>
          <span>Thiruvananthapuram</span>
        </small>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="page-main">{children}</div>
    </main>
  );
}
