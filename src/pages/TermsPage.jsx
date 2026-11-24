import PageLayout from '../components/PageLayout.jsx';

export default function TermsPage() {
  return (
    <PageLayout
      title={"Terms & Conditions"}
      metaTitle={"Terms & Conditions | Zenith Educate"}
      intro={"Terms and conditions published by Zenith Educate for use of its services and course registrations."}
      path="/terms"
    >
      <div className="section">
        <h2>Our Terms & Conditions</h2>
        <p>Please read these terms carefully before using services or registering for courses. The following is a transcription of the original website's published summary.</p>
        <ol className="list">
          <li><b>Admission:</b> Admission is subject to availability and eligibility criteria. Fees once paid are non-refundable.</li>
          <li><b>Fee Structure:</b> All course fees must be paid on time. EMI or installment facilities are available only on request.</li>
          <li><b>Scholarships:</b> Merit-based scholarships are available based on qualifying tests and performance.</li>
          <li><b>Conduct:</b> Students are expected to maintain discipline and decorum during classes and sessions.</li>
          <li><b>Copyright:</b> All study material is proprietary and must not be shared or reproduced.</li>
          <li><b>Policy Updates:</b> Zenith Educate reserves the right to modify policies without prior notice.</li>
          <li><b>Contact:</b> For concerns, contact info@zenitheducate.in or call +91 89211 46637.</li>
        </ol>
        <div className="note">This page reproduces the original site's short terms summary. It is not a substitute for a complete, legally reviewed policy.</div>
      </div>

    </PageLayout>
  );
}
