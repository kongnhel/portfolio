import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";
import { SocialIcon, TechBadge } from "./tech-icon";
import type { ResolvedProject } from "@/data/projects";
import type { Dictionary } from "@/lib/i18n";
import { localisedPath, type Locale } from "@/lib/i18n";

/**
 * A project as a portfolio case-study card: screenshot on top (visible on
 * every breakpoint — the old row layout hid the image entirely on phones),
 * then category/year, title, summary, tech badges and — where a project has
 * one — live/source links.
 *
 * Interaction kit (desktop, fine pointers only — every piece degrades to a
 * plain card on touch or reduced motion):
 *   - TiltCard writes the --tilt and --glare variable pairs from the pointer
 *     position;
 *   - .card-ring spins a conic accent border on hover/focus;
 *   - .card-glare pools light under the cursor;
 *   - .img-wipe curtains the screenshot open when the card scrolls in;
 *   - .badge-wave ripples the tech chips on hover.
 *
 * Click model: the title is a real link whose ::after stretches over the
 * whole card, so the click target is the full card while the body text stays
 * selectable. The external links sit above that stretched layer (z-20) and
 * remain individually tappable. Focus is announced by the link and shown by
 * the card's focus-within ring.
 */
export function ProjectCard({
  project,
  locale,
  dict,
  index = 0,
}: {
  project: ResolvedProject;
  locale: Locale;
  dict: Dictionary;
  /** Position in the grid, used to stagger a group of cards. */
  index?: number;
}) {
  const shot = project.shots[0];

  return (
    <Reveal
      variant="up"
      y={18}
      duration={650}
      // Capped so a long grid does not leave the last cards waiting.
      delay={Math.min(index, 5) * 70}
      className="group relative h-full"
    >
      <TiltCard className="h-full">
        <article className="card card-hover card-ring relative flex h-full flex-col overflow-hidden focus-within:border-accent/60 focus-within:shadow-[var(--glow-soft)]">
          {/* Screenshot: wipes open as the card lands, zooms on hover. */}
          <div className="zoom-img img-wipe relative aspect-16/10 overflow-hidden border-b border-base-800 bg-base-900">
            {shot ? (
              <Image
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid h-full place-items-center bg-linear-to-br from-base-900 to-base-850 text-accent/50"
              >
                <SocialIcon kind="code" className="size-10" />
              </span>
            )}
            {/* Sheen that ties the imagery into the CRT language. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-base-950/50 via-transparent to-transparent"
            />
            <span
              aria-hidden="true"
              className="led absolute right-3 top-3 bg-accent"
            />
          </div>

          {/* Body — deliberately NOT positioned, so the title link's
              stretched ::after resolves against the article and covers the
              whole card as the click target. */}
          <div className="flex flex-1 flex-col p-5">
            <p className="font-mono text-xs uppercase tracking-wider">
              <span className="text-accent">{dict.category[project.category]}</span>
              <span aria-hidden="true" className="px-2 text-base-700">
                ·
              </span>
              <span className="text-base-700">{project.year}</span>
            </p>

            <h3 className="mt-2 text-lg font-bold tracking-tight text-base-100 transition-colors duration-200 group-hover:text-accent">
              <Link
                href={localisedPath(locale, `/projects/${project.slug}`)}
                aria-label={`${project.title} — ${dict.project.viewCaseStudy}`}
                // Stretches the click target across the whole card.
                className="after:absolute after:inset-0 after:z-10 after:content-['']"
              >
                {project.title}
              </Link>
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-base-500 line-clamp-3">
              {project.summary}
            </p>

            <ul className="badge-wave mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <TechBadge name={tag} />
                </li>
              ))}
            </ul>
          </div>

          {/* Cursor-pooled light, above the screenshot sheen, below links. */}
          <span aria-hidden="true" className="card-glare" />

          {/* External links stay individually tappable above the stretched one. */}
          {project.links.length > 0 ? (
            <div className="relative z-20 flex flex-wrap gap-2 border-t border-base-800 px-5 py-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // py/-my pairs: ~44px tap rows on phones, compact on hover.
                  className="-my-3 inline-flex items-center gap-1.5 px-1 py-3 font-mono text-xs text-base-500 transition-colors hover:text-accent sm:-my-1 sm:py-1"
                >
                  <SocialIcon kind="external" className="size-3" />
                  {dict.project[link.labelKey]}
                </a>
              ))}
            </div>
          ) : null}
        </article>
      </TiltCard>
    </Reveal>
  );
}
