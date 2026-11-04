import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const beritaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Redaksi Cangkrukan'),
    daerah: z.string().default('Nasional'),
    category: z.enum(['Sejarah', 'Budaya', 'Opini', 'Literasi', 'Liputan Nasional']),
    image: z.string().optional(),
    referensi: z.string().optional(),
  }),
});

export const collections = {
  berita: beritaCollection,
};
