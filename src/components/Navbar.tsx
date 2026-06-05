"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience",   href: "#experience" },
  { label: "Blog",         href: "#blog" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);

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

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 z-[200]"
      />

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
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.7)] transition-all">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-wider hidden sm:block">
              ANUNEET<span className="text-blue-400">.</span>
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
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
                        className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:guptaanuneet10june@gmail.com"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Hire Me
            </a>
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
              className="absolute top-full mt-2 left-4 right-4 bg-gray-950/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <ul className="flex flex-col py-2">
                {NAV_LINKS.map(({ label, href }) => {
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <li key={href}>
                      <button
                        onClick={() => handleNavClick(href)}
                        className={`w-full text-left px-6 py-3.5 text-sm font-medium transition-colors flex items-center gap-3 ${
                          isActive
                            ? "text-blue-400 bg-blue-500/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                        {label}
                      </button>
                    </li>
                  );
                })}
                <li className="px-4 pb-3 pt-2">
                  <a
                    href="mailto:guptaanuneet10june@gmail.com"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Hire Me
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
