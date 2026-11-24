import useDocumentMeta from '../hooks/useDocumentMeta.js';
import Hero from '../sections/Hero.jsx';
import ResultsShowcase from '../sections/ResultsShowcase.jsx';
import { ForParents, PathFinder } from '../sections/HomeAudience.jsx';
import VideoReel from '../sections/VideoReel.jsx';
import { AboutIntro, Classrooms, Faq, ProgrammesSection, WhyZenith } from '../sections/HomeInfo.jsx';
import { ContactSection } from '../sections/HomeForms.jsx';
import ResourcesSection from '../sections/ResourcesSection.jsx';
import Leadership from '../sections/Leadership.jsx';

export default function HomePage() {
  useDocumentMeta(
    'Zenith Educate | Coaching & Professional Courses in Trivandrum',
    'Explore Bank, SSC, Railway and CUET coaching plus SAP FICO, Tally Prime, Advanced Excel, Data Science and Cyber Security courses at Zenith Educate, PMG Junction, Thiruvananthapuram.',
    '/',
  );

  return (
    <main>
      <Hero />
      <Leadership />
      <VideoReel />
      <PathFinder />
      <ResultsShowcase />
      <ProgrammesSection />
      <ForParents />
      <WhyZenith />
      <Classrooms />
      <AboutIntro />
      <ResourcesSection />
      <Faq />
      <ContactSection />
    </main>
  );
}
