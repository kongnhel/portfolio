import { notFound } from "next/navigation";
import { en } from "@/data/i18n/en";

/**
 * The site is English-only. The locale plumbing is kept so another language is
 * still a small addition: add the code here, drop a matching dictionary beside
 * `en.ts`, and the routes, sitemap and hreflang tags follow automatically. See
 * "Adding a language" in the README.
 */
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** The English dictionary defines the shape every other must match exactly. */
export type Dictionary = typeof en;

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Narrows a route's `locale` param, 404ing on anything unsupported.
 * Use at the top of every page/layout under app/[locale]/.
 */
export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

/**
 * English is the only registered locale. This fails loudly rather than silently
 * serving English to an untranslated request, so a second locale added without
 * its dictionary is caught the moment it is asked for. When one lands, this
 * becomes a lookup — see "Adding a language" in the README.
 */
export function getDictionary(locale: Locale): Dictionary {
  if (locale !== defaultLocale) {
    throw new Error(`No dictionary registered for locale "${locale}"`);
  }
  return en;
}

/**
 * Prefixes a locale-free path with the given locale.
 * "/" -> "/en/", "/projects" -> "/en/projects".
 */
export function localisedPath(locale: Locale, path = "/"): string {
  // Matches any leading locale segment, not just the current one, so adding a
  // language never needs this function touched.
  const rest = path.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return `/${locale}${rest}`;
}

/**
 * Path comparison that ignores a trailing slash.
 *
 * With `trailingSlash: true` Next hands `usePathname()` the pretty form
 * (`/en/projects/`), while `localisedPath` builds the bare form
 * (`/en/projects`). Comparing them directly never matches, so no nav item
 * would ever show as current.
 */
export function isSamePath(a: string, b: string): boolean {
  const strip = (value: string) =>
    value.length > 1 ? value.replace(/\/+$/, "") : value;
  return strip(a) === strip(b);
}