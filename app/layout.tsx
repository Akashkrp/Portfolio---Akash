import type { Metadata, Viewport } from "next";
import { Unbounded, Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import CursorTrail from "@/components/CursorTrail";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Akash Kumar Prasad | AI Engineer",
  description:
    "Akash Kumar Prasad: AI Engineering Intern at Tectonic Agents, Founding Engineer at RekZon, ECE at MNNIT Allahabad. Builds RAG agents, voice AI and distributed systems. LeetCode Knight (1887), Codeforces Specialist (1416).",
  keywords: [
    "Akash Kumar Prasad",
    "Tectonic Agents",
    "RekZon",
    "AI Engineer",
    "RAG",
    "LLM Agents",
    "MNNIT Allahabad",
    "Full Stack Developer",
    "LeetCode Knight",
    "Codeforces Specialist",
  ],
  authors: [{ name: "Akash Kumar Prasad" }],
  openGraph: {
    title: "Akash Kumar Prasad | AI Engineer",
    description: "AI Engineering Intern @ Tectonic Agents | Founding Engineer @ RekZon | MNNIT Allahabad",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05040b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${unbounded.variable} ${geist.variable} ${geistMono.variable}`} style={{ scrollBehavior: "smooth" }}>
      <body suppressHydrationWarning>
        <a
          href="#experience"
          className="sr-only z-[80] rounded-full bg-ice px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Starfield />
        <CursorTrail />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
