// ---------------------------------------------------------------------------
// Identity and contact details. Anything that differs between languages
// (tagline, location, availability) lives in src/data/i18n/ instead.
// ---------------------------------------------------------------------------

export const site = {
  name: "Nhel Kong",
  shortName: "NK",

  email: "nhelkong3@gmail.com",
  phone: "(+855) 31 28 21 963",

  /** Optional local file in /public. Add the PDF and this button appears. */
  resumeUrl: null as string | null,

  /**
   * Round profile photo (Home avatar fallback, About page): a face-centred
   * square crop of `Young-Man-in-a-Cluttered-Office-Classroom.jpg`, saved as
   * `/public/image/me/profile.webp` (720×720). Set to null to fall back to
   * the monogram placeholder.
   *
   * The browser icon is a tighter crop of the older portrait — see
   * `src/app/favicon.ico`, `src/app/icon.png` and `src/app/apple-icon.png`.
   * Replace those together with the photo when it changes.
   */
  photoUrl: "/image/me/profile.webp" as string | null,

  /**
   * Larger portrait for the Home hero: `/public/image/me/hero.jpg` (720×900)
   * is a 4:5 crop of `public/image/me/my style.png`. Falls back to
   * `photoUrl` when null, so the hero is never empty.
   */
  heroPhotoUrl: "/image/me/hero.jpg" as string | null,

  /**
   * TODO: replace the placeholder GitHub/Facebook URLs and the Telegram
   * phone-based link (which only works if the number is in Telegram contacts).
   */
  socials: [
    { label: "GitHub", href: "https://github.com/kongnhel" },
    { label: "Telegram", href: "https://t.me/+85589204612" },
    { label: "Facebook", href: "https://facebook.com/kongxRom" },
  ],
} as const;

/**
 * Paths are locale-free. Labels come from the dictionary (nav.*) so they can be
 * translated; every route lives under /<locale>/<path>.
 */
export type NavPath = "/" | "/projects" | "/experience" | "/about" | "/contact";

export const navPaths: readonly NavPath[] = [
  "/",
  "/projects",
  "/experience",
  "/about",
  "/contact",
];

export type NavLabelKey = "home" | "projects" | "experience" | "about" | "contact";

export const navLabelKeys: Record<NavPath, NavLabelKey> = {
  "/": "home",
  "/projects": "projects",
  "/experience": "experience",
  "/about": "about",
  "/contact": "contact",
};