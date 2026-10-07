import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Kantumruy_Pro } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Ambient } from "@/components/ambient";
import { PointerGlow } from "@/components/pointer-glow";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/data/site";
import { getDictionary, isLocale, locales, localeMeta } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import { themeScript } from "@/lib/theme";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Geist has no Khmer glyphs, so Khmer text fell back to whatever the OS picked.
// Kantumruy Pro covers the `khmer` subset and is built for reading at UI sizes.
const khmer = Kantumruy_Pro({
  variable: "--font-khmer",
  subsets: ["khmer", "latin"],
  weight: "variable",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Software developer and graphic designer`,
    // Page titles pass a bare string; these get the " — Name" suffix.
    template: `%s — ${site.name}`,
  },
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const meta = localeMeta[locale];

  return (
    <html
      lang={meta.htmlLang}
      // themeScript adds a `dark` class to <html> before React hydrates, so the
      // rendered className legitimately differs from React's. Acknowledge it
      // here; the class itself is preserved (React does not reconcile attributes
      // it did not render).
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${khmer.variable} h-full scroll-pt-20 antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Marks that scripting works. Scroll-reveal targets are hidden only
            under `html.js`, so a visitor with JS disabled still sees the page
            instead of an empty shell. Must run before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Decorative layers first, so content stacks above them. */}
        <Ambient />
        <PointerGlow />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-base-950"
        >
          {dict.a11y.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}