// The four services. Each drives: the home grid, a service hub page
// (/tjanster/<slug>/), and a money page per town (/<slug>-<ort>/).
//
// `synonyms` are extra keywords folded into meta/keywords and body copy so a
// dedicated near-duplicate page isn't needed (e.g. "mjukfogning" lives inside
// "fogning"). `intro` is generic-but-meaningful; localise per page over time.

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string; // url segment, e.g. "brandtatning"
  name: string; // display, e.g. "Brandtätning"
  /** very short line for the home card */
  short: string;
  /** 2–3 sentence generic intro reused on hub + combo pages */
  intro: string;
  /** what the work includes */
  scope: string[];
  /** extra search terms this page also targets */
  synonyms: string[];
  faqs: Faq[];
}

export const services: Service[] = [
  {
    slug: 'brandtatning',
    name: 'Brandtätning',
    short:
      'Passivt brandskydd och tätning av genomföringar så att brand och rök hålls tillbaka — enligt gällande krav.',
    intro:
      'Brandtätning säkrar att en brand stannar i sin brandcell i stället för att sprida sig. Vi tätar genomföringar för rör, kablar och ventilation och utför brandfog med rätt klassade material — i nya som befintliga byggnader och dokumenterat enligt gällande säkerhetskrav.',
    scope: [
      'Tätning av genomföringar för rör, kabel och ventilation',
      'Brandfog och brandklassade anslutningar',
      'Passivt brandskydd i nya och befintliga byggnader',
      'Dokumentation som underlag för besiktning',
    ],
    synonyms: ['passivt brandskydd', 'brandfog', 'tätning av genomföringar'],
    faqs: [
      {
        q: 'Vad är brandtätning?',
        a: 'Brandtätning innebär att genomföringar och fogar tätas med brandklassade material så att eld och rök hålls kvar i sin brandcell under en bestämd tid. Det är en del av byggnadens passiva brandskydd.',
      },
      {
        q: 'Behöver brandtätning dokumenteras?',
        a: 'Ja. Utförd brandtätning bör dokumenteras så att den kan följas upp vid besiktning och underhåll. Vi lämnar underlag på det arbete vi utför.',
      },
      {
        q: 'Kan ni brandtäta i befintliga byggnader?',
        a: 'Ja, vi arbetar både i nyproduktion och i befintliga byggnader, och anpassar material och metod efter förutsättningarna på plats.',
      },
    ],
  },
  {
    slug: 'fogning',
    name: 'Fogning',
    short:
      'Elastiska fogar för fasad, fönster, golv och våtrum som tål rörelse, väder och tid.',
    intro:
      'Fogning håller byggnaden tät mot fukt, drag och rörelse. Vi utför mjukfog och fasadfog på nya och befintliga byggnader med rätt fogmassa för varje underlag och miljö — för både täthet och ett rent, hållbart resultat.',
    scope: [
      'Fasadfog och dilatationsfog',
      'Fönster- och dörrfog',
      'Våtrumsfog',
      'Golv- och anslutningsfog',
    ],
    synonyms: ['mjukfogning', 'fasadfog', 'fönsterfog', 'våtrumsfog'],
    faqs: [
      {
        q: 'Vad är skillnaden mellan fogning och mjukfogning?',
        a: 'Mjukfogning är fogning med elastisk fogmassa som tål rörelse — det är den vanligaste typen av fogning på fasad, kring fönster och i våtrum. Vi utför alla typer av mjukfog.',
      },
      {
        q: 'Hur länge håller en fog?',
        a: 'Med rätt fogmassa och korrekt utförande håller en fog i många år. Livslängden beror på underlag, rörelse och miljö, vilket vi tar hänsyn till vid materialval.',
      },
      {
        q: 'Fogar ni även i våtrum?',
        a: 'Ja, vi utför våtrumsfog med material avsedda för fuktiga miljöer enligt gällande riktlinjer.',
      },
    ],
  },
  {
    slug: 'ljudtatning',
    name: 'Ljudtätning',
    short:
      'Akustisk tätning av glipor och anslutningar som dämpar ljud mellan rum och lokaler.',
    intro:
      'I miljöer med höga ljudkrav avgör tätningen hur mycket ljud som läcker mellan utrymmen. Vi tätar glipor, sprickor och anslutningar i byggnadsdelar med akustiska fogmassor som dämpar ljud effektivt — vanligt i kontor, skolor och andra lokaler.',
    scope: [
      'Akustisk fog och tätning',
      'Tätning av anslutningar och glipor',
      'Ljuddämpning mellan rum och lokaler',
      'Kontor, skolor och offentliga miljöer',
    ],
    synonyms: ['akustisk fog', 'ljudreduktion', 'ljuddämpning'],
    faqs: [
      {
        q: 'Hjälper ljudtätning mot ljud mellan rum?',
        a: 'Ja. Mycket ljud läcker genom otätheter i anslutningar och genomföringar. Genom att täta dessa med akustiska fogmassor minskar ljudöverföringen mellan utrymmen.',
      },
      {
        q: 'Var används ljudtätning?',
        a: 'Framför allt i kontor, skolor och lokaler med höga ljudkrav, men metoden fungerar i de flesta byggnader där man vill minska ljudläckage.',
      },
    ],
  },
  {
    slug: 'radontatning',
    name: 'Radontätning',
    short:
      'Lufttät tätning som hindrar markradon från att tränga in och hjälper dig under gränsvärdet.',
    intro:
      'Radontätning gör byggnaden lufttät mot marken så att markradon inte tränger in. Vi tätar genomföringar och anslutningar mot grund och hjälper fastighetsägare att hålla inomhusluften under gränsvärdet på 200 Bq/m³.',
    scope: [
      'Lufttätning mot mark och grund',
      'Tätning av genomföringar i grundkonstruktion',
      'Åtgärder mot inträngande markradon',
      'Uppföljning mot gränsvärdet 200 Bq/m³',
    ],
    synonyms: ['markradon', 'lufttätning', 'radonåtgärd'],
    faqs: [
      {
        q: 'Vad är gränsvärdet för radon?',
        a: 'Referensvärdet för radon i inomhusluft är 200 Bq/m³. Radontätning är en av åtgärderna för att hålla halten under det värdet.',
      },
      {
        q: 'Hur hindrar tätning radon?',
        a: 'Markradon tränger in genom otätheter mot marken. Genom att lufttäta genomföringar och anslutningar i grunden minskar inläckaget av radon.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
