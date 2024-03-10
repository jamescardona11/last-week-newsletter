import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { siteMetadata } from './src/site-metadata';

import react from '@astrojs/react';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: siteMetadata.siteUrl,
  output: 'hybrid',
  integrations: [sitemap(), react({
    include: ['**/react/*']
  }), tailwind({
    applyBaseStyles: false
  }),],
  adapter: vercel()
});