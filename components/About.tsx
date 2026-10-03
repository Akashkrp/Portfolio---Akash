"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PERSONAL_INFO, EDUCATION_LIST } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, [range[0], range[1], Math.min(range[1] + 0.08, 1)], ["#8a90ab", "#ffffff", "#dfe4f5"]);
  return (
    <motion.span style={{ opacity, color }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export default function About() {
  const bioRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: bioRef, offset: ["start 85%", "end 45%"] });
  const words = PERSONAL_INFO.bio.split(" ");

  return (
    <section id="about" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About me" />

        <p
          ref={bioRef}
          className="max-w-5xl font-display text-[clamp(1.25rem,2.4vw,2rem)] font-light leading-[1.4] tracking-[-0.015em]"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr]">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ice">Education</h3>
            <p className="mt-3 text-muted">{PERSONAL_INFO.location}</p>
          </div>

          <ol className="relative space-y-10 border-l border-hair pl-8">
            {EDUCATION_LIST.map((e, i) => (
              <motion.li
                key={e.degree}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative"
              >
                <span
                  className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full ${
                    i === 0 ? "bg-ice shadow-[0_0_14px_4px_rgba(111,211,255,0.6)]" : "border border-hair-strong bg-void"
                  }`}
                />
                <p className="font-mono text-sm text-muted">
                  {e.duration} <span className="text-muted/50">/</span> {e.location}
                </p>
                <h4 className="mt-2 text-xl font-medium text-ice">{e.institution}</h4>
                <p className="mt-1 text-dust">{e.degree}</p>
                <ul className="mt-3 space-y-1.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-muted">
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
