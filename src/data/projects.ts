export interface Project {
  title: string;
  period: string;
  blurb: string;
  points?: string[];
  tech: string[];
  award?: string;
  links: { label: string; url: string; icon?: string }[];
  featured?: boolean;
}

/** AI / software projects, shown on /projects (and featured ones on the AI home). */
export const projects: Project[] = [
  {
    title: "SERT — Social Engineering Red Teaming",
    period: "July 2026",
    blurb:
      "An AI agent orchestration workflow that runs phishing-style social-engineering attacks against company employees and AI agents, exposing vulnerabilities before real attackers can exploit them.",
    points: [
      "Orchestrator agent summarizes every attack and compiles a report: most successful phishing methods, most vulnerable employees, and recommended improvements.",
      "Lets companies find weak links in their teams and stress-test AI agents with dangerous capabilities.",
      "Built solo at VS Live — Microsoft AI Hackathon 2026.",
    ],
    tech: ["C#", ".NET", "AI Agents"],
    award: "2nd place, Best AI Agent or Workflow Automation — $1,250",
    links: [{ label: "GitHub", url: "https://github.com/maxlbchung/vslhq26-maxlbchung", icon: "simple-icons:github" }],
    featured: true,
  },
  {
    title: "Skill Mutator",
    period: "2026",
    blurb:
      "Evolves LLM skills by driving a skill evaluator as a tool: parallel edits → combine → critic → evaluate → keep or dump, gated by held-out generalization. Accuracy, token usage, and step count act as the fitness signal.",
    points: [
      "Built during LLM skill mutation research with Prof. Anant Sahai (UC Berkeley).",
      "Optimized skills across benchmarks covering code editing, SQL, data science, and logic puzzles.",
    ],
    tech: ["JavaScript", "LLM Agents", "Claude Code"],
    links: [{ label: "GitHub", url: "https://github.com/maxlbchung/skill-mutator", icon: "simple-icons:github" }],
    featured: true,
  },
  {
    title: "Reodite — UBC Academic Success Tools",
    period: "May 2026 — Present",
    blurb:
      "A digital assistant platform for UBC students: an AI chatbot for finding courses and untangling prerequisites, prerequisite tree visualizations, and a drag-and-drop planner for building multi-year schedules that respect prerequisite rules and program requirements.",
    tech: ["Python", "Vite", "React", "TypeScript"],
    links: [
      { label: "reodite.com", url: "https://reodite.com/home", icon: "carbon:launch" },
      { label: "GitHub org", url: "https://github.com/Reodite", icon: "simple-icons:github" },
    ],
    featured: true,
  },
  {
    title: "ReoditeTools",
    period: "2026",
    blurb:
      "Browser-native UBC academic-advisor chatbot — Qwen3.5 2B running fully client-side with WebGPU and transformers.js. No server, no API keys.",
    tech: ["TypeScript", "WebGPU", "transformers.js"],
    links: [{ label: "GitHub", url: "https://github.com/Reodite/ReoditeTools", icon: "simple-icons:github" }],
  },
  {
    title: "Reogent",
    period: "2026",
    blurb:
      "A spatially-aware conversational AI for UBC students, ideated at the UBC CIC × AWS Hackathon. Answers campus questions with knowledge of where things actually are.",
    tech: ["TypeScript", "AWS"],
    links: [{ label: "GitHub", url: "https://github.com/Reodite/reogent", icon: "simple-icons:github" }],
  },
  {
    title: "Balancing Biped",
    period: "May 2026",
    blurb:
      "A technical demo of realistic physics-based balancing bipedal creatures. They stand on moving ground, balance with weights stacked on top, and shrug off projectiles.",
    points: [
      "Authored an LLM skill that automates creating highly tuned balancing creatures of different physiques.",
    ],
    tech: ["Unity", "C#", "LLM Skills"],
    links: [{ label: "GitHub", url: "https://github.com/maxlbchung/balancing-biped", icon: "simple-icons:github" }],
  },
  {
    title: "ScheduleSharer",
    period: "2026",
    blurb:
      "One master weekly calendar for your whole friend group — overlays everyone's UBC Workday schedules so you can actually find time to meet.",
    tech: ["TypeScript"],
    links: [{ label: "GitHub", url: "https://github.com/Reodite/ScheduleSharer", icon: "simple-icons:github" }],
  },
  {
    title: "UBC Unified Data",
    period: "2026",
    blurb:
      "Scraped and unified UBC datasets: courses, grades, tuition, building and walking GeoJSON, and study spaces — the data layer behind the Reodite tools.",
    tech: ["TypeScript", "Data Engineering"],
    links: [{ label: "GitHub", url: "https://github.com/Reodite/ubc-unified-data", icon: "simple-icons:github" }],
  },
  {
    title: "Stuck at Sea — Computer Vision Game",
    period: "January 2026",
    blurb:
      "A first-person shooter controlled entirely through webcam hand tracking — positional tracking plus custom hand-sign detection built on MediaPipe. Also lives on the games side of this site.",
    tech: ["Unity", "C#", "MediaPipe"],
    links: [{ label: "itch.io", url: "https://libodev.itch.io/stuck-at-sea", icon: "simple-icons:itchdotio" }],
  },
  {
    title: "Inktile",
    period: "2025",
    blurb: "A modular document editor experiment.",
    tech: ["TypeScript"],
    links: [{ label: "GitHub", url: "https://github.com/maxlbchung/inktile", icon: "simple-icons:github" }],
  },
  {
    title: "Chess With Voice Chat",
    period: "2025",
    blurb: "Chess, but you can trash-talk: a chess app with built-in voice chat.",
    tech: ["TypeScript"],
    links: [{ label: "GitHub", url: "https://github.com/maxlbchung/ChessWithVoiceChat", icon: "simple-icons:github" }],
  },
];
