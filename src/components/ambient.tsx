/**
 * Fixed decorative layers that sit behind the whole page: drifting colour
 * fields and a film grain. Rendered once in the locale layout (and nowhere
 * else) — they are `aria-hidden`, ignore pointer events, and are switched off
 * entirely under `prefers-reduced-motion`.
 */
export function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="aurora aurora-1" />
        <span className="aurora aurora-2" />
        <span className="aurora aurora-3" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
