import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from "astro-pagefind";
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';
import vercel from "@astrojs/vercel/serverless";

import { siteMetadata } from './src/site-metadata';

// https://astro.build/config
export default defineConfig({
  site: siteMetadata.siteUrl,
  output: 'hybrid',
  integrations: [
    sitemap(),
    react({
      include: ['**/react/*']
    }),
    tailwind({
      applyBaseStyles: false
    }),
    pagefind()
  ],
  adapter: vercel()
});