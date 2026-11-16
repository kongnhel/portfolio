"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gentle scroll parallax. The outer node is measured; the inner node is
 * translated by a fraction of its distance from the viewport's vertical
 * centre, so elements drift at their own "depth" while the page scrolls.
 * Measuring the untransformed wrapper and transforming the child avoids the
 * classic feedback loop where getBoundingClientRect sees the transform it
 * just wrote.
 *
 * The offset is capped by `speed * 120px`, which at the recommended 0.06–0.1
 * keeps the drift inside a few tens of pixels — ambient depth, not a ride.
 * Disabled for touch devices and under `prefers-reduced-motion` (the inner
 * node returns to transform:none), and the rAF work stops when the tab is
 * hidden.
 */
export function Parallax({
  children,
  speed = 0.07,
  className,
}: {
  children: ReactNode;
  /** Fraction of viewport-centre distance to apply. Keep below 0.15. */
  speed?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let enabled = false;

    const sync = () => {
      enabled = fine.matches && !calm.matches;
      if (!enabled) inner.style.transform = "";
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    let frame = 0;
    let scheduled = false;

    const update = () => {
      frame = 0;
      scheduled = false;
      if (!enabled) return;
      const rect = outer.getBoundingClientRect();
      const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
      const drift = Math.max(
        Math.min(centre * speed, speed * 120),
        -speed * 120,
      );
      inner.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0)`;
    };

    const schedule = () => {
      if (scheduled || !enabled) return;
      scheduled = true;
      frame = requestAnimationFrame(update);
    };

    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        scheduled = false;
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibility);
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      inner.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
