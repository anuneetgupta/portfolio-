import Navbar          from "@/components/Navbar";
import Footer          from "@/components/Footer";
import BackToTop       from "@/components/BackToTop";
import LoadingScreen   from "@/components/LoadingScreen";
import CustomCursor    from "@/components/CustomCursor";
import CommandPalette  from "@/components/CommandPalette";
import SmoothScroll    from "@/components/SmoothScroll";
import Scene           from "@/components/3d/Scene";
import Hero            from "@/components/sections/Hero";
import About           from "@/components/sections/About";
import Skills          from "@/components/sections/Skills";
import Projects        from "@/components/sections/Projects";
import Achievements    from "@/components/sections/Achievements";
import Experience      from "@/components/sections/Experience";
import Blog            from "@/components/sections/Blog";
import Contact         from "@/components/sections/Contact";
import RecruiterView   from "@/components/sections/RecruiterView";

export default function Home() {
  return (
    <>
      {/* Phase 6: Loading screen + cursor (outside scroll wrapper) */}
      <LoadingScreen />
      <CustomCursor />
      <CommandPalette />

      <SmoothScroll>
        <main className="min-h-screen bg-black text-white overflow-hidden">
          {/* Fixed Background */}
          <Scene />

          {/* Navigation */}
          <Navbar />

          {/* Scrollable Content */}
          <div className="relative z-10 w-full">
            <section id="hero"><Hero /></section>
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="achievements"><Achievements /></section>
            <section id="experience"><Experience /></section>
            <section id="blog"><Blog /></section>
            <section id="contact"><Contact /></section>
            <Footer />
          </div>

          {/* Fixed Overlays */}
          <RecruiterView />
          <BackToTop />
        </main>
      </SmoothScroll>
    </>
  );
}
