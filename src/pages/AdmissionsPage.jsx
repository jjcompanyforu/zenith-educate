import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Reveal from '../components/Reveal.jsx';
import { SITE } from '../data/site.js';

const STEPS = [
  ['Free counselling', 'A one-on-one session (in person, by phone or on WhatsApp) to understand your goals and suggest the right course and batch. Parents are welcome to join.'],
  ['Submit your application', 'Fill in the enrolment form and share the required documents.'],
  ['Confirm your batch', 'After document verification, choose your batch and make the initial payment.'],
  ['Start learning', 'Join your classroom, online or hybrid batch and begin your preparation.'],
];

const DOCUMENTS = [
  'ID proof (Aadhaar or similar)',
  'Qualification certificates / mark sheets',
  'Income certificate (only for need-based scholarship)',
];

export default function AdmissionsPage() {
  return (
    <PageLayout
      title="Admissions"
      metaTitle="Admissions | Zenith Educate"
      intro="Joining Zenith Educate takes four simple steps, and it starts with a free counselling session for students and parents."
      path="/admissions"
    >
      <section className="section">
        <h2>How to join</h2>
        <ol className="ux-steps">
          {STEPS.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 100}>
              <span className="ux-step-num">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section ux-split">
        <div>
          <h2>Good to know</h2>
          <div className="ux-facts">
            <article>
              <h3>Batch timings</h3>
              <p>Morning, evening and weekend batches, in the classroom, online or hybrid.</p>
            </article>
            <article>
              <h3>Fees &amp; payment</h3>
              <p>Affordable fees with EMI and instalment options. Ask us for the current fee plan for your course.</p>
            </article>
            <article>
              <h3>Scholarships</h3>
              <p>
                Merit-based, need-based, special and early-bird scholarships.{' '}
                <Link to="/scholarships">See scholarships →</Link>
              </p>
            </article>
            <article>
              <h3>Medium of teaching</h3>
              <p>Exam coaching is available in both English and Malayalam.</p>
            </article>
          </div>
          <h3 className="ux-sub">Documents to keep ready</h3>
          <ul className="ux-checklist">
            {DOCUMENTS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="muted">
            Questions? Call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or visit us at PMG Junction,
            Thiruvananthapuram.
          </p>
        </div>
        <EnquiryForm id="apply" />
      </section>
    </PageLayout>
  );
}
