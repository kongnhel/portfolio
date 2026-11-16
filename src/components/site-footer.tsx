import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BackToTop } from "@/components/back-to-top";
import { SocialIcon } from "@/components/tech-icon";
import { navLabelKeys, navPaths, site } from "@/data/site";
import type { Dictionary } from "@/lib/i18n";
import { localisedPath, type Locale } from "@/lib/i18n";

const socialKinds: Record<string, "github" | "telegram" | "facebook"> = {
  GitHub: "github",
  Telegram: "telegram",
  Facebook: "facebook",
};

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
        className="mx-auto max-w-4xl px-5 py-10 sm:px-6"
      >
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            {/* Session-style status line, as printed by `whoami`. */}
            <p aria-hidden="true" className="font-mono text-sm text-base-100">
              <span className="prompt">nhel@portfolio</span>
              <span className="text-base-700">:~$</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-base-500">
              {site.name} — {dict.identity.tagline}
            </p>
            <p className="mt-2 font-mono text-xs text-base-700">
              {dict.identity.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-wider text-base-700">
              <span aria-hidden="true" className="prompt">
                cd{" "}
              </span>
              {dict.footer.pages}
            </h2>
            <ul className="mt-3 space-y-2">
              {navPaths.map((path) => (
                <li key={path}>
                  <Link
                    href={localisedPath(locale, path)}
                    className="link-underline font-mono text-sm text-base-500 transition-colors hover:text-base-100"
                  >
                    {dict.nav[navLabelKeys[path]]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-base-700">
              <span aria-hidden="true" className="prompt">
                ls{" "}
              </span>
              {dict.footer.elsewhere}
            </h2>
            <ul className="mt-3 space-y-2">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-base-500 transition-colors hover:text-accent"
                  >
                    <SocialIcon
                      kind={socialKinds[social.label] ?? "external"}
                      className="size-3.5"
                    />
                    {social.label}
                    <span aria-hidden="true" className="text-base-700">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={localisedPath(locale, "/contact")}
                  className="inline-flex items-center gap-2 font-mono text-sm text-base-500 transition-colors hover:text-accent"
                >
                  <SocialIcon kind="mail" className="size-3.5" />
                  {dict.contactPage.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-base-800 pt-4">
          <p className="flex items-center gap-2 font-mono text-xs text-base-700">
            <span aria-hidden="true" className="led" />
            {dict.footer.builtWith}
          </p>
          <BackToTop label={dict.footer.backToTop} />
        </div>
      </Reveal>
    </footer>
  );
}
