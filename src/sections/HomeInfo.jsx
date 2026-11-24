// Mostly static homepage sections.
import CourseCatalog from '../components/courses/CourseCatalog.jsx';
import { SITE, whatsappLink } from '../data/site.js';

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
        <a className="campus-poster" href="#enquiry" aria-label="Enquire now about classes at Zenith Educate">
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
            <a className="btn" href="#enquiry">
              Book free counselling →
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
    'How do I join a course?',
    'Book a free counselling session by phone, WhatsApp or the form on this site. We help you choose the right course and batch, then you submit your application with ID proof and certificates, confirm your batch and start classes.',
  ],
  [
    'What are the fees? Can we pay in instalments?',
    'Fees depend on the course and mode of study. EMI and instalment options are available. Message us on WhatsApp or call and we will share the current fee plan for your course.',
  ],
  [
    'Are scholarships available?',
    'Yes. We offer merit-based, need-based, special and early-bird scholarships. Seats are limited per batch, so apply during registration. A short test or interview may be part of the process.',
  ],
  [
    'Are classes taught in Malayalam?',
    'Our exam coaching programmes are taught in both English and Malayalam, so concepts are clear in the language your child is most comfortable with.',
  ],
  [
    'What are the batch timings?',
    'We run morning, evening and weekend batches, so students can attend alongside college, school or work. Ask us for the next batch start date.',
  ],
  [
    'Can I attend classes online?',
    'Yes. Most programmes are available online, in the classroom or as a hybrid of both.',
  ],
  [
    'How long are the courses?',
    'Most programmes run for 3 to 6 months; short skill courses such as Advanced Excel or Tally take 1 to 2 months. Each course shows its exact duration on the Courses page.',
  ],
  [
    'How are doubts cleared and progress tracked?',
    'Students get regular doubt-clearing sessions, practice sheets and mock tests, plus 1-on-1 mentorship from faculty.',
  ],
  ['Will I receive a certificate?', 'Yes. Students receive a certificate on successful completion of their course.'],
  ['Where is Zenith Educate located?', `${SITE.address}. Parents and students are welcome to visit the centre.`],
];

export function Faq() {
  return (
    <section className="section programmes" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-side">
          <div className="eyebrow">COMMON QUESTIONS</div>
          <h2>
            Questions students &amp; <em>parents ask.</em>
          </h2>
          <p className="intro">Can’t find your answer? Our counsellors are happy to help.</p>
          <a className="btn" href={whatsappLink('Hello Zenith Educate, I have a question.')} target="_blank" rel="noopener noreferrer">
            Ask on WhatsApp
          </a>
          <a className="faq-call" href={SITE.phoneHref}>
            or call {SITE.phoneDisplay}
          </a>
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <details className="faq-item" key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
