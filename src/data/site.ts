/** Global site identity + social links. */
export const site = {
  name: "Max Li-Bo Chung",
  alias: "Libo Dev", // game-dev handle
  tagline: {
    ai: "AI developer & cognitive systems student",
    games: "game developer & Unity certified programmer",
  },
  location: "Vancouver, BC",
  email: "maxlbchung@gmail.com",
  resume: "/resume.pdf", // served from public/
  socials: {
    github: "https://github.com/maxlbchung",
    githubOrg: "https://github.com/Reodite",
    linkedin: "https://www.linkedin.com/in/max-li-bo-chung/",
    itch: "https://libodev.itch.io/",
    youtube: "https://www.youtube.com/@LiboDev",
    playstore: "https://play.google.com/store/apps/details?id=dev.libo.BlindArcade",
    gamesSite: "https://www.libo.dev",
  },
};

/** Navigation per mode. Resume is intentionally a home-page link, not a nav item. */
export const nav = {
  ai: [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/dev-diary", label: "Dev Diary" },
  ],
  games: [
    { path: "/", label: "Home" },
    { path: "/games", label: "Games" },
    { path: "/jams", label: "Jams" },
    { path: "/videos", label: "Videos" },
  ],
} as const;
