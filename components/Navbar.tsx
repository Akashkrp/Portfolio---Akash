"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-sky-400/15 shadow-2xl shadow-black/80 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#home"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              &gt;_
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk'] text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {PERSONAL_INFO.shortName}
              <span className="text-sky-400 font-mono text-sm ml-1">//</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-sky-300 transition-colors duration-200 relative py-1 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Resume */}
          <div className="hidden md:flex items-center space-x-3.5">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white shadow-md shadow-sky-950/60 hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FileDown size={14} />
              <span>Resume</span>
            </a>

            <div className="h-4 w-px bg-slate-800" />

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
            >
              <Github size={16} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-sky-400 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-950/95 border-b border-sky-500/20 backdrop-blur-2xl overflow-hidden mt-2"
          >
            <div className="px-5 py-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block text-sm font-mono text-slate-300 hover:text-sky-300 transition-colors py-1.5"
                >
                  &gt; {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white"
                >
                  <FileDown size={14} />
                  <span>View Resume</span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
