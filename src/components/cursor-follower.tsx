"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor follower: a small accent dot riding the pointer and a larger
 * ring trailing behind it with a slower lerp. The ring expands while hovering
 * anything clickable — a quiet acknowledgement, never a takeover.
 *
 * The native cursor is never hidden, so clicking and text selection behave
 * exactly as before. The pair only becomes visible after the first real
 * pointermove (html.show-cursor), so it cannot flash at (0,0) on load, and it
 * is never rendered for touch devices or under `prefers-reduced-motion`.
 *
 * Like PointerGlow, the rAF loop writes transforms directly and stops as soon
 * as both elements settle — zero React re-renders while the pointer moves.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    let enabled = false;
    let shown = false;

    const sync = () => {
      enabled = fine.matches && !calm.matches;
      if (!enabled) {
        shown = false;
        root.classList.remove("show-cursor");
        ring.classList.remove("is-hot");
      }
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    let frame = 0;
    let running = false;
    const target = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.55;
      dotPos.y += (target.y - dotPos.y) * 0.55;
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;

      dot.style.transform = `translate3d(${dotPos.x.toFixed(1)}px, ${dotPos.y.toFixed(1)}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0)`;

      if (
        Math.abs(target.x - dotPos.x) < 0.25 &&
        Math.abs(target.y - dotPos.y) < 0.25 &&
        Math.abs(target.x - ringPos.x) < 0.25 &&
        Math.abs(target.y - ringPos.y) < 0.25
      ) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running || !enabled) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!enabled) return;
      target.x = event.clientX;
      target.y = event.clientY;
      // First contact: jump both elements to the pointer so they never
      // slide in from the top-left corner, then reveal.
      if (!shown) {
        shown = true;
        dotPos.x = ringPos.x = target.x;
        dotPos.y = ringPos.y = target.y;
        root.classList.add("show-cursor");
      }
      wake();
    };

    // Event delegation: one listener covers every link and button on the
    // page, no per-element bookkeeping.
    const HOT = "a, button, [role='button'], input, textarea, select, summary, label";
    const onOver = (event: PointerEvent) => {
      if (!enabled) return;
      const el = event.target;
      const hot =
        el instanceof Element && el.closest(HOT) !== null;
      ring.classList.toggle("is-hot", hot);
    };

    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        running = false;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("visibilitychange", onVisibility);
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      root.classList.remove("show-cursor");
    };
  }, []);

  return (
    <>
      <span ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <span ref={ringRef} aria-hidden="true" className="cursor-ring" />
    </>
  );
}
