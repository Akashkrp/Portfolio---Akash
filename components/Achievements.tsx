"use client";

import { motion } from "framer-motion";
import { Star, Medal, Trophy, Award } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const iconMap = {
    Star,
    Medal,
    Trophy,
    Award,
};

export default function Achievements() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="achievements" ref={ref} className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        <span className="gradient-text">Achievements</span> & Awards
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                        Recognition and milestones
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {ACHIEVEMENTS.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon as keyof typeof iconMap];

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="glass glass-hover p-6 rounded-xl flex gap-4 items-start group"
                            >
                                <div className="p-3 bg-gradient-to-br from-neon-cyan to-electric-purple rounded-lg flex-shrink-0 group-hover:animate-glow">
                                    <Icon size={24} className="text-white" />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                                            {achievement.title}
                                        </h3>
                                        <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                                            {achievement.date}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
