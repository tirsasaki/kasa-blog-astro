import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional().default(['Uncategorized']),
    tags: z.array(z.string()).optional().default([])
  })
});

export const collections = {
  'blog': blogCollection
};