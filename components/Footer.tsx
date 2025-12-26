"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold gradient-text font-['Space_Grotesk'] mb-3">
                            {PERSONAL_INFO.shortName}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {PERSONAL_INFO.title}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                        <div className="space-y-2">
                            <a href="#about" className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm">
                                About
                            </a>
                            <a href="#projects" className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm">
                                Projects
                            </a>
                            <a href="#skills" className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm">
                                Skills
                            </a>
                            <a href="#contact" className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Get In Touch</h4>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${PERSONAL_INFO.email}`}
                                className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                            >
                                {PERSONAL_INFO.email}
                            </a>
                            <a
                                href={`tel:${PERSONAL_INFO.phone}`}
                                className="block text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                            >
                                {PERSONAL_INFO.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-neon-cyan transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={PERSONAL_INFO.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-electric-purple transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={`mailto:${PERSONAL_INFO.email}`}
                                className="text-gray-400 hover:text-neon-cyan transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Gradient Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent mb-8"></div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
                        © {currentYear} {PERSONAL_INFO.name}. Built with
                        <Heart size={14} className="text-red-500 inline" fill="currentColor" />
                        and lots of <span className="gradient-text">code</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
