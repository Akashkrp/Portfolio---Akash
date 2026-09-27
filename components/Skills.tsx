"use client";

import { motion } from "framer-motion";
import { Cpu, Code, Brain, Database, Wrench, Binary } from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/constants";
import SkillBadge from "./SkillBadge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORY_ICONS: Record<string, any> = {
  Languages: Code,
  "AI / GenAI": Brain,
  "Full-Stack & Backend": Cpu,
  Databases: Database,
  "Infrastructure & Tools": Wrench,
  "Core CS": Binary,
};

export default function Skills() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="skills" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <Cpu size={14} className="text-sky-400" />
            <span>Tech Stack & Competencies</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Technical <span className="gradient-text">Mastery</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive skill set spanning modern Generative AI pipelines, low-latency full-stack frameworks, distributed databases, and core computer science fundamentals.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {SKILL_CATEGORIES.map((cat, catIndex) => {
            const Icon = CATEGORY_ICONS[cat.category] || Cpu;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/80 to-[#040715]/90 border border-slate-800/80 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3 mb-5 border-b border-slate-800/80 pb-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-sky-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
                    {cat.category}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 ml-auto">
                    {cat.skills.length} competencies
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillBadge
                      key={skill}
                      name={skill}
                      index={catIndex * 8 + sIdx}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
