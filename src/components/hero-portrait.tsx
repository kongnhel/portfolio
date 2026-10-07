import Image from "next/image";
import { site } from "@/data/site";
import { ProfilePhoto } from "@/components/profile-photo";

/**
 * The Home hero portrait: a 4:5 photo with a breathing accent glow, a slow
 * outward pulse and a gentle float. Falls back to the round `ProfilePhoto` when
 * no hero photo is set, so the hero is never empty.
 *
 * Each animation sits on its own element — `animate-float` and `animate-ring`
 * both use the `animation` shorthand, so they cannot share a node.
 */
export function HeroPortrait() {
  if (!site.heroPhotoUrl) {
    return <ProfilePhoto size={112} ring />;
  }

  return (
    <div className="relative w-[190px] shrink-0 sm:w-[248px]">
      {/* Breathing glow behind the photo. */}
      <span
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-accent/25 blur-2xl"
      />
      {/* Outward pulse, sized to the photo rather than a circle. */}
      <span
        aria-hidden="true"
        className="animate-ring pointer-events-none absolute inset-0 rounded-2xl border border-accent/50"
      />

      <div className="animate-float relative overflow-hidden rounded-2xl border border-base-800 bg-base-900">
        <Image
          src={site.heroPhotoUrl}
          alt={`${site.name}, portrait`}
          width={720}
          height={900}
          className="h-full w-full object-cover"
          // Static export serves images as-is; a plain <img> avoids an extra frame.
          priority
        />
        {/* Fades the bottom edge into the page background. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-950 to-transparent"
        />
      </div>
    </div>
  );
}
