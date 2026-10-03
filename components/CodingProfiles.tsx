"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CODING_PROFILES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} aria-label={String(to)}>
      {value}
    </span>
  );
}

export default function CodingProfiles() {
  return (
    <section id="coding-profiles" className="relative z-10 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contest ratings"
          intro="Over a thousand problems solved. Algorithms are how I learned to think about systems."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CODING_PROFILES.map((p, i) => {
            const ion = p.accent === "sky";
            return (
              <motion.a
                key={p.platform}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="panel group relative overflow-hidden rounded-[28px] p-8 sm:p-10"
              >
                {/* slow orbit decoration behind the number */}
                <div
                  className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed ${
                    ion ? "border-ion/20" : "border-nebula/25"
                  } orbit-spin`}
                  style={{ ["--orbit-duration" as string]: "40s" }}
                  aria-hidden="true"
                >
                  <span
                    className={`absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      ion ? "bg-ion shadow-[0_0_12px_4px_rgba(111,211,255,0.7)]" : "bg-nebula shadow-[0_0_12px_4px_rgba(155,123,255,0.7)]"
                    }`}
                  />
                </div>

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-display text-xl font-medium text-ice">{p.platform}</p>
                    <p className="mt-1 font-mono text-sm text-muted">@{p.username}</p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ice"
                  />
                </div>

                <p className={`relative mt-10 font-display text-7xl font-semibold tracking-tighter sm:text-8xl ${ion ? "text-coma" : "text-ice"}`}>
                  <CountUp to={p.rating} />
                </p>
                <p className="relative mt-2 text-muted">peak contest rating</p>

                <dl className="relative mt-8 grid grid-cols-3 gap-4 border-t border-hair pt-6 text-sm">
                  <div>
                    <dt className="text-muted">Tier</dt>
                    <dd className="mt-1 text-ice">{p.tier}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Solved</dt>
                    <dd className="mt-1 text-ice">{p.problemsSolved}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Standing</dt>
                    <dd className="mt-1 text-dust">{p.badge}</dd>
                  </div>
                </dl>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
