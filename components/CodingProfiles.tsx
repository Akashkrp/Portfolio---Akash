"use client";

import { motion } from "framer-motion";
import { Trophy, Award, ExternalLink } from "lucide-react";
import { CODING_PROFILES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CodingProfiles() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="coding-profiles" ref={ref} className="relative z-10 bg-gradient-to-b from-transparent via-background/30 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        Badges of <span className="gradient-text">Honor</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                        Competitive programming achievements
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {CODING_PROFILES.map((profile, index) => {
                        const Icon = profile.platform === "LeetCode" ? Trophy : Award;
                        const gradientClass = profile.color === "neon-cyan"
                            ? "from-neon-cyan to-blue-500"
                            : "from-electric-purple to-pink-500";

                        return (
                            <motion.a
                                key={profile.platform}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="glass glass-hover p-8 rounded-2xl gradient-border group cursor-pointer relative overflow-hidden"
                            >
                                {/* Background Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 bg-gradient-to-br ${gradientClass} rounded-xl animate-glow`}>
                                            <Icon size={40} className="text-white" />
                                        </div>
                                        <ExternalLink size={20} className="text-gray-400 group-hover:text-neon-cyan transition-colors" />
                                    </div>

                                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                                        {profile.platform}
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Tier</span>
                                            <span className="text-xl font-bold text-white">{profile.tier}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Rating</span>
                                            <span className={`text-2xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                                                {profile.rating}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Problems Solved</span>
                                            <span className="text-xl font-bold text-neon-cyan">{profile.problemsSolved}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-700">
                                        <span className="text-sm text-gray-500 group-hover:text-neon-cyan transition-colors">
                                            @{profile.username}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
