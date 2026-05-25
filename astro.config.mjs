// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Canonical production origin. Change here if the domain ever changes.
const SITE = 'https://fogobrandtatningar.se';

export default defineConfig({
  site: SITE,
  // Pretty, consistent URLs: /brandtatning-eskilstuna/
  trailingSlash: 'always',

  // Static by default (Astro 5). The only on-demand route is /api/offert,
  // which opts in with `export const prerender = false` and is compiled into
  // a single Vercel Serverless Function by the adapter below.
  output: 'static',
  adapter: vercel(),

  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      // The form endpoint should never appear in the sitemap.
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  build: {
    // The whole stylesheet is small; inlining removes a render-blocking
    // request and gives the fastest possible first paint for a one-pager.
    inlineStylesheets: 'always',
  },

  compressHTML: true,
});
