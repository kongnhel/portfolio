import Image from "next/image";
import { site } from "@/data/site";
import { ProfilePhoto } from "@/components/profile-photo";

/**
 * The Home hero portrait: a 4:5 photo in a clean frame with a slow cyan
 * bloom behind it, a violet fill light from the opposite side and a
 * floating availability chip. Falls back to the round `ProfilePhoto` when
 * no hero photo is set, so the hero is never empty.
 *
 * Each animation sits on its own element — `animate-float` and `animate-glow`
 * both use the `animation` shorthand, so they cannot share a node.
 */
export function HeroPortrait() {
  if (!site.heroPhotoUrl) {
    return <ProfilePhoto size={128} ring />;
  }

  return (
    <div className="relative w-[220px] shrink-0 sm:w-[264px]">
      {/* Breathing blooms behind the photo: cyan is the key light, violet a
          low fill from the other side. Two animations, two nodes — they
          share the `animation` shorthand and cannot coexist on one. */}
      <span
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -inset-8 bg-accent/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="hero-bloom-2 pointer-events-none absolute"
      />

      <div className="animate-float relative border border-base-800 bg-base-900 shadow-[var(--glow-soft)]">
        <div className="relative overflow-hidden">
          <Image
            src={site.heroPhotoUrl}
            alt={`${site.name}, portrait`}
            width={720}
            height={900}
            sizes="(min-width: 640px) 264px, 220px"
            className="h-full w-full object-cover"
            // Static export serves images as-is; a plain <img> avoids an extra frame.
            priority
          />
          {/* Fades the bottom edge into the page background. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-base-950 to-transparent"
          />
        </div>
      </div>

      {/* Status chip: the "live capture" readout. */}
      <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-base-800 bg-base-950/95 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-base-300 shadow-[var(--glow-soft)]">
        <span aria-hidden="true" className="led" />
        {site.name}
        <span aria-hidden="true" className="text-accent">
          ·online
        </span>
      </span>
    </div>
  );
}
