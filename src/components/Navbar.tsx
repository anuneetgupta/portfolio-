/* eslint-disable */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap, BookOpen, Map } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

/* ── Nav link data with game-mode names ── */
const NAV_LINKS = [
  { label: "About",        gameName: "Pallet Town",      href: "#about" },
  { label: "Skills",       gameName: "Training Grounds",  href: "#skills" },
  { label: "Projects",     gameName: "Gyms",              href: "#projects" },
  { label: "Achievements", gameName: "Elite Four",        href: "#achievements" },
  { label: "Experience",   gameName: "Pokémon Center",    href: "#experience" },
  { label: "Blog",         gameName: "PC Storage",        href: "#blog" },
  { label: "Contact",      gameName: "Poké Mart",         href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);

  const plainMode = useGameStore((s) => s.plainMode);
  const togglePlainMode = useGameStore((s) => s.togglePlainMode);
  const accentColors = useGameStore((s) => s.accentColors);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const setIsMapOpen = useGameStore((s) => s.setIsMapOpen);
  const setIsSummaryOpen = useGameStore((s) => s.setIsSummaryOpen);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "achievements", "experience", "blog", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Detect scroll for glass effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[200]"
        transition={{ duration: 0 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: showGameMode
              ? `linear-gradient(90deg, ${accentColors.primary}, ${accentColors.primaryLight})`
              : "linear-gradient(90deg, #3b82f6, #7c3aed, #06b6d4)",
          }}
        />
      </motion.div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-2 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between w-full max-w-6xl px-4 md:px-6 py-3 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: showGameMode ? accentColors.primary : "#2563eb",
                boxShadow: `0 0 12px ${showGameMode ? accentColors.glow : "rgba(37,99,235,0.5)"}`,
              }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-wider hidden sm:block">
              ANUNEET<span style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>.</span>
            </span>
          </button>

          {/* Desktop Links (or Map Button in Game Mode) */}
          <ul className="hidden md:flex items-center gap-1">
            {showGameMode ? (
              <li>
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105"
                  style={{
                    background: `${accentColors.primary}20`,
                    borderColor: accentColors.border,
                    color: accentColors.primaryLight,
                    borderWidth: "1px",
                  }}
                >
                  <Map className="w-4 h-4" />
                  Open Route Map
                </button>
              </li>
            ) : (
              NAV_LINKS.map(({ label, href }) => {
                const id = href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={href}>
                    <button
                      onClick={() => handleNavClick(href)}
                      className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg border bg-white/10 border-white/10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* CTA + Mode Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            {hasSelectedStarter && (
              <button
                onClick={togglePlainMode}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  plainMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
                }`}
                aria-label={plainMode ? "Switch to game mode" : "Switch to plain mode"}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{plainMode ? "Game Mode" : "Plain Mode"}</span>
              </button>
            )}

            <button
              onClick={() => setIsSummaryOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:scale-105"
              style={{
                background: showGameMode ? accentColors.primary : "#2563eb",
                boxShadow: `0 0 20px ${showGameMode ? accentColors.glow : "rgba(37,99,235,0.4)"}`,
              }}
            >
              Hire Me
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0,   scaleY: 1 }}
              exit={{   opacity: 0, y: -10, scaleY: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: "top" }}
              className="absolute top-full mt-2 left-4 right-4 bg-gray-950/95 border border-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <ul className="flex flex-col py-2">
                {showGameMode ? (
                  <li className="px-4 pb-2 pt-2">
                    <button
                      onClick={() => {
                        setIsMapOpen(true);
                        setMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold rounded-xl transition-all border"
                      style={{
                        background: `${accentColors.primary}20`,
                        borderColor: accentColors.border,
                        color: accentColors.primaryLight,
                      }}
                    >
                      <Map className="w-4 h-4" />
                      Open Route Map
                    </button>
                  </li>
                ) : (
                  NAV_LINKS.map(({ label, href }) => {
                    const id = href.replace("#", "");
                    const isActive = activeSection === id;
                    return (
                      <li key={href}>
                        <button
                          onClick={() => handleNavClick(href)}
                          className={`w-full text-left px-6 py-3.5 text-sm font-medium transition-colors flex items-center gap-3 ${
                            isActive
                              ? "bg-white/5 text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          )}
                          {label}
                        </button>
                      </li>
                    );
                  })
                )}

                {hasSelectedStarter && (
                  <li className="px-4 pb-2 pt-2 border-t border-gray-800/50 mt-1">
                    <button
                      onClick={() => {
                        togglePlainMode();
                        setMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      <BookOpen className="w-4 h-4" />
                      {plainMode ? "Switch to Game Mode" : "Switch to Plain Mode"}
                    </button>
                  </li>
                )}

                <li className="px-4 pb-3 pt-1">
                  <button
                    onClick={() => {
                      setIsSummaryOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-semibold rounded-xl transition-colors hover:scale-[1.02]"
                    style={{ background: showGameMode ? accentColors.primary : "#2563eb" }}
                  >
                    Hire Me
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
