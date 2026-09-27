"use client";

import { motion } from "framer-motion";
import { Sparkles, Briefcase, Bot, ChevronRight, Terminal } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Experience() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="experience" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <Sparkles size={14} className="text-sky-400" />
            <span>Founding & Production Engineering</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Experience & <span className="gradient-text">Founding Work</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            From co-architecting AI recruitment agents at RekZon to engineering high-throughput educational data pipelines at FreeFlow Advisors.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative space-y-12">
          {/* Celestial Center Glowing Line */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent pointer-events-none opacity-30" />

          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node Marker (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-sky-400/80 items-center justify-center shadow-lg shadow-sky-500/20 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-300 animate-pulse" />
                </div>

                {/* Card Container */}
                <div className="w-full lg:w-[48%]">
                  <div className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#080d22]/85 to-[#040714]/95 border border-slate-800/90 hover:border-sky-400/50 backdrop-blur-2xl transition-all duration-300 shadow-2xl hover:shadow-sky-500/10">
                    {/* Top ambient highlight */}
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Header: Company & Badge */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono mb-2">
                          {exp.id === "rekzon" ? (
                            <Bot size={13} className="text-indigo-400" />
                          ) : (
                            <Briefcase size={13} className="text-sky-400" />
                          )}
                          <span>{exp.badge}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-sky-300 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sky-300 font-semibold text-lg flex items-center gap-2 mt-0.5">
                          <span>{exp.company}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400 text-sm font-normal">{exp.location}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-300 border border-sky-400/25">
                          {exp.period}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">{exp.type}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-3 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
                        <Terminal size={14} />
                        <span>Key Engineering Deliverables</span>
                      </div>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3 text-sm text-slate-300">
                          <ChevronRight
                            size={16}
                            className="text-sky-400 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/80 text-sky-200 border border-slate-800 hover:border-sky-400/40 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Spacer on opposite side for desktop layout balance */}
                <div className="hidden lg:block lg:w-[48%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
