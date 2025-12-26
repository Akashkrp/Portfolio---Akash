import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingProfiles />
      <Achievements />
      <Contact />
    </div>
  );
}

