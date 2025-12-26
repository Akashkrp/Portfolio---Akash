"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            setErrorMessage("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus("error");
            setErrorMessage("Please enter a valid email address");
            return;
        }

        try {
            // Initialize EmailJS with your public key
            // You'll need to sign up at https://www.emailjs.com/ and get your credentials
            // Replace these with your actual EmailJS credentials
            await emailjs.send(
                "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
                "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: "Akash Kumar Prasad",
                },
                "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
            );

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus("idle");
            }, 5000);
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("error");
            setErrorMessage("Failed to send message. Please try again or email directly.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-gray-700 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white placeholder-gray-500 transition-all duration-300"
                    placeholder="John Doe"
                    disabled={status === "loading"}
                />
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-gray-700 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white placeholder-gray-500 transition-all duration-300"
                    placeholder="john@example.com"
                    disabled={status === "loading"}
                />
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-gray-700 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white placeholder-gray-500 resize-none transition-all duration-300"
                    placeholder="Tell me about your project or just say hi!"
                    disabled={status === "loading"}
                />
            </div>

            {/* Status Messages */}
            {status === "success" && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                >
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
            )}

            {status === "error" && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                >
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                </motion.div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full btn-primary flex items-center justify-center gap-2 ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {status === "loading" ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <Send size={20} />
                        <span>Send Message</span>
                    </>
                )}
            </button>

            {/* Note about EmailJS setup */}
            <p className="text-xs text-gray-500 text-center">
                Note: To enable email functionality, configure EmailJS with your credentials in ContactForm.tsx
            </p>
        </form>
    );
}
