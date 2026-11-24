import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function ScholarshipsPage() {
  return (
    <PageLayout
      title={"Scholarships"}
      metaTitle={"Scholarships | Zenith Educate"}
      intro={"Explore merit-based, need-based, special and early-bird scholarship programmes described by Zenith Educate."}
      path="/scholarships"
    >
      <div className="section">
        <h2>Our Scholarship Programs</h2>
        <p>Designed to remove financial barriers and recognize talent and potential.</p>
        <div className="grid">
          <article className="card">
            <h3>Merit-Based Scholarships</h3>
            <p>Awarded to students with excellent academic records or entrance test results. The original page states offers up to 100% fee waiver based on performance.</p>
          </article>
          <article className="card">
            <h3>Need-Based Scholarships</h3>
            <p>For students from economically weaker backgrounds. Income proof and a short personal statement are required.</p>
          </article>
          <article className="card">
            <h3>Special Scholarships</h3>
            <p>The original page lists support for female students, differently-abled candidates and children of defense personnel, with up to 50% discount.</p>
          </article>
          <article className="card">
            <h3>Early Bird Scholarships</h3>
            <p>The original page describes up to 15% fee waiver for enrolment within the first 10 days of the admission cycle.</p>
          </article>
        </div>
      </div>
      <div className="section">
        <h2>How to Apply</h2>
        <ol className="list">
          <li>Fill out the Scholarship Application Form during registration.</li>
          <li>Submit required documents such as ID, mark sheets and income certificate.</li>
          <li>Attend a scholarship test or interview, if required.</li>
        </ol>
        <p className="muted">The original website notes that scholarships are batch-based and limited. Scholarship percentages and eligibility should be confirmed for the current admission cycle.</p><Link className="btn" to="/admissions">Start admission enquiry</Link></div>

    </PageLayout>
  );
}
