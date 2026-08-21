export interface Game {
  title: string;
  period: string;
  blurb: string;
  points?: string[];
  tech: string[];
  /** NOTE: itch links marked "verify" below were inferred from the game title —
   *  double-check the slug on libodev.itch.io and fix if needed. */
  links: { label: string; url: string; icon?: string }[];
  featured?: boolean;
  jam?: string;
}

export const games: Game[] = [
  {
    title: "Blind Arcade",
    period: "July 2024",
    blurb:
      "An accessibility-first mobile arcade for the blind and visually impaired — games that need no visuals at all, built on gyroscope motion tracking, spatial audio, and haptic feedback.",
    points: [
      "Three arcade games: an endless runner, a first-person shooter, and a coin collector.",
      "Published on the Google Play Store — nearly 3k downloads and over 10k views on YouTube.",
    ],
    tech: ["Unity", "C#", "Android"],
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=dev.libo.BlindArcade",
        icon: "simple-icons:googleplay",
      },
      { label: "Devlog video", url: "https://www.youtube.com/watch?v=LRWaTU8VnIU", icon: "simple-icons:youtube" },
    ],
    featured: true,
  },
  {
    title: "Duality",
    period: "2025",
    blurb:
      "A 3D puzzle platformer shooter where every action comes at a cost. Dodge deadly lasers, leap between towering platforms, and outsmart relentless enemies.",
    tech: ["Unity", "C#"],
    links: [{ label: "itch.io", url: "https://libodev.itch.io/duality", icon: "simple-icons:itchdotio" }],
    featured: true,
  },
  {
    title: "Stuck at Sea",
    period: "January 2026",
    blurb:
      "A first-person shooter you play with your hands — literally. Controlled entirely through webcam hand tracking with custom hand-sign detection built on MediaPipe.",
    tech: ["Unity", "C#", "MediaPipe"],
    links: [{ label: "itch.io", url: "https://libodev.itch.io/stuck-at-sea", icon: "simple-icons:itchdotio" }],
    featured: true,
  },
  {
    title: "The Hunted",
    period: "GMTK Game Jam 2023",
    blurb:
      "A top-down shooter/horror where roles reverse: build a mob to hunt a monster, then play as both the monster and a mob member — balanced so skill (and a little luck) can win on either side.",
    tech: ["Unity", "C#"],
    links: [
      // verify slug
      { label: "itch.io", url: "https://itch.io/jam/gmtk-2023/rate/2161921", icon: "simple-icons:itchdotio" },
    ],
    jam: "GMTK Game Jam 2023",
  },
  {
    title: "Buried Treasure",
    period: "2025",
    blurb: "Clean up an island, uncover its secrets, and dig through trash to find buried treasure.",
    tech: ["Unity", "C#"],
    // verify slug
    links: [{ label: "itch.io", url: "https://libodev.itch.io/buried-treasure", icon: "simple-icons:itchdotio" }],
  },
  {
    title: "Grapple Phroggo",
    period: "2023",
    blurb: "When Frogger meets grapple hooks.",
    tech: ["Unity", "C#"],
    // verify slug
    links: [{ label: "itch.io", url: "https://libodev.itch.io/grapple-phroggo", icon: "simple-icons:itchdotio" }],
  },
  {
    title: "Tetrimania",
    period: "2023",
    blurb: "TETRIS… but a PLATFORMER.",
    tech: ["Unity", "C#"],
    // verify slug
    links: [{ label: "itch.io", url: "https://libodev.itch.io/tetrimania", icon: "simple-icons:itchdotio" }],
  },
  {
    title: "MIE",
    period: "2023",
    blurb: "Your ammo is your HP — every shot is a gamble.",
    tech: ["Unity", "C#"],
    // verify slug
    links: [{ label: "itch.io", url: "https://libodev.itch.io/mie", icon: "simple-icons:itchdotio" }],
  },
];
