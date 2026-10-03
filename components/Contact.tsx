"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Github, Linkedin, Phone, Send } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  // Opens the visitor's mail app with the message filled in, so nothing depends on a third-party form service
  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative z-10 overflow-hidden pb-16 pt-28 sm:pt-40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-coma"
        >
          Have something worth building?
        </motion.h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I&apos;m open to AI engineering roles, founding teams and ambitious side projects. I usually reply within a day.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted">Email</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="break-all font-display text-xl font-medium text-ice underline decoration-hair-strong underline-offset-8 transition-colors hover:decoration-ion sm:text-2xl"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hair-strong px-3 py-1.5 text-sm text-muted transition-colors hover:text-ice"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "y" : "n"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      {copied ? <Check size={14} className="text-ion" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hair-strong px-5 py-2.5 text-sm text-ice transition-colors hover:border-ion/60"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hair-strong px-5 py-2.5 text-sm text-ice transition-colors hover:border-ion/60"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-hair-strong px-5 py-2.5 text-sm text-ice transition-colors hover:border-ion/60"
              >
                <Phone size={16} /> {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>

          <form onSubmit={send} className="panel space-y-5 rounded-[28px] p-6 sm:p-8">
            <div>
              <label htmlFor="c-name" className="text-sm text-muted">
                Your name
              </label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-hair bg-void/60 px-4 py-3 text-ice outline-none transition-colors placeholder:text-muted/50 focus:border-ion/60"
                placeholder="Ada Lovelace"
              />
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm text-muted">
                Message
              </label>
              <textarea
                id="c-msg"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none rounded-xl border border-hair bg-void/60 px-4 py-3 text-ice outline-none transition-colors placeholder:text-muted/50 focus:border-ion/60"
                placeholder="What are you building?"
              />
            </div>
            <button
              type="submit"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ice px-6 py-3.5 font-semibold text-void transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-ion/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Send size={16} className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="relative">Open in my email app</span>
            </button>
          </form>
        </div>
      </div>

      {/* Arrival: a planet's limb rising at the end of the journey */}
      <div className="pointer-events-none relative mt-28 h-48 sm:h-64" aria-hidden="true">
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-0 aspect-square w-[260%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,#121030,#05040b_30%)] shadow-[0_-2px_0_0_rgba(232,247,255,0.55),0_-20px_80px_-10px_rgba(111,211,255,0.45),0_-60px_160px_-20px_rgba(155,123,255,0.3)] sm:w-[180%]"
        />
      </div>
    </section>
  );
}
