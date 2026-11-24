import { Outlet } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import SiteHeader from './SiteHeader.jsx';
import Footer from './Footer.jsx';
import ScrollManager from './ScrollManager.jsx';
import { SITE, whatsappLink } from '../data/site.js';

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <TopBar />
      <SiteHeader />
      <Outlet />
      <Footer />
      <a className="wa" href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noreferrer">
        WhatsApp us
      </a>
    </>
  );
}
