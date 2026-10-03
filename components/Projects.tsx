"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Plus, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

type Project = (typeof PROJECTS)[number];

// AI work glows with the ion tail, full-stack work with the dust tail
const LIMB = {
  "AI / GenAI": "from-ion/60 via-nebula/25",
  "Full Stack": "from-dust/55 via-dust/15",
} as Record<string, string>;

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

// Screenshot in a browser frame whose address bar shows the real live URL
function LivePreview({ project, flip }: { project: Project; flip: boolean }) {
  if (!project.image) return null;
  return (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} live demo`}
      className={`group/preview relative block overflow-hidden rounded-2xl border border-hair-strong bg-[#0b0a18] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${
        flip ? "order-first" : "order-first lg:order-last"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-hair px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/4 px-3 py-1 font-mono text-xs text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
          <span className="truncate">{hostOf(project.demo)}</span>
        </span>
      </div>
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} running live`}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover object-top-left transition-transform duration-700 ease-out group-hover/preview:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover/preview:opacity-90" />
        <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-ice px-4 py-2 text-sm font-semibold text-void opacity-0 transition-all duration-300 group-hover/preview:translate-y-0 group-hover/preview:opacity-100 group-focus-visible/preview:translate-y-0 group-focus-visible/preview:opacity-100">
          Open live demo <ArrowUpRight size={15} />
        </span>
      </div>
    </a>
  );
}

function ProjectCard({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const feature = Boolean(project.image);
  // wide cards tilt less so the screenshot stays readable
  const tilt = feature ? 0.4 : 1;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(rx, (v) => v * -6 * tilt), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(ry, (v) => v * 8 * tilt), { stiffness: 150, damping: 18 });

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
  const hasDemo = project.demo !== project.github;

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: feature ? 0 : (index % 2) * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      className={`spotlight panel group overflow-hidden rounded-[28px] p-6 sm:p-9 ${
        feature ? "grid grid-cols-1 items-center gap-8 lg:col-span-6 lg:grid-cols-[1fr_1.2fr] lg:gap-12" : "flex flex-col lg:col-span-3"
      }`}
    >
      {/* planet limb rising over the card's top edge */}
      <div
        className={`pointer-events-none absolute -top-[120%] left-1/2 aspect-square w-[140%] -translate-x-1/2 rounded-full bg-linear-to-t ${
          LIMB[project.category] ?? LIMB["AI / GenAI"]
        } to-transparent opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span className={project.category === "Full Stack" ? "text-dust" : "text-ion"}>{project.category}</span>
          <span className="font-mono text-xs">{project.date}</span>
        </div>

        <h3
          className={`mt-6 font-display font-semibold tracking-tight text-ice ${
            feature ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-2 text-text/80">{project.subtitle}</p>
        <p className={`mt-5 leading-relaxed text-muted ${feature ? "text-lg" : ""}`}>{project.description}</p>

        <p className="mt-5 border-l-2 border-ion/50 pl-3 text-sm leading-relaxed text-ice">{project.stats}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              id={featuresId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
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

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full bg-white/4 px-2.5 py-1 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ice px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              {/youtube\.com|youtu\.be/.test(project.demo) ? "Watch demo" : "Live demo"} <ExternalLink size={14} />
            </a>
          )}
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
        </div>
      </div>

      {feature && <LivePreview project={project} flip={flip} />}
    </motion.article>
  );
}

export default function Projects() {
  // Projects with a live screenshot lead as full-width features; the rest pair up below
  const featured = PROJECTS.filter((p) => p.image);
  const rest = PROJECTS.filter((p) => !p.image);

  return (
    <section id="projects" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Things I've launched"
          intro="Problems I wanted solved, and the products I built to solve them. The featured ones are live, so try them."
        />
        <div className="grid grid-cols-1 gap-5 perspective-[1400px] lg:grid-cols-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} flip={i % 2 === 1} />
          ))}
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} flip={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
