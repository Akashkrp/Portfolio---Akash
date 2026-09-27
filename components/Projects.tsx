"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = ["All Systems", "AI / GenAI", "Full Stack"];

export default function Projects() {
  const { ref, isInView } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All Systems");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "All Systems") return true;
    if (activeCategory === "AI / GenAI") return project.category.includes("AI");
    if (activeCategory === "Full Stack") return project.category.includes("Full Stack");
    return true;
  });

  return (
    <section id="projects" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <Code2 size={14} className="text-sky-400" />
            <span>Production Architecture & Engineering</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Featured <span className="gradient-text">Systems & Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            From persona-grounded RAG architectures to high-frequency WebSocket stock streamers and enterprise payment engines.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-sky-500/20"
                      : "bg-slate-950/70 text-slate-300 border border-slate-800 hover:border-sky-400/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
