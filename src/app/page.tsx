import "./root-redirect.css";

/**
 * Sits at the site root so `/` lands somewhere sensible instead of 404ing.
 * The language lives in the URL, so `/` forwards to the default language.
 *
 * This route is outside the `[locale]` segment and therefore has no root
 * layout of its own, so it renders its own minimal document. The redirect
 * target is relative, which keeps it correct under a `basePath` too.
 */
export const dynamic = "force-static";

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        {/* charset/viewport are added by Next's own root layout for this route. */}
        <meta httpEquiv="refresh" content="0; url=./en/" />
        <link rel="canonical" href="./en/" />
        <link rel="alternate" hrefLang="en" href="./en/" />
        <link rel="alternate" hrefLang="x-default" href="./en/" />
        <title>Nhel Kong</title>
      </head>
      <body>
        <main>
          <p>
            Taking you to the <a href="./en/">English site</a>.
          </p>
        </main>
      </body>
    </html>
  );
}