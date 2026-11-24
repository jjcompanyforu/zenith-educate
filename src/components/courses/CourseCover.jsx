import { categoryById } from '../../data/courses.js';

// Line icons for courses that have no photo.
const ICONS = {
  gov: (
    <>
      <path d="M2 9l10-6 10 6z" />
      <path d="M4 21h16M6 18V11M10 18V11M14 18V11M18 18V11M3 18h18" />
    </>
  ),
  train: (
    <>
      <rect x="5" y="3" width="14" height="13" rx="3" />
      <path d="M5 10h14M8 16l-2 5M16 16l2 5M7 19h10" />
      <circle cx="9" cy="13" r=".9" />
      <circle cx="15" cy="13" r=".9" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2l9 5v10l-9 5-9-5V7z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
    </>
  ),
  doc: (
    <>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6M9 13h8M9 17h6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
    </>
  ),
  code: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />,
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

// The course photo, or a designed gradient cover with an icon.
export default function CourseCover({ course, large = false }) {
  if (course.img) return <img src={course.img} alt={course.title} loading="lazy" />;
  return (
    <div className={`cx-cover cx-cover-${course.cat}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[course.icon]}
      </svg>
      {!large && <b>{categoryById(course.cat)?.tab}</b>}
    </div>
  );
}
