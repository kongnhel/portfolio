import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { servedUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

const staticPaths: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...staticPaths.map(({ path, priority }) => ({
      url: servedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...projects.map((project) => ({
      url: servedUrl(locale, `/projects/${project.slug}`),
      lastModified: new Date(`${project.year}-01-01`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]);
}