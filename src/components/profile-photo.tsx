import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Portrait photo, with a monogram fallback so the layout never shows a broken
 * image. Set `site.photoUrl` to a file in /public to display the photo.
 *
 * `ring` adds two decorative layers: a conic accent ring orbiting the portrait
 * and a slow outward pulse. Both are `aria-hidden` and both stop under
 * `prefers-reduced-motion`.
 */
export function ProfilePhoto({
  size = 96,
  className,
  ring = false,
}: {
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const shared =
    "relative z-10 rounded-full border border-base-800 bg-base-900 object-cover";

  const inner = site.photoUrl ? (
    <Image
      src={site.photoUrl}
      alt={`${site.name}, portrait`}
      width={size}
      height={size}
      className={cn(shared, className)}
      // Static export serves images as-is; a plain <img> avoids an extra frame.
      style={{ width: size, height: size }}
      priority
    />
  ) : (
    <div
      aria-hidden="true"
      className={cn(shared, "grid place-items-center font-mono text-base-500", className)}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {site.shortName}
    </div>
  );

  if (!ring) return inner;

  return (
    <div
      className="relative shrink-0 animate-float"
      style={{ width: size, height: size }}
    >
      <span aria-hidden="true" className="photo-ring" />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-accent/60 animate-ring"
      />
      {inner}
    </div>
  );
}
