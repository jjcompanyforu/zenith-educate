import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import Reveal from '../components/Reveal.jsx';
import { whatsappLink } from '../data/site.js';

const SCHOLARSHIPS = [
  {
    title: 'Merit-based',
    amount: 'Up to 100%',
    text: 'For students with excellent academic records or strong scores in our scholarship test.',
  },
  {
    title: 'Need-based',
    amount: 'Financial support',
    text: 'For students from economically weaker families. Requires income proof and a short personal statement.',
  },
  {
    title: 'Special scholarships',
    amount: 'Up to 50%',
    text: 'For female students, differently-abled candidates and children of defence personnel.',
  },
  {
    title: 'Early bird',
    amount: 'Up to 15%',
    text: 'For students who enrol within the first 10 days of the admission cycle.',
  },
];

export default function ScholarshipsPage() {
  return (
    <PageLayout
      title="Scholarships"
      metaTitle="Scholarships | Zenith Educate"
      intro="Fees should never stand between a student and their goals. Zenith Educate offers merit, need-based, special and early-bird scholarships."
      path="/scholarships"
    >
      <section className="section">
        <h2>Scholarship programmes</h2>
        <div className="ux-sch-grid">
          {SCHOLARSHIPS.map((s, i) => (
            <Reveal as="article" className="ux-sch" key={s.title} delay={i * 90}>
              <span className="ux-sch-amount">{s.amount}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="ux-callout">
          Scholarships are awarded per batch and seats are limited, so apply early. Ask us which scholarships are open
          right now.
        </p>
      </section>

      <section className="section" style={{ borderBottom: 0 }}>
        <h2>How to apply</h2>
        <ol className="ux-steps ux-steps-3">
          {[
            ['Tell us you’re interested', 'Mention the scholarship when you register or during your free counselling session.'],
            ['Share your documents', 'ID proof and mark sheets; income certificate for need-based support.'],
            ['Test or short interview', 'Some scholarships include a short test or interview.'],
          ].map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 100}>
              <span className="ux-step-num">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="ux-actions">
          <Link className="btn" to="/admissions#apply">
            Apply with free counselling
          </Link>
          <a
            className="btn ux-btn-ghost"
            href={whatsappLink('Hello Zenith Educate, which scholarships are open right now?')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask about scholarships on WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
