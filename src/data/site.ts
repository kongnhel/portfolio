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
   * Every image of you on the site is cut from one source photo:
   * `public/image/me/my style.png` (1024×1536).
   *
   * Round profile photo (Home avatar fallback, About page): a head-and-shoulders
   * square crop of it, saved as `/public/image/me/profile.jpg` (512×512). Set to
   * null to fall back to the monogram placeholder.
   *
   * The same face, cropped tighter and framed with a cyan ring, is the browser
   * icon — see `src/app/favicon.ico`, `src/app/icon.png` and
   * `src/app/apple-icon.png`. Replace all four together when this changes.
   */
  photoUrl: "/image/me/profile.jpg" as string | null,

  /**
   * Larger portrait for the Home hero: `/public/image/me/hero.jpg` (720×900) is
   * a 4:5 crop of the same `public/image/me/my style.png`. Falls back to
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
export type NavPath = "/" | "/projects" | "/about" | "/contact";

export const navPaths: readonly NavPath[] = ["/", "/projects", "/about", "/contact"];

export type NavLabelKey = "home" | "projects" | "about" | "contact";

export const navLabelKeys: Record<NavPath, NavLabelKey> = {
  "/": "home",
  "/projects": "projects",
  "/about": "about",
  "/contact": "contact",
};