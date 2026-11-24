// Contact enquiry and admission registration sections (both send via email).
import { useState } from 'react';
import CourseOptions from '../components/courses/CourseOptions.jsx';
import { SITE, mailtoLink, whatsappLink } from '../data/site.js';

const formText = (form) =>
  [...new FormData(form).entries()].map(([k, v]) => `${k}: ${v}`).join('\n');

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailtoLink('Course enquiry — Zenith Educate', formText(e.currentTarget));
    setSent(true);
  };

  return (
    <section className="section wrap contact" id="contact">
      <div className="details">
        <div className="eyebrow">LET'S TALK ABOUT YOUR NEXT STEP</div>
        <h2>
          Start a conversation.
          <br />
          <em>Find your path.</em>
        </h2>
        <p>Tell us what you want to learn. Our team will help you explore the right programme and next steps.</p>
        <p>
          <b>Phone</b>
          <br />
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        </p>
        <p>
          <b>Email</b>
          <br />
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <p>
          <b>Visit us</b>
          <br />
          {SITE.address}.
          <br />
          <a className="directions" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions ↗
          </a>
        </p>
      </div>
      <form id="enquiry" onSubmit={onSubmit}>
        <h3>Course enquiry</h3>
        <p>Share a few details and we'll help you get started.</p>
        <label>
          Your name
          <input required name="name" autoComplete="name" />
        </label>
        <label>
          Email address
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Interested programme
          <select name="course" defaultValue="">
            <option value="">Choose a programme</option>
            <CourseOptions />
            <option>Other</option>
          </select>
        </label>
        <label>
          Message
          <textarea name="message" />
        </label>
        <button className="btn" type="submit">
          Send enquiry ↗
        </button>
        <small>
          {sent ? 'Your email application should open with the enquiry. ' : 'Your email app will open with your enquiry details. '}
          Prefer WhatsApp?{' '}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Message our team
          </a>
          .
        </small>
      </form>
    </section>
  );
}

const STEPS = [
  ['01 · Free counselling', 'Discuss your interests, course options and a suitable learning roadmap with the team.'],
  ['02 · Submit application', 'Complete the registration details and prepare ID proof and qualification certificates.'],
  ['03 · Confirm your batch', 'After eligibility and document checks, select your batch and confirm the admission details.'],
  ['04 · Begin learning', 'Join classroom, online or hybrid sessions according to the programme.'],
];

export function AdmissionsSection() {
  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailtoLink('Admission enquiry - Zenith Educate', formText(e.currentTarget));
  };

  return (
    <section className="section" id="admissions" style={{ background: '#f7f7f3' }}>
      <div className="wrap">
        <div className="eyebrow">ADMISSIONS</div>
        <h2>
          Your next step starts <em>here.</em>
        </h2>
        <div className="grid">
          {STEPS.map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="contact" style={{ marginTop: '36px' }}>
          <div>
            <h3>Admission information</h3>
            <p>
              Morning, evening and weekend batches are listed on the original site. Fee plans, EMI/installment options
              and scholarship availability should be confirmed directly with the institute.
            </p>
            <p>
              <b>Scholarships:</b> merit-based, need-based, special and early-bird categories are described by Zenith.
              Eligibility and current offers are subject to confirmation.
            </p>
          </div>
          <form id="registration" onSubmit={onSubmit}>
            <h3>Registration enquiry</h3>
            <label>
              Full name
              <input required name="name" autoComplete="name" />
            </label>
            <label>
              Email
              <input required type="email" name="email" autoComplete="email" />
            </label>
            <label>
              Mobile number
              <input required name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              Programme
              <select name="course" defaultValue="">
                <option value="">Choose programme</option>
                <CourseOptions />
              </select>
            </label>
            <label>
              Preferred mode
              <select name="mode">
                <option>Not decided</option>
                <option>Classroom</option>
                <option>Online</option>
                <option>Hybrid</option>
              </select>
            </label>
            <button className="btn" type="submit">
              Send registration enquiry
            </button>
            <small>
              Opens your email application; no student data is stored on this website. You can also{' '}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                contact us on WhatsApp
              </a>
              .
            </small>
          </form>
        </div>
      </div>
    </section>
  );
}
