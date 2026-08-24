import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://occasions.griffintechnologypartners.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
