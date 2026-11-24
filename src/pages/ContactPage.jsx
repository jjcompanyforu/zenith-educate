import PageLayout from '../components/PageLayout.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { SITE, whatsappLink } from '../data/site.js';

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  'Zenith Educate, Sai Krishna Building, PMG Junction, Thiruvananthapuram, Kerala 695004',
)}&output=embed`;

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact us"
      metaTitle="Contact Zenith Educate | Zenith Educate"
      intro="Call, WhatsApp or visit us. Students and parents can talk to a counsellor for free about courses, fees and scholarships."
      path="/contact"
    >
      <div className="ux-contact-cards">
        <a className="ux-contact-card" href={SITE.phoneHref}>
          <small>Call us</small>
          <b>{SITE.phoneDisplay}</b>
          <span>Talk to a counsellor →</span>
        </a>
        <a
          className="ux-contact-card is-wa"
          href={whatsappLink(`Hello ${SITE.name}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <small>WhatsApp</small>
          <b>{SITE.phoneDisplay}</b>
          <span>Chat now →</span>
        </a>
        <a className="ux-contact-card" href={`mailto:${SITE.email}`}>
          <small>Email</small>
          <b>{SITE.email}</b>
          <span>Write to us →</span>
        </a>
      </div>

      <section className="section ux-split">
        <div>
          <h2>Visit the centre</h2>
          <p>
            <b>Zenith Educate</b>
            <br />
            {SITE.address}
          </p>
          <p className="muted">
            Parents are welcome to visit with their child, see the classrooms and meet the faculty before joining.
          </p>
          <div className="ux-map">
            <iframe
              title="Map showing Zenith Educate at PMG Junction, Thiruvananthapuram"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="btn" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions ↗
          </a>
        </div>
        <EnquiryForm id="enquiry" />
      </section>
    </PageLayout>
  );
}
