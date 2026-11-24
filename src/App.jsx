import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProgrammesPage from './pages/ProgrammesPage.jsx';
import AdmissionsPage from './pages/AdmissionsPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import ScholarshipsPage from './pages/ScholarshipsPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="programmes" element={<ProgrammesPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="scholarships" element={<ScholarshipsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
