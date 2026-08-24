import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zealous-flower-0d3d54610.7.azurestaticapps.net',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
