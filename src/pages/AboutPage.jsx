import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function AboutPage() {
  return (
    <PageLayout
      title={"About Zenith Educate"}
      metaTitle={"About Zenith Educate | Zenith Educate"}
      intro={"A skill-focused institute in Trivandrum offering training in Accounting & IT, professional courses and competitive exam coaching."}
      path="/about"
    >
      <div className="section">
        <h2>About Zenith Educate</h2>
        <p>A skill-focused institute in Trivandrum offering training in Accounting & IT with global certifications. We help students build careers through expert-led coaching in SAP, Tally, Python, CUET, and more. Our practical approach, personalized mentoring, and bilingual classes prepare learners for real-world success.</p>
        <div className="grid">
          <article className="card">
            <h3>Mission & Vision</h3>
            <p>Career-ready skills through quality & industry-aligned training.</p>
          </article>
          <article className="card">
            <h3>Infrastructure</h3>
            <p>Smart classrooms & bilingual sessions.</p>
          </article>
          <article className="card">
            <h3>Faculty</h3>
            <p>Certified experts with government exam coaching experience.</p>
          </article>
          <article className="card">
            <h3>Why Us?</h3>
            <p>Personalized mentoring & practical approach.</p>
          </article>
        </div>
      </div>
      <div className="section">
        <h2>Best Teachers, Better Futures</h2>
        <div className="grid">
          <article className="card">
            <h3>Subject Experts</h3>
            <p>Certified professionals specializing in Banking, SSC, CUET, SAP, Tally, Accounting, and Logistics.</p>
          </article>
          <article className="card">
            <h3>Result-Oriented Approach</h3>
            <p>Focused strategies, test-based learning, and feedback to prepare students for exams and careers.</p>
          </article>
          <article className="card">
            <h3>Interactive & Practical Teaching</h3>
            <p>Live examples, hands-on training, and doubt-clearing sessions to build understanding.</p>
          </article>
          <article className="card">
            <h3>Mentorship Beyond the Classroom</h3>
            <p>Teachers guide students on academics, careers, and personal development with 1-on-1 mentorship.</p>
          </article>
          <article className="card">
            <h3>Consistent Track Record</h3>
            <p>Our students have secured top ranks in government exams and built careers in Finance and Logistics.</p>
          </article>
        </div>
      </div>
      <div className="section">
        <h2>25 Years of Experience</h2>
        <p>For over 25 years, Zenith Educate has combined traditional teaching experience with modern learning methods.</p>
        <h3>Library & Book Store</h3>
        <p>Enrolled students get free access to exam guides, reference books, previous years’ papers and study materials. See our <Link to="/resources">free study resources</Link>.</p>
        <h3>Scholarship Facility</h3>
        <p>Merit-based, need-based, special and early-bird scholarships help deserving students join. <Link to="/scholarships">See scholarships</Link>.</p>
      </div>

    </PageLayout>
  );
}
