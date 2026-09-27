"use client";

import { motion } from "framer-motion";
import { Trophy, Award, ExternalLink, Flame, TrendingUp, Sparkles } from "lucide-react";
import { CODING_PROFILES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CodingProfiles() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="coding-profiles" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <Trophy size={14} className="text-sky-400" />
            <span>Competitive Programming & Problem Solving</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Badges of <span className="gradient-text">Algorithmic Honor</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Consistently competing against the world&apos;s sharpest engineers in international contests and algorithmic challenges with over 1000+ verified problem solutions.
          </p>
        </motion.div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CODING_PROFILES.map((profile, index) => {
            const isLeetCode = profile.platform === "LeetCode";
            const accentGradient = isLeetCode
              ? "from-sky-500 via-blue-600 to-indigo-600"
              : "from-indigo-500 via-purple-600 to-violet-600";
            const borderHover = isLeetCode ? "hover:border-sky-400/60" : "hover:border-indigo-400/60";

            return (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative p-8 rounded-3xl bg-gradient-to-b from-slate-950/90 via-[#070b1f]/85 to-[#040714]/95 border border-slate-800/90 ${borderHover} transition-all duration-300 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Celestial ambient glow */}
                <div
                  className={`absolute -right-20 -top-20 w-48 h-48 rounded-full bg-gradient-to-br ${accentGradient} opacity-10 group-hover:opacity-25 blur-3xl transition-opacity duration-500`}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3.5 rounded-2xl bg-gradient-to-br ${accentGradient} text-white shadow-lg`}
                      >
                        {isLeetCode ? <Trophy size={26} /> : <Award size={26} />}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block">
                          Official Profile
                        </span>
                        <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                          {profile.platform}
                        </h3>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-sky-300 group-hover:border-sky-500/40 transition-colors">
                      <ExternalLink size={17} />
                    </div>
                  </div>

                  {/* Highlights Banner */}
                  <div className="mb-6 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs font-mono text-slate-300 flex items-center gap-2.5">
                    <Flame size={16} className={isLeetCode ? "text-sky-400" : "text-indigo-400"} />
                    <span>{profile.highlight}</span>
                  </div>

                  {/* Metrics Deck */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 block mb-0.5">Tier Rank</span>
                      <span className="text-base sm:text-lg font-bold text-white font-mono">
                        {profile.tier}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 block mb-0.5">Rating</span>
                      <span className="text-base sm:text-lg font-bold text-sky-300 font-mono">
                        {profile.rating}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 block mb-0.5">Problems Solved</span>
                      <span className="text-base sm:text-lg font-bold text-indigo-300 font-mono">
                        {profile.problemsSolved}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="group-hover:text-sky-400 transition-colors">
                    handle: @{profile.username}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 group-hover:text-white transition-colors">
                    <span>View verified telemetry</span>
                    <TrendingUp size={13} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
