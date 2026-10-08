import type { Metadata } from "next";
import { site } from "@/data/site";
import { localisedPath, localeMeta, defaultLocale, type Locale } from "./i18n";

/**
 * Absolute URL used for canonical links and Open Graph tags.
 * Set NEXT_PUBLIC_SITE_URL in your deployment environment.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
).replace(/\/$/, "");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export { siteUrl };

/** Absolute URL for a locale-aware route. `path` must be locale-free. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${siteUrl}${basePath}${localisedPath(locale, path)}`;
}

/** Absolute URL for a file at the site root, e.g. /sitemap.xml or /resume.pdf. */
export function absoluteRootUrl(path: string): string {
  return `${siteUrl}${basePath}${path}`;
}

/**
 * The exact URL the site is served at. `next.config.ts` sets trailingSlash, so
 * every route URL ends in a slash — sitemap entries must match that.
 */
export function servedUrl(locale: Locale, path = "/"): string {
  return `${absoluteUrl(locale, path)}/`;
}

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "/",
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      // Written out rather than generated from `locales`: Next only emits
      // hreflang links from a statically analysable object literal.
      languages: {
        en: absoluteUrl("en", path),
        "x-default": absoluteUrl(defaultLocale, path),
      },
    },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: absoluteUrl(locale, path),
      siteName: site.name,
      locale: localeMeta[locale].htmlLang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}