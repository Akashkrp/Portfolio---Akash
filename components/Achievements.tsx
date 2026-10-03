"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Hackathons and contests"
          intro="Podiums and finals against teams from IITs, NITs and national pools."
        />

        <ul className="border-b border-hair">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.6 }}
              className="meteor-row group grid grid-cols-1 gap-2 border-t border-hair py-7 transition-colors hover:bg-white/2 md:gap-8 md:grid-cols-[200px_1fr_auto] md:items-baseline md:px-4"
            >
              <p className="font-mono text-sm text-muted">{a.date}</p>
              <div>
                <h3 className="font-display text-lg font-medium tracking-tight text-ice transition-colors group-hover:text-white sm:text-xl">
                  {a.title}
                </h3>
                <p className="mt-1 text-ion">{a.rank}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{a.description}</p>
              </div>
              <p className="w-fit rounded-full border border-dust/30 px-3 py-1 text-sm text-dust">{a.badge}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
