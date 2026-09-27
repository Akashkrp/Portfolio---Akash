import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
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
  title: "Akash Kumar Prasad | AI Engineer & Founding Engineer",
  description: "Portfolio of Akash Kumar Prasad - Founding Engineer at RekZon, Ex-SWE Intern at FreeFlow Advisors, Pre-final year ECE at MNNIT Allahabad. LeetCode Knight (1887), Codeforces Specialist (1416), AI & Distributed Systems Architect.",
  keywords: [
    "Akash Kumar Prasad",
    "RekZon",
    "Founding Engineer",
    "AI Engineer",
    "GenAI",
    "RAG",
    "MNNIT Allahabad",
    "Full Stack Developer",
    "LeetCode Knight",
    "Codeforces Specialist",
    "MahabharatGPT",
    "StockLabs",
    "Clinico",
    "Hirebotix",
  ],
  authors: [{ name: "Akash Kumar Prasad" }],
  openGraph: {
    title: "Akash Kumar Prasad | AI Engineer & Founding Engineer",
    description: "Founding Engineer @ RekZon | MNNIT Allahabad | LeetCode Knight (1887)",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#050714] text-[#e2e8f0] selection:bg-cyan-500 selection:text-black`} suppressHydrationWarning>
        <ThreeBackground />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
