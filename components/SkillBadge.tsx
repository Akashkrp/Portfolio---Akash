"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface SkillBadgeProps {
    name: string;
    index: number;
}

export default function SkillBadge({ name, index }: SkillBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass glass-hover p-4 rounded-xl flex items-center gap-3 cursor-default group"
        >
            <div className="p-2 bg-gradient-to-br from-neon-cyan/20 to-electric-purple/20 rounded-lg group-hover:from-neon-cyan/40 group-hover:to-electric-purple/40 transition-all duration-300">
                <div className="w-6 h-6 bg-gradient-to-br from-neon-cyan to-electric-purple rounded"></div>
            </div>
            <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                {name}
            </span>
        </motion.div>
    );
}
