/* eslint-disable */
"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar          from "@/components/Navbar";
import Footer          from "@/components/Footer";
import BackToTop       from "@/components/BackToTop";
import SmoothScroll    from "@/components/SmoothScroll";
import Scene           from "@/components/3d/Scene";
import Hero            from "@/components/sections/Hero";
import About           from "@/components/sections/About";
import Skills          from "@/components/sections/Skills";
import Projects        from "@/components/sections/Projects";
import Achievements    from "@/components/sections/Achievements";
import Experience      from "@/components/sections/Experience";
import Extracurriculars from "@/components/sections/Extracurriculars";
import Blog            from "@/components/sections/Blog";
import Contact         from "@/components/sections/Contact";
import RecruiterView   from "@/components/sections/RecruiterView";

// Game components (client-only, lazy-loaded)
const StarterSelection = dynamic(() => import("@/components/game/StarterSelection"), { ssr: false });
const GameHUD          = dynamic(() => import("@/components/game/GameHUD"), { ssr: false });
const EvolutionOverlay = dynamic(() => import("@/components/game/EvolutionOverlay"), { ssr: false });
const RouteMap         = dynamic(() => import("@/components/game/RouteMap"), { ssr: false });

// Client-only components (to prevent hydration mismatches)
const LoadingScreenDynamic = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const CustomCursorDynamic  = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const CommandPaletteDynamic = dynamic(() => import("@/components/CommandPalette"), { ssr: false });

import { useGameStore } from "@/lib/gameStore";

/* ── Section XP tracker ── */
function SectionXPTracker() {
  const visitSection = useGameStore((s) => s.visitSection);
  const addXP = useGameStore((s) => s.addXP);

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "achievements", "extracurriculars", "experience", "blog", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visitSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // Track resume download XP
    const resumeLinks = document.querySelectorAll('a[href="/resume.pdf"]');
    const handleResumeClick = () => addXP(25, "download-resume");
    resumeLinks.forEach((link) => link.addEventListener("click", handleResumeClick));

    // Track external link clicks (projects and certificates)
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    const handleExternalLinkClick = (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement)?.href || "";
      if (href.includes("github") || href.includes("vercel")) {
        addXP(15, `project-link-${href}`);
      } else if (href.includes("certificate") || href.includes(".pdf") || href.includes(".jpg") || href.includes(".png")) {
        addXP(25, `view-certificate-${href}`);
      }
    };
    externalLinks.forEach((link) => link.addEventListener("click", handleExternalLinkClick as EventListener));

    return () => {
      observers.forEach((o) => o.disconnect());
      resumeLinks.forEach((link) => link.removeEventListener("click", handleResumeClick));
      externalLinks.forEach((link) => link.removeEventListener("click", handleExternalLinkClick as EventListener));
    };
  }, [visitSection, addXP]);

  return null;
}

export default function Home() {
  // Suppress fdprocessedid hydration warnings from browser extensions (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = function(...args) {
        // Suppress fdprocessedid hydration mismatch warnings (caused by browser extensions like Grammarly)
        if (
          args[0]?.toString?.().includes('A tree hydrated') &&
          args[0]?.toString?.().includes('fdprocessedid')
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return (
    <>
      {/* Game entry gate */}
      <StarterSelection />

      {/* Phase 6: Loading screen + cursor (outside scroll wrapper) */}
      <LoadingScreenDynamic />
      <CustomCursorDynamic />
      <CommandPaletteDynamic />

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
            <section id="extracurriculars"><Extracurriculars /></section>
            <section id="experience"><Experience /></section>
            <section id="blog"><Blog /></section>
            <section id="contact"><Contact /></section>
            <Footer />
          </div>

          {/* Fixed Overlays */}
          <RecruiterView />
          <BackToTop />

          {/* Game Overlays */}
          <GameHUD />
          <EvolutionOverlay />
          <RouteMap />

          {/* XP Tracking */}
          <SectionXPTracker />
        </main>
      </SmoothScroll>
    </>
  );
}
