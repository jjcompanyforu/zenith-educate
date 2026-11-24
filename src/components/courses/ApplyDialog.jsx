import { useState } from 'react';
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

// Application / enquiry form. The site has no backend, so submitting opens
// WhatsApp or the visitor's email app with the details filled in.
// `request` is { courseId } (courseId may be null for a general enquiry), or null when closed.
export default function ApplyDialog({ request, onClose }) {
  const initial = request ? COURSES.find((c) => c.id === request.courseId) : null;
  const [courseTitle, setCourseTitle] = useState('');
  const [error, setError] = useState('');
  const [doneFor, setDoneFor] = useState(null);
  const [openedFor, setOpenedFor] = useState(null);

  // Reset the form each time the dialog is opened for a (new) request.
  if (request !== openedFor) {
    setOpenedFor(request);
    setCourseTitle(initial?.title ?? '');
    setError('');
    setDoneFor(null);
  }

  const selected = COURSES.find((c) => c.title === courseTitle) || null;
  const isAdmission = !initial || initial.open;
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
      `Course: ${d.get('course')}`,
      `Name: ${d.get('name')}`,
      `Mobile: ${d.get('mobile')}`,
      `Email: ${d.get('email')}`,
      `Qualification: ${d.get('qualification') || '-'}`,
      `Preferred mode: ${d.get('mode')}`,
      `Preferred batch: ${d.get('batch')}`,
      `City: ${d.get('city') || '-'}`,
      `Message: ${d.get('message') || '-'}`,
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
        <button type="button" className="cx-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      {doneFor ? (
        <div className="cx-done">
          <div className="cx-done-icon" aria-hidden="true">✓</div>
          <h3>Almost done!</h3>
          <p>
            Your application for <b>{doneFor}</b> is ready. Press <b>send</b> in WhatsApp or your email app to
            submit it. Our team will contact you shortly.
          </p>
          <button type="button" className="cx-btn" onClick={onClose}>
            Close
          </button>
        </div>
      ) : (
        <form className="cx-form" noValidate onSubmit={handleSubmit}>
          <div className="cx-row">
            <label>
              Full name *
              <input name="name" required autoComplete="name" placeholder="Your full name" autoFocus />
            </label>
            <label>
              Mobile number *
              <input
                name="mobile"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                pattern="[+0-9 ]{10,15}"
                placeholder="10-digit mobile number"
              />
            </label>
          </div>
          <div className="cx-row">
            <label>
              Email *
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Course *
              <select name="course" required value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}>
                <option value="">Select a course</option>
                <CourseOptions markOpen />
              </select>
            </label>
          </div>
          <div className="cx-row">
            <label>
              Highest qualification
              <select name="qualification" defaultValue="">
                <option value="">Select</option>
                <option>10th</option>
                <option>12th / Plus Two</option>
                <option>Diploma</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
                <option>Final year student</option>
              </select>
            </label>
            <label>
              Preferred mode
              <select name="mode">
                <option>Classroom</option>
                <option>Online</option>
                <option>Hybrid</option>
              </select>
            </label>
          </div>
          <div className="cx-row">
            <label>
              Preferred batch
              <select name="batch">
                <option>Morning</option>
                <option>Evening</option>
                <option>Weekend</option>
                <option>Not decided</option>
              </select>
            </label>
            <label>
              City / location
              <input name="city" autoComplete="address-level2" placeholder="e.g. Thiruvananthapuram" />
            </label>
          </div>
          <label>
            Message (optional)
            <textarea name="message" rows="3" placeholder="Anything you would like us to know" />
          </label>
          <label className="cx-check">
            <input type="checkbox" name="consent" required /> I agree to be contacted by Zenith Educate about this
            course.
          </label>
          <p className="cx-error" role="alert">
            {error}
          </p>
          <div className="cx-form-actions">
            <button className="cx-btn cx-btn-wa" type="submit" value="whatsapp">
              Send via WhatsApp
            </button>
            <button className="cx-btn cx-btn-ghost" type="submit" value="email">
              Send via email
            </button>
          </div>
          <small className="cx-note">
            Your application opens in WhatsApp or your email app, ready to send to Zenith Educate. Nothing is stored
            on this website.
          </small>
        </form>
      )}
    </Modal>
  );
}
