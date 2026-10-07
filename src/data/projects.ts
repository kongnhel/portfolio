import type { Locale } from "@/lib/i18n";

export type ProjectCategory = "software" | "networking" | "design";

/** Link labels are dictionary keys, not text: the same project page is served
 *  in both languages. */
export type ProjectLinkKey = "liveSite" | "source";

export interface ProjectLink {
  labelKey: ProjectLinkKey;
  href: string;
}

export interface ProjectShot {
  src: string;
  /** Width/height of the file, so the browser can reserve space. */
  width: number;
  height: number;
  alt: string;
}

export interface ProjectCopy {
  title: string;
  summary: string;
  /** Shown on the detail page. */
  description: string[];
  /** Optional longer-form notes, rendered as a bullet list. */
  highlights: string[];
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  /** Tech, tools, or design software used. Left untranslated on purpose —
   *  these are proper nouns and stay in Latin script in Khmer technical writing. */
  tags: string[];
  year: number;
  featured: boolean;
  links: ProjectLink[];
  /** Screenshots shown on the detail page, in order. The first one is also the
   *  card thumbnail, so put the clearest view of the project first. */
  shots: ProjectShot[];
  copy: Record<Locale, ProjectCopy>;
}

/** A project with its copy flattened for the requested locale. */
export type ResolvedProject = Omit<Project, "copy"> & ProjectCopy;

// Real projects. Add newer work to the top of the list — the order here is the
// order the cards, the detail pages, and the prev/next links use.

export const projects: Project[] = [
  {
    slug: "class-management-system",
    category: "software",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "REST API"],
    year: 2026,
    featured: true,
    links: [{ labelKey: "liveSite", href: "https://sys.nmu.edu.kh" }],
    shots: [
      {
        src: "/image/projects/class-dashboard.webp",
        width: 1200,
        height: 551,
        alt: "The admin dashboard, showing the academic year and quick actions.",
      },
      {
        src: "/image/projects/class-schedule.webp",
        width: 1200,
        height: 550,
        alt: "Class cards with search and filters for major, year, room, and lecturer.",
      },
      {
        src: "/image/projects/class-students.webp",
        width: 1200,
        height: 546,
        alt: "A class roster with each student's score, grade, and status.",
      },
    ],
    copy: {
      en: {
        title: "Class Management System",
        summary:
          "An admin system for running a faculty year: classes, subjects, rooms, timetables, and student results.",
        description: [
          "Running a faculty means answering the same questions constantly — which classes are running this year, who teaches what, which room is free on Tuesday, and who has failed. This system keeps that information in one place instead of across spreadsheets and notice boards.",
          "It is built with Laravel and MySQL. Staff manage academic years, classes, subjects, rooms, and roles through the admin side; each class then has its own roster, timetable, attendance, and results, with marks importable from Excel. The interface is in Khmer and English, because the people entering the data and the people reading the timetables are not the same people.",
        ],
        highlights: [
          "Classes, subjects, rooms, and lecturer assignments under an academic year",
          "Timetable per class, with search and filters across major, year, room, and lecturer",
          "Class roster with scores, grades, and status, importable from Excel",
          "Role-based accounts for admin and teaching staff",
        ],
      },
      km: {
        title: "ប្រព័ន្ធគ្រប់គ្រងថ្នាក់រៀន",
        summary:
          "ប្រព័ន្ធគ្រប់គ្រងសម្រាប់គ្រប់គ្រងឆ្នាំសិក្សា និងមុខវិជ្ជា៖ ថ្នាក់ មុខវិជ្ជា បន្ទប់ តាមណៈនាំការ និងលទ្ធផលសិស្ស។",
        description: [
          "ការគ្រប់គ្រងមន្ទីរោគ គឺជាការឆ្លើយសំណួរដដែលតែងតែកើតមកវិញ — ថ្នាក់ណាខ្លះបានបើកឆ្នាំនេះ គ្រូបង្កើតមុខទេ បន្ទប់ណាទទេរថ្ងៃអង្គារ និងអ្នកណាបានធ្លាក់បង់។ ប្រព័ន្ធនេះរក្សាព័ត៌មានទាំងនេះនៅកន្លែងតែមួយ ជំនួសការរក្សាក្នុងសៀវភៅ Excel និងកាត់ស្លោកផ្សេងៗ។",
          "វាបានបង្កើតដោយប្រើ Laravel និង MySQL។ ប្រធានបទគ្រប់គ្រងថ្នាក់ មុខវិជ្ជា បន្ទប់ និងតួអនកាតិយក តាមរយៈឆ្នាំសិក្សា។ បន្ទាប់មកថ្នាក់នីមួយៗមានបញ្ជីសិស្ស តាមណៈនាំការ វត្តមាន និងព័ត៌មានលទ្ធផល ដោយអាចបញ្ចូលពិន្ទុពី Excel បាន។ ផ្ទាំងចែនាមានជាភាសាខ្មែរ និងភាសាអង់គ្លេស ព្រោះអ្នកបញ្ចូលទិន្នន័យ និងអ្នកអានតាមណៈនាំការ មិនមែនជាមនុស្សដដែលដូចគ្នាទេ។",
        ],
        highlights: [
          "ថ្នាក់ មុខវិជ្ជា បន្ទប់ និងការចាត់ត្រាគ្រូបង្កើតក្រោមឆ្នាំសិក្សា",
          "តាមណៈនាំការសម្រាប់ថ្នាក់នីមួយៗ ជាមានការស្វែងរក និងច្រោះតាមមុខ ឆ្នាំ បន្ទប់ និងគ្រូបង្កើត",
          "បញ្ជីសិស្សជាមួយពិន្ទុ កម្រិត និងស្ថានភាព អាចបញ្ចូលពី Excel បាន",
          "គណនីសម្រាប់អាជ្ញាបណ្ណ៌ផ្អែកលើតួអនកាតិ",
        ],
      },
    },
  },
  {
    slug: "nmu-scholarship-enroll",
    category: "software",
    tags: ["Node.js", "Express", "MySQL", "REST API", "Bootstrap"],
    year: 2026,
    featured: true,
    links: [{ labelKey: "liveSite", href: "https://register.nmu.edu.kh" }],
    shots: [
      {
        src: "/image/projects/scholarship-landing.webp",
        width: 1200,
        height: 692,
        alt: "The NMU Scholarship & Enroll Online landing page.",
      },
      {
        src: "/image/projects/scholarship-dashboard.webp",
        width: 1200,
        height: 592,
        alt: "The student dashboard, showing an application waiting under review.",
      },
      {
        src: "/image/projects/scholarship-programs.webp",
        width: 1200,
        height: 581,
        alt: "Scholarship programmes listed as cards, each with its own QR code.",
      },
    ],
    copy: {
      en: {
        title: "NMU Scholarship & Enroll Online",
        summary:
          "An online scholarship application and enrolment system for National Meanchey University, built for students to apply and track their application.",
        description: [
          "Applying for a scholarship used to mean queueing at the faculty office with a folder of paper. This system moves the whole process online: a student registers, picks a programme and scholarship level, submits an application, and then follows its progress from a personal dashboard.",
          "I built it with Node.js and Express on the server, MySQL for the data, and a Bootstrap admin interface for the staff who review and decide on applications. The interface exists in Khmer and English, because the people filling it in are students and the people reading it are staff — the two rarely use the same language.",
        ],
        highlights: [
          "Student dashboard with application status, timeline, and notifications",
          "Scholarship programmes listed with eligibility details and a scannable QR code",
          "Staff side for reviewing, approving, and printing applications",
          "Khmer and English throughout, on the same URLs",
        ],
      },
      km: {
        title: "ប្រព័ន្ធអាហារុណា និងចុះឈ្មោះអនឡាញ អនឡាញ",
        summary:
          "ប្រព័ន្ធដាក់ព្យាបាលសញ្ញាបន្តិ និងការចុះឈ្មោះអនឡាញ នៅសាលាជាតិមនុងឆរ ដែលសិស្សអាចដាក់ព្យាបាល និងតាមដានស្ថានភាពសាក្សរបស់ខ្លួនឯង។",
        description: [
          "ការដាក់ព្យាបាលសញ្ញាបន្តិពាក្រងមុននេះត្រូវបានស្ថាប់ជួរនៅក្រដារសាលាដោយសម្ភាព្យឯកសារមួយរំបីដាក់ព្យាបាល។ ប្រព័ន្ធនេះបានប្លង់ដំណើរការទាំងមូលទៅជាអនឡាញ៖ សិស្សចុះឈ្មោះ ជ្រើសរើសកម្មវិធី និងកម្រិតសញ្ញាបន្តិ ដាក់ព្យាបាល ហើយតាមដានវឌ្ឍនភាពនៃព័ត៌មាននៅផ្ទាំងគ្រប់គ្រងផ្ទាល់ខ្លួន។",
          "ខ្ញុំបានបង្កើតវាដោយប្រើ Node.js និង Express សម្រាប់ម៉ាស៊ីនមេ ប្រព័ន្ធទិន្នន័យ MySQL និងផ្ទាំងគ្រប់គ្រងដែលបានសាងដោយ Bootstrap សម្រាប់ប្រធានបទ ដែលទទួលបញ្ជាក់ និងសម្រេចព័ន្ធ។ ផ្ទាំងចែនាមានជាភាសាខ្មែរ និងភាសាអង់គ្លេស ព្រោះអ្នកប្រើប្រព័ន្ធនេះជាសិស្ស ហើយអ្នកអានវាជាប្រធានបទ — ភាសាដែលពួកគេប្រើមិនត្រូវគ្នាគ្នាទេ។",
        ],
        highlights: [
          "ផ្ទាំងគ្រប់គ្រងសិស្ស ដែលមានស្ថានភាពព្យាបាល កាលបរិច្ឆេទ និងការជូនដំណឹង",
          "កម្មវិធីសញ្ញាបន្តិបង្ហាញជាកាត រួមមានលក្ខខណ្ឌសម្រាប់ និងកូដ QR សម្រាប់ស្កេង",
          "ផ្នែកសម្រាប់ប្រធានបទ ដើម្បីពិនិត្យ អនុម័ត និងបោះពាណ្យព្យាបាល",
          "ភាសាខ្មែរ និងភាសាអង់គ្លេស នៅលើ URL ដដែលបាន",
        ],
      },
    },
  },
  {
    slug: "attendance-qr-registration",
    category: "software",
    tags: ["Node.js", "Express", "MySQL", "QR Code", "REST API"],
    year: 2026,
    featured: true,
    links: [{ labelKey: "liveSite", href: "https://attendance-7kse.onrender.com" }],
    shots: [
      {
        src: "/image/projects/attendance-qr.webp",
        width: 416,
        height: 805,
        alt: "The student registration screen, showing a QR code to scan.",
      },
    ],
    copy: {
      en: {
        title: "QR Attendance & Student Registration",
        summary:
          "A class attendance system where students register by scanning a QR code, instead of signing a paper sheet.",
        description: [
          "Every class started with the same argument: who is actually here? The paper register was slow, easy to lose, and impossible to check later. This system replaces it with a QR code on the screen — a student opens the page on their phone, scans, and their attendance is recorded against that session.",
          "It is built with Node.js and Express serving the API, MySQL storing students, classes and sessions, and an admin panel for the class owner to see who registered and when. It runs on a free host, so a class can use it without installing anything, and the whole flow works in Khmer as well as English.",
        ],
        highlights: [
          "One scan per student records attendance for that class session",
          "Admin panel listing who has registered, and when",
          "Runs from a phone browser — nothing to install for students",
          "Khmer and English, including the registration screen itself",
        ],
      },
      km: {
        title: "កត់ត្រាវត្រឡប់ QR និងចុះឈ្មោះសិស្ស",
        summary:
          "ប្រព័ន្ធកត់ត្រាវត្រឡប់ ដែលសិស្សចុះឈ្មោះដោយស្កេងកូដ QR ជំនួសការសម្គាល់ក្នុងសៀវភៅ។",
        description: [
          "ម៉ាស៊ីនសិក្សាគ្រប់ចាប់ផ្តើមដោយសំណួរដដែលដូចគ្នា៖ តើមានអ្នកណាខ្លាស់ចូលរួចហើយ? សៀវភៅកត់ត្រាធ្វើឲ្យយឺត ងាយបាត់ និងពិនិត្យក្រោយមកមិនបាន។ ប្រព័ន្ធនេះជំនួសវាដោយកូដ QR បង្ហាញលើអេក្រង់ — សិស្សបើកទំព័រនៅទូរស័ព្ទ ស្កេង ហើយវត្រាវត្រឡប់របស់គាត់ត្រូវបានកត់ត្រាភ្លាម។",
          "វាបានបង្កើតដោយប្រើ Node.js និង Express សម្រាប់ API មូលដ្ឋានទិន្នន័យ MySQL សម្រាប់រាល់សិស្ស ថ្នាក់ និងវគ្គ និងផ្ទាំងគ្រប់គ្រងសម្រាប់ម្ចាស់វគ្គមើលថាតើអ្នកណាបានចុះឈ្មោះ និងពេលណា។ វាដំណើរការលើម៉ាស៊ីនមេឥឡូវនេះ ដូច្នេះថ្នាក់អាចប្រើបានដោយមិនបាច់ដំឡើងអីសោ្អំ ហើយដំណើរការទាំងមូលអាចដំណើរការបានដោយភាសាខ្មែរ ដូចជាភាសាអង់គ្លេស។",
        ],
        highlights: [
          "សិស្សម្នាក់ស្កេងម្ដង ដាក់វត្រាវត្រឡប់សម្រាប់វគ្គនោះ",
          "ផ្ទាំងគ្រប់គ្រងបង្ហាញថាតើអ្នកណាបានចុះឈ្មោះ និងពេលណា",
          "ដំណើរការតាមកូនទូរស័ព្ទ — សិស្សមិនចាំបាច់ដំឡើងអីសោ្អំ",
          "ភាសាខ្មែរ និងភាសាអង់គ្លេស រួមលើផ្ទាំងចុះឈ្មោះផង",
        ],
      },
    },
  },
];

function resolve(p: Project, locale: Locale): ResolvedProject {
  const { copy, ...rest } = p;
  return { ...rest, ...copy[locale] };
}

export function getProjects(locale: Locale): ResolvedProject[] {
  return projects.map((p) => resolve(p, locale));
}

export function getFeaturedProjects(locale: Locale): ResolvedProject[] {
  return getProjects(locale).filter((p) => p.featured);
}

export function getProject(locale: Locale, slug: string): ResolvedProject | undefined {
  const p = projects.find((item) => item.slug === slug);
  return p ? resolve(p, locale) : undefined;
}

export function getAdjacentProjects(
  locale: Locale,
  slug: string,
): { prev?: ResolvedProject; next?: ResolvedProject } {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: projects[index - 1] && resolve(projects[index - 1], locale),
    next: projects[index + 1] && resolve(projects[index + 1], locale),
  };
}