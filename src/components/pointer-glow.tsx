"use client";

import { useEffect, useRef } from "react";

/**
 * The "mouse hole": a soft accent spotlight that follows the cursor.
 *
 * One passive listener records the pointer; a single rAF loop lerps the
 * rendered position toward it, so the light *trails* the pointer instead of
 * snapping to it. The loop writes three pairs of CSS custom properties on
 * <html> and the stylesheet does the rest:
 *
 *   --pointer-x/y  px coordinates for the spotlight (and card glare);
 *   --par-x/y      the same position normalised to -1..1, consumed by the
 *                  background's .parallax-near layer for depth.
 *
 * Writing stops as soon as the position settles, so an idle cursor costs
 * nothing, and the loop also parks itself while the tab is hidden.
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
      if (!enabled) clear();
    };

    const root = document.documentElement.style;
    let frame = 0;
    let running = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const clear = () => {
      root.removeProperty("--pointer-x");
      root.removeProperty("--pointer-y");
      root.removeProperty("--par-x");
      root.removeProperty("--par-y");
    };

    const tick = () => {
      // The light keeps ~12% per frame of the remaining distance: fast
      // enough to feel attached, slow enough to read as weight.
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      root.setProperty("--pointer-x", `${current.x.toFixed(1)}px`);
      root.setProperty("--pointer-y", `${current.y.toFixed(1)}px`);
      root.setProperty(
        "--par-x",
        ((current.x / window.innerWidth) * 2 - 1).toFixed(3),
      );
      root.setProperty(
        "--par-y",
        ((current.y / window.innerHeight) * 2 - 1).toFixed(3),
      );

      // Settle: within a third of a pixel the loop stops and waits for the
      // next pointermove instead of burning frames on invisible motion.
      if (
        Math.abs(target.x - current.x) < 0.3 &&
        Math.abs(target.y - current.y) < 0.3
      ) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || calm.matches) return;
      target.x = event.clientX;
      target.y = event.clientY;
      wake();
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      running = false;
      clear();
    };

    const onVisibility = () => {
      // Park this loop while hidden; also flip the document-level class that
      // pauses the ambient CSS animations (see html.tab-hidden in globals.css)
      // so backgrounded tabs do not keep compositing the scene.
      document.documentElement.classList.toggle("tab-hidden", document.hidden);
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        running = false;
      }
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      clear();
    };
  }, []);

  return <div ref={ref} className="pointer-glow" aria-hidden="true" hidden />;
}
