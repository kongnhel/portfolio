"use client";

import { useEffect, useState } from "react";

/**
 * Section rail for long pages (used on the home page): a fixed column of
 * diamonds tracking which section currently fills the viewport, with the
 * section name appearing on hover/focus. Clicking a dot smooth-scrolls to
 * that section (the html element already has scroll padding for the sticky
 * header).
 *
 * The active section is decided by a single IntersectionObserver with a
 * narrow horizontal band across the middle of the screen: whichever section
 * intersects that band is "current". One state update per scroll landmark,
 * nothing per frame.
 *
 * Styling (.rail) only displays at >= 80rem, so tablets and phones never see
 * it; this component renders nothing meaningful there by design.
 */
export function SectionRail({
  sections,
  label,
}: {
  sections: { id: string; label: string }[];
  /** Accessible name for the rail's nav landmark. */
  label: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // A band across the vertical middle of the viewport: a section counts
    // as "on screen" while any part of it crosses the band.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // sections is a static array built at render time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav aria-label={label} className="rail">
      <ul>
        {sections.map(({ id, label: sectionLabel }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              aria-label={sectionLabel}
            >
              <i aria-hidden="true" />
              <span aria-hidden="true">{sectionLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
