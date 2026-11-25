import useDocumentMeta from '../hooks/useDocumentMeta.js';
import Hero from '../sections/Hero.jsx';
import ResultsShowcase from '../sections/ResultsShowcase.jsx';
import { ForParents, PathFinder } from '../sections/HomeAudience.jsx';
import { Classrooms, Faq, ProgrammesSection, WhyZenith } from '../sections/HomeInfo.jsx';
import { ContactSection } from '../sections/HomeForms.jsx';

export default function HomePage() {
  useDocumentMeta(
    'Zenith Educate | Coaching & Professional Courses in Trivandrum',
    'Find the right Banking, SSC, Railway, CUET, Accounting, IT and technology programme at Zenith Educate, PMG Junction, Thiruvananthapuram. Explore courses, understand admissions and speak with a counsellor.',
    '/',
  );

  return (
    <main>
      <Hero />
      <PathFinder />
      <ProgrammesSection />
      <ResultsShowcase />
      <ForParents />
      <WhyZenith />
      <Classrooms />
      <Faq />
      <ContactSection />
    </main>
  );
}
