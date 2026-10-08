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