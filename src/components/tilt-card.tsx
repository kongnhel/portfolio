"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cursor-responsive card driver. Writes two pairs of CSS variables on the
 * wrapper and lets globals.css do the drawing:
 *
 *   --tilt-x/--tilt-y  pointer position as ±2.4deg of perspective rotation;
 *   --glare-x/--glare-y  pointer position in %, aimed at the .card-glare
 *                        radial highlight inside the card.
 *
 * The component never touches React state and pauses its rAF when the
 * pointer is still. Rotation is deliberately tiny (2.4deg max) — the effect
 * should read as physical depth, not a gimmick. Disabled entirely for touch
 * devices and under `prefers-reduced-motion`: the vars simply stay at their
 * defaults, so the CSS renders a plain card.
 */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const reset = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      // Glare position is left as-is: the highlight fades out via CSS, and
      // keeping the last position avoids a visible slide on re-entry.
    };

    const sync = () => {
      if (!fine.matches || calm.matches) reset();
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const rect = el.getBoundingClientRect();
      const nx = Math.min(
        Math.max(((pending.x - rect.left) / rect.width) * 2 - 1, -1),
        1,
      );
      const ny = Math.min(
        Math.max(((pending.y - rect.top) / rect.height) * 2 - 1, -1),
        1,
      );
      el.style.setProperty("--tilt-x", `${(nx * 2.4).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(-ny * 2.4).toFixed(2)}deg`);
      el.style.setProperty(
        "--glare-x",
        `${(((nx + 1) / 2) * 100).toFixed(1)}%`,
      );
      el.style.setProperty(
        "--glare-y",
        `${(((ny + 1) / 2) * 100).toFixed(1)}%`,
      );
      pending = null;
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || calm.matches) return;
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      pending = null;
      reset();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={ref} className={cn("tilt-wrap", className)}>
      {children}
    </div>
  );
}
