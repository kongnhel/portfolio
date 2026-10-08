"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

/** Name of the event the toggle dispatches after mutating the document. */
const CHANGE_EVENT = "themechange";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Matches the server render, which has no access to the DOM. */
function getServerSnapshot(): Theme {
  return "light";
}

/** Labels come from the dictionary, so the parent passes them in. */
export function ThemeToggle({
  lightLabel,
  darkLabel,
}: {
  lightLabel: string;
  darkLabel: string;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function apply(next: Theme) {
    const isDark = next === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing: the choice simply will not persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? darkLabel : lightLabel;

  const icons: Record<Theme, React.ReactNode> = {
    light: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M16 4l-1.4 1.4M5.4 14.6L4 16M16 16l-1.4-1.4M5.4 5.4L4 4" strokeLinecap="round" />
      </svg>
    ),
    dark: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9z" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={label}
      title={label}
      className="border border-base-800 p-1.5 text-base-500 transition-colors hover:border-accent hover:text-accent"
    >
      {/* Keyed on the current theme so the icon spins in when it changes. */}
      <span key={theme} className="icon-swap block" aria-hidden="true">
        {icons[theme]}
      </span>
    </button>
  );
}