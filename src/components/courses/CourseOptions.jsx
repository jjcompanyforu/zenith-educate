import { CATEGORIES, COURSES } from '../../data/courses.js';

// <option>s for every course, grouped by category. Use inside a <select>.
export default function CourseOptions({ markOpen = false }) {
  return CATEGORIES.map((cat) => (
    <optgroup key={cat.id} label={cat.tab}>
      {COURSES.filter((c) => c.cat === cat.id).map((c) => (
        <option key={c.id} value={c.title}>
          {c.title}
          {markOpen && c.open ? ' (Admissions open)' : ''}
        </option>
      ))}
    </optgroup>
  ));
}
