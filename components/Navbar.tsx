"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "glass py-4 shadow-lg"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="#home" className="text-2xl font-bold gradient-text font-['Space_Grotesk']">
                        {PERSONAL_INFO.shortName}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-neon-cyan transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side - Resume & Social Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href={PERSONAL_INFO.resumeUrl}
                            className="flex items-center gap-2 text-gray-300 hover:text-neon-cyan transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FileDown size={18} />
                            <span className="font-medium">Resume</span>
                        </a>
                        <div className="h-6 w-px bg-gray-700"></div>
                        <a
                            href={PERSONAL_INFO.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-neon-cyan transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={PERSONAL_INFO.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-electric-purple transition-colors duration-200"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-neon-cyan transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass mt-4 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="block text-gray-300 hover:text-neon-cyan transition-colors duration-200 font-medium py-2"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-gray-700 space-y-4">
                                <a
                                    href={PERSONAL_INFO.resumeUrl}
                                    className="flex items-center gap-2 text-gray-300 hover:text-neon-cyan transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleLinkClick}
                                >
                                    <FileDown size={18} />
                                    <span className="font-medium">Resume</span>
                                </a>
                                <div className="flex items-center gap-6">
                                    <a
                                        href={PERSONAL_INFO.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-neon-cyan transition-colors duration-200"
                                        aria-label="GitHub"
                                        onClick={handleLinkClick}
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a
                                        href={PERSONAL_INFO.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-electric-purple transition-colors duration-200"
                                        aria-label="LinkedIn"
                                        onClick={handleLinkClick}
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
