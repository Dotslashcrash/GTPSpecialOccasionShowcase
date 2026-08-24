import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://occasions.griffintechnologypartners.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin-preview') && !page.endsWith('/404/'),
    }),
  ],
  vite: {
    build: { cssMinify: 'lightningcss' },
  },
});
