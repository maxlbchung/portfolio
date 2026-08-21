export interface Jam {
  name: string;
  date: string;
  theme?: string;
  game: string; // title of the game entry (should match a title in games.ts)
  result?: string;
  story?: string;
  links: { label: string; url: string; icon?: string }[];
}

/** Game jam participations — add new jams here. */
export const jams: Jam[] = [
  {
    name: "GMTK Game Jam 2023",
    date: "July 2023",
    theme: "Roles Reversed",
    game: "The Hunted",
    story:
      "A top-down shooter/horror built in 48 hours and submitted 40 minutes before the deadline. You assemble a mob to hunt a monster — then the roles reverse and you play as the monster, and as a mob member, tuned so both sides are winnable.",
    links: [
      { label: "Jam submission", url: "https://itch.io/jam/gmtk-2023/rate/2161921", icon: "simple-icons:itchdotio" },
    ],
  },
];
