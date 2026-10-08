import type { ResolvedEntry } from "@/data/experience";
import { Reveal } from "./reveal";

export function Timeline({ entries }: { entries: ResolvedEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <Reveal variant="fade" duration={900} className="relative">
      {/* Replaces the old border-l so the line can draw itself in. */}
      <span
        aria-hidden="true"
        className="timeline-rail absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-accent via-base-800 to-transparent"
      />

      <ol className="relative space-y-8 pl-6">
        {entries.map((entry, index) => (
          <Reveal
            as="li"
            key={`${entry.title}-${entry.organisation}-${entry.period}`}
            variant="up"
            y={14}
            duration={650}
            delay={index * 110}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="timeline-dot absolute top-1.5 -left-[1.9rem] size-2.5 border-2 border-base-950 bg-accent shadow-[0_0_10px_-1px_var(--accent)]"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-base-700">
              {entry.period}
            </p>
            <h3 className="mt-1 font-bold text-base-100">{entry.title}</h3>
            <p className="text-sm text-accent">{entry.organisation}</p>
            <ul className="mt-2 space-y-1.5">
              {entry.points.map((point) => (
                <li
                  key={point}
                  className="text-sm leading-relaxed text-base-500 before:mr-2 before:text-accent before:content-['-']"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Reveal>
  );
}