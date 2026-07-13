// Content collection "projects" : 1 fichier JSON par projet dans src/data/projects/.
// Astro valide chaque fichier contre ce schéma au build (erreur claire si un champ manque).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/data/projects' }),
  schema: z.object({
    id: z.string(),
    titleFr: z.string(),
    titleEn: z.string(),
    category: z.enum(['robotics', 'software', 'hardware', 'web', 'other']),
    source: z.enum(['stage', 'industrial', 'school', 'robotech', 'perso']).optional(),
    featured: z.boolean().optional(),
    concept: z.boolean().optional(),
    wip: z.boolean().optional(),
    date: z.string().optional(),
    descFr: z.string(),
    descEn: z.string(),
    stack: z.array(z.string()).optional().default([]),
    thumb: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    linkLabel: z.string().optional(),
    // Les blocs sont typés librement (rendus par Blocks.astro qui gère chaque type).
    blocks: z.array(z.record(z.any())).optional().default([]),
  }),
});

export const collections = { projects };
