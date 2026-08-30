/**
 * All portfolio content lives in content.json — add new entries there, in any
 * order. Each entry needs a sortable `date` ("YYYY-MM", or just "YYYY") and a
 * display `period`; pages are sorted newest-first here. Set `featured: true`
 * on a project or game to show it on the home page.
 */
import data from "./content.json";

interface Link {
  label: string;
  url: string;
}

export interface Entry {
  title: string;
  date: string;
  period: string;
  blurb: string;
  points?: string[];
  tech: string[];
  award?: string;
  links: Link[];
  featured?: boolean;
  jam?: string;
}

export interface Jam {
  name: string;
  date: string;
  period: string;
  theme?: string;
  game: string;
  result?: string;
  story?: string;
  links: Link[];
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

export const projects = newestFirst(data.projects as Entry[]);
export const games = newestFirst(data.games as Entry[]);
export const jams = newestFirst(data.jams as Jam[]);
export const videos = newestFirst(data.videos as Video[]);

export const experience = data.experience;
export const education = data.education;
export const honors = data.honors;
export const stack = data.stack;
