import CourseCover from './CourseCover.jsx';
import { courseFact } from '../../data/courses.js';

export default function CourseCard({ course, onDetails, onApply }) {
  const duration = courseFact(course, 'Duration');
  return (
    <article className="cx-card">
      <div className="cx-media">
        <CourseCover course={course} />
        {course.open && <span className="cx-badge">Admissions Open</span>}
      </div>
      <div className="cx-body">
        <h4>{course.title}</h4>
        <p>{course.short}</p>
        {duration && <div className="cx-dur">⏱ Duration: {duration}</div>}
        <div className="cx-actions">
          <button className="cx-btn" type="button" onClick={() => onDetails(course.id)}>
            View Details
          </button>
          <button className="cx-link" type="button" onClick={() => onApply(course.id)}>
            {course.open ? 'Apply Now →' : 'Enquire →'}
          </button>
        </div>
      </div>
    </article>
  );
}
