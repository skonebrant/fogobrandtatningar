// Towns Fog, Brand & Design serves. Adding a town = one entry here; it
// automatically gets a locality hub (/orter/<slug>/) and a money page per
// service (/<service>-<slug>/), plus sitemap entries and internal links.
//
// `region` is the county (län). `slug` is ascii (å→a, ä→a, ö→o).
// Eskilstuna is the base and is included as a location too.

export interface Town {
  slug: string;
  name: string;
  region: string;
}

export const locations: Town[] = [
  // Södermanland (hemmaplan)
  { slug: 'eskilstuna', name: 'Eskilstuna', region: 'Södermanland' },
  { slug: 'strangnas', name: 'Strängnäs', region: 'Södermanland' },
  { slug: 'mariefred', name: 'Mariefred', region: 'Södermanland' },
  { slug: 'torshalla', name: 'Torshälla', region: 'Södermanland' },
  { slug: 'katrineholm', name: 'Katrineholm', region: 'Södermanland' },
  { slug: 'flen', name: 'Flen', region: 'Södermanland' },
  { slug: 'vingaker', name: 'Vingåker', region: 'Södermanland' },
  { slug: 'nykoping', name: 'Nyköping', region: 'Södermanland' },
  { slug: 'oxelosund', name: 'Oxelösund', region: 'Södermanland' },
  { slug: 'gnesta', name: 'Gnesta', region: 'Södermanland' },

  // Västmanland
  { slug: 'vasteras', name: 'Västerås', region: 'Västmanland' },
  { slug: 'koping', name: 'Köping', region: 'Västmanland' },
  { slug: 'arboga', name: 'Arboga', region: 'Västmanland' },
  { slug: 'hallstahammar', name: 'Hallstahammar', region: 'Västmanland' },
  { slug: 'surahammar', name: 'Surahammar', region: 'Västmanland' },
  { slug: 'sala', name: 'Sala', region: 'Västmanland' },
  { slug: 'fagersta', name: 'Fagersta', region: 'Västmanland' },

  // Örebro län
  { slug: 'orebro', name: 'Örebro', region: 'Örebro län' },
  { slug: 'lindesberg', name: 'Lindesberg', region: 'Örebro län' },
  { slug: 'hallsberg', name: 'Hallsberg', region: 'Örebro län' },
  { slug: 'kumla', name: 'Kumla', region: 'Örebro län' },

  // Östergötland
  { slug: 'norrkoping', name: 'Norrköping', region: 'Östergötland' },
  { slug: 'finspang', name: 'Finspång', region: 'Östergötland' },

  // Stockholms län
  { slug: 'stockholm', name: 'Stockholm', region: 'Stockholms län' },
  { slug: 'sodertalje', name: 'Södertälje', region: 'Stockholms län' },
  { slug: 'nynashamn', name: 'Nynäshamn', region: 'Stockholms län' },
  { slug: 'tumba', name: 'Tumba', region: 'Stockholms län' },
  { slug: 'tullinge', name: 'Tullinge', region: 'Stockholms län' },
  { slug: 'botkyrka', name: 'Botkyrka', region: 'Stockholms län' },
  { slug: 'solna', name: 'Solna', region: 'Stockholms län' },
  { slug: 'sundbyberg', name: 'Sundbyberg', region: 'Stockholms län' },
  { slug: 'taby', name: 'Täby', region: 'Stockholms län' },
  { slug: 'vallentuna', name: 'Vallentuna', region: 'Stockholms län' },
  { slug: 'lidingo', name: 'Lidingö', region: 'Stockholms län' },
  { slug: 'vaxholm', name: 'Vaxholm', region: 'Stockholms län' },

  // Uppsala län
  { slug: 'uppsala', name: 'Uppsala', region: 'Uppsala län' },
  { slug: 'enkoping', name: 'Enköping', region: 'Uppsala län' },

  // Dalarna
  { slug: 'avesta', name: 'Avesta', region: 'Dalarna' },
];

export const townBySlug = (slug: string) =>
  locations.find((t) => t.slug === slug);

/** Other towns in the same county, for internal linking (max `n`). */
export const nearbyTowns = (town: Town, n = 6): Town[] =>
  locations.filter((t) => t.region === town.region && t.slug !== town.slug).slice(0, n);

/** Distinct counties, in declaration order. */
export const regions = [...new Set(locations.map((t) => t.region))];
