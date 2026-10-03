"use client";

import { useEffect, useRef, type RefObject } from "react";

type Props = {
  /** Container whose [data-letter] children glow and lean toward the comet as it passes */
  lettersRef: RefObject<HTMLElement | null>;
};

const MAX_PARTICLES = 4000;
const PERIOD = 15; // seconds per orbit
const ECCENTRICITY = 0.72;

function makeSprite(size: number, stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

// Solve Kepler's equation M = E - e sin E for the eccentric anomaly
function eccentricAnomaly(M: number, e: number) {
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 6; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

export default function HeroComet({ lettersRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ion = makeSprite(64, [
      [0, "rgba(220,245,255,1)"],
      [0.25, "rgba(111,211,255,0.55)"],
      [1, "rgba(60,120,255,0)"],
    ]);
    const dust = makeSprite(64, [
      [0, "rgba(255,240,215,1)"],
      [0.3, "rgba(245,185,113,0.45)"],
      [1, "rgba(220,120,60,0)"],
    ]);
    const coma = makeSprite(256, [
      [0, "rgba(255,255,255,1)"],
      [0.08, "rgba(232,247,255,0.95)"],
      [0.25, "rgba(111,211,255,0.35)"],
      [0.6, "rgba(155,123,255,0.08)"],
      [1, "rgba(0,0,0,0)"],
    ]);
    const sunGlow = makeSprite(512, [
      [0, "rgba(255,250,240,1)"],
      [0.05, "rgba(255,230,190,0.9)"],
      [0.18, "rgba(245,185,113,0.25)"],
      [0.5, "rgba(155,123,255,0.06)"],
      [1, "rgba(0,0,0,0)"],
    ]);

    // Particle pool (struct of arrays)
    const px = new Float32Array(MAX_PARTICLES);
    const py = new Float32Array(MAX_PARTICLES);
    const vx = new Float32Array(MAX_PARTICLES);
    const vy = new Float32Array(MAX_PARTICLES);
    const life = new Float32Array(MAX_PARTICLES);
    const maxLife = new Float32Array(MAX_PARTICLES);
    const kind = new Uint8Array(MAX_PARTICLES);
    const size = new Float32Array(MAX_PARTICLES);
    let cursor = 0;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let sun = { x: 0, y: 0 };
    let a = 0;
    let b = 0;
    let tilt = 0;
    let squash = 0.7;
    let letters: { el: HTMLElement; x: number; y: number; glow: number }[] = [];

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wide = w >= 1024;
      sun = wide ? { x: w * 0.8, y: h * 0.3 } : { x: w * 0.82, y: h * 0.17 };
      a = wide ? w * 0.5 : w * 0.62;
      b = a * Math.sqrt(1 - ECCENTRICITY * ECCENTRICITY);
      tilt = wide ? -0.24 : -0.55;
      squash = wide ? 0.72 : 0.6;

      const root = lettersRef.current;
      letters = root
        ? Array.from(root.querySelectorAll<HTMLElement>("[data-letter]")).map((el) => {
            const r = el.getBoundingClientRect();
            return { el, x: r.left + r.width / 2 - rect.left, y: r.top + r.height / 2 - rect.top, glow: 0 };
          })
        : [];
    };

    const orbitPoint = (E: number) => {
      const ox = a * (Math.cos(E) - ECCENTRICITY);
      const oy = b * Math.sin(E) * squash;
      const c = Math.cos(tilt);
      const s = Math.sin(tilt);
      return { x: sun.x + ox * c - oy * s, y: sun.y + ox * s + oy * c };
    };

    const pointer = { x: -9999, y: -9999 };
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    const emit = (x: number, y: number, k: 0 | 1, vxi: number, vyi: number, lifeSpan: number, s: number) => {
      const i = cursor;
      cursor = (cursor + 1) % MAX_PARTICLES;
      px[i] = x;
      py[i] = y;
      vx[i] = vxi;
      vy[i] = vyi;
      life[i] = lifeSpan;
      maxLife[i] = lifeSpan;
      kind[i] = k;
      size[i] = s;
    };

    let prevHead = { x: 0, y: 0 };
    let time = PERIOD * 0.78; // start just before the comet swings in toward the sun
    let raf = 0;
    let running = true;
    let last = performance.now();

    const drawSun = (t: number) => {
      const pulse = 1 + Math.sin(t * 1.3) * 0.04;
      const r = Math.min(w, 1400) * 0.22 * pulse;
      ctx.drawImage(sunGlow, sun.x - r, sun.y - r, r * 2, r * 2);
      // anamorphic flare
      const flare = ctx.createLinearGradient(sun.x - r * 1.6, 0, sun.x + r * 1.6, 0);
      flare.addColorStop(0, "rgba(111,211,255,0)");
      flare.addColorStop(0.5, "rgba(232,247,255,0.35)");
      flare.addColorStop(1, "rgba(111,211,255,0)");
      ctx.fillStyle = flare;
      ctx.fillRect(sun.x - r * 1.6, sun.y - 0.75, r * 3.2, 1.5);
    };

    const drawOrbit = () => {
      ctx.save();
      ctx.setLineDash([2, 7]);
      ctx.strokeStyle = "rgba(232,247,255,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const p = orbitPoint((i / 120) * Math.PI * 2);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      const M = ((time % PERIOD) / PERIOD) * Math.PI * 2;
      const head = orbitPoint(eccentricAnomaly(M, ECCENTRICITY));
      const cvx = dt > 0 ? (head.x - prevHead.x) / dt : 0;
      const cvy = dt > 0 ? (head.y - prevHead.y) / dt : 0;
      const teleported = Math.hypot(head.x - prevHead.x, head.y - prevHead.y) > 200;
      const from = prevHead;
      // spread emission along the path travelled this frame so the tail stays continuous
      const along = () => {
        const t = Math.random();
        return { x: from.x + (head.x - from.x) * t, y: from.y + (head.y - from.y) * t };
      };
      prevHead = head;

      const dx = head.x - sun.x;
      const dy = head.y - sun.y;
      const dist = Math.max(Math.hypot(dx, dy), 1);
      const ux = dx / dist;
      const uy = dy / dist;
      // Activity rises steeply near perihelion, like a real comet outgassing
      const activity = Math.min(3.2, Math.max(0.35, Math.pow((a * 0.45) / dist, 2)));

      if (!teleported) {
        const ionCount = Math.round(12 * activity);
        for (let i = 0; i < ionCount; i++) {
          const jitter = (Math.random() - 0.5) * 0.18;
          const sp = 60 + Math.random() * 90 * activity;
          const o = along();
          emit(
            o.x + (Math.random() - 0.5) * 4,
            o.y + (Math.random() - 0.5) * 4,
            0,
            (ux - uy * jitter) * sp,
            (uy + ux * jitter) * sp,
            0.9 + Math.random() * 0.9,
            12 + Math.random() * 16
          );
        }
        const dustCount = Math.round(10 * activity);
        for (let i = 0; i < dustCount; i++) {
          const sp = 18 + Math.random() * 30;
          const o = along();
          emit(
            o.x + (Math.random() - 0.5) * 6,
            o.y + (Math.random() - 0.5) * 6,
            1,
            cvx * 0.35 + ux * sp + (Math.random() - 0.5) * 14,
            cvy * 0.35 + uy * sp + (Math.random() - 0.5) * 14,
            1.6 + Math.random() * 1.8,
            16 + Math.random() * 22
          );
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      drawSun(time);
      ctx.globalCompositeOperation = "source-over";
      drawOrbit();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (life[i] <= 0) continue;
        life[i] -= dt;
        if (life[i] <= 0) continue;
        // radiation pressure pushes away from the sun; ions feel it far more than dust
        const rx = px[i] - sun.x;
        const ry = py[i] - sun.y;
        const rd = Math.max(Math.hypot(rx, ry), 1);
        const push = kind[i] === 0 ? 260 : 45;
        vx[i] += (rx / rd) * push * dt;
        vy[i] += (ry / rd) * push * dt;
        // the cursor is a tiny gravity well that bends nearby tail material
        const gx = pointer.x - px[i];
        const gy = pointer.y - py[i];
        const gd2 = gx * gx + gy * gy;
        if (gd2 < 32000) {
          const g = 900 / Math.max(gd2, 400);
          vx[i] += gx * g * dt * 6;
          vy[i] += gy * g * dt * 6;
        }
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;

        const f = life[i] / maxLife[i];
        const s = size[i] * (1.4 - f * 0.8);
        ctx.globalAlpha = kind[i] === 0 ? f * 0.32 : f * f * 0.26;
        ctx.drawImage(kind[i] === 0 ? ion : dust, px[i] - s / 2, py[i] - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      const comaR = 34 + activity * 12;
      ctx.drawImage(coma, head.x - comaR, head.y - comaR, comaR * 2, comaR * 2);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Letters light up and lean toward the passing comet
      for (const l of letters) {
        const lx = head.x - l.x;
        const ly = head.y - l.y;
        const d = Math.hypot(lx, ly);
        const target = Math.max(0, 1 - d / 260);
        l.glow += (target - l.glow) * 0.18;
        if (l.glow < 0.002 && target === 0) {
          if (l.el.style.getPropertyValue("--glow") !== "0") {
            l.el.style.setProperty("--glow", "0");
            l.el.style.setProperty("--tx", "0px");
            l.el.style.setProperty("--ty", "0px");
          }
          continue;
        }
        const pull = l.glow * 9;
        l.el.style.setProperty("--glow", l.glow.toFixed(3));
        l.el.style.setProperty("--tx", `${((lx / (d || 1)) * pull).toFixed(2)}px`);
        l.el.style.setProperty("--ty", `${((ly / (d || 1)) * pull).toFixed(2)}px`);
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    layout();
    prevHead = orbitPoint(eccentricAnomaly(((time % PERIOD) / PERIOD) * Math.PI * 2, ECCENTRICITY));

    if (reduceMotion) {
      // Settle the tail with a short simulated run, then leave that still frame
      running = false;
      const start = last;
      for (let i = 0; i < 90; i++) frame(start + (i + 1) * 16);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    // Fonts shift letter positions after load, so measure again once they're in
    document.fonts?.ready.then(layout);
    const settle = window.setTimeout(layout, 2000); // after the name's entrance animation
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.parentElement?.addEventListener("pointerleave", onLeave);

    if (!reduceMotion) raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, [lettersRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
