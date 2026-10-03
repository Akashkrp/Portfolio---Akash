"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Plus } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

type Project = (typeof PROJECTS)[number];

// AI work glows with the ion tail, full-stack work with the dust tail
const LIMB = {
  "AI / GenAI": "from-ion/60 via-nebula/25",
  "Full Stack": "from-dust/55 via-dust/15",
} as Record<string, string>;

function ProjectCard({ project, large, index }: { project: Project; large: boolean; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(rx, (v) => v * -6), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(ry, (v) => v * 8), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    rx.set(y - 0.5);
    ry.set(x - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  const featuresId = `${project.id}-features`;

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={`spotlight panel group flex flex-col overflow-hidden rounded-[28px] p-7 sm:p-9 ${
        large ? "lg:col-span-4" : "lg:col-span-2"
      }`}
    >
      {/* planet limb rising over the card's top edge */}
      <div
        className={`pointer-events-none absolute -top-[120%] left-1/2 aspect-square w-[140%] -translate-x-1/2 rounded-full bg-linear-to-t ${
          LIMB[project.category] ?? LIMB["AI / GenAI"]
        } to-transparent opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-4 text-sm text-muted">
        <span className={project.category === "Full Stack" ? "text-dust" : "text-ion"}>{project.category}</span>
        <span className="font-mono text-xs">{project.date}</span>
      </div>

      <h3
        className={`relative mt-6 font-display font-semibold tracking-tight text-ice ${
          large ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {project.title}
      </h3>
      <p className="relative mt-2 text-text/80">{project.subtitle}</p>
      <p className={`relative mt-5 leading-relaxed text-muted ${large ? "max-w-2xl text-lg" : ""}`}>{project.description}</p>

      <p className="relative mt-5 font-mono text-xs leading-relaxed text-ice/70">{project.stats}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={featuresId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            {project.features.map((f, i) => (
              <li key={i} className="relative mt-3 pl-5 text-sm leading-relaxed text-text/80 first:mt-6">
                <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-ion shadow-[0_0_6px_2px_rgba(111,211,255,0.6)]" />
                {f}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <ul className="relative mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tech.map((t) => (
          <li key={t} className="rounded-full bg-white/4 px-2.5 py-1 text-xs text-muted">
            {t}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-8">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={featuresId}
          className="inline-flex items-center gap-2 rounded-full border border-hair-strong px-4 py-2 text-sm text-ice transition-colors hover:border-ion/50"
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="inline-flex">
            <Plus size={15} />
          </motion.span>
          {open ? "Hide details" : "How it works"}
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ice"
        >
          <Github size={17} />
        </a>
        {project.demo !== project.github && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ice"
          >
            <ExternalLink size={17} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Things I've launched"
          intro="RAG systems, real-time market streams, and production platforms with payments. Open any card to see how it works."
        />
        <div className="grid grid-cols-1 gap-5 perspective-[1400px] lg:grid-cols-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
