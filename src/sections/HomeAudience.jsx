// Homepage sections aimed at the two audiences: students choosing a path,
// and parents deciding whether to trust Zenith with their child.
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { SITE, whatsappLink } from '../data/site.js';

const PATHS = [
  {
    to: '/programmes?cat=govt',
    kicker: 'After graduation / Plus Two',
    title: 'Crack a government exam',
    text: 'Bank, SSC, Railway, Insurance & Central Govt coaching',
    icon: 'M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18',
  },
  {
    to: '/programmes?cat=cuet',
    kicker: 'Plus One / Plus Two students',
    title: 'Get into a top university',
    text: 'CUET coaching for DU, JNU, BHU & central universities',
    icon: 'M12 4 2 9l10 5 10-5-10-5zM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5',
  },
  {
    to: '/programmes?cat=acc',
    kicker: 'Job seekers & graduates',
    title: 'Learn a job-ready skill',
    text: 'Tally, SAP FICO, Advanced Excel, Python, DCA',
    icon: 'M4 5h16v11H4zM8 20h8M12 16v4',
  },
  {
    to: '/programmes?cat=tech',
    kicker: 'Future-focused careers',
    title: 'Start a tech or logistics career',
    text: 'Data Science, AI, Cyber Security, Logistics & SCM',
    icon: 'M13 3 4 14h7l-1 7 9-11h-7l1-7z',
  },
];

function Svg({ d, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function PathFinder() {
  return (
    <section className="pf" aria-labelledby="pf-title">
      <div className="wrap">
        <div className="pf-head">
          <h2 id="pf-title">What are you looking for?</h2>
          <a href="#parents" className="pf-parent">
            I’m a parent →
          </a>
        </div>
        <div className="pf-grid">
          {PATHS.map((p, i) => (
            <Reveal key={p.to} delay={i * 80}>
              <Link className="pf-card" to={p.to}>
                <span className="pf-icon">
                  <Svg d={p.icon} />
                </span>
                <small>{p.kicker}</small>
                <b>{p.title}</b>
                <span className="pf-text">{p.text}</span>
                <span className="pf-go" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PARENT_POINTS = [
  ['25+ years of teaching', 'A trusted institute in Thiruvananthapuram for over two decades.', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2'],
  ['Free counselling first', 'Meet a counsellor with your child before you decide or pay anything.', 'M8 10h8M8 14h5M4 4h16v12H8l-4 4z'],
  ['English & Malayalam medium', 'Concepts explained in the language your child understands best.', 'M4 5h8M8 3v2M6 5c0 4 3 7 6 8M10 5c0 3-2 6-6 8M13 21l4-10 4 10M14.5 18h5'],
  ['Regular tests & doubt clearing', 'Mock tests, practice sets and doubt sessions to track real progress.', 'M6 3h9l4 4v14H6zM9 13l2 2 4-4'],
  ['1-on-1 mentorship', 'Faculty guide students on studies, careers and confidence.', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 6-6h2M17 14l2 2 3-3'],
  ['Scholarships & easy fees', 'Merit and need-based scholarships, with EMI and instalment options.', 'M6 4h12M6 9h12M9 4c4 0 6 2 6 5s-2 5-6 5H7l8 7'],
  ['Flexible batches', 'Morning, evening and weekend batches, in class or online.', 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4'],
  ['Central, easy to reach', 'Air-conditioned classrooms at PMG Junction, in the heart of the city.', 'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
];

export function ForParents() {
  return (
    <section className="section fp" id="parents" aria-labelledby="fp-title">
      <div className="wrap">
        <div className="fp-head">
          <div>
            <div className="eyebrow">FOR PARENTS</div>
            <h2 id="fp-title">
              Your child’s future, <em>in safe hands.</em>
            </h2>
          </div>
          <p>
            Choosing a coaching centre is a big decision. Here’s what you can expect when your son or daughter studies
            at Zenith Educate.
          </p>
        </div>
        <div className="fp-grid">
          {PARENT_POINTS.map(([title, text, icon], i) => (
            <Reveal as="article" className="fp-card" key={title} delay={(i % 4) * 80}>
              <span className="fp-icon">
                <Svg d={icon} size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="fp-cta">
          <div>
            <b>Visit the centre with your child</b>
            <span>See the classrooms, meet the faculty and get a personal learning roadmap – free, no obligation.</span>
          </div>
          <div className="fp-cta-actions">
            <Link className="btn" to="/admissions#apply">
              Book a free visit
            </Link>
            <a className="fp-call" href={SITE.phoneHref}>
              Call {SITE.phoneDisplay}
            </a>
            <a
              className="fp-call"
              href={whatsappLink('Hello Zenith Educate, I am a parent and would like to know more about your courses.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
