"use client";

import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Achievements() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="achievements" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <Award size={14} className="text-sky-400" />
            <span>Honors, Competitions & Hackathons</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Milestones & <span className="gradient-text">Achievements</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Recognitions across premier national hackathons, competitive programming challenges, and institutional contests.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/80 to-[#040715]/90 border border-slate-800/80 hover:border-sky-400/40 transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between shadow-xl hover:shadow-sky-500/10"
            >
              {/* Top ambient highlight line */}
              <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-300 border border-sky-400/25">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{item.date}</span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-sky-300 border border-sky-400/25 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-indigo-400 font-semibold mt-0.5">
                      {item.rank}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{item.category}</span>
                <span className="text-sky-400 group-hover:translate-x-1 transition-transform">
                  Verified ✓
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
