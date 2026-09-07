import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const link = z.object({ label: z.string(), url: z.string(), icon: z.string().optional() });

// The one content contract used by every Markdown-backed card.
const cardEntrySchema = z.object({
  title: z.string(),
  date: z.string(),
  period: z.string(),
  blurb: z.string(),
  game: z.string().optional(),
  theme: z.string().optional(),
  tech: z.array(z.string()).default([]),
  award: z.string().optional(),
  links: z.array(link).default([]),
  featured: z.boolean().default(false),
  image: z.string().optional(),
});

const cardCollection = (base: string) => defineCollection({
  loader: glob({ pattern: "**/*.md", base }),
  schema: cardEntrySchema,
});

export const collections = {
  diary: cardCollection("./src/content/diary"),
  projects: cardCollection("./src/content/projects"),
  games: cardCollection("./src/content/games"),
  experience: cardCollection("./src/content/experience"),
  jams: cardCollection("./src/content/jams"),
};
