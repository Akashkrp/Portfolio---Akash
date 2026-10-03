"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

const RINGS = [
  { radius: 150, duration: 55, direction: 1 },
  { radius: 255, duration: 90, direction: -1 },
];

function Orbit({ skills, category }: { skills: string[]; category: string }) {
  const [paused, setPaused] = useState(false);
  const innerCount = Math.ceil(skills.length * 0.42);
  const groups = [skills.slice(0, innerCount), skills.slice(innerCount)];

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[600px] ${paused ? "orbit-paused" : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Planet */}
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[42%] w-[170%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border border-dust/35" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#3b4a80,#14122b_55%,#07060f)] shadow-[inset_-18px_-22px_40px_rgba(0,0,0,0.75),0_0_80px_rgba(111,211,255,0.18)]" />
        <div className="absolute inset-0 rounded-full shadow-[inset_6px_5px_14px_-6px_rgba(232,247,255,0.7)]" />
        <div className="absolute left-1/2 top-1/2 h-[42%] w-[170%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border border-dust/35" style={{ clipPath: "inset(50% 0 0 0)" }} />
        <AnimatePresence mode="wait">
          <motion.p
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 grid place-items-center px-4 text-center font-display text-sm font-medium leading-tight text-ice"
          >
            {category}
          </motion.p>
        </AnimatePresence>
      </div>

      {RINGS.map((ring, ri) => {
        const items = groups[ri];
        const spin = { "--orbit-duration": `${ring.duration}s` } as CSSProperties;
        const pct = (ring.radius / 600) * 100;
        return (
          <div
            key={ri}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-hair"
            style={{ width: `${pct * 2}%`, height: `${pct * 2}%` }}
          >
            <div
              className="orbit-spin absolute inset-0"
              style={{ ...spin, animationDirection: ring.direction < 0 ? "reverse" : "normal" }}
            >
              <AnimatePresence>
                {items.map((skill, i) => {
                  const angle = ((i / items.length) * 360 + ri * 22) * (Math.PI / 180);
                  return (
                    <div
                      key={`${category}-${skill}`}
                      className="absolute h-0 w-0"
                      style={{ left: `${(50 + 50 * Math.cos(angle)).toFixed(3)}%`, top: `${(50 + 50 * Math.sin(angle)).toFixed(3)}%` }}
                    >
                      <div className="absolute -translate-x-1/2 -translate-y-1/2">
                        <div
                          className="orbit-counter"
                          style={{ ...spin, animationDirection: ring.direction < 0 ? "reverse" : "normal" }}
                        >
                          <motion.span
                            initial={{ opacity: 0, scale: 0.2, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.2 } }}
                            transition={{ delay: 0.05 + i * 0.05 + ri * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="block whitespace-nowrap rounded-full border border-hair-strong bg-[#0b0a18]/90 px-3.5 py-1.5 text-sm text-text shadow-[0_0_24px_-6px_rgba(111,211,255,0.4)] backdrop-blur-sm transition-colors hover:border-ion hover:text-ice"
                          >
                            {skill}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = SKILL_CATEGORIES[active];

  return (
    <section id="skills" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="My tech system"
          intro="Pick a category to put its tools into orbit. Hover the orbit to hold it still."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[300px_1fr]">
          <div role="tablist" aria-label="Skill categories" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {SKILL_CATEGORIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.category}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="skills-panel"
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 items-center justify-between gap-6 rounded-2xl px-5 py-3.5 text-left transition-colors ${
                    isActive ? "text-ice" : "text-muted hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-2xl border border-hair-strong bg-white/4"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative whitespace-nowrap font-medium">{c.category}</span>
                  <span className="relative font-mono text-xs text-muted">{c.skills.length}</span>
                </button>
              );
            })}
          </div>

          <div id="skills-panel" role="tabpanel" aria-label={current.category}>
            <div className="hidden md:block">
              <Orbit skills={current.skills} category={current.category} />
            </div>
            <ul className="flex flex-wrap gap-2 md:hidden">
              <AnimatePresence mode="popLayout">
                {current.skills.map((s, i) => (
                  <motion.li
                    key={`${current.category}-${s}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-full border border-hair-strong px-3.5 py-1.5 text-sm text-text"
                  >
                    {s}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
