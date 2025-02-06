import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from "@astrojs/mdx";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import moonlightTheme from './public/theme/moonlight-ii.json';
import rehypeCallouts from 'rehype-callouts';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/exclude/'),
      changefreq: 'weekly',
      priority: 0.7
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  site: 'https://kasa-blog.vercel.app',
  base: '/',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: moonlightTheme,
          transformers: [
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 2_500,
            }),
          ],
        },
      ],
      rehypeCallouts,
    ],
  },
});