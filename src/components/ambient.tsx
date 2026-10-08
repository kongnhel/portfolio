/**
 * Fixed decorative layers that sit behind the whole page: drifting colour
 * fields, the CRT refresh sweep, scanlines, a vignette and film grain.
 * Rendered once in the locale layout (and nowhere else) — they are
 * `aria-hidden`, ignore pointer events, and the animated ones are switched off
 * entirely under `prefers-reduced-motion`.
 */
export function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="aurora aurora-1" />
        <span className="aurora aurora-2" />
        <span className="aurora aurora-3" />
        <span className="sweep" />
        <span className="scanlines" />
        <span className="vignette" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}