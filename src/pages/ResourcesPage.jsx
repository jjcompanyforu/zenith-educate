import PageLayout from '../components/PageLayout.jsx';
import { ShortsGrid } from '../sections/ResourcesSection.jsx';

export default function ResourcesPage() {
  return (
    <PageLayout
      title={"Student Resources"}
      metaTitle={"Student Resources | Zenith Educate"}
      intro={"Library, book store, study materials, exam guides and learning resources at Zenith Educate."}
      path="/resources"
    >
      <div className="section">
        <h2>Library – Your Silent Partner in Success</h2>
        <p>The original Zenith website describes an in-house library where enrolled students can access learning and reference materials.</p>
        <div className="grid">
          <article className="card">
            <h3>Library Collection</h3>
            <ul className="list">
              <li>Competitive exam guides for Banking, SSC, CUET and more</li>
              <li>Reference books for SAP, Tally, Accounting and Logistics</li>
              <li>Previous years’ question papers and mock test series</li>
              <li>Daily newspapers and current affairs magazines</li>
              <li>E-learning materials and practice sets</li>
            </ul>
          </article>
          <article className="card">
            <h3>Student Access</h3>
            <ul className="list">
              <li>Free access for enrolled students</li>
              <li>Flexible reading hours</li>
              <li>Regular updates to the collection</li>
              <li>Group study corner and self-study cubicles</li>
            </ul>
          </article>
          <article className="card">
            <h3>On-Campus Book Store</h3>
            <ul className="list">
              <li>Exam preparation books and latest editions</li>
              <li>SAP, Tally, Accounting and Logistics manuals</li>
              <li>Notebooks, stationery and study kits</li>
              <li>Discounted bundles for enrolled students</li>
              <li>Expert-recommended study material</li>
              <li>Career guidance and skill-building titles</li>
            </ul>
          </article>
        </div>
      </div>
      <div className="section">
        <h2>YouTube Class Links</h2>
        <p>Visit the official <a href="https://www.youtube.com/@ZenithEducateTrivandrum" target="_blank" rel="noopener noreferrer">Zenith Educate YouTube channel</a> for class content and updates.</p>
        <ShortsGrid />
      </div>

    </PageLayout>
  );
}
