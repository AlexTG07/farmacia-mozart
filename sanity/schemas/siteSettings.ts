// ============================================
// Sanity Schema — Site Settings (Singleton)
// ============================================

const siteSettings = {
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Titolo Hero', type: 'string', initialValue: 'La tua salute, la nostra missione' },
    { name: 'heroSubtitle', title: 'Sottotitolo Hero', type: 'text', initialValue: 'Farmacia Mozart: aperta ogni giorno dell\'anno con servizi diagnostici avanzati, consulenza personalizzata e consegna a domicilio.' },
    { name: 'phone', title: 'Telefono', type: 'string', initialValue: '02 9214 0862' },
    { name: 'whatsapp', title: 'WhatsApp (con prefisso)', type: 'string', initialValue: '390292140862' },
    { name: 'email', title: 'Email', type: 'string', initialValue: 'farmaciamozart@gmail.com' },
    { name: 'address', title: 'Indirizzo', type: 'string', initialValue: 'Via Mozart 41, Pioltello (MI)' },
    {
      name: 'mapEmbedUrl',
      title: 'URL Embed Google Maps',
      type: 'url',
      initialValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.5!2d9.3285!3d45.4895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c7b5e2a7f4f1%3A0x1234567890abcdef!2sVia%20Wolfgang%20Amadeus%20Mozart%2C%2041%2C%20Pioltello%20MI!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit',
    },
    {
      name: 'openingHours',
      title: 'Orari di Apertura',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', title: 'Giorno', type: 'string' },
          { name: 'dayIndex', title: 'Indice giorno (0=Dom)', type: 'number' },
          { name: 'open', title: 'Apertura', type: 'string' },
          { name: 'close', title: 'Chiusura', type: 'string' },
        ],
      }],
    },
    {
      name: 'socialLinks',
      title: 'Link Social',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', title: 'Piattaforma', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'icon', title: 'Icona (classe FontAwesome)', type: 'string' },
        ],
      }],
    },
  ],
};

export default siteSettings;
