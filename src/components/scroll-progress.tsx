"use client";

import { useEffect, useRef } from "react";

/**
 * Thin accent bar pinned to the bottom of the sticky header showing how far
 * through the page the visitor has read.
 *
 * It writes to the DOM directly rather than through state: a scroll handler
 * that re-rendered React on every frame would be wasteful for a purely visual
 * detail. React only ever renders the initial `scaleX(0)`, and because the
 * inline style prop never changes it does not clobber the mutated value.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
