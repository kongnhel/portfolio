/**
 * Fixed decorative layers that sit behind the whole page: drifting colour
 * fields, a floating field of small "dust" motes inside a cursor-parallax
 * wrapper, the CRT refresh sweep, scanlines, a vignette and film grain.
 * Rendered once in the locale layout (and nowhere else) — they are
 * `aria-hidden`, ignore pointer events, and the animated ones are switched
 * off entirely under `prefers-reduced-motion`.
 *
 * Layer order matters: colour fields first, then geometry (grid via
 * body::before, orbs), then light (sweep), then surface (scanlines,
 * vignette) — everything stays inside the ambient stacking context at
 * z-index -1, so content always paints above.
 */
export function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="aurora aurora-1" />
        <span className="aurora aurora-2" />
        <span className="aurora aurora-3" />

        {/* The mote field rides a wrapper that the pointer gently displaces
            (see .parallax-near). aria-hidden bubbles up from .ambient. */}
        <div className="parallax-near">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
          <span className="orb orb-4 orb-square" />
          <span className="orb orb-5" />
          <span className="orb orb-6 orb-square" />
          <span className="orb orb-7" />
          <span className="orb orb-8" />
        </div>

        <span className="sweep" />
        <span className="scanlines" />
        <span className="vignette" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
