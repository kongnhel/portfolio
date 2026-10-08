import Image from "next/image";
import { site } from "@/data/site";
import { ProfilePhoto } from "@/components/profile-photo";

/**
 * The Home hero portrait: a 4:5 photo in a hard-edged frame with corner
 * brackets, a scanline sheen and a slow accent bloom behind it. Falls back to
 * the round `ProfilePhoto` when no hero photo is set, so the hero is never
 * empty.
 *
 * Each animation sits on its own element — `animate-float` and `animate-glow`
 * both use the `animation` shorthand, so they cannot share a node.
 */
export function HeroPortrait() {
  if (!site.heroPhotoUrl) {
    return <ProfilePhoto size={112} ring />;
  }

  return (
    <div className="relative w-[190px] shrink-0 sm:w-[248px]">
      {/* Breathing bloom behind the photo. */}
      <span
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -inset-6 bg-accent/20 blur-2xl"
      />

      <div className="animate-float brackets relative border border-base-800 bg-base-900">
        <div className="crt-image relative overflow-hidden">
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
          {/* Status LED in the corner, so the frame reads as an active capture. */}
          <span
            aria-hidden="true"
            className="led absolute bottom-3 left-3 bg-accent"
          />
        </div>
      </div>
    </div>
  );
}