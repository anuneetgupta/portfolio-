import Scene from "@/components/3d/Scene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import RecruiterView from "@/components/sections/RecruiterView";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden selection:bg-blue-500/30">
      <Scene />
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Blog />
        <Contact />
      </div>

      {/* Fixed UI Overlays */}
      <RecruiterView />
    </main>
  );
}
