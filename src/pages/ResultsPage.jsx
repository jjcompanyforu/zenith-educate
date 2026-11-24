import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function ResultsPage() {
  return (
    <PageLayout
      title={"Student Results"}
      metaTitle={"Student Results | Zenith Educate"}
      intro={"View the achievements and student success information published by Zenith Educate."}
      path="/results"
    >
      <div className="note"><b>Verification note:</b> The following figures and testimonials are reproduced from the original Zenith Educate results page. They are published claims, not independently audited by this new website. Please confirm that they are current and supported by scorecards and student consent before using them in advertising.</div>
      <div className="grid">
        <article className="card">
          <div className="stats">1,200</div><b>Students Cracked Exams</b></article>
        <article className="card">
          <div className="stats">870</div><b>Verified Scorecards</b></article>
        <article className="card">
          <div className="stats">160</div><b>Top Rank Holders</b></article>
        <article className="card">
          <div className="stats">95%</div><b>Success Rate</b></article>
      </div>
      <div className="section">
        <h2>Student Stories (as published)</h2>
        <div className="grid">
          <article className="card">
            <p>“Thanks to Zenith Educate, I cleared IBPS PO with top marks. Their mock tests and mentorship helped me boost my confidence.”</p>
            <h3>Priya Menon</h3><span className="muted">IBPS PO Topper</span></article>
          <article className="card">
            <p>“I cracked SSC CGL Tier 1 & 2 with guidance from Zenith’s faculty. The course material was spot-on and very detailed.”</p>
            <h3>Ramesh Kumar</h3><span className="muted">SSC CGL Achiever</span></article>
          <article className="card">
            <p>“CUET ke liye yahan ka crash course kaafi helpful tha. I loved the bilingual content and expert tips during live classes.”</p>
            <h3>Sneha K.</h3><span className="muted">CUET Aspirant</span></article>
        </div>
      </div>
      <div className="section">
        <h2>Best Teachers, Better Futures</h2>
        <p>Zenith describes its approach as subject expertise, result-oriented preparation, interactive and practical teaching, mentorship beyond the classroom and a consistent track record.</p>
      </div><Link className="btn" to="/contact">Ask about courses</Link>

    </PageLayout>
  );
}
