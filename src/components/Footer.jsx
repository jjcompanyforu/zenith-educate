import { Link } from 'react-router-dom';
import { SITE } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <b>ZENITH EDUCATE</b>
        <span>{SITE.address}</span>
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved. ·{' '}
          <Link to="/scholarships" style={{ color: 'inherit' }}>Scholarships</Link> ·{' '}
          <Link to="/terms" style={{ color: 'inherit' }}>Terms</Link>
        </span>
        <nav className="social" aria-label="Social media">
          <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            f
          </a>
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <span className="play">▶</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
