"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { PERSONAL_INFO, TYPING_ROLES } from "@/lib/constants";

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = TYPING_ROLES[roleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentRole.length) {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
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
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 font-['Space_Grotesk']">
                                Hi, I&apos;m{" "}
                                <span className="gradient-text">{PERSONAL_INFO.name}</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-16 sm:h-12"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300">
                                {displayText}
                                <span className="inline-block w-1 h-8 bg-neon-cyan ml-1 animate-pulse"></span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-lg sm:text-xl text-gray-400 max-w-2xl"
                        >
                            {PERSONAL_INFO.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
                                View Projects
                                <ArrowRight size={20} />
                            </a>
                            <a href="#contact" className="btn-outline inline-flex items-center justify-center gap-2">
                                Contact Me
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Code Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Floating Code Icon */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="glass p-12 rounded-3xl animate-glow">
                                    <Code2 size={120} className="text-neon-cyan" />
                                </div>
                            </motion.div>

                            {/* Orbiting Elements */}
                            {[0, 1, 2].map((index) => (
                                <motion.div
                                    key={index}
                                    className="absolute w-4 h-4 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full"
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                    }}
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 10 + index * 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <div
                                        className="absolute w-4 h-4 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full blur-sm"
                                        style={{
                                            transform: `translate(-50%, -50%) translateX(${150 + index * 30
                                                }px)`,
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
