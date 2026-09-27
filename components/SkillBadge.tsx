"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  index: number;
}

export default function SkillBadge({ name, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.4),
        ease: "easeOut",
      }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="group relative p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-sky-400/50 hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md cursor-default shadow-md hover:shadow-sky-500/10"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:shadow-[0_0_8px_#38bdf8] transition-shadow duration-200 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-mono text-slate-200 group-hover:text-sky-300 font-medium transition-colors">
        {name}
      </span>
    </motion.div>
  );
}
