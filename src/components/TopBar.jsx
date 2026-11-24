import { Link } from 'react-router-dom';
import { SITE, whatsappLink } from '../data/site.js';

export default function TopBar() {
  return (
    <div className="top">
      <div className="wrap">
        <span className="top-news">
          <b className="top-dot" aria-hidden="true" /> Admissions open ·{' '}
          <Link to="/scholarships">Scholarships available</Link>
        </span>
        <div className="top-contact">
          <a href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a>
          <a href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a className="top-email" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
