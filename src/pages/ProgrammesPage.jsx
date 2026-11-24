import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import CourseCatalog from '../components/courses/CourseCatalog.jsx';
import { whatsappLink } from '../data/site.js';

export default function ProgrammesPage() {
  return (
    <PageLayout
      title="Programmes & Courses"
      metaTitle="Programmes & Courses | Zenith Educate"
      intro="Explore Accounting and IT, Government Exam Coaching, Technology, CUET and Logistics & Supply Chain programmes at Zenith Educate."
      path="/programmes"
    >
      <div className="note">
        Course names and details below are transferred from the published Zenith Educate website. Confirm current
        batch availability, fees, duration and certification with the institute before enrolment.
      </div>
      <CourseCatalog />
      <div className="section" style={{ borderBottom: 0 }}>
        <h3>Why choose logistics courses?</h3>
        <p>
          Industry-focused curriculum, internship support through live projects, and recognized certifications are
          described on the original site.
        </p>
        <p>
          <Link className="btn" to="/admissions">
            Enquire about admission
          </Link>
          <a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </p>
      </div>
    </PageLayout>
  );
}
