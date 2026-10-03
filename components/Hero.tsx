"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileDown, Github, Linkedin, ArrowDown } from "lucide-react";
import { PERSONAL_INFO, TYPING_ROLES, HERO_STATS } from "@/lib/constants";
import HeroComet from "./HeroComet";

const NAME_LINES = ["Akash Kumar", "Prasad"];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 28 : 55;
    if (!deleting && text === word) delay = 2200;
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const role = useTypewriter(TYPING_ROLES);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cometOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  let letterIndex = 0;

  return (
    <section ref={sectionRef} id="home" className="relative min-h-svh overflow-hidden">
      <motion.div style={{ opacity: cometOpacity }} className="absolute inset-0">
        <HeroComet lettersRef={nameRef} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 pb-28 pt-32 sm:px-6 lg:px-8"
      >
        <motion.a
          href="#experience"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="group mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-hair bg-void/50 py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur-md transition-colors hover:border-ion/40 hover:text-ice"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inset-0 rounded-full bg-ion" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-ion" />
          </span>
          Now: AI Engineering Intern at <span className="text-ice">Tectonic Agents</span>
        </motion.a>

        <h1
          ref={nameRef}
          aria-label={PERSONAL_INFO.name}
          className="font-display text-[clamp(2.2rem,9.6vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#d9def0]"
        >
          {NAME_LINES.map((line) => (
            <span key={line} className="block whitespace-nowrap" aria-hidden="true">
              {line.split("").map((ch, i) => {
                const delay = 0.35 + letterIndex++ * 0.045;
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: "0.5em", filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      data-letter={ch === " " ? undefined : true}
                      className="inline-block will-change-transform"
                      style={{
                        transform: "translate(var(--tx, 0px), var(--ty, 0px))",
                        color: "color-mix(in oklab, #ffffff calc(var(--glow, 0) * 100%), currentColor)",
                        textShadow:
                          "0 0 calc(var(--glow, 0) * 42px) rgba(111, 211, 255, calc(var(--glow, 0) * 0.95)), 0 0 calc(var(--glow, 0) * 12px) rgba(232, 247, 255, calc(var(--glow, 0)))",
                      }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl"
        >
          <p className="h-14 font-mono sm:h-7 text-base text-ion sm:text-lg" aria-live="off">
            {role}
            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-ion" />
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
            I build AI systems that hold up in production: retrieval agents that cite their sources, voice
            interviewers that score in real time, and the backends that keep them fast. at{" "}
            <span className="text-text">MNNIT Allahabad</span>, class of 2027.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ice px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-ion/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">See my work</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hair-strong bg-void/40 px-6 py-3 text-sm font-semibold text-ice backdrop-blur-md transition-colors hover:border-dust/60 hover:text-dust"
            >
              <FileDown size={16} />
              Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full p-3 text-muted transition-colors hover:bg-white/5 hover:text-ice"
              >
                <Github size={19} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-3 text-muted transition-colors hover:bg-white/5 hover:text-ice"
              >
                <Linkedin size={19} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
        >
          {HERO_STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-medium text-ice">{s.value}</dd>
              <dd className="text-sm text-muted">
                {s.label} <span className="text-muted/60">/ {s.sub}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition-colors hover:text-ice sm:flex"
      >
        <span className="relative h-12 w-px overflow-hidden bg-hair">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-linear-to-b from-transparent to-ion"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}
