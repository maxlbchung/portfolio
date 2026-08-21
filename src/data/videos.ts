export interface Video {
  title: string;
  /** YouTube video ID (the part after watch?v=) */
  id: string;
  date: string;
  blurb?: string;
}

/** Devlogs & videos — add new videos here (newest first). */
export const videos: Video[] = [
  {
    title: "I Made a Mobile FPS Game For the Blind",
    id: "LRWaTU8VnIU",
    date: "December 2024",
    blurb:
      "The devlog behind Blind Arcade's first-person shooter — designing a game you can play without ever seeing the screen.",
  },
];
