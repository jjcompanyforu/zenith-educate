import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import CourseCatalog from '../components/courses/CourseCatalog.jsx';
import { whatsappLink } from '../data/site.js';

export default function ProgrammesPage() {
  return (
    <PageLayout
      title="Courses"
      metaTitle="Programmes & Courses | Zenith Educate"
      intro="Explore Accounting and IT, Government Exam Coaching, Technology, CUET and Logistics & Supply Chain programmes at Zenith Educate."
      path="/programmes"
    >
      <CourseCatalog />
      <div className="section" style={{ borderBottom: 0 }}>
        <h3>Why choose logistics courses?</h3>
        <p>
          An industry-focused curriculum, internship support through live projects and recognised certifications
          prepare you for jobs in logistics, shipping and supply chain.
        </p>
        <p>
          <Link className="btn" to="/admissions#apply">
            Book free counselling
          </Link>
          <a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </p>
      </div>
    </PageLayout>
  );
}
