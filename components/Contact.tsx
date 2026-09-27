"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquareCode, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import ContactForm from "./ContactForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="contact" ref={ref} className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/25 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-xl">
            <MessageSquareCode size={14} className="text-sky-400" />
            <span>Initiate Transmission</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Open to discussing high-impact engineering roles, AI agent ventures, contract systems architecture, or competitive programming collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Deck */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/85 to-[#040715]/95 border border-slate-800/80 backdrop-blur-2xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Terminal size={18} className="text-sky-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-400/40 transition-colors">
                  <div className="p-3 bg-sky-500/10 border border-sky-400/25 rounded-xl text-sky-400 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 mb-0.5">Email Protocol</h4>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-mono text-white hover:text-sky-300 transition-colors break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-400/40 transition-colors">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-400/25 rounded-xl text-indigo-400 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 mb-0.5">Mobile Transmission</h4>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-mono text-white hover:text-indigo-300 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 mb-0.5">Primary Coordinates</h4>
                    <p className="text-sm font-mono text-white">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="text-sky-400 font-mono font-semibold">Response Latency:</span> Typically replying within 12 hours. Feel free to ping via email or connect directly on LinkedIn.
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950/90 via-[#070c1f]/85 to-[#040715]/95 border border-slate-800/80 backdrop-blur-2xl shadow-xl">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
