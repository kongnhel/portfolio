import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { Tag } from "./section";
import { cn } from "@/lib/utils";
import type { ResolvedProject } from "@/data/projects";
import type { Dictionary } from "@/lib/i18n";
import { localisedPath, type Locale } from "@/lib/i18n";

export function ProjectCard({
  project,
  locale,
  dict,
  index = 0,
}: {
  project: ResolvedProject;
  locale: Locale;
  dict: Dictionary;
  /** Position in the list, used to stagger a group of cards. */
  index?: number;
}) {
  return (
    <Reveal
      as="article"
      variant="up"
      y={24}
      duration={700}
      delay={(index % 4) * 90}
      spotlight
      className="group spot-border relative flex flex-col border border-base-800 bg-base-900/40 transition-all duration-400 hover:border-accent/50 hover:bg-base-900 hover:shadow-[0_0_28px_-10px_var(--accent)]"
    >
      {/* Accent line that sweeps across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Window chrome: status LEDs on the left, category and year on the right. */}
      <div className="flex items-center gap-3 border-b border-base-800 bg-base-950/60 px-4 py-2">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-1.5 bg-accent-2/80" />
          <span className="size-1.5 bg-accent-3/80" />
          <span className="size-1.5 bg-accent/80" />
        </span>
        <span className="truncate font-mono text-xs uppercase tracking-wider text-accent">
          {dict.category[project.category]}
        </span>
        <span className="ml-auto shrink-0 font-mono text-xs text-base-700">
          {project.year}
        </span>
      </div>

      {/* Thumbnail: the first screenshot, cropped to a banner shape. */}
      {project.shots[0] ? (
        <div className="relative mb-5 overflow-hidden border-b border-base-800">
          <Image
            src={project.shots[0].src}
            alt=""
            width={project.shots[0].width}
            height={project.shots[0].height}
            className={cn(
              "h-32 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
              // A tall phone screenshot shows its middle; a wide one its top.
              project.shots[0].height > project.shots[0].width * 1.4
                ? "object-center"
                : "object-top",
            )}
            // The card thumbnail is decorative; the title beside it is the
            // accessible name, and the detail page carries the real alt text.
            aria-hidden="true"
          />
          {/* Fades the bottom edge into the panel and lays a faint scanline
              sheen over the shot so it matches the rest of the screen. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/30 to-transparent"
          />
          <span aria-hidden="true" className="crt-image pointer-events-none absolute inset-0" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="text-lg font-bold tracking-tight text-base-100 transition-colors duration-300 group-hover:text-accent">
          <Link href={localisedPath(locale, `/projects/${project.slug}`)}>
            {/* Stretched link makes the whole card clickable while keeping
                accessible link text. */}
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-base-500">
          {project.summary}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-base-800 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="translate-x-0 text-base-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 sm:-translate-x-2"
          >
            →
          </span>
        </div>
      </div>
    </Reveal>
  );
}