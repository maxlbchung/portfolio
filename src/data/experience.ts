export interface ExperienceItem {
  title: string;
  org: string;
  date: string;
  points: string[];
  skills?: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: "LLM Skill Mutation Research",
    org: "with Prof. Anant Sahai · UC Berkeley",
    date: "May 2026 — Present",
    points: [
      "Developed an agent orchestration workflow that optimizes skills on LLM benchmarks.",
      "Created a deterministic skill evaluation method using accuracy, token usage, and step count as metrics — fed back to the mutator as a fitness signal for deciding which skills to keep.",
      "Optimized skills across benchmarks covering code editing, SQL, data science, and logic puzzles.",
    ],
    skills: ["LLM Agents", "Evals", "Claude Code", "JavaScript"],
  },
  {
    title: "Game Development Team Lead",
    org: "Personal & club projects",
    date: "2022 — Present",
    points: [
      "Led six game development teams across various projects, covering design, programming, art, and sound.",
      "Published Blind Arcade to the Google Play Store — nearly 3k downloads and over 10k views on YouTube.",
    ],
    skills: ["Unity", "C#", "Leadership"],
  },
];

export interface EducationItem {
  school: string;
  place: string;
  program: string;
  date: string;
}

export const education: EducationItem[] = [
  {
    school: "University of British Columbia",
    place: "Vancouver, BC",
    program: "BSc in Cognitive Systems — Computational Intelligence",
    date: "Sept 2025 — Present",
  },
  {
    school: "Bellevue College",
    place: "Bellevue, WA",
    program: "Dual enrollment with Redmond High School",
    date: "Sept 2024 — June 2025",
  },
];

export const honors: string[] = [
  "Unity Certified Programmer",
  "Washington State Seal of Biliteracy — Mandarin & Spanish",
];

/** Grouped skills for the chip lists on home + experience pages. */
export const stack: Record<string, { name: string; icon: string }[]> = {
  Languages: [
    { name: "C#", icon: "simple-icons:sharp" },
    { name: "Python", icon: "simple-icons:python" },
    { name: "TypeScript", icon: "simple-icons:typescript" },
    { name: "R", icon: "simple-icons:r" },
  ],
  "Tools & Frameworks": [
    { name: "Unity", icon: "simple-icons:unity" },
    { name: "React", icon: "simple-icons:react" },
    { name: "Vite", icon: "simple-icons:vite" },
    { name: "Git", icon: "simple-icons:git" },
    { name: "Jupyter", icon: "simple-icons:jupyter" },
    { name: "Claude Code", icon: "simple-icons:claude" },
  ],
};
