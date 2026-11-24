import { useState } from 'react';
import CourseOptions from './courses/CourseOptions.jsx';
import { SITE, whatsappLink } from '../data/site.js';

// Short counselling/enquiry form for students and parents. There is no
// backend, so submitting opens WhatsApp with the details filled in; most
// visitors are on phones and already use WhatsApp, unlike email.
export default function EnquiryForm({ id = 'enquiry', title = 'Book a free counselling session', intro, course = '' }) {
  const [who, setWho] = useState('Student');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bad = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
    if (bad) {
      bad.focus();
      setError(bad.name === 'mobile' ? 'Please enter a valid 10-digit mobile number.' : 'Please fill in your name and mobile number.');
      return;
    }
    setError('');
    const d = new FormData(form);
    const isParent = who === 'Parent';
    const text = [
      'Free counselling request – Zenith Educate',
      '',
      `I am a: ${isParent ? 'Parent / guardian' : 'Student'}`,
      `${isParent ? 'Parent name' : 'Name'}: ${d.get('name')}`,
      isParent && d.get('student') ? `Student name: ${d.get('student')}` : null,
      `Mobile: ${d.get('mobile')}`,
      `Interested in: ${d.get('course') || 'Not sure yet – please guide me'}`,
      `Preferred batch: ${d.get('batch')}`,
      d.get('message') ? `Message: ${d.get('message')}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n');
    window.open(whatsappLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <form className="eq" id={id} onSubmit={onSubmit} noValidate>
      <div className="eq-head">
        <span className="eq-badge">Free · No obligation</span>
        <h3>{title}</h3>
        <p>{intro || 'Tell us a little about yourself and a counsellor will reply on WhatsApp to suggest the right course and batch.'}</p>
      </div>

      {sent ? (
        <div className="eq-done" role="status">
          <span className="eq-done-icon" aria-hidden="true">✓</span>
          <b>WhatsApp is ready – just press send.</b>
          <p>
            Our counsellor will reply shortly. WhatsApp didn’t open? Call us on{' '}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
          </p>
          <button type="button" className="eq-link" onClick={() => setSent(false)}>
            Send another enquiry
          </button>
        </div>
      ) : (
        <>
          <fieldset className="eq-who">
            <legend>I am a</legend>
            {['Student', 'Parent'].map((w) => (
              <label key={w} className={who === w ? 'is-on' : ''}>
                <input type="radio" name="who" value={w} checked={who === w} onChange={() => setWho(w)} />
                {w === 'Parent' ? 'Parent / guardian' : 'Student'}
              </label>
            ))}
          </fieldset>
          <div className="eq-row">
            <label>
              {who === 'Parent' ? 'Your name' : 'Full name'} *
              <input name="name" required autoComplete="name" placeholder="Your name" />
            </label>
            <label>
              Mobile / WhatsApp *
              <input
                name="mobile"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                pattern="[+0-9 ]{10,15}"
                placeholder="10-digit number"
              />
            </label>
          </div>
          {who === 'Parent' && (
            <label>
              Student’s name
              <input name="student" placeholder="Your son / daughter’s name" />
            </label>
          )}
          <div className="eq-row">
            <label>
              Course of interest
              <select name="course" defaultValue={course}>
                <option value="">Not sure yet – guide me</option>
                <CourseOptions />
              </select>
            </label>
            <label>
              Preferred batch
              <select name="batch" defaultValue="Not decided">
                <option>Not decided</option>
                <option>Morning</option>
                <option>Evening</option>
                <option>Weekend</option>
                <option>Online</option>
              </select>
            </label>
          </div>
          <label>
            Anything we should know? <span className="eq-opt">(optional)</span>
            <textarea name="message" rows="2" placeholder="e.g. exam you’re targeting, current class / qualification" />
          </label>
          <p className="eq-error" role="alert">
            {error}
          </p>
          <button className="eq-submit" type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z" />
            </svg>
            Send on WhatsApp
          </button>
          <p className="eq-alt">
            Prefer to talk? Call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>. We never share your number.
          </p>
        </>
      )}
    </form>
  );
}
