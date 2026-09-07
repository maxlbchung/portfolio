/**
 * Smaller, non-expandable sections stay in content.json. Projects, games,
 * experience, and diary entries live in their matching Markdown collections.
 */
import data from "./content.json";

interface Link {
  label: string;
  url: string;
  icon?: string;
}

export interface Video {
  title: string;
  id: string;
  date: string;
  period: string;
  blurb?: string;
}

const newestFirst = <T extends { date: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => b.date.localeCompare(a.date));

export const videos = newestFirst(data.videos as Video[]);

export const education = data.education;
export const honors = data.honors;
export const stack = data.stack;
