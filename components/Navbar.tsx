"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const progressWidth = useTransform(progress, (v) => `${v * 100}%`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const home = document.querySelector("#home");
    const homeIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (home) homeIo.observe(home);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      homeIo.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Scroll progress: an ion-to-dust comet line with a bright head */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed left-0 top-0 z-[60] h-[2px] bg-linear-to-r from-nebula via-ion to-dust"
      >
        <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(111,211,255,0.8)]" />
      </motion.div>

      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-2 py-2 transition-all duration-500 ${
            scrolled
              ? "border-hair bg-[#0a0916]/75 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#home" className="group flex items-center gap-2.5 rounded-full py-1 pl-2 pr-3" aria-label="Back to top">
            <span className="relative grid h-8 w-8 place-items-center">
              <span className="absolute inset-0 rounded-full border border-ion/40 transition-transform duration-700 group-hover:rotate-180" style={{ borderStyle: "dashed" }} />
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(111,211,255,0.9)]" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-ice">{PERSONAL_INFO.shortName}</span>
          </a>

          <nav className="hidden items-center lg:flex" aria-label="Sections">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? "text-void" : "text-muted hover:text-ice"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-ice"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-hair-strong px-4 py-2 text-sm text-ice transition-colors hover:border-dust/60 hover:text-dust sm:inline-flex"
            >
              <FileDown size={15} />
              Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-hair text-ice lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#07060f]/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Sections">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className={`font-display text-4xl font-medium tracking-tight ${
                    active === link.href ? "text-ion" : "text-ice"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-ice px-5 py-3 text-sm font-semibold text-void"
            >
              <FileDown size={16} /> Download resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
