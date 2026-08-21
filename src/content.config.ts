import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** Dev diary posts: drop a markdown file into src/content/diary/ to publish. */
const diary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { diary };
