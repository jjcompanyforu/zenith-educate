import { Link } from 'react-router-dom';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

export default function NotFoundPage() {
  useDocumentMeta('Page not found | Zenith Educate', null, '/');
  return (
    <main className="page not-found">
      <h1>Page not found</h1>
      <p>The page you were looking for doesn't exist or has moved.</p>
      <p>
        <Link className="btn" to="/">
          Go to the homepage
        </Link>{' '}
        <Link className="btn" to="/programmes">
          Browse programmes
        </Link>
      </p>
    </main>
  );
}
