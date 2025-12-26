"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Projects() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="projects" ref={ref} className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                        Building solutions that make a difference
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
