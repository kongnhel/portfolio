import { notFound } from "next/navigation";
import { en } from "@/data/i18n/en";
import { km } from "@/data/i18n/km";

export const locales = ["en", "km"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** The English dictionary defines the shape; Khmer must match it exactly. */
export type Dictionary = typeof en;

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en" },
  km: { label: "ភាសាខ្មែរ", short: "ខ្មែរ", htmlLang: "km" },
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

export function getDictionary(locale: Locale): Dictionary {
  return locale === "km" ? km : en;
}

/**
 * Swaps the leading locale segment of a path.
 * "/" -> "/km/", "/projects" -> "/km/projects".
 */
export function localisedPath(locale: Locale, path = "/"): string {
  const rest = path.replace(/^\/(en|km)/, "");
  return `/${locale}${rest}`;
}

/** The same page, in a different language. `pathname` may be locale-prefixed. */
export function switchLocale(pathname: string, next: Locale): string {
  return localisedPath(next, pathname);
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