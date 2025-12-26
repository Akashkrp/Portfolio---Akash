"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar } from "lucide-react";

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        tech: string[];
        features: string[];
        github: string;
        demo: string;
        date: string;
    };
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass glass-hover p-6 rounded-2xl card-lift group h-full flex flex-col"
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={14} />
                        <span>{project.date}</span>
                    </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-neon-cyan/10 to-electric-purple/10 text-neon-cyan border border-neon-cyan/30 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="mb-6 flex-grow">
                <h4 className="text-sm font-semibold text-electric-purple mb-3 uppercase tracking-wide">
                    Key Features
                </h4>
                <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-neon-cyan mt-1">▹</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-gray-700">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-neon-cyan/20 text-gray-300 hover:text-neon-cyan border border-gray-700 hover:border-neon-cyan transition-all duration-300 flex-1 justify-center"
                >
                    <Github size={18} />
                    <span className="font-medium">Code</span>
                </a>
                <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-electric-purple hover:shadow-lg hover:shadow-neon-cyan/50 text-white transition-all duration-300 flex-1 justify-center font-medium"
                >
                    <ExternalLink size={18} />
                    <span>Demo</span>
                </a>
            </div>
        </motion.div>
    );
}
