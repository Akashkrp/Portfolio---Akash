"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Sparkles, Layers, Cpu } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    tech: string[];
    features: string[];
    github: string;
    demo: string;
    date: string;
    stats?: string;
    featured?: boolean;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isAIEngine = project.category.includes("AI");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070b1e]/85 to-[#040715]/95 border border-slate-800/80 hover:border-sky-400/50 transition-all duration-300 backdrop-blur-2xl flex flex-col h-full overflow-hidden shadow-xl hover:shadow-sky-500/10"
    >
      {/* Top glowing starlight line on hover */}
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Header & Category */}
      <div className="p-6 sm:p-7 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
              isAIEngine
                ? "bg-indigo-950/70 text-indigo-300 border border-indigo-400/30"
                : "bg-sky-950/70 text-sky-300 border border-sky-400/30"
            }`}
          >
            {isAIEngine ? <Sparkles size={12} className="text-indigo-400" /> : <Layers size={12} className="text-sky-400" />}
            <span>{project.category}</span>
          </span>

          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Calendar size={13} />
            <span>{project.date}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-sky-400/90 mb-2">
          {project.subtitle}
        </p>

        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlight metric chip */}
        {project.stats && (
          <div className="mb-4 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <Cpu size={13} className="text-sky-400 flex-shrink-0" />
            <span className="truncate">{project.stats}</span>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-mono font-normal rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 group-hover:border-sky-400/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bullet Features */}
      <div className="px-6 sm:px-7 pb-6 flex-grow">
        <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2.5">
          Core Architecture & Accomplishments
        </h4>
        <ul className="space-y-2 text-xs text-slate-300">
          {project.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="text-sky-400 font-mono mt-0.5 select-none">▸</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Actions Footer */}
      <div className="p-6 pt-4 mt-auto border-t border-slate-800/80 bg-slate-950/50 flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-sky-400 hover:text-sky-300 transition-all duration-200"
        >
          <Github size={15} />
          <span>Code Repo</span>
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-950/60 hover:shadow-sky-500/30 transition-all duration-200"
        >
          <span>Live Demo</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
