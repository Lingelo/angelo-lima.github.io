import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts. French articles live in src/content/posts/fr, English in .../en.
// Each post carries the same metadata the Jekyll front matter had, plus an explicit
// `slug` (the URL segment, may differ from the filename) and `aliases` (legacy URLs).
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    lang: z.enum(['fr', 'en']),
    // Pairs the FR and EN version of the same article (was `ref:` in Jekyll).
    translationKey: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Angelo Lima'),
    cover: z.string().optional(),
    thumbnail: z.string().optional(),
    shareImg: z.string().optional(),
    // URL segment after the language prefix, e.g. "conventional-commits"
    // → /fr/conventional-commits/ or /en/<slug>/.
    slug: z.string(),
    // Old Jekyll URLs that must 301-style redirect here.
    aliases: z.array(z.string()).default([]),
    mathjax: z.boolean().optional(),
  }),
});

export const collections = { posts };
