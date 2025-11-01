import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from '@astrojs/vercel';
import clerk from "@clerk/astro";


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), react(), clerk()],
  output: "static",
  // adapter: vercel({
  //   webAnalytics: { enabled: true },
  //   maxDuration: 8,
  // })
});