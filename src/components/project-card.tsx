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
      className="group sheen spot-border relative overflow-hidden rounded border border-base-800 bg-base-900/40 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-accent/40 hover:bg-base-900 hover:shadow-xl hover:shadow-accent/10"
    >
      {/* Accent line that sweeps across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Thumbnail: the first screenshot, cropped to a banner shape. */}
      {project.shots[0] ? (
        <div className="relative -mx-5 -mt-5 mb-5 overflow-hidden border-b border-base-800">
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
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/40 to-transparent"
          />
        </div>
      ) : null}

      <div className="relative flex items-baseline justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {dict.category[project.category]}
        </span>
        <span className="font-mono text-xs text-base-700">{project.year}</span>
      </div>

      <h3 className="relative mt-3 text-lg font-semibold tracking-tight text-base-100 transition-colors duration-300 group-hover:text-accent">
        <Link href={localisedPath(locale, `/projects/${project.slug}`)}>
          {/* Stretched link makes the whole card clickable while keeping
              accessible link text. */}
          <span className="absolute inset-0" aria-hidden="true" />
          {project.title}
        </Link>
      </h3>

      <p className="relative mt-2 text-sm leading-relaxed text-base-500">
        {project.summary}
      </p>

      <div className="relative mt-4 flex items-end justify-between gap-3">
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
    </Reveal>
  );
}
