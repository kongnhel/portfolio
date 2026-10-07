"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLabelKeys, navPaths, site } from "@/data/site";
import type { Dictionary } from "@/lib/i18n";
import { isSamePath, localeMeta, localisedPath, switchLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids an extra render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const labels = navPaths.map((path) => ({
    path,
    label: dict.nav[navLabelKeys[path]],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-base-800 bg-base-950/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-6">
        <Link
          href={localisedPath(locale)}
          className="group font-mono text-sm tracking-tight text-base-100 transition-colors hover:text-accent"
        >
          {site.shortName}
          <span className="text-accent transition-transform duration-300 group-hover:rotate-12 inline-block">
            .
          </span>
        </Link>

        <nav aria-label="Main" className="relative hidden items-center sm:flex">
          <NavPill pathname={pathname} locale={locale} />
          {labels.map(({ path, label }) => {
            const href = localisedPath(locale, path);
            const active = isSamePath(pathname, href);
            return (
              <Link
                key={path}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative z-10 rounded px-3 py-1.5 text-sm transition-colors duration-200",
                  active ? "text-base-100" : "text-base-500 hover:text-base-100",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher
            locale={locale}
            pathname={pathname}
            label={dict.language.switchTo}
          />
          <ThemeToggle lightLabel={dict.theme.light} darkLabel={dict.theme.dark} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded p-1.5 text-base-300 transition-colors hover:text-accent sm:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="icon-swap block" key={open ? "close" : "open"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
                )}
              </svg>
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        aria-hidden={!open}
        inert={!open}
        className={cn("mobile-nav", open && "is-open")}
      >
        <div>
          <ul className="mx-auto max-w-3xl border-t border-base-800 px-6 py-2">
            {labels.map(({ path, label }, index) => {
              const href = localisedPath(locale, path);
              return (
                <li
                  key={path}
                  className="transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: open ? `${index * 45 + 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={href}
                    aria-current={isSamePath(pathname, href) ? "page" : undefined}
                    className={cn(
                      "block rounded px-2 py-2.5 transition-colors hover:bg-base-900 hover:text-accent",
                      isSamePath(pathname, href)
                        ? "text-accent"
                        : "text-base-300",
                    )}
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "none" : "translateX(-8px)",
                      transition: "opacity 300ms ease, transform 300ms ease",
                      transitionDelay: open ? `${index * 45 + 60}ms` : "0ms",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <ScrollProgress />
    </header>
  );
}

/**
 * Highlight that slides between nav items. It is measured after paint (and
 * whenever the header resizes, e.g. when the webfont swaps in), so it starts
 * invisible to avoid a jump from a guessed position.
 */
function NavPill({ pathname, locale }: { pathname: string; locale: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const container = ref.current?.parentElement;
    const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!container || !active) {
      setBox(null);
      return;
    }

    const measure = () =>
      setBox({ left: active.offsetLeft, width: active.offsetWidth });

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(active);
    return () => observer.disconnect();
  }, [pathname, locale]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="nav-pill"
      style={{
        left: box?.left ?? 0,
        width: box?.width ?? 0,
        opacity: box ? 1 : 0,
      }}
    />
  );
}

function LanguageSwitcher({
  locale,
  pathname,
  label,
}: {
  locale: Locale;
  pathname: string;
  label: string;
}) {
  const other: Locale = locale === "en" ? "km" : "en";

  return (
    <Link
      href={switchLocale(pathname, other)}
      hrefLang={localeMeta[other].htmlLang}
      // Replaces the current entry in history so Back does not toggle language.
      replace
      className="rounded px-2 py-1.5 font-mono text-xs text-base-500 transition-colors hover:text-accent"
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{localeMeta[other].short}</span>
    </Link>
  );
}
