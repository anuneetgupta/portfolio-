"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import type { StarterType } from "@/lib/gameStore";
import PixelSprite from "./PixelSprite";
import GameDialogueBox from "./GameDialogueBox";

/* ─────────────────────────────────────────────────────────
   StarterSelection

   Full-screen intro overlay:
   1. Game-Boy boot text → "Initializing..." 
   2. Professor intro dialogue
   3. Starter selection (3 choices)
   4. Flash transition → site loads
───────────────────────────────────────────────────────── */

const STARTERS: {
  type: StarterType;
  name: string;
  label: string;
  description: string;
  specialty: string;
  typeIcon: string;
  color: string;
  colorLight: string;
  bgGradient: string;
}[] = [
  {
    type: "vision",
    name: "Vision",
    label: "Fire Type",
    description: "Computer Vision specialist. Sees patterns in pixels, detects faces, tracks gazes.",
    specialty: "Computer Vision",
    typeIcon: "🔥",
    color: "#ef4444",
    colorLight: "#fca5a5",
    bgGradient: "from-red-900/40 to-orange-900/30",
  },
  {
    type: "lexis",
    name: "Lexis",
    label: "Grass Type",
    description: "NLP & LLM specialist. Processes language, generates wisdom, maps knowledge.",
    specialty: "NLP / LLMs",
    typeIcon: "🌿",
    color: "#22c55e",
    colorLight: "#86efac",
    bgGradient: "from-green-900/40 to-emerald-900/30",
  },
  {
    type: "flowchain",
    name: "Flowchain",
    label: "Water Type",
    description: "Full-stack & Deployment specialist. Flows from backend to frontend, ships to production.",
    specialty: "Full-stack / Deploy",
    typeIcon: "💧",
    color: "#3b82f6",
    colorLight: "#93c5fd",
    bgGradient: "from-blue-900/40 to-indigo-900/30",
  },
];

const INTRO_LINES = [
  "Welcome to the world of AI/ML!",
  "I am Professor... Anuneet Gupta, AI/ML Engineer from Kanpur.",
  "The world of artificial intelligence is vast and full of wonder.",
  "Now, choose your starter to explore my journey!",
];

type Phase = "boot" | "intro" | "selection" | "flash" | "done";

export default function StarterSelection() {
  const { hasSelectedStarter, selectStarter, accentColors } = useGameStore();

  const [phase, setPhase] = useState<Phase>("boot");
  const [bootText, setBootText] = useState("");
  const [hoveredStarter, setHoveredStarter] = useState<StarterType | null>(null);
  const [selectedType, setSelectedType] = useState<StarterType | null>(null);

  // Boot text animation
  useEffect(() => {
    if (phase !== "boot") return;

    const bootLines = [
      "POKEMON PORTFOLIO v2.0",
      "=======================",
      "",
      "> Initializing neural systems...",
      "> Loading AI modules.............. OK",
      "> Mounting computer vision core... OK",
      "> Connecting NLP pipeline......... OK",
      "> Deploying full-stack engine..... OK",
      "",
      "> System Ready.",
      "",
      "> Press any key to continue...",
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let fullText = "";

    const timer = setInterval(() => {
      if (lineIdx >= bootLines.length) {
        clearInterval(timer);
        return;
      }

      const line = bootLines[lineIdx];
      if (charIdx <= line.length) {
        setBootText(fullText + line.slice(0, charIdx));
        charIdx++;
      } else {
        fullText += line + "\n";
        lineIdx++;
        charIdx = 0;
      }
    }, 25);

    return () => clearInterval(timer);
  }, [phase]);

  // Boot → intro on click/key
  const handleBootAdvance = useCallback(() => {
    if (phase === "boot") {
      setPhase("intro");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "boot") return;
    const handler = () => handleBootAdvance();
    // Add listener after a short delay so the boot screen is visible
    const t = setTimeout(() => {
      window.addEventListener("click", handler);
      window.addEventListener("keydown", handler);
    }, 2000);
    return () => {
      clearTimeout(t);
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [phase, handleBootAdvance]);

  // Handle starter selection
  const handleSelect = (type: StarterType) => {
    setSelectedType(type);
    selectStarter(type);

    // Flash transition
    setTimeout(() => setPhase("flash"), 300);
    setTimeout(() => setPhase("done"), 1200);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="starter-selection"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{ background: "#000" }}
        >
          {/* Scanline overlay */}
          <div className="scanline-overlay absolute inset-0 pointer-events-none z-50" />

          {/* ── BOOT PHASE ── */}
          {phase === "boot" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-2xl px-8"
            >
              <pre
                className="text-green-400 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap"
                style={{ textShadow: "0 0 8px rgba(34,197,94,0.5)" }}
              >
                {bootText}
                <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" />
              </pre>
            </motion.div>
          )}

          {/* ── INTRO PHASE ── */}
          {phase === "intro" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-xl px-6"
            >
              {/* Professor avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="flex justify-center mb-8"
              >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                  <span className="text-4xl">🧑‍🔬</span>
                </div>
              </motion.div>

              <GameDialogueBox
                lines={INTRO_LINES}
                speaker="Prof. Anuneet"
                accentColor="#3b82f6"
                onComplete={() => setPhase("selection")}
              />
            </motion.div>
          )}

          {/* ── SELECTION PHASE ── */}
          {phase === "selection" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl px-6 space-y-8"
            >
              <div className="text-center space-y-2">
                <h2
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-pixel), monospace" }}
                >
                  Choose Your Starter
                </h2>
                <p className="text-gray-400 text-sm">
                  Each represents a specialization in my AI/ML journey. Your choice sets the site&apos;s accent color.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {STARTERS.map((s) => (
                  <motion.button
                    key={s.type}
                    onClick={() => handleSelect(s.type)}
                    onMouseEnter={() => setHoveredStarter(s.type)}
                    onMouseLeave={() => setHoveredStarter(null)}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${s.bgGradient} border-2 transition-all duration-300 text-left overflow-hidden group`}
                    style={{
                      borderColor:
                        hoveredStarter === s.type ? s.color : "rgba(255,255,255,0.1)",
                      boxShadow:
                        hoveredStarter === s.type
                          ? `0 0 30px ${s.color}40, 0 20px 40px rgba(0,0,0,0.5)`
                          : "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                    aria-label={`Select ${s.name} — ${s.specialty}`}
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${s.color}15, transparent 70%)`,
                      }}
                    />

                    {/* Sprite */}
                    <div className="flex justify-center mb-4 relative z-10">
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        <PixelSprite starter={s.type} stage={1} scale={5} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.typeIcon}</span>
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: s.colorLight }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{s.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {s.description}
                      </p>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2"
                        style={{
                          background: `${s.color}20`,
                          color: s.colorLight,
                          border: `1px solid ${s.color}40`,
                        }}
                      >
                        {s.specialty}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Skip button for returning visitors */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    const starterToUse = hasSelectedStarter && useGameStore.getState().starter ? useGameStore.getState().starter : "flowchain";
                    selectStarter(starterToUse as StarterType);
                    setPhase("flash");
                    setTimeout(() => setPhase("done"), 800);
                  }}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-4"
                >
                  {hasSelectedStarter ? "Resume Adventure →" : "Skip intro →"}
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── FLASH PHASE ── */}
          {phase === "flash" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.1, 0.7, 1] }}
              className="fixed inset-0 z-[1001] flex items-center justify-center"
              style={{ background: selectedType ? STARTERS.find(s => s.type === selectedType)?.color : "#fff" }}
            >
              {selectedType && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                >
                  <PixelSprite starter={selectedType} stage={1} scale={8} />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
