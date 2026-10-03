"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  intro?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ title, intro, align = "left" }: Props) {
  const words = title.split(" ");
  return (
    <div className={`mb-14 sm:mb-20 ${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ice">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`mt-5 max-w-xl text-lg leading-relaxed text-muted ${align === "center" ? "mx-auto" : ""}`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
