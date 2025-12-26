import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Kumar Prasad | Full Stack Developer & Competitive Programmer",
  description: "Portfolio of Akash Kumar Prasad - Pre-final year ECE student at MNNIT Allahabad. Full Stack Developer specializing in MERN stack and Competitive Programmer with 700+ problems solved on LeetCode.",
  keywords: ["Akash Kumar Prasad", "Full Stack Developer", "MERN Stack", "Competitive Programming", "MNNIT", "Web Development", "React", "Node.js"],
  authors: [{ name: "Akash Kumar Prasad" }],
  openGraph: {
    title: "Akash Kumar Prasad | Full Stack Developer",
    description: "Building scalable web applications & solving complex algorithmic problems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

