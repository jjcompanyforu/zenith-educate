import PageLayout from '../components/PageLayout.jsx';

export default function TermsPage() {
  return (
    <PageLayout
      title={"Terms & Conditions"}
      metaTitle={"Terms & Conditions | Zenith Educate"}
      intro={"Terms and conditions for using Zenith Educate services and registering for courses."}
      path="/terms"
    >
      <div className="section">
        <h2>Our Terms & Conditions</h2>
        <p>Please read these terms carefully before using services or registering for courses.</p>
        <ol className="list">
          <li><b>Admission:</b> Admission is subject to availability and eligibility criteria. Fees once paid are non-refundable.</li>
          <li><b>Fee Structure:</b> All course fees must be paid on time. EMI or installment facilities are available only on request.</li>
          <li><b>Scholarships:</b> Merit-based scholarships are available based on qualifying tests and performance.</li>
          <li><b>Conduct:</b> Students are expected to maintain discipline and decorum during classes and sessions.</li>
          <li><b>Copyright:</b> All study material is proprietary and must not be shared or reproduced.</li>
          <li><b>Policy Updates:</b> Zenith Educate reserves the right to modify policies without prior notice.</li>
          <li><b>Contact:</b> For concerns, contact info@zenitheducate.in or call +91 89211 46637.</li>
        </ol>
      </div>

    </PageLayout>
  );
}
