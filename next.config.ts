import type { NextConfig } from "next";

/**
 * Set to `/your-repo-name` when deploying to a GitHub Pages *project* site
 * (e.g. https://<user>.github.io/portfolio). Leave empty for a user site
 * (https://<user>.github.io) or a custom domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;