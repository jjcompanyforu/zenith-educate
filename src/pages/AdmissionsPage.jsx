import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function AdmissionsPage() {
  return (
    <PageLayout
      title={"Admissions"}
      metaTitle={"Admissions | Zenith Educate"}
      intro={"Explore the Zenith Educate admission process, counselling, batch timings, fee plans, scholarship information and online registration."}
      path="/admissions"
    >
      <div className="section">
        <h2>How to Enroll</h2>
        <p>At Zenith Educate, the published enrollment process is designed to be simple, supportive and student-first.</p>
        <div className="grid">
          <article className="card">
            <h3>01 · Counseling Session</h3>
            <p>Get a free one-on-one counseling session to understand your interests, course options and career roadmap.</p>
          </article>
          <article className="card">
            <h3>02 · Submit Application</h3>
            <p>Fill in the enrollment form with required documents such as ID proof and qualification certificates.</p>
          </article>
          <article className="card">
            <h3>03 · Course Confirmation</h3>
            <p>After document verification, select your course batch and make the initial payment.</p>
          </article>
          <article className="card">
            <h3>04 · Begin Your Classes</h3>
            <p>Join offline or online classes and begin your professional training.</p>
          </article>
        </div>
      </div>
      <div className="section">
        <h2>Admission Information</h2>
        <div className="grid">
          <article className="card">
            <h3>Batch Timings</h3>
            <p>Morning, Evening & Weekend batches are listed on the original admission page. Confirm current schedules.</p>
          </article>
          <article className="card">
            <h3>Fee Structure</h3>
            <p>Affordable plans with EMI and installment options are described. Request the current fee schedule directly from the institute.</p>
          </article>
          <article className="card">
            <h3>Scholarship / Offers</h3>
            <p>The original page mentions merit-based scholarship tests and up to 30% offers. Confirm current eligibility and active offers before applying.</p>
          </article>
        </div>
      </div>
      <div className="note">The original site lists an Ernakulam branch but says the full address will be shared soon. The verified head-office address is PMG Junction, Thiruvananthapuram.</div><Link className="btn" to="/contact">Talk to an admission counsellor</Link>

    </PageLayout>
  );
}
