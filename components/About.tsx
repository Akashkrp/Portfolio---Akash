"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, User, Sparkles, Compass } from "lucide-react";
import { PERSONAL_INFO, EDUCATION_LIST } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <User size={14} className="text-sky-400" />
            <span>Profile & Academic Journey</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            About <span className="gradient-text">Me & Education</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Narrative & Core Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Bio Card */}
            <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/85 to-[#040715]/95 border border-slate-800/80 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-sky-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    Architecting Intelligent Systems
                  </h3>
                  <p className="text-xs font-mono text-sky-400">Engineering Philosophy</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">
                {PERSONAL_INFO.bio}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether deploying autonomous voice agents with sub-second response times, fine-tuning RAG retrieval accuracy across dense corpora, or pushing competitive algorithmic solutions on LeetCode and Codeforces, I focus on velocity, scalability, and deterministic precision.
              </p>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-sky-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Compass size={16} className="text-indigo-400" />
                  <span>MNNIT Allahabad</span>
                </div>
              </div>
            </div>

            {/* Quick Principles Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950/70 to-slate-900/80 border border-slate-800/80 backdrop-blur-md">
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
                Core Engineering Tenets
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-mono">01.</span>
                  <span><strong>AI Grounding:</strong> Enforcing strict evaluation, source citations, and eliminating hallucinations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-mono">02.</span>
                  <span><strong>Real-time Throughput:</strong> Low-latency streaming via WebSockets, in-memory caching, and indexed DB layers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-mono">03.</span>
                  <span><strong>Algorithmic Rigor:</strong> Clean O(N log N) / O(N) complexity constraints, verified by 1000+ solved challenges.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline (STRICTLY NO CPI / PERCENTAGES) */}
          <motion.div
            id="education"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/85 to-[#040715]/95 border border-slate-800/80 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-400">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Education & Academics
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Academic Background & Institutional Milestones
                  </p>
                </div>
              </div>

              {/* Education Cards List */}
              <div className="space-y-6">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 pb-6 border-l-2 border-sky-400/30 last:border-transparent last:pb-0"
                  >
                    {/* Glowing Starlight Bullet Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                    </div>

                    <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-400/40 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-sky-300">
                          {edu.institution}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-400/25">
                          {edu.duration}
                        </span>
                      </div>

                      <p className="text-sky-300 font-medium text-sm mb-2">
                        {edu.degree}
                      </p>

                      <p className="text-xs font-mono text-slate-500 mb-3">
                        {edu.location}
                      </p>

                      <ul className="space-y-1 text-xs text-slate-300">
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-sky-400 font-mono">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
