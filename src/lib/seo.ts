import { site } from '../data/site';
import type { Service } from '../data/services';
import type { Town } from '../data/locations';

/* ----------------------------- URL helpers ----------------------------- */

export const abs = (path: string) =>
  new URL(path, site.url).href.replace(/([^:]\/)\/+/g, '$1');

export const comboPath = (service: Service, town: Town) =>
  `/${service.slug}-${town.slug}/`;
export const servicePath = (service: Service) => `/tjanster/${service.slug}/`;
export const townPath = (town: Town) => `/orter/${town.slug}/`;

/* --------------------------- Copy variation ----------------------------
 * Deterministic per-page variation so combo pages don't read identically.
 * Not a substitute for real local copy, but removes obvious boilerplate. */

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const pick = <T>(arr: T[], seed: string) => arr[hash(seed) % arr.length];

export function comboTitle(service: Service, town: Town) {
  return `${service.name} i ${town.name} | ${site.name}`;
}

export function comboDescription(service: Service, town: Town) {
  const openers = [
    `${service.name} i ${town.name} och omnejd.`,
    `Behöver du ${service.name.toLowerCase()} i ${town.name}?`,
    `${service.name} för byggnader i ${town.name}.`,
  ];
  return `${pick(openers, service.slug + town.slug)} ${site.name} utför arbeten i ${town.name} (${town.region}) — stora som små projekt, enligt gällande normer. Begär offert.`;
}

export function comboIntro(service: Service, town: Town): string[] {
  const lead = [
    `Vi utför ${service.name.toLowerCase()} i ${town.name} och övriga ${town.region}.`,
    `${site.name} hjälper dig med ${service.name.toLowerCase()} i ${town.name}.`,
    `Letar du efter ${service.name.toLowerCase()} i ${town.name}? Vi hjälper dig.`,
  ];
  const close = [
    `Vi arbetar i hela ${town.region} med utgångspunkt i ${site.city} och tar oss an både stora och små projekt.`,
    `Från ${site.city} når vi ${town.name} och resten av ${town.region} — inget projekt är för stort eller för litet.`,
    `Vi utgår från ${site.city} och åtar oss uppdrag i ${town.name} och kringliggande orter.`,
  ];
  return [
    `${pick(lead, town.slug + service.slug)} ${service.intro}`,
    pick(close, service.slug + town.slug),
  ];
}

/* ------------------------------ JSON-LD -------------------------------- */

export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': abs('/#business'),
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: abs('/img/logo.svg'),
    image: abs('/og-image.jpg'),
    telephone: site.phoneIntl,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.postal,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    knowsLanguage: 'sv',
    identifier: { '@type': 'PropertyValue', name: 'Org.nr', value: site.orgnr },
  };
}

export function serviceLd(service: Service, areaName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} – ${areaName}`,
    serviceType: service.name,
    provider: { '@type': 'LocalBusiness', '@id': abs('/#business'), name: site.legalName },
    areaServed: { '@type': 'Place', name: areaName },
    description: service.intro,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
