// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Vercel serves the project from `/`. GitHub Pages overrides both values in
  // its workflow because it publishes the site below `/kalendula/`.
  site: process.env.SITE_URL ?? 'https://kalendulatelier.es',
  base: process.env.BASE_PATH ?? '/',
  integrations: [sitemap()],
});
