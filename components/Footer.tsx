"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PERSONAL_INFO, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-sky-500/25">
                &gt;_
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                {PERSONAL_INFO.name}
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Founding Engineer @ RekZon. Architecting autonomous AI agents, enterprise RAG workflows, and high-throughput real-time distributed platforms.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-sky-400/25 text-sky-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Available for Founding & AI Engineering Opportunities</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-sky-300 transition-colors py-1"
                >
                  &gt; {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="block text-slate-300 hover:text-sky-300 transition-colors truncate"
              >
                {PERSONAL_INFO.email}
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="block text-slate-300 hover:text-indigo-300 transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
              <p className="text-slate-500 pt-1">
                {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-400/40 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-400/40 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-400/40 transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/25 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            © {currentYear} {PERSONAL_INFO.name}. Built with Next.js, Three.js & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-400/40 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
