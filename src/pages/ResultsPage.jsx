import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import Reveal, { CountUp } from '../components/Reveal.jsx';
import { whatsappLink } from '../data/site.js';

// Content carried over from the original site's result.php page.
const STATS = [
  { value: 1200, suffix: '+', label: 'Students Cracked Exams', icon: 'trophy' },
  { value: 870, label: 'Verified Scorecards', icon: 'scorecard' },
  { value: 160, label: 'Top Rank Holders', icon: 'medal' },
  { value: 95, suffix: '%', label: 'Success Rate', icon: 'target' },
];

const STORIES = [
  {
    quote:
      'Thanks to Zenith Educate, I cleared IBPS PO with top marks. Their mock tests and mentorship helped me boost my confidence.',
    name: 'Priya Menon',
    role: 'IBPS PO Topper',
    exam: 'Banking',
  },
  {
    quote:
      'I cracked SSC CGL Tier 1 & 2 with guidance from Zenith’s faculty. The course material was spot-on and very detailed.',
    name: 'Ramesh Kumar',
    role: 'SSC CGL Achiever',
    exam: 'SSC',
  },
  {
    quote:
      'CUET ke liye yahan ka crash course kaafi helpful tha. I loved the bilingual content and expert tips during live classes.',
    name: 'Sneha K.',
    role: 'CUET Aspirant',
    exam: 'CUET',
  },
];

const STRENGTHS = [
  {
    title: 'Subject Experts',
    text: 'Certified professionals specialising in Banking, SSC, CUET, SAP, Tally, Accounting and Logistics, bringing real-world knowledge into the classroom.',
    icon: 'expert',
  },
  {
    title: 'Result-Oriented Approach',
    text: 'Focused strategies, test-based learning and feedback to ensure students are fully prepared for both exams and careers.',
    icon: 'target',
  },
  {
    title: 'Interactive & Practical Teaching',
    text: 'Live examples, hands-on training and doubt-clearing sessions to build understanding, not just memorisation.',
    icon: 'spark',
  },
  {
    title: 'Mentorship Beyond the Classroom',
    text: 'Teachers guide students on academics, careers and personal development with 1-on-1 mentorship.',
    icon: 'mentor',
  },
  {
    title: 'Consistent Track Record',
    text: 'Our students have secured top ranks in government exams and built successful careers in Finance and Logistics.',
    icon: 'chart',
  },
];

const ICONS = {
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3',
  scorecard: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13l2 2 4-4M9 18h6',
  medal: 'M8 3l4 7 4-7M7 3h10M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 13v4M10.5 14.5 12 13',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01M12 12l7-7M16 5h3v3',
  expert: 'M12 4 2 9l10 5 10-5-10-5zM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  mentor: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 6-6h2M17 14l2 2 3-3M15 21h7',
  chart: 'M4 20h16M6 16l4-5 3 3 5-7M15 7h3v3',
  quote: 'M7 7h4v5c0 3-1.5 4.5-4 5M14 7h4v5c0 3-1.5 4.5-4 5',
  arrowL: 'M15 6l-6 6 6 6',
  arrowR: 'M9 6l6 6-6 6',
};

function Icon({ name, size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const initials = (name) =>
  name
    .replace(/\./g, '')
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function Stories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((i) => setIndex((i + STORIES.length) % STORIES.length), []);

  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => go(index + 1), 6500);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const s = STORIES[index];
  return (
    <section className="rz-stories" aria-labelledby="rz-stories-title">
      <Reveal className="rz-stories-photo" variant="left">
        <img
          src="/assets/img/promo/reception-hero.jpg"
          alt="The Zenith Educate centre at PMG Junction, Thiruvananthapuram"
          loading="lazy"
        />
        <div className="rz-photo-badge">
          <b>
            <CountUp value={1200} suffix="+" />
          </b>
          <span>students cracked their exams</span>
        </div>
        <div className="rz-photo-tag">PMG Junction · Thiruvananthapuram</div>
      </Reveal>

      <Reveal
        className="rz-stories-body"
        delay={120}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span className="rz-eyebrow">Success stories</span>
        <h2 id="rz-stories-title">
          Students who <em>made it.</em>
        </h2>
        <figure className="rz-quote" aria-live="polite" key={index}>
          <span className="rz-quote-mark">
            <Icon name="quote" size={34} />
          </span>
          <blockquote>{s.quote}</blockquote>
          <figcaption>
            <span className="rz-avatar" aria-hidden="true">
              {initials(s.name)}
            </span>
            <span>
              <b>{s.name}</b>
              <small>{s.role}</small>
            </span>
            <span className="rz-exam">{s.exam}</span>
          </figcaption>
        </figure>
        <div className="rz-controls">
          <div className="rz-people" role="tablist" aria-label="Choose a story">
            {STORIES.map((p, i) => (
              <button
                key={p.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={i === index ? 'is-active' : ''}
                onClick={() => go(i)}
                title={`${p.name} – ${p.role}`}
              >
                <span className="rz-avatar rz-avatar-sm" aria-hidden="true">
                  {initials(p.name)}
                </span>
                <span className="rz-people-name">{p.name}</span>
                {i === index && !paused && <span className="rz-timer" aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className="rz-arrows">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous story">
              <Icon name="arrowL" size={20} />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next story">
              <Icon name="arrowR" size={20} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ResultsPage() {
  return (
    <PageLayout
      title="Our Results"
      metaTitle="Student Results | Zenith Educate"
      intro="Verified scorecards, top achievements and success stories from our proud students."
      path="/results"
    >
      <section className="rz-stats" aria-label="Results at a glance">
        {STATS.map((s, i) => (
          <Reveal as="article" className="rz-stat" delay={i * 110} key={s.label}>
            <span className="rz-stat-icon">
              <Icon name={s.icon} />
            </span>
            <b className="rz-stat-num">
              <CountUp value={s.value} suffix={s.suffix} />
            </b>
            <span className="rz-stat-label">{s.label}</span>
          </Reveal>
        ))}
      </section>

      <Stories />

      <section className="rz-teachers" aria-labelledby="rz-teachers-title">
        <div className="rz-teachers-head">
          <Reveal>
            <span className="rz-eyebrow">Our faculty</span>
            <h2 id="rz-teachers-title">
              Best Teachers, <em>Better Futures.</em>
            </h2>
            <p>
              At Zenith Educate, we take pride in having some of the most experienced, passionate and result-driven
              faculty in competitive exam coaching and professional training.
            </p>
          </Reveal>
        </div>
        <div className="rz-teachers-grid">
          <div className="rz-strengths">
            {STRENGTHS.map((f, i) => (
              <Reveal as="article" className="rz-strength" delay={i * 90} key={f.title}>
                <span className="rz-strength-icon">
                  <Icon name={f.icon} size={24} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="rz-cta" aria-labelledby="rz-cta-title">
        <div>
          <h2 id="rz-cta-title">Your name could be on this page next.</h2>
          <p>Join the students who trusted Zenith Educate with their Banking, SSC, CUET and career goals.</p>
        </div>
        <div className="rz-cta-actions">
          <Link className="rz-btn rz-btn-primary" to="/programmes">
            Explore programmes <span aria-hidden="true">↗</span>
          </Link>
          <a
            className="rz-btn rz-btn-ghost"
            href={whatsappLink('Hi Zenith Educate, I would like to know more about your courses.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to an advisor
          </a>
        </div>
      </Reveal>

      <p className="rz-footnote">Figures and testimonials as published by Zenith Educate.</p>
    </PageLayout>
  );
}
