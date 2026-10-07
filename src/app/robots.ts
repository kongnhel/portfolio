import type { MetadataRoute } from "next";
import { absoluteRootUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // The sitemap is a single combined file covering both locales.
    sitemap: absoluteRootUrl("/sitemap.xml"),
  };
}