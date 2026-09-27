"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, Github, Linkedin, Terminal, Sparkles, ChevronDown } from "lucide-react";
import { PERSONAL_INFO, TYPING_ROLES, HERO_STATS } from "@/lib/constants";
import CyberCoreScene from "./CyberCoreScene";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = TYPING_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Celestial Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-200 text-xs font-mono backdrop-blur-xl shadow-lg shadow-black/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300"></span>
              </span>
              <span className="font-semibold tracking-wider">FOUNDING ENGINEER @ REKZON // AI & SYSTEMS</span>
            </motion.div>

            {/* Name Heading with Starlight Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
                Hi, I&apos;m{" "}
                <span className="gradient-text drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Animated Typing Role */}
              <div className="h-14 sm:h-12 flex items-center">
                <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-medium text-sky-300 flex items-center">
                  <span className="mr-2.5 text-indigo-400 text-sm font-mono">&gt;</span>
                  <span>{displayText}</span>
                  <span className="inline-block w-2.5 h-6 bg-sky-400 ml-2 animate-pulse" />
                </p>
              </div>
            </div>

            {/* Subtitle / Pitch */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.subtitle} Pre-final year ECE at{" "}
              <span className="text-sky-300 font-medium">MNNIT Allahabad</span>, building production AI voice agents, dense vector RAG engines, and competitive algorithms.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-xl shadow-sky-950/60 hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore Systems</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-950/70 hover:bg-slate-900 text-slate-200 border border-slate-700 hover:border-sky-400 hover:text-sky-300 transition-all duration-300 backdrop-blur-md"
              >
                <FileDown size={16} />
                <span>Resume</span>
              </a>

              {/* Quick Social Icons */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-400 hover:text-sky-400 text-slate-300 transition-all duration-200 hover:scale-105"
                >
                  <Github size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-400 hover:text-indigo-400 text-slate-300 transition-all duration-200 hover:scale-105"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Cosmic Stats Grid with 1000+ Solved */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 backdrop-blur-md hover:border-sky-400/40 transition-colors"
                >
                  <div className="text-2xl font-bold font-mono gradient-starlight">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-200">{stat.label}</div>
                  <div className="text-[10px] text-slate-400">{stat.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Celestial Exoplanet Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <CyberCoreScene />
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mx-auto mt-6 text-center">
        <a
          href="#experience"
          aria-label="Scroll to experience"
          className="inline-flex flex-col items-center text-xs font-mono text-slate-500 hover:text-sky-400 transition-colors animate-bounce"
        >
          <span className="text-[11px] uppercase tracking-wider mb-1">Orbit down</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
}
