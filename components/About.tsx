"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { PERSONAL_INFO, EDUCATION } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="about" ref={ref} className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="glass glass-hover p-8 rounded-2xl">
                            <h3 className="text-2xl font-semibold mb-4 text-neon-cyan">Hello There! 👋</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {PERSONAL_INFO.bio}
                            </p>
                        </div>

                        <div className="glass glass-hover p-6 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-neon-cyan to-electric-purple rounded-lg">
                                    <MapPin size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-white mb-1">Location</h4>
                                    <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="glass glass-hover p-8 rounded-2xl gradient-border">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 bg-gradient-to-br from-neon-cyan to-electric-purple rounded-xl animate-glow">
                                    <GraduationCap size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                                    <p className="text-gray-400">{EDUCATION.duration}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-xl text-neon-cyan mb-2">
                                        {EDUCATION.institution}
                                    </h4>
                                    <p className="text-gray-300">{EDUCATION.degree}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
