import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/courses.js';
import { SITE, whatsappLink } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer ft">
      <div className="wrap ft-grid">
        <div className="ft-brand">
          <b>ZENITH EDUCATE</b>
          <p>
            Coaching for Bank, SSC, Railway and CUET exams, plus job-ready courses in Accounting, IT and Logistics.
            25+ years of guiding students in Thiruvananthapuram.
          </p>
          <nav className="social" aria-label="Social media">
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              f
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <span className="play">▶</span>
            </a>
          </nav>
        </div>

        <nav className="ft-col" aria-label="Courses">
          <h4>Courses</h4>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/programmes?cat=${c.id}`}>
              {c.tab}
            </Link>
          ))}
        </nav>

        <nav className="ft-col" aria-label="Students and parents">
          <h4>Students &amp; parents</h4>
          <Link to="/admissions">How to join</Link>
          <Link to="/scholarships">Scholarships</Link>
          <Link to="/results">Results</Link>
          <Link to="/resources">Free study resources</Link>
          <Link to="/about">About us</Link>
          <Link to="/#faq">FAQs</Link>
        </nav>

        <div className="ft-col">
          <h4>Visit or contact us</h4>
          <p>{SITE.address}</p>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions ↗
          </a>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          <a href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="wrap ft-bottom">
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <Link to="/terms">Terms &amp; conditions</Link>
      </div>
    </footer>
  );
}
