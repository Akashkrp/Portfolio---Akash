"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

type Exp = (typeof EXPERIENCES)[number];

function Entry({ exp }: { exp: Exp }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 62%", "start 42%"] });
  const lit = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const nodeScale = useTransform(lit, [0, 1], [0.6, 1]);
  const nodeGlow = useTransform(lit, [0, 1], ["0 0 0px 0px rgba(111,211,255,0)", "0 0 22px 6px rgba(111,211,255,0.55)"]);
  const nodeBg = useTransform(lit, [0, 1], ["#1a1a2e", "#e8f7ff"]);
  const contentOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const current = exp.period.includes("Present");

  return (
    <li ref={ref} className="relative grid grid-cols-1 gap-4 pb-20 pl-10 last:pb-0 lg:grid-cols-[200px_1fr] lg:gap-16 lg:pl-0">
      {/* Node on the trajectory */}
      <motion.span
        style={{ scale: nodeScale, boxShadow: nodeGlow, backgroundColor: nodeBg }}
        className="absolute left-[7px] top-2 h-3.5 w-3.5 rounded-full border border-ion/50 lg:left-[223px]"
      />

      <motion.div style={{ opacity: contentOpacity }} className="lg:sticky lg:top-32 lg:self-start lg:text-right">
        <p className="font-mono text-sm text-ice">{exp.period}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted lg:justify-end">
          <MapPin size={13} /> {exp.location}
        </p>
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="lg:pl-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ice sm:text-3xl">{exp.company}</h3>
          {current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ion/30 bg-ion/10 px-2.5 py-0.5 text-xs text-ion">
              <span className="h-1.5 w-1.5 rounded-full bg-ion" /> Current
            </span>
          )}
        </div>
        <p className="mt-1.5 text-lg text-dust">{exp.role}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-text/90">{exp.description}</p>

        <ul className="mt-6 max-w-2xl space-y-3">
          {exp.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="relative pl-6 leading-relaxed text-muted"
            >
              <span className="absolute left-0 top-[0.7em] h-px w-3.5 bg-linear-to-r from-transparent to-ion" />
              {h}
            </motion.li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {exp.tech.map((t) => (
            <li key={t} className="rounded-full border border-hair px-3 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const height = useTransform(progress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  return (
    <section id="experience" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Trajectory so far"
          intro="Where I've been building: agents that answer from real data, recruiting AI from zero, and data pipelines at national scale."
        />

        <div className="relative">
          {/* Rail */}
          <div className="absolute bottom-0 left-[13px] top-2 w-px bg-hair lg:left-[229px]" aria-hidden="true">
            <motion.div style={{ height }} className="relative w-px bg-linear-to-b from-nebula/0 via-ion/70 to-ice">
              {/* comet head, tail streaming back up the rail */}
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(111,211,255,0.8),0_0_60px_14px_rgba(155,123,255,0.35)]" />
              <span className="absolute bottom-0 left-1/2 h-40 w-[6px] -translate-x-1/2 rounded-full bg-linear-to-t from-ion/70 via-ion/15 to-transparent blur-[3px]" />
            </motion.div>
          </div>

          <ol ref={listRef} className="relative">
            {EXPERIENCES.map((exp) => (
              <Entry key={exp.id} exp={exp} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
