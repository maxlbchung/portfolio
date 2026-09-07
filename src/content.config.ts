import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const link = z.object({ label: z.string(), url: z.string(), icon: z.string().optional() });

const diary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const portfolioEntry = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    period: z.string(),
    blurb: z.string(),
    tech: z.array(z.string()).default([]),
    award: z.string().optional(),
    links: z.array(link).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const game = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
  schema: portfolioEntry.schema,
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    date: z.string(),
    skills: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    image: z.string().optional(),
    blurb: z.string().optional(),
  }),
});

const jams = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jams" }),
  schema: z.object({
    title: z.string(), date: z.string(), period: z.string(), theme: z.string().optional(),
    game: z.string(), result: z.string().optional(), image: z.string().optional(), links: z.array(link).default([]),
    image: z.string().optional(),
  }),
});

export const collections = { diary, projects: portfolioEntry, games: game, experience, jams };
