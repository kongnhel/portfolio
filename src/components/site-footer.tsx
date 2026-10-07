import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { navLabelKeys, navPaths, site } from "@/data/site";
import type { Dictionary } from "@/lib/i18n";
import { localisedPath, type Locale } from "@/lib/i18n";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="mt-24 border-t border-base-800">
      <Reveal
        as="div"
        variant="fade"
        duration={800}
        className="mx-auto max-w-3xl px-6 py-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-base-500">
              {site.name} — {dict.identity.tagline}
            </p>
            <p className="mt-1 font-mono text-xs text-base-700">
              {dict.identity.location}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <nav aria-label="Footer">
              <h2 className="font-mono text-xs uppercase tracking-wider text-base-700">
                {dict.footer.pages}
              </h2>
              <ul className="mt-2 space-y-1.5">
                {navPaths.map((path) => (
                  <li key={path}>
                    <Link
                      href={localisedPath(locale, path)}
                      className="text-sm text-base-500 hover:text-accent"
                    >
                      {dict.nav[navLabelKeys[path]]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-base-700">
                {dict.footer.elsewhere}
              </h2>
              <ul className="mt-2 space-y-1.5">
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-base-500 hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href={localisedPath(locale, "/contact")}
                    className="text-sm text-base-500 hover:text-accent"
                  >
                    {dict.contactPage.email}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-xs text-base-700">
          {dict.footer.builtWith}
        </p>
      </Reveal>
    </footer>
  );
}