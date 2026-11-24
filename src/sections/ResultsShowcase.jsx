import { Link } from 'react-router-dom';
const STATS = [
  { value: '1200', title: 'Students Cracked Exams', text: 'Students achieving their exam goals' },
  { value: '870', title: 'Verified Scorecards', text: "Scorecards featured in Zenith's results" },
  { value: '160', title: 'Top Rank Holders', text: 'Top rank achievements' },
  { value: '95', percent: true, title: 'Success Rate', text: 'Published success-rate figure' },
];


export function Highlights() {
  return (
    <div className="strip">
      <div className="wrap">
        <span>✦ Experienced guidance</span>
        <span>▣ Structured programmes</span>
        <span>◎ Student-focused support</span>
        <span>↗ Career-ready learning</span>
      </div>
    </div>
  );
}

export default function ResultsShowcase() {
  return (
    <section className="results-showcase" id="results">
      <div className="wrap">
        <div className="results-heading">
          <div>
            <div className="eyebrow">ZENITH EDUCATE · STUDENT ACHIEVEMENTS</div>
            <h2>
              Real effort. <em>Remarkable results.</em>
            </h2>
            <p>
              Every milestone represents a student's hard work, preparation and progress. Explore the achievements
              published by Zenith Educate.
            </p>
          </div>
          <Link className="results-link" to="/results">
            Explore all results <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="results-stats">
          {STATS.map((s) => (
            <article className="result-stat" key={s.title}>
              <span className="result-number">
                {s.value}
                {s.percent && <span className="percent">%</span>}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <div className="results-bottom">
          <span>See success stories, scorecards and our faculty on the results page.</span>
          <Link to="/results">View student results →</Link>
        </div>
      </div>
    </section>
  );
}
