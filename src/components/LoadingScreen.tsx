/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";

/*
  LoadingScreen — Phase 2 polish
  
  Changes:
  - "Skip to Portfolio →" link is ALWAYS visible from the first frame
  - Extended boot text: "INITIALIZING TRAINER PROFILE..." → "LOADING ANUNEET.EXE..."
  - Skips entirely if returning visitor already has a starter selected
*/

export default function LoadingScreen() {
  const [progress, setProgress]   = useState(0);
  const [phase,    setPhase]      = useState<"boot" | "done">("boot");
  const [hidden,   setHidden]     = useState(false);
  const [lines,    setLines]      = useState<string[]>([]);
  const [mounted,  setMounted]    = useState(false);

  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  // Only run after hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Returning visitor: skip the loading screen entirely
  useEffect(() => {
    if (!mounted) return;
    if (hasSelectedStarter) {
      setHidden(true);
    }
  }, [hasSelectedStarter, mounted]);

  // Boot text lines
  const BOOT_LINES = [
    "POKEMON PORTFOLIO v2.0",
    "=======================",
    "",
    "> INITIALIZING TRAINER PROFILE...",
    "> LOADING ANUNEET.EXE...",
    "> Mounting computer vision core... OK",
    "> Connecting NLP pipeline......... OK",
    "> Deploying full-stack engine..... OK",
    "> System Ready.",
  ];

  useEffect(() => {
    if (!mounted) return;
    if (hasSelectedStarter) return; // Don't animate for returning visitors
    if (phase !== "boot") return;

    let lineIdx = 0;
    let currentLines: string[] = [];

    const tick = () => {
      if (lineIdx < BOOT_LINES.length) {
        currentLines = [...currentLines, BOOT_LINES[lineIdx]];
        setLines([...currentLines]);
        lineIdx++;
        setTimeout(tick, lineIdx < 3 ? 120 : 200 + Math.random() * 100);
      }
    };

    const t = setTimeout(tick, 150);
    return () => clearTimeout(t);
  }, [phase, hasSelectedStarter, mounted]);

  // Progress bar animation (independent of boot text)
  useEffect(() => {
    if (!mounted) return;
    if (hasSelectedStarter) return;
    const steps = [15, 35, 55, 70, 85, 95, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, 250 + Math.random() * 150);
      } else {
        setTimeout(() => {
          setPhase("done");
          setTimeout(() => setHidden(true), 600);
        }, 400);
      }
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [hasSelectedStarter, mounted]);

  const handleSkip = () => {
    setPhase("done");
    setTimeout(() => setHidden(true), 300);
  };

  if (!mounted) return null;
  
  if (hidden) return null;

  return (
    <AnimatePresence>
      {phase === "boot" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[998] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scanline overlay */}
          <div className="scanline-overlay absolute inset-0 z-50 pointer-events-none" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
          </div>

          {/* ── ALWAYS-VISIBLE Skip button ── */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-[60] text-xs text-gray-500 hover:text-gray-300 transition-colors border border-gray-800 hover:border-gray-600 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm"
            aria-label="Skip loading screen and go to portfolio"
          >
            Skip to Portfolio →
          </button>

          {/* Boot terminal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl px-8 mb-10"
          >
            <pre
              className="text-green-400 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap"
              style={{ textShadow: "0 0 8px rgba(34,197,94,0.5)" }}
            >
              {lines.join("\n")}
              <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" />
            </pre>
          </motion.div>

          {/* Progress bar */}
          <div className="w-56 space-y-2">
            <div className="h-2 bg-gray-900 rounded-sm overflow-hidden border border-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-sm relative xp-shimmer"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-[9px] text-gray-600 tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                Initializing
              </span>
              <span
                className="text-[9px] text-blue-400 font-bold"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                {progress}%
              </span>
            </div>
          </div>

          {/* PRESS START prompt — appears after boot lines complete */}
          <AnimatePresence>
            {lines.length >= BOOT_LINES.filter(l => l !== "").length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-12 text-[11px] text-gray-400 tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                — PRESS START —
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
