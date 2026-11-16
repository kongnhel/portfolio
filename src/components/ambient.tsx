"use client";

import { useEffect, useRef } from "react";

/**
 * Digital matrix background.
 *
 * One fixed scene behind the whole site, painted in three registers:
 *   • CSS layers (mx-base / mx-sky / mx-horizon / mx-floor-glow) for the
 *     midnight base, drifting neon washes and the glowing horizon;
 *   • a streaks canvas for the falling light rain (pre-rendered sprites,
 *     drawImage only — no per-frame gradients or shadows);
 *   • a floor canvas for the perspective binary plane, data lines and
 *     converging depth rays.
 *
 * Performance contract:
 *   • one rAF loop for both canvases, paused when the tab is hidden;
 *   • device-aware budgets (streak count, glyph density, pixel ratio);
 *   • static single frame under prefers-reduced-motion;
 *   • palette and rendering are theme-independent: the scene looks exactly
 *     the same in light and dark mode, so no theme change can wash it out.
 */

type Streak = {
  x: number;
  y: number;
  len: number;
  speed: number;
  w: number;
  alpha: number;
  ci: number;
  ph: number;
  rate: number;
};

type Palette = {
  streaks: string[];
  bit: string[];
  lines: string[];
  ray: string;
  alphaScale: number;
  additive: boolean;
};

const DARK_PALETTE: Palette = {
  streaks: ["#3ee6ff", "#4f8bff", "#a06bff", "#ff4fd8", "#ff3f62"],
  bit: ["#66e4ff", "#7ea6ff", "#b48cff", "#ff7ade", "#ff6478"],
  lines: ["#3ee6ff", "#a06bff", "#ff4fd8"],
  ray: "#5f6fff",
  alphaScale: 1,
  additive: true,
};

function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** Pre-renders one streak colour: a soft glow band with a bright head. */
function makeSprite(hex: string): HTMLCanvasElement {
  const W = 64;
  const H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, rgba(hex, 0));
  grad.addColorStop(0.55, rgba(hex, 0.12));
  grad.addColorStop(0.85, rgba(hex, 0.55));
  grad.addColorStop(1, rgba(hex, 1));

  g.globalCompositeOperation = "lighter";
  g.strokeStyle = grad;
  g.lineCap = "round";
  // Layered strokes: wide faint halo, mid glow, bright core.
  for (const [lw, a] of [
    [26, 0.08],
    [12, 0.18],
    [5, 0.55],
    [2.4, 1],
  ] as const) {
    g.globalAlpha = a;
    g.lineWidth = lw;
    g.beginPath();
    g.moveTo(W / 2, 0);
    g.lineTo(W / 2, H);
    g.stroke();
  }
  return c;
}

export function Ambient() {
  const streakRef = useRef<HTMLCanvasElement>(null);
  const floorRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const streakCanvas = streakRef.current;
    const floorCanvas = floorRef.current;
    if (!streakCanvas || !floorCanvas) return;
    const sctx = streakCanvas.getContext("2d");
    const fctx = floorCanvas.getContext("2d");
    if (!sctx || !fctx) return;

    const compactMq = window.matchMedia("(max-width: 767px)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const budget = () => {
      const compact = compactMq.matches || coarseMq.matches;
      return {
        streaks: compact ? 11 : 30,
        rows: compact ? 8 : 12,
        maxLen: compact ? 150 : 340,
        dprCap: compact ? 1.25 : 1.5,
      };
    };

    const palette = DARK_PALETTE;
    const sprites: HTMLCanvasElement[] = palette.streaks.map(makeSprite);
    let streaks: Streak[] = [];
    let rows: { chars: number[] }[] = [];
    let vw = 0;
    let vh = 0;
    let fw = 0;
    let fh = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let last = 0;
    let t = 0;

    function spawn(s: Streak, initial: boolean) {
      const b = budget();
      s.x = Math.random() * vw;
      s.len = 60 + Math.random() * (b.maxLen - 60);
      s.speed = 60 + Math.random() * 260;
      s.w = 0.8 + Math.random() * 1.5;
      s.alpha = 0.18 + Math.random() * 0.34;
      s.ci = Math.floor(Math.random() * palette.streaks.length);
      s.y = initial
        ? Math.random() * (vh + 200) - 100
        : -s.len - Math.random() * vh * 0.35;
      s.ph = Math.random() * Math.PI * 2;
      s.rate = 0.4 + Math.random() * 1.1;
    }

    function resize() {
      const b = budget();
      vw = window.innerWidth;
      vh = window.innerHeight;
      const rect = floorCanvas!.getBoundingClientRect();
      fw = rect.width;
      fh = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, b.dprCap);

      streakCanvas!.width = Math.max(1, Math.round(vw * dpr));
      streakCanvas!.height = Math.max(1, Math.round(vh * dpr));
      sctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      floorCanvas!.width = Math.max(1, Math.round(fw * dpr));
      floorCanvas!.height = Math.max(1, Math.round(fh * dpr));
      fctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (streaks.length !== b.streaks) {
        streaks = Array.from({ length: b.streaks }, () => {
          const s = {} as Streak;
          spawn(s, true);
          return s;
        });
      }
      if (rows.length !== b.rows) {
        rows = Array.from({ length: b.rows }, () => ({ chars: [] }));
      }
      if (reducedMq.matches) drawStatic();
    }

    function drawStreaks(dt: number) {
      sctx!.clearRect(0, 0, vw, vh);
      sctx!.globalCompositeOperation = palette.additive ? "lighter" : "source-over";
      for (const s of streaks) {
        if (dt > 0) {
          s.y += s.speed * dt;
          if (s.y - s.len > vh) spawn(s, false);
        }
        const flicker = 0.82 + 0.18 * Math.sin(t * s.rate + s.ph);
        sctx!.globalAlpha = Math.min(0.55, s.alpha * flicker) * palette.alphaScale;
        const dw = Math.max(9, s.w * 14);
        sctx!.drawImage(
          sprites[s.ci] ?? sprites[0],
          s.x - dw / 2,
          s.y - s.len,
          dw,
          s.len,
        );
      }
      sctx!.globalAlpha = 1;
    }

    function drawFloor() {
      fctx!.clearRect(0, 0, fw, fh);
      fctx!.globalCompositeOperation = palette.additive ? "lighter" : "source-over";
      const cx = fw / 2;
      const n = rows.length;
      const phase = (t / 16) % 1;

      // Converging depth rays — the only vertical lines, and faint enough
      // to read as perspective rather than a grid.
      fctx!.globalAlpha = 0.05 * palette.alphaScale;
      fctx!.strokeStyle = palette.ray;
      fctx!.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        if (i === 0) continue;
        fctx!.beginPath();
        fctx!.moveTo(cx, 0);
        fctx!.lineTo(cx + i * fw * 0.13, fh);
        fctx!.stroke();
      }

      // Glowing horizontal data lines, scrolling toward the viewer.
      const lineCount = n > 8 ? 6 : 4;
      for (let i = 0; i < lineCount; i++) {
        const tt = (i / lineCount + phase) % 1;
        const y = Math.pow(tt, 2.1) * fh;
        const color = palette.lines[i % palette.lines.length];
        const grad = fctx!.createLinearGradient(0, 0, fw, 0);
        grad.addColorStop(0, rgba(color, 0));
        grad.addColorStop(0.5, rgba(color, (0.12 + tt * 0.32) * palette.alphaScale));
        grad.addColorStop(1, rgba(color, 0));
        fctx!.globalAlpha = 0.85;
        fctx!.strokeStyle = grad;
        fctx!.lineWidth = 0.6 + tt * 1.6;
        fctx!.beginPath();
        fctx!.moveTo(0, y);
        fctx!.lineTo(fw, y);
        fctx!.stroke();
      }

      // Binary rows. Each row owns its characters; they flip slowly and the
      // row string is rebuilt whenever the perspective width changes.
      for (let i = 0; i < n; i++) {
        const tt = ((i + phase) % n) / n;
        const y = Math.pow(tt, 2.1) * fh;
        const size = 8 + tt * 11;
        const spread = (0.14 + 0.86 * tt) * fw;
        const count = Math.max(5, Math.round(spread / (size * 1.6)));
        const row = rows[i];
        if (row.chars.length !== count) {
          row.chars = Array.from({ length: count }, () =>
            Math.random() < 0.5 ? 0 : 1,
          );
        } else if (Math.random() < 0.02) {
          row.chars[Math.floor(Math.random() * count)] ^= 1;
        }

        const color = palette.bit[i % palette.bit.length];
        const baseAlpha = (0.09 + tt * 0.33) * palette.alphaScale;
        fctx!.font = `${size.toFixed(1)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        fctx!.fillStyle = color;

        const step = spread / count;
        fctx!.save();
        fctx!.translate(0, y);
        // Flatten the glyphs so they read as lying on the ground plane.
        fctx!.scale(1, 0.72);
        for (let cIdx = 0; cIdx < count; cIdx++) {
          const gx = cx - spread / 2 + (cIdx + 0.5) * step;
          const twinkle = 0.75 + 0.25 * Math.sin(t * 1.4 + i * 1.9 + cIdx * 0.7);
          fctx!.globalAlpha = baseAlpha * twinkle;
          fctx!.fillText(row.chars[cIdx] ? "1" : "0", gx, 0);
        }
        fctx!.restore();
      }
      fctx!.globalAlpha = 1;
    }

    function frame(ts: number) {
      if (!running) return;
      if (!last) last = ts;
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      t += dt;
      drawStreaks(dt);
      drawFloor();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reducedMq.matches) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    /** One still frame: used under reduced motion and after resizes while
     *  the loop is parked. */
    function drawStatic() {
      stop();
      t = 3.2;
      streaks.forEach((s, i) => {
        s.y = 40 + (i / Math.max(1, streaks.length)) * (vh + 120);
      });
      drawStreaks(0);
      drawFloor();
    }

    function onVisibility() {
      document.documentElement.classList.toggle("tab-hidden", document.hidden);
      if (document.hidden) stop();
      else start();
    }

    function onReduced() {
      if (reducedMq.matches) drawStatic();
      else start();
    }

    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    resize();
    if (reducedMq.matches) drawStatic();
    else start();

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    compactMq.addEventListener("change", resize);
    coarseMq.addEventListener("change", resize);
    reducedMq.addEventListener("change", onReduced);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      compactMq.removeEventListener("change", resize);
      coarseMq.removeEventListener("change", resize);
      reducedMq.removeEventListener("change", onReduced);
      document.documentElement.classList.remove("tab-hidden");
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="mx-base" />
        <span className="mx-sky" />
        <span className="mx-floor-glow" />
        <span className="mx-horizon" />
        <canvas ref={streakRef} className="mx-canvas mx-streaks" />
        <canvas ref={floorRef} className="mx-canvas mx-floor" />
        <span className="mx-scrim" />
        <span className="vignette" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
