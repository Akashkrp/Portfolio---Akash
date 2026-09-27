import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Achievements from "@/components/Achievements";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <CodingProfiles />
      <Achievements />
      <About />
      <Contact />
    </div>
  );
}
