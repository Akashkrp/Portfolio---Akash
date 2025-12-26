"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import ContactForm from "./ContactForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section id="contact" ref={ref} className="relative z-10 bg-gradient-to-t from-transparent via-background/30 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-electric-purple mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                        Let&apos;s build something amazing together
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="glass p-8 rounded-2xl">
                            <h3 className="text-2xl font-semibold mb-6 gradient-text">
                                Contact Information
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-neon-cyan to-electric-purple rounded-lg flex-shrink-0">
                                        <Mail size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Email</h4>
                                        <a
                                            href={`mailto:${PERSONAL_INFO.email}`}
                                            className="text-gray-400 hover:text-neon-cyan transition-colors"
                                        >
                                            {PERSONAL_INFO.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-electric-purple to-pink-500 rounded-lg flex-shrink-0">
                                        <Phone size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Phone</h4>
                                        <a
                                            href={`tel:${PERSONAL_INFO.phone}`}
                                            className="text-gray-400 hover:text-electric-purple transition-colors"
                                        >
                                            {PERSONAL_INFO.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-neon-cyan rounded-lg flex-shrink-0">
                                        <MapPin size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Location</h4>
                                        <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-2xl">
                            <p className="text-gray-400 text-sm leading-relaxed">
                                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass p-8 rounded-2xl">
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
