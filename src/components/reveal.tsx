"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

export type RevealVariant = "up" | "fade" | "scale" | "left";

interface RevealProps {
  children: ReactNode;
  /** Which keyframe to play once the element enters the viewport. */
  variant?: RevealVariant;
  /** Milliseconds to wait before the animation starts — use to stagger groups. */
  delay?: number;
  duration?: number;
  /** How far to travel. Only used by the `up` variant. */
  y?: number;
  /** Element to render. Defaults to a plain div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Fades an element in the first time it scrolls into view.
 *
 * `data-state` is deliberately never rendered by React — it is written straight
 * onto the DOM node by the observer. That keeps hydration byte-identical with
 * the server output, means a parent re-render cannot reset an element that has
 * already animated, and avoids a state update inside an effect.
 *
 * Until it is marked `shown` the element is hidden by `html.js [data-reveal]`
 * in globals.css. Because the gate is the `js` class, a visitor without
 * scripting sees plain visible content rather than an empty page.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  y = 18,
  as: Tag = "div",
  className,
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver is near-universal, but if it is missing the element
    // must not stay hidden forever.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.state = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.state = "shown";
            observer.disconnect();
            break;
          }
        }
      },
      // Trigger just before the element reaches the bottom of the viewport,
      // and never wait for a threshold — a very tall block would never fire.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      data-variant={variant}
      className={className}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`,
        ...(variant === "up" ? { "--reveal-y": `${y}px` } : null),
      } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
