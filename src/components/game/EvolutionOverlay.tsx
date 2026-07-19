"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getEvolutionName } from "@/lib/gameStore";
import PixelSprite from "./PixelSprite";

/* ─────────────────────────────────────────────────────────
   EvolutionOverlay

   Full-screen flash when evolution stage changes.
   Classic sequence: flash → silhouette → new form reveal.
   Respects prefers-reduced-motion.
───────────────────────────────────────────────────────── */

export default function EvolutionOverlay() {
  const {
    starter,
    isEvolving,
    evolutionStage,
    prevEvolutionStage,
    accentColors,
    setIsEvolving,
  } = useGameStore();

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Auto-dismiss after animation
  useEffect(() => {
    if (!isEvolving) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion.current) {
      setIsEvolving(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsEvolving(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [isEvolving, setIsEvolving]);

  if (!starter || !isEvolving) return null;

  const evolvedName = getEvolutionName(starter, evolutionStage);
  const prevName = getEvolutionName(starter, prevEvolutionStage);
  const stageName =
    evolutionStage === "shiny"
      ? `✨ ${evolvedName} (Shiny)`
      : evolvedName;

  const stageDescription =
    evolutionStage === 2
      ? "2025: Built Computer Vision Projects"
      : evolutionStage === 3
        ? "2026: Production AI & Ideathon Win"
        : evolutionStage === "shiny"
          ? "✨ Journey Complete!"
          : "";

  return (
    <AnimatePresence>
      {isEvolving && (
        <motion.div
          key="evolution-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setIsEvolving(false)}
        >
          {/* Flash effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0, 1, 0, 0.5, 0],
              background: [
                "transparent",
                accentColors.primary,
                "transparent",
                "#fff",
                "transparent",
                accentColors.primary,
                "transparent",
              ],
            }}
            transition={{ duration: 2, times: [0, 0.1, 0.2, 0.35, 0.5, 0.6, 0.8] }}
          />

          {/* "What? ... is evolving!" text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center z-10 mb-8"
          >
            <p
              className="text-lg md:text-xl text-white"
              style={{ fontFamily: "var(--font-pixel), monospace" }}
            >
              What?{" "}
              <span style={{ color: accentColors.primaryLight }}>
                {prevName}
              </span>{" "}
              is evolving!
            </p>
          </motion.div>

          {/* Sprite transition */}
          <div className="relative z-10">
            {/* Old form (fades/shrinks out) */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.5, filter: "brightness(5)" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <PixelSprite
                starter={starter}
                stage={prevEvolutionStage}
                scale={6}
              />
            </motion.div>

            {/* New form (appears) */}
            <motion.div
              initial={{ opacity: 0, scale: 1.5, filter: "brightness(5)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            >
              <PixelSprite
                starter={starter}
                stage={evolutionStage}
                scale={8}
              />
            </motion.div>
          </div>

          {/* New stage info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="text-center z-10 mt-8 space-y-2"
          >
            <p
              className="text-xl md:text-2xl font-bold"
              style={{
                color: accentColors.primaryLight,
                fontFamily: "var(--font-pixel), monospace",
              }}
            >
              Evolved to {stageName}!
            </p>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "var(--font-pixel), monospace" }}>
              {prevName} → {evolvedName}
            </p>
            <p className="text-sm text-gray-400">{stageDescription}</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ delay: 3, duration: 1, repeat: Infinity }}
              className="text-xs text-gray-600 mt-4"
            >
              Click anywhere to continue
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
