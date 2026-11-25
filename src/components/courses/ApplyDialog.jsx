import { useEffect, useState } from 'react';
import Modal from '../Modal.jsx';
import CourseOptions from './CourseOptions.jsx';
import { COURSES, courseFact } from '../../data/courses.js';
import { mailtoLink, whatsappLink } from '../../data/site.js';

const courseSummary = (c) =>
  c ? `${c.full || c.title}${courseFact(c, 'Duration') ? ` · ${courseFact(c, 'Duration')}` : ''}` : '';

function validationMessage(form) {
  const bad = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
  if (!bad) return null;
  bad.focus();
  if (bad.name === 'consent') return 'Please tick the consent box to continue.';
  if (bad.name === 'mobile') return 'Please enter a valid mobile number (at least 10 digits).';
  return 'Please fill in all required fields correctly.';
}

// The website prepares an enquiry for WhatsApp or email; it does not store
// applications. Keep the first step short and ask only for contact essentials.
export default function ApplyDialog({ request, onClose }) {
  const initial = request ? COURSES.find((c) => c.id === request.courseId) : null;
  const [courseTitle, setCourseTitle] = useState('');
  const [error, setError] = useState('');
  const [doneFor, setDoneFor] = useState(null);

  useEffect(() => {
    setCourseTitle(initial?.title ?? '');
    setError('');
    setDoneFor(null);
  }, [request, initial?.title]);

  const selected = COURSES.find((c) => c.title === courseTitle) || null;
  const isAdmission = !selected || selected.open;
  const type = isAdmission ? 'Admission application' : 'Course enquiry';

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const message = validationMessage(form);
    if (message) {
      setError(message);
      return;
    }
    setError('');
    const d = new FormData(form);
    const text = [
      `${type} – Zenith Educate`,
      '',
      `Applying as: ${d.get('who')}`,
      `Course: ${d.get('course')}`,
      `Name: ${d.get('name')}`,
      `Mobile: ${d.get('mobile')}`,
      `Qualification: ${d.get('qualification') || 'Not provided'}`,
      `Preferred batch: ${d.get('batch') || 'Not decided'}`,
      `Message: ${d.get('message') || 'Not provided'}`,
    ].join('\n');
    const via = e.nativeEvent.submitter?.value === 'email' ? 'email' : 'whatsapp';
    if (via === 'whatsapp') window.open(whatsappLink(text), '_blank', 'noopener');
    else window.location.href = mailtoLink(`${type}: ${d.get('course')} – ${d.get('name')}`, text);
    setDoneFor(d.get('course'));
  }

  return (
    <Modal open={Boolean(request)} onClose={onClose} className="cx-dialog-form" labelledBy="cx-apply-title">
      <div className="cx-apply-head">
        {isAdmission && <span className="cx-badge">Admissions Open</span>}
        <h3 id="cx-apply-title">{isAdmission ? 'Apply for admission' : 'Course enquiry'}</h3>
        <p>{courseSummary(selected) || 'Choose a course and share your details.'}</p>
        <button type="button" className="cx-close" onClick={onClose} aria-label="Close">×</button>
      </div>

      {doneFor ? (
        <div className="cx-done" role="status">
          <div className="cx-done-icon" aria-hidden="true">✓</div>
          <h3>Your message is ready</h3>
          <p>
            Your {isAdmission ? 'admission request' : 'course enquiry'} for <b>{doneFor}</b> has been prepared.
            Please press <b>Send</b> in WhatsApp or your email app to deliver it to Zenith Educate.
          </p>
          <button type="button" className="cx-btn" onClick={onClose}>Close</button>
        </div>
      ) : (
        <form className="cx-form" noValidate onSubmit={handleSubmit}>
          <fieldset className="cx-who">
            <legend>I am a</legend>
            <label><input type="radio" name="who" value="Student" defaultChecked /> Student</label>
            <label><input type="radio" name="who" value="Parent / guardian" /> Parent / guardian</label>
          </fieldset>
          <div className="cx-row">
            <label>
              Full name *
              <input name="name" required autoComplete="name" placeholder="Your full name" autoFocus />
            </label>
            <label>
              Mobile / WhatsApp *
              <input name="mobile" type="tel" required inputMode="tel" autoComplete="tel" pattern="[+0-9 ]{10,15}" placeholder="10-digit mobile number" />
            </label>
          </div>
          <label>
            Programme *
            <select name="course" required value={courseTitle} onChange={(e) => { setCourseTitle(e.target.value); setError(''); }}>
              <option value="">Select a programme</option>
              <CourseOptions markOpen />
            </select>
          </label>
          <div className="cx-row">
            <label>
              Highest qualification <span className="cx-opt">(optional)</span>
              <select name="qualification" defaultValue="">
                <option value="">Select if known</option>
                <option>10th</option>
                <option>12th / Plus Two</option>
                <option>Diploma</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
                <option>Final year student</option>
              </select>
            </label>
            <label>
              Preferred batch <span className="cx-opt">(optional)</span>
              <select name="batch" defaultValue="">
                <option value="">Not decided</option>
                <option>Morning</option>
                <option>Evening</option>
                <option>Weekend</option>
                <option>Online</option>
              </select>
            </label>
          </div>
          <label>
            Question or message <span className="cx-opt">(optional)</span>
            <textarea name="message" rows="2" placeholder="Ask about eligibility, fees, timings or the next batch" />
          </label>
          <label className="cx-check">
            <input type="checkbox" name="consent" required />
            I agree to be contacted by Zenith Educate about this programme.
          </label>
          <p className="cx-error" role="alert">{error}</p>
          <div className="cx-form-actions">
            <button className="cx-btn cx-btn-wa" type="submit" value="whatsapp">Continue on WhatsApp</button>
            <button className="cx-btn cx-btn-ghost" type="submit" value="email">Continue by email</button>
          </div>
          <small className="cx-note">
            This prepares a message in your chosen app. Nothing is submitted or stored on this website until you press Send.
          </small>
        </form>
      )}
    </Modal>
  );
}
