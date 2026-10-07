"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-mounts its subtree whenever the route changes so the CSS entrance
 * animation replays on every navigation.
 *
 * Keying on the pathname is deliberate: React discards the old DOM and builds
 * fresh, which is exactly what makes the animation run again. The fade is
 * short (320ms in globals.css) so it reads as a soft cut rather than a wait.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
