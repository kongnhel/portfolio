"use client";

import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/tech-icon";

/**
 * Appears once the page has been scrolled, scrolls smoothly back to the top.
 * Rendered only after the first scroll so it never competes with the content
 * on a fresh load.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(window.scrollY > 600);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`inline-flex items-center gap-2 border border-base-800 px-3 py-3.5 font-mono text-xs text-base-500 transition-all duration-300 hover:border-accent hover:text-accent sm:py-2 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <SocialIcon kind="external" className="size-3 -rotate-45" />
      {label}
      <span aria-hidden="true">↑</span>
    </button>
  );
}
