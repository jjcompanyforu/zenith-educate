// Mostly static homepage sections.
import CourseCatalog from '../components/courses/CourseCatalog.jsx';
import { SITE } from '../data/site.js';

export function AboutIntro() {
  return (
    <section className="section wrap about" id="about">
      <img src="/assets/img/banner/banner-1.jpg" alt="Zenith Educate students studying together" />
      <div>
        <div className="eyebrow">ABOUT ZENITH EDUCATE</div>
        <h2>
          More than a classroom.
          <br />
          <em>A place to grow.</em>
        </h2>
        <p>
          A skill-focused institute in Thiruvananthapuram, helping learners take confident steps toward their academic
          and professional ambitions.
        </p>
        <p>
          We bring together practical training, experienced guidance and a supportive learning environment. From
          accounting and IT to competitive exams and emerging technologies, our programmes make learning relevant and
          purposeful.
        </p>
        <div className="ticks">
          ✓ Practical, structured learning
          <br />✓ Personalised student guidance
          <br />✓ A broad range of career pathways
        </div>
      </div>
    </section>
  );
}

export function ProgrammesSection() {
  return (
    <section className="section programmes" id="programmes">
      <div className="wrap">
        <div className="head">
          <div>
            <div className="eyebrow">FIND YOUR DIRECTION</div>
            <h2>
              Programmes built around
              <br />
              <em>your ambitions.</em>
            </h2>
          </div>
          <p>Wherever you want to go next, start by building the knowledge and skills to get there.</p>
        </div>
        <CourseCatalog />
      </div>
    </section>
  );
}

const WHY = [
  ['Learn with direction', 'Focused programmes shaped around real learning goals and career pathways.'],
  ['Guidance that matters', 'Personal attention, mentoring and approachable faculty support.'],
  ['Practical by design', 'Build understanding through structured lessons and hands-on practice.'],
  ['A legacy of learning', 'More than 25 years of experience in education and skill development.'],
];

export function WhyZenith() {
  return (
    <section className="section why" id="why">
      <div className="wrap">
        <div className="eyebrow">THE ZENITH DIFFERENCE</div>
        <h2>
          Learning with purpose.
          <br />
          <em>Progress with confidence.</em>
        </h2>
        <div className="whygrid">
          {WHY.map(([title, text]) => (
            <article className="whycard" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Classrooms() {
  return (
    <section className="section campus" id="campus">
      <div className="wrap campus-grid">
        <a className="campus-poster" href="#contact" aria-label="Enquire now about classes at Zenith Educate">
          <img
            src="/assets/img/promo/classroom-poster.jpg"
            alt="Zenith Educate classroom poster: Your next chapter starts in the classroom. Courses in Banking and SSC, CUET, Accounting and IT, Data Science, Cyber Security and AI. Call or WhatsApp +91 89211 46637."
            width="1254"
            height="1254"
            loading="lazy"
          />
        </a>
        <div className="campus-copy">
          <div className="eyebrow">OUR CLASSROOMS</div>
          <h2>
            Your next chapter starts <em>in the classroom.</em>
          </h2>
          <p>
            Bright, air-conditioned classrooms with projector-led sessions — a space built for focus. Learn, practise
            and build your future with expert-led classes, available online or on campus.
          </p>
          <div className="campus-tags">
            {['Banking & SSC', 'CUET', 'Accounting & IT', 'Data Science', 'Cyber Security', 'AI'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="campus-actions">
            <a className="btn" href="#contact">
              Enquire now →
            </a>
            <a className="campus-call" href={SITE.phoneHref}>
              <small>Call / WhatsApp</small>
              <b>{SITE.phoneDisplay}</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const FAQS = [
  [
    'How long are the courses?',
    'Duration varies by programme. The original site describes many programmes between 3 and 6 months, with specific courses having their own durations.',
  ],
  [
    'Are online classes available?',
    'Yes. Online and offline modes are described for most programmes, with hybrid options for selected courses.',
  ],
  ['How can I clear doubts?', 'Daily doubt-clearing, mentor support and WhatsApp contact with faculty are described.'],
  [
    'Will I receive a certificate?',
    'Certificates are described as available on successful completion; recognition depends on the programme and should be confirmed.',
  ],
  [
    'How do I apply for a scholarship?',
    'Apply during registration and provide the required documents. A test or interview may be required.',
  ],
  ['Where is Zenith located?', `${SITE.address}.`],
];

export function Faq() {
  return (
    <section className="section programmes" id="faq">
      <div className="wrap">
        <div className="eyebrow">COMMON QUESTIONS</div>
        <h2>
          Frequently asked <em>questions.</em>
        </h2>
        <div className="grid">
          {FAQS.map(([q, a]) => (
            <article className="card" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
