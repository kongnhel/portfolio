import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import type { ResolvedProject } from "@/data/projects";
import type { Dictionary } from "@/lib/i18n";
import { localisedPath, type Locale } from "@/lib/i18n";

/**
 * One row of the project listing, styled as terminal `ls` output: a fixed-width
 * index column, the title, then its metadata indented underneath, and a small
 * screenshot thumbnail.
 *
 * The whole row is a single link, so the click target is the full row rather
 * than just the title. Only the category and title are read out — the index,
 * year, summary, tags and thumbnail are `aria-hidden` so the link's accessible
 * name stays short. The summary and tags are repeated on the detail page.
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
  /** Position in the list, used to stagger a group of rows. */
  index?: number;
}) {
  return (
    <Reveal
      variant="up"
      y={14}
      duration={550}
      // Capped so a long listing does not leave the last rows waiting.
      delay={Math.min(index, 6) * 55}
      className="group relative"
    >
      <Link
        href={localisedPath(locale, `/projects/${project.slug}`)}
        className="flex items-start gap-3 px-2 py-5 transition-colors duration-200 hover:bg-base-900/70 sm:gap-5 sm:px-4"
      >
        {/* Accent bar that grows down the left edge on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
        />

        {/* Index column, aligned across every row so the list reads as a table. */}
        <span
          aria-hidden="true"
          className="w-6 shrink-0 pt-0.5 text-right font-mono text-xs text-base-700 tabular-nums transition-colors group-hover:text-accent sm:w-8"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <h3 className="text-base font-bold tracking-tight text-base-100 transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>

          <p className="mt-1.5 font-mono text-xs text-base-700">
            <span className="uppercase tracking-wider text-accent">
              {dict.category[project.category]}
            </span>
            <span aria-hidden="true" className="px-2 text-base-800">
              ·
            </span>
            {project.year}
          </p>

          <p
            aria-hidden="true"
            className="mt-2 max-w-prose text-sm leading-relaxed text-base-500 line-clamp-2"
          >
            {project.summary}
          </p>

          <p aria-hidden="true" className="mt-2 font-mono text-xs text-base-700">
            {project.tags.join("  ·  ")}
          </p>
        </span>

        {/* Thumbnail: the first screenshot, cropped to a small preview. */}
        {project.shots[0] ? (
          <span
            aria-hidden="true"
            className="relative hidden h-16 w-24 shrink-0 overflow-hidden border border-base-800 transition-colors duration-300 group-hover:border-accent/50 sm:block"
          >
            <Image
              src={project.shots[0].src}
              alt=""
              width={project.shots[0].width}
              height={project.shots[0].height}
              className="h-full w-full object-cover"
            />
            {/* No scanline sheen here: at 96px the 3px lines turn the preview to
                mush. The full-size shots on the detail page still carry it. */}
          </span>
        ) : null}

        <span
          aria-hidden="true"
          className="shrink-0 pt-0.5 text-base-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
        >
          →
        </span>
      </Link>
    </Reveal>
  );
}