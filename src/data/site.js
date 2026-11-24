// Contact details and links shared across the site.
export const SITE = {
  name: 'Zenith Educate',
  phoneDisplay: '+91 89211 46637',
  phoneHref: 'tel:+918921146637',
  whatsappNumber: '918921146637',
  email: 'info@zenitheducate.in',
  address: 'First Floor, Sai Krishna Building, PMG Junction, Thiruvananthapuram, Kerala 695004',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=First+Floor+Sai+Krishna+Building+PMG+Junction+Thiruvananthapuram+Kerala+695004',
  facebook: 'https://www.facebook.com/thezenitheducate/',
  youtube: 'https://www.youtube.com/@ZenithEducateTrivandrum',
  instagram: 'https://www.instagram.com/zenith__educate/',
  originalSite: 'https://zenitheducate.in',
};

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const mailtoLink = (subject, body) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
