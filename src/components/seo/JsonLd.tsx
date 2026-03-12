 export default function JsonLd() {
  const pharmacySchema = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'Farmacia Mozart',
    alternateName: 'Farmacia Mozart Pioltello',
    url: 'https://www.farmaciamozart.com',
    logo: 'https://www.farmaciamozart.com/img/logo.png',
    image: 'https://www.farmaciamozart.com/img/logo.png',
    telephone: '+390292140862',
    email: 'farmaciamozart@gmail.com',
    description:
      'Farmacia Mozart a Pioltello: farmaci con e senza ricetta, cosmetica naturale e biologica, prodotti veterinari, integratori e consulenza personalizzata.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Wolfgang Amadeus Mozart, 41',
      addressLocality: 'Pioltello',
      addressRegion: 'MI',
      postalCode: '20096',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4867,
      longitude: 9.3267,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.3',
      bestRating: '5',
      ratingCount: '150',
      reviewCount: '150',
    },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    sameAs: [],
    hasMap: 'https://www.google.com/maps/search/Farmacia+Mozart,+Via+Wolfgang+Amadeus+Mozart+41,+20096+Pioltello+MI',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.farmaciamozart.com/#business',
    name: 'Farmacia Mozart',
    url: 'https://www.farmaciamozart.com',
    telephone: '+390292140862',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Wolfgang Amadeus Mozart, 41',
      addressLocality: 'Pioltello',
      addressRegion: 'MI',
      postalCode: '20096',
      addressCountry: 'IT',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Farmacia Mozart',
    url: 'https://www.farmaciamozart.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.farmaciamozart.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
