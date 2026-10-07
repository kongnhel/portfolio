import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { themeScript } from "@/lib/theme";
import { navLabelKeys, navPaths } from "@/data/site";
import "./globals.css";

/**
 * The exported `404.html`. Every unknown URL on a static host serves this one
 * file, so it lives outside the `[locale]` layout and renders its own document:
 * there is no locale (or header/footer) to hang off.
 *
 * Next picks this file up automatically and writes it to `out/404.html`,
 * replacing its own unstyled default — so this is the one page every miss on a
 * static host shows, in either language, and it therefore links both.
 */

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const dict = getDictionary("en");

const nav: { path: (typeof navPaths)[number]; href: string; label: string }[] =
  navPaths.map((path) => ({
    path,
    href: `${base}/en/${path === "/" ? "" : `${path.slice(1)}/`}`,
    label: dict.nav[navLabelKeys[path]],
  }));

export const metadata: Metadata = {
  // Next renders this route's own <title>; a hand-written one in <head> is
  // replaced by the metadata system with an empty value.
  title: `404 — ${getDictionary("en").notFound.title}`,
};

export default function GlobalNotFound() {
  return (
    // themeScript adds `dark` before React hydrates; acknowledge the
    // legitimate difference (same as the locale layout).
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Colours the page before first paint, same as the locale layout. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-base-950 px-6 py-16 text-base-100 antialiased">
        <main className="page-enter w-full max-w-md">
          <p className="font-mono text-6xl font-medium text-accent">
            {/* Float sits on its own node: two animations share the `animation`
                shorthand and would collide on the same element. */}
            <span className="animate-float inline-block">404</span>
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {dict.notFound.title}
          </h1>
          <p className="mt-3 leading-relaxed text-base-500">
            {dict.notFound.description}
          </p>

          <nav aria-label={dict.footer.pages} className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {nav.map(({ path, href, label }) => (
                <li key={path}>
                  <a
                    href={href}
                    className="inline-block rounded border border-base-800 px-3 py-1.5 text-sm text-base-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-8 text-sm text-base-700">
            <a
              href={`${base}/km/`}
              lang="km"
              className="text-accent transition-colors hover:text-accent-muted"
            >
              ភាសាខ្មែរ
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
