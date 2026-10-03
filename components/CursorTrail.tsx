"use client";

import { useEffect, useRef } from "react";

const MAX = 400;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = new Float32Array(MAX);
    const y = new Float32Array(MAX);
    const vx = new Float32Array(MAX);
    const vy = new Float32Array(MAX);
    const life = new Float32Array(MAX);
    const hue = new Uint8Array(MAX); // 0 ion, 1 dust
    let cursor = 0;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (px: number, py: number, svx: number, svy: number, l: number, h: number) => {
      x[cursor] = px;
      y[cursor] = py;
      vx[cursor] = svx;
      vy[cursor] = svy;
      life[cursor] = l;
      hue[cursor] = h;
      cursor = (cursor + 1) % MAX;
    };

    let lx = -1;
    let ly = -1;
    let active = false;
    const onMove = (e: PointerEvent) => {
      if (lx < 0) {
        lx = e.clientX;
        ly = e.clientY;
      }
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(Math.ceil(dist / 6), 12);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        spawn(lx + dx * t, ly + dy * t, (Math.random() - 0.5) * 20 - dx * 4, (Math.random() - 0.5) * 20 - dy * 4, 0.5 + Math.random() * 0.3, Math.random() < 0.18 ? 1 : 0);
      }
      lx = e.clientX;
      ly = e.clientY;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      for (let i = 0; i < 28; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 80 + Math.random() * 220;
        spawn(e.clientX, e.clientY, Math.cos(a) * s, Math.sin(a) * s, 0.5 + Math.random() * 0.5, i % 3 === 0 ? 1 : 0);
      }
      wake();
    };

    let raf = 0;
    let last = performance.now();
    const wake = () => {
      if (active) return;
      active = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.globalCompositeOperation = "lighter";
      let alive = 0;
      for (let i = 0; i < MAX; i++) {
        if (life[i] <= 0) continue;
        life[i] -= dt;
        if (life[i] <= 0) continue;
        alive++;
        vx[i] *= 0.92;
        vy[i] *= 0.92;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;
        const f = Math.min(life[i] / 0.6, 1);
        ctx!.fillStyle = hue[i] ? `rgba(245,185,113,${f * 0.8})` : `rgba(140,220,255,${f * 0.7})`;
        const r = 0.6 + f * 1.8;
        ctx!.beginPath();
        ctx!.arc(x[i], y[i], r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (alive > 0) raf = requestAnimationFrame(frame);
      else active = false;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[70] h-full w-full" aria-hidden="true" />;
}
