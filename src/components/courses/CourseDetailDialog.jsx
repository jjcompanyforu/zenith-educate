import Modal from '../Modal.jsx';
import CourseCover from './CourseCover.jsx';
import { categoryById, courseFact } from '../../data/courses.js';
import { SITE } from '../../data/site.js';

export default function CourseDetailDialog({ course, onClose, onApply }) {
  const eligibility = course ? courseFact(course, 'Eligibility') : null;
  const duration = course ? courseFact(course, 'Duration') : null;
  const mode = course ? courseFact(course, 'Mode') : null;
  const medium = course ? courseFact(course, 'Medium') : null;

  return (
    <Modal open={Boolean(course)} onClose={onClose} labelledBy="cx-detail-title">
      {course && (
        <div className="cx-detail">
          <button type="button" className="cx-close" onClick={onClose} aria-label="Close">×</button>
          <div className="cx-detail-hero">
            <CourseCover course={course} large />
            <div className="cx-detail-title">
              <small>{categoryById(course.cat)?.tab}{course.open && ' · Admissions open'}</small>
              <h3 id="cx-detail-title">{course.full || course.title}</h3>
            </div>
          </div>
          <div className="cx-detail-content">
            {course.tagline && <p className="cx-tagline">{course.tagline}</p>}
            <p>{course.overview}</p>

            <h4>Programme at a glance</h4>
            <dl className="cx-facts">
              {[
                ['Duration', duration],
                ['Eligibility', eligibility],
                ['Learning mode', mode],
                ['Medium', medium],
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
              {course.facts.filter(([label]) => !['Duration', 'Eligibility', 'Mode', 'Medium'].includes(label)).map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>

            {course.highlights?.length > 0 && (
              <>
                <h4>What you’ll get</h4>
                <ul className="cx-hl">{course.highlights.map((h) => <li key={h}>✓ {h}</li>)}</ul>
              </>
            )}
            <h4>{course.modTitle || 'What you’ll learn'}</h4>
            <ul className="cx-mods">{course.modules.map((m) => <li key={m}>{m}</li>)}</ul>
            <div className="cx-detail-cta">
              <button className="cx-btn" type="button" onClick={() => onApply(course.id)}>
                {course.open ? 'Check eligibility & apply →' : 'Ask about this programme →'}
              </button>
              {course.open && <span className="cx-badge">Admissions Open</span>}
              <a className="cx-link" href={SITE.phoneHref}>or call {SITE.phoneDisplay}</a>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
