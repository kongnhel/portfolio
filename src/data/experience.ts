import type { Locale } from "@/lib/i18n";

export interface EntryCopy {
  title: string;
  organisation: string;
  points: string[];
}

export interface Entry {
  /** Dates are not translated. */
  period: string;
  copy: Record<Locale, EntryCopy>;
}

export type ResolvedEntry = { period: string } & EntryCopy;

export interface SkillGroupCopy {
  title: string;
  skills: string[];
}

export interface SkillGroup {
  copy: Record<Locale, SkillGroupCopy>;
}

export const about = {
  bio: {
    en: [
      "I'm a fourth-year IT student at National Meanchey University, majoring in Software Development, with a part-time Graphic Design course at the Polytechnic Institute of Banteay Meanchey province.",
      "My aim is to make computer learning simple and practical. I spend my time building software, designing graphics, and helping beginners get comfortable with technology — because explaining something clearly is the fastest way to understand it properly myself.",
    ],
  } as Record<Locale, string[]>,

  /** Labels come from the dictionary (facts.*); only values live here. */
  facts: [
    {
      key: "focus",
      value: {
        en: "Software Development, Graphic Design, Teaching",
      },
    },
    {
      key: "languages",
      value: {
        en: "Khmer (native), English (intermediate)",
      },
    },
  ] as { key: "focus" | "languages"; value: Record<Locale, string> }[],
};

export const skillGroups: SkillGroup[] = [
  {
    copy: {
      en: {
        title: "Programming",
        skills: ["HTML", "CSS", "JavaScript", "PHP", "Java", "Python"],
      },
    },
  },
  {
    copy: {
      en: {
        title: "Frameworks & Tools",
        skills: [
          "Bootstrap",
          "Angular",
          "Laravel",
          "Spring Boot",
          "Flutter",
          "Node.js",
          "VS Code",
        ],
      },
    },
  },
  {
    copy: {
      en: {
        title: "Graphic Design",
        skills: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Logos",
          "Banners",
          "Marketing materials",
        ],
      },
    },
  },
  {
    copy: {
      en: {
        title: "Office & Slides",
        skills: [
          "Microsoft Word",
          "Microsoft Excel",
          "PowerPoint",
          "PowerPoint animation",
          "Canva",
        ],
      },
    },
  },
  {
    copy: {
      en: {
        title: "Teaching",
        skills: [
          "Lesson planning",
          "Classroom time management",
          "Teaching beginners",
          "Clear explanation of concepts",
        ],
      },
    },
  },
  {
    copy: {
      en: {
        title: "Professional",
        skills: [
          "Teamwork",
          "Relationship building",
          "Time management",
          "Willingness to learn",
        ],
      },
    },
  },
];

export const education: Entry[] = [
  {
    period: "2022 — Present",
    copy: {
      en: {
        title: "Software Development",
        organisation: "National Meanchey University",
        points: [
          "Fourth-year undergraduate, currently in the second semester.",
          "Core coursework in programming, databases, and computer systems.",
        ],
      },
    },
  },
  {
    period: "2024 — Present",
    copy: {
      en: {
        title: "Graphic Design (part-time)",
        organisation: "Polytechnic Institute of Banteay Meanchey province",
        points: [
          "Part-time study alongside the university degree.",
          "Focus on layout, typography, and preparing graphics for print and screen.",
        ],
      },
    },
  },
  {
    period: "2016 — 2022",
    copy: {
      en: {
        title: "BAC II",
        organisation: "Svay Chek High School",
        points: ["Completed on 05 December 2022."],
      },
    },
  },
];

export const experience: Entry[] = [
  {
    period: "Classroom",
    copy: {
      en: {
        title: "Teaching Assistant",
        organisation: "Computer skills classes",
        points: [
          "Assisted the lead teacher in teaching foundational computer skills to new students.",
          "Broke down practical tasks into steps beginners could follow without getting stuck.",
        ],
      },
    },
  },
];

/** Single-line strip shown on the home page. Mostly untranslated proper nouns. */
export const skillSummary: string[] = [
  "Software Development",
  "HTML",
  "CSS",
  "PHP",
  "Java",
  "Python",
  "Bootstrap",
  "Angular",
  "Photoshop",
  "Illustrator",
  "PowerPoint",
  "Canva",
];

export function resolveEntry(entry: Entry, locale: Locale): ResolvedEntry {
  return { period: entry.period, ...entry.copy[locale] };
}