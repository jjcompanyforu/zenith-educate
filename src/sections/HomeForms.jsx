// Homepage contact section: counselling form (sent via WhatsApp) + contact details.
import EnquiryForm from '../components/EnquiryForm.jsx';
import { SITE, whatsappLink } from '../data/site.js';

export function ContactSection() {
  return (
    <section className="section wrap contact" id="contact">
      <div className="details">
        <div className="eyebrow">LET'S TALK ABOUT YOUR NEXT STEP</div>
        <h2>
          Not sure which course?
          <br />
          <em>We’ll help you choose.</em>
        </h2>
        <p>
          Students and parents can talk to a counsellor for free. We’ll understand your goals, suggest the right course
          and batch, and answer every question about fees and scholarships.
        </p>
        <ul className="contact-ways">
          <li>
            <b>Call us</b>
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </li>
          <li>
            <b>WhatsApp</b>
            <a href={whatsappLink(`Hello ${SITE.name}`)} target="_blank" rel="noopener noreferrer">
              Chat with a counsellor
            </a>
          </li>
          <li>
            <b>Email</b>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <b>Visit us</b>
            <span>{SITE.address}</span>
            <a className="directions" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions ↗
            </a>
          </li>
        </ul>
      </div>
      <EnquiryForm />
    </section>
  );
}
