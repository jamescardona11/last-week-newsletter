import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { siteMetadata } from './src/site-metadata';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: siteMetadata.siteUrl,
  output: 'server',
  integrations: [sitemap(), tailwind({
    applyBaseStyles: false
  }), react({
    include: ['**/react/*']
  })],
  adapter: vercel()
});