"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import SkillBadge from "./SkillBadge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Skills() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="skills" ref={ref} className="relative z-10 bg-gradient-to-b from-transparent via-background/50 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                        Technologies and tools I work with
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {Object.entries(SKILLS).map(([category, skills], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        >
                            <h3 className="text-2xl font-semibold mb-6 text-neon-cyan">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {skills.map((skill, index) => (
                                    <SkillBadge
                                        key={skill}
                                        name={skill}
                                        index={categoryIndex * 10 + index}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
