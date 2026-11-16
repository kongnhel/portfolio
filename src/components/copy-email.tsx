"use client";

import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/tech-icon";

type CopyState = "idle" | "copied" | "failed";

/**
 * Copies the contact email to the clipboard. Falls back to the legacy
 * execCommand path when the async Clipboard API is unavailable (older
 * browsers, non-secure contexts), and shows visible feedback either way.
 */
export function CopyEmail({
  email,
  label,
  copiedLabel,
  failedLabel,
}: {
  email: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function flash(next: Exclude<CopyState, "idle">) {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        flash("copied");
        return;
      }
      throw new Error("no async clipboard");
    } catch {
      // Legacy path: select-and-copy a temporary textarea.
      try {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        flash(ok ? "copied" : "failed");
      } catch {
        flash("failed");
      }
    }
  }

  const text =
    state === "copied"
      ? copiedLabel
      : state === "failed"
        ? failedLabel
        : label;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}: ${email}`}
      className="inline-flex items-center gap-1.5 border border-base-800 px-3.5 py-2.5 font-mono text-xs text-base-500 transition-colors hover:border-accent/60 hover:text-accent sm:px-2 sm:py-1"
    >
      <SocialIcon
        kind="copy"
        className={`size-3 ${state === "copied" ? "text-accent" : ""}`}
      />
      <span className={state === "copied" ? "text-accent" : state === "failed" ? "text-danger" : ""}>
        {text}
      </span>
    </button>
  );
}
