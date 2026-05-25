// Single source of truth for business identity (NAP), used in the UI,
// the footer, and all structured data. Edit here, it updates everywhere.

export const site = {
  name: 'Fog, Brand & Design',
  legalName: 'Fog Brand & Design Eskilstuna AB',
  orgnr: '559487-0247',
  url: 'https://fogobrandtatningar.se',
  domain: 'fogobrandtatningar.se',
  phone: '070-848 30 71',
  phoneIntl: '+46708483071',
  email: 'niklas@fogobrandtatningar.se',
  street: 'Enbärsvägen 3',
  postal: '635 06',
  city: 'Eskilstuna',
  region: 'Södermanland',
  country: 'SE',
  geo: { lat: 59.371, lng: 16.509 },
  // Primary, human-facing service-area phrase
  areaPhrase: 'Eskilstuna och Mälardalen',
  language: 'sv-SE',
} as const;

export type Site = typeof site;
