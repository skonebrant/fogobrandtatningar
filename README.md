# Fog, Brand & Design — webbplats

Snabb, statisk webbplats byggd med [Astro](https://astro.build) och driftsatt på
[Vercel](https://vercel.com). Innehåller en startsida, tjänstesidor, ortssidor
och lokala landningssidor (tjänst × ort) för lokal SEO, samt ett offertformulär
som skickar e-post via [Resend](https://resend.com).

---

## Snabbstart (lokalt)

Krav: **Node 20+**.

```bash
npm install
cp .env.example .env      # fyll i värdena (se nedan)
npm run dev               # http://localhost:4321
npm run build             # bygger till dist/  (+ en serverless-funktion)
npm run preview           # förhandsgranska bygget
```

---

## Miljövariabler

Sätts i `.env` lokalt och i **Vercel → Project → Settings → Environment Variables** i produktion.

| Variabel | Beskrivning |
|---|---|
| `RESEND_API_KEY` | API-nyckel från Resend (resend.com/api-keys). |
| `LEAD_TO_EMAIL` | Mottagare av offertförfrågningar (t.ex. `niklas@fogobrandtatningar.se`). |
| `LEAD_FROM_EMAIL` | Avsändaridentitet på en **verifierad** domän, t.ex. `Offertförfrågan <offert@fogobrandtatningar.se>`. |

### ⚠️ Resend: verifiera domänen (krävs för utgående e-post)

Innan formuläret kan skicka mejl måste domänen `fogobrandtatningar.se` vara
verifierad i Resend, annars avvisas utskicket.

1. Resend → **Domains → Add Domain** → `fogobrandtatningar.se`.
2. Lägg till de **DNS-poster** Resend visar hos din DNS-leverantör:
   - **SPF** (TXT) och **DKIM** (CNAME/TXT) — krävs.
   - **MX** för `send`-subdomänen (om Resend ber om det).
   - **DMARC** (TXT) rekommenderas: `v=DMARC1; p=none; rua=mailto:niklas@fogobrandtatningar.se`.
3. Vänta tills status blir **Verified**.
4. Sätt `LEAD_FROM_EMAIL` till en adress på den domänen (t.ex. `offert@fogobrandtatningar.se`).
   Du behöver inte skapa någon inkorg för avsändaradressen — Resend skickar bara från den.
   Svar går ändå till kunden eftersom mejlet sätter `Reply-To` till kundens adress.

Tills domänen är verifierad fungerar resten av sajten; bara mejlutskicket faller tillbaka på ett felmeddelande i formuläret.

---

## Driftsättning på Vercel

1. Pusha repot till GitHub.
2. Vercel → **Add New → Project** → importera repot. Astro + adaptern upptäcks automatiskt.
3. Lägg till miljövariablerna ovan.
4. Deploy. `main` = produktion, varje pull request får en egen förhandsvisnings-URL.

### Domän

- Vercel → **Settings → Domains** → lägg till `fogobrandtatningar.se` (och ev. `www`).
- Peka DNS enligt Vercels instruktioner (A/ALIAS eller deras nameservers). TLS sätts automatiskt.
- Välj en kanonisk variant (apex **eller** www) och låt den andra redirecta. `astro.config.mjs` använder apex (`https://fogobrandtatningar.se`).

### Efter driftsättning

- **Search Console** och **Bing Webmaster**: verifiera domänen och skicka in `https://fogobrandtatningar.se/sitemap-index.xml`.
- Testa strukturerad data i Googles **Rich Results Test**.
- **Speed Insights** (CWV) är inkopplat via `@vercel/speed-insights`. Web Analytics kan aktiveras i Vercel-dashboarden (cookielöst, ingen samtyckesbanner krävs i EU).

---

## Struktur

```
src/
  data/        site.ts (NAP), services.ts, locations.ts   ← redigera innehåll här
  lib/seo.ts   URL-, copy- och JSON-LD-hjälpare
  components/  Logo, Header, Footer, Hero, ServiceGrid, Process, Faq, Contact …
  layouts/Base.astro
  pages/
    index.astro
    tjanster/[service].astro     → /tjanster/<tjanst>/
    orter/[ort].astro            → /orter/<ort>/
    [combo].astro                → /<tjanst>-<ort>/   (lokala landningssidor)
    api/offert.ts                → serverless-funktion (Resend)
    tack.astro, 404.astro
public/  fonts/ (subsattade woff2), img/logo.svg, ikoner, og-image.jpg, robots.txt, manifest
astro.config.mjs   vercel.json
```

### Lägga till / ändra innehåll

- **Ny ort:** lägg till en rad i `src/data/locations.ts`. Den får automatiskt en
  ortssida och en landningssida per tjänst, plus sitemap-poster och interna länkar.
- **Ny/ändrad tjänst:** redigera `src/data/services.ts`.
- **Kontaktuppgifter / org.nr / adress:** `src/data/site.ts` (uppdaterar UI + strukturerad data överallt).

---

## Prestanda & teknik

- **Statisk HTML** på Vercels edge (Brotli). Enda dynamiska routen är `/api/offert`.
- **Självhostade, subsattade variabelfonter** (Schibsted Grotesk + Hanken Grotesk, ~65 kB totalt) — inga tredjepartsanrop, GDPR-vänligt. De två fonterna preloadas.
- **Inline-kritisk CSS**, noll ramverks-JS (bara en liten formulärskript).
- **Logotyp som inline-SVG** färgsatt via `currentColor` (en fil, skarp i alla storlekar).
- Säkerhetsheaders + CSP och långtidscache för statiska resurser i `vercel.json`.

### Tillgänglighet

Semantiska landmärken, `aria-labelledby` per sektion, skip-länk, `fieldset`/`legend`
i formuläret, robust `:focus-visible`, kontraststyrda färger, och progressiv
förbättring (formuläret fungerar utan JS).

---

## Att tänka på (SEO)

De lokala landningssidorna (tjänst × ort) är ett starkt lokalt SEO-grepp, men
Google nedvärderar **"doorway pages"** — många nästan identiska mallsidor. Kopian
varieras automatiskt per sida, men för bäst resultat:

- Prioritera och skriv **unik text** (2–3 meningar) för dina viktigaste orter/tjänster över tid.
- Lägg gärna in riktiga referensprojekt, bilder och recensioner per ort.

### Framtida förbättringar

- **Egna OG-bilder per sida** (t.ex. `astro-og-canvas`) för snyggare delning av varje ortssida.
- Bilder via `astro:assets` (AVIF/WebP) när riktiga projektbilder finns.
- Återinför "Om oss"-sektionen med riktiga förtroendesignaler (F-skatt, försäkring, certifieringar) — de hjälper konvertering.
# fogobrandtatningar
# fogobrandtatningar
