// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://caporrfer.github.io',
  // Keep the trailing slash because image and legal-page URLs append to BASE_URL.
  base: '/kalendula/',
  integrations: [sitemap()],
});
