import PageLayout from '../components/PageLayout.jsx';

export default function ContactPage() {
  return (
    <PageLayout
      title={"Contact Zenith Educate"}
      metaTitle={"Contact Zenith Educate | Zenith Educate"}
      intro={"Contact Zenith Educate for admissions, course information and counselling in Thiruvananthapuram, Kerala."}
      path="/contact"
    >
      <div className="grid">
        <article className="card">
          <h3>Head Office</h3>
          <p>ZENITH EDUCATE<br />First Floor, Sai Krishna Building,<br />PMG Junction, Thiruvananthapuram, Kerala 695004</p><a href="https://www.google.com/maps/search/?api=1&query=First+Floor+Sai+Krishna+Building+PMG+Junction+Thiruvananthapuram+Kerala+695004">Get directions ↗</a></article>
        <article className="card">
          <h3>Phone / WhatsApp</h3>
          <p><a href="tel:+918921146637">+91 8921146637</a></p><a href="https://wa.me/918921146637">Chat on WhatsApp ↗</a></article>
        <article className="card">
          <h3>Email</h3>
          <p><a href="mailto:info@zenitheducate.in">info@zenitheducate.in</a></p>
        </article>
      </div>
      <div className="section">
        <h2>Stay Connected</h2>
        <p>Reach out for admissions, queries or course information. The original site provides a contact form for name, email and subject; this new page offers direct phone, WhatsApp and email contact.</p><a className="btn" href="mailto:info@zenitheducate.in?subject=Course%20Enquiry">Send an email enquiry</a></div>

    </PageLayout>
  );
}
