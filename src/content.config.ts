import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const beritaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Redaksi Cangkrukan'),
    image: z.string().optional(),
    category: z.enum(['Opini', 'Esai', 'Berita Kampus', 'Teknologi']),
  }),
});

export const collections = {
  berita: beritaCollection,
};
