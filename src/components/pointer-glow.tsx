"use client";

import { useEffect, useRef } from "react";

/**
 * The "mouse hole": a soft accent spotlight that follows the cursor, plus a
 * matching highlight inside whichever card is under it.
 *
 * One passive listener writes two CSS custom properties on <html> (page
 * spotlight) and two on the hovered `[data-spotlight]` element (card
 * spotlight) — the stylesheet does the rest, so no component re-renders while
 * the pointer moves.
 *
 * Everything is skipped on touch devices and under `prefers-reduced-motion`,
 * where a light source chasing the pointer is either impossible or unwelcome.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layer = ref.current;
    if (!layer) return;

    // Coarse pointers (touch) get a static page instead of a moving one.
    const sync = () => {
      const enabled = fine.matches && !calm.matches;
      layer.classList.toggle("is-active", enabled);
      if (enabled) layer.removeAttribute("hidden");
      else layer.setAttribute("hidden", "");
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    let frame = 0;
    let queued: { x: number; y: number } | null = null;
    let lit: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      queued = { x: event.clientX, y: event.clientY };

      const card = (event.target as Element | null)?.closest?.(
        "[data-spotlight]",
      ) as HTMLElement | null;

      if (card !== lit) {
        lit?.removeAttribute("data-spot-lit");
        card?.setAttribute("data-spot-lit", "");
        lit = card;
      }
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
      }

      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!queued) return;
        document.documentElement.style.setProperty(
          "--pointer-x",
          `${queued.x}px`,
        );
        document.documentElement.style.setProperty(
          "--pointer-y",
          `${queued.y}px`,
        );
        queued = null;
      });
    };

    const onLeave = () => {
      document.documentElement.style.removeProperty("--pointer-x");
      document.documentElement.style.removeProperty("--pointer-y");
      lit?.removeAttribute("data-spot-lit");
      lit = null;
      layer.classList.remove("is-active");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return <div ref={ref} className="pointer-glow" aria-hidden="true" hidden />;
}
