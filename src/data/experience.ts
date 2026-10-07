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
    km: [
      "ខ្ញុំជានិស្សពេលណាទីបី ក្នុងវិស័យព័ត៌មានវិស័យ នៅសាកលវាលា ជាតិមានជ័យ ដោយជំនាញចំណេះកាត់ក្នុងការបង្កើតកម្មវិធី ហើយក៏រៀនការរូបនានៅសាកលវាលាបច្ចេកទេសនៅពេលមករៀនបន្ថែម។",
      "គោលបំណងរបស់ខ្ញុំគឺធ្វើឲ្យការរៀនកុំព្យាករណ៍កាន់តែសាមញ្ញ និងអនុវត្តជាក់លាក់។ ខ្ញុំប្រើពេលវេលាក្នុងការបង្កើតកម្មវិធី រូបនារូបភាព និងជួយអ្នកចាប់ផ្តើមឲ្យធ្វើតាមបានមកដល់ប្រព័ន្ធ — ព្រោះការពន្យល់អ្វីមួយឲ្យច្បាស់លាស់ គឺជាវិធីលឿនបំផុតដែលអ្នកយែងបានយល់វាដោយពិត។",
    ],
  } as Record<Locale, string[]>,

  /** Labels come from the dictionary (facts.*); only values live here. */
  facts: [
    {
      key: "focus",
      value: {
        en: "Software Development, Graphic Design, Teaching",
        km: "ការបង្កើតកម្មវិធី រូបនា និងការបង្កើត",
      },
    },
    {
      key: "languages",
      value: {
        en: "Khmer (native), English (intermediate)",
        km: "ភាសាខ្មែរ (សត្វជាតិ) ភាសាអង់គ្លេស (កម្រិតមធ្យម)",
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
      km: {
        title: "ការសរសេរកម្មវិធី",
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
      km: {
        title: "ហេវ្វាក់ និងឧបកប្រដ្ឋាន",
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
      km: {
        title: "រូបនា",
        skills: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "ស្លាយលោកដំ",
          "បាត់ទ្រីង",
          "ឧបកប្រដ្ឋានផ្សាយាយ",
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
      km: {
        title: "កម្មវិធីការិយាល័យ និងស្លាក",
        skills: [
          "Microsoft Word",
          "Microsoft Excel",
          "PowerPoint",
          "ចលនាកន្លែង PowerPoint",
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
      km: {
        title: "ការបង្កើត",
        skills: [
          "រៀបចំកិច្ចផ្លូវ",
          "គ្រប់គ្រប់គ្រងពេលវេលាក្នុងថ្នាក់",
          "បង្កើតអ្នកចាប់ផ្តើម",
          "ពន្យល់គំនិតឲ្យច្បាស់លាស់",
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
      km: {
        title: "វិជ្ជាជាតិ",
        skills: [
          "ការធ្វើការជាក្រុម",
          "ការសាងទំនោរ",
          "ការគ្រប់គ្រប់គ្រងពេលវេលា",
          "ត្រៀមរៀនសូត្រ",
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
      km: {
        title: "ការបង្កើតកម្មវិធី",
        organisation: "សាកលវាលាជាតិមានជ័យ",
        points: [
          "និស្សសិស្សឆ្នាំទី៤ បច្ច័យទី៤ កំពុងចូលរួមគ្រោះទីពីរ។",
          "មុខវិជ្ជាមូល គ្របដណ្តប់ការសរសេរកម្មវិធី មូលដ្ឋានទិន្នន័យ និងប្រព័ន្ធកុំព្យាករណ៍។",
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
      km: {
        title: "រូបនា (រៀនក្រៅម៉ោង)",
        organisation: "សាលាបច្ចេកទេសខេត្តបន្ទាន់មានជ័យ",
        points: [
          "រៀនរៀនក្រៅម៉ោងជាមួយនឹងការសិក្សានៅសាកលវាលា។",
          "ផ្តោតលើការរៀបចំទីតាំង អក្សរស្រួល និងការរៀបចំរូបភាពសម្រាប់បោះពាណ្យ និងអេក្រង់។",
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
      km: {
        title: "បរិន្ធសាទី១២",
        organisation: "សាលាមួយស្រុកស្វាយជ័យ",
        points: ["បានបង្កើតនៅថ្ងៃទី៥ ខែធ្នូ ឆ្នាំ២០២២។"],
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
      km: {
        title: "ជំនួយការបង្កើត",
        organisation: "ថ្នាក់ជំនាញកុំព្យាករណ៍",
        points: [
          "ជួយគ្រូសាលាបង្កើតជំនាញកុំព្យាករណ៍មូលដ្ឋានដល់សិស្សថ្មី។",
          "បំលែងការងារអនុវត្តជាជំហានដែលអ្នកចាប់ផ្តើមអាចធ្វើតាមបានដោយមិនជាប់ភ្លាម។",
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