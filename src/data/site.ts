export const business = {
  name: 'Kaléndula Atelier',
  shortName: 'Kaléndula',
  phoneDisplay: '623 164 848',
  phoneE164: '+34623164848',
  instagram: 'https://www.instagram.com/kalendulatelier/',
  instagramHandle: '@kalendulatelier',
  addressLine: 'C. San Andrés',
  postalCity: '21120 Corrales, Huelva',
  maps: 'https://www.google.com/maps/search/?api=1&query=Kal%C3%A9ndula+Calle+San+Andr%C3%A9s+21120+Corrales+Huelva',
};

export const whatsappUrl = (message = 'Hola, he visitado la web de Kaléndula y me gustaría solicitar información.') =>
  `https://wa.me/${business.phoneE164.replace('+', '')}?text=${encodeURIComponent(message)}`;
