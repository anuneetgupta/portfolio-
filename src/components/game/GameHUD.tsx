"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getXPForNextStage, getStageLabel, XP_THRESHOLDS } from "@/lib/gameStore";
import PixelSprite from "./PixelSprite";
import { ChevronDown, ChevronUp, Mail, Download, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   GameHUD — Persistent XP / Level / Evolution Widget
   
   Fixed top-right corner, collapsible. Shows:
   - Current Pokémon sprite
   - XP bar with fill animation
   - Level / stage info
   - Shiny bonus message when maxed
───────────────────────────────────────────────────────── */

export default function GameHUD() {
  const {
    starter,
    hasSelectedStarter,
    xp,
    evolutionStage,
    pokedexMode,
    accentColors,
  } = useGameStore();

  const [collapsed, setCollapsed] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [prevXP, setPrevXP] = useState(xp);

  // Don't render if no starter selected or in Pokédex mode
  if (!hasSelectedStarter || !starter || pokedexMode) return null;

  const { next, label } = getXPForNextStage(xp);
  const stageLabel = getStageLabel(evolutionStage);

  // XP bar percentage (within current stage)
  const prevThreshold =
    evolutionStage === 1
      ? 0
      : evolutionStage === 2
        ? XP_THRESHOLDS.stage2
        : evolutionStage === 3
          ? XP_THRESHOLDS.stage3
          : XP_THRESHOLDS.shiny;

  const progressInStage = Math.min(
    ((xp - prevThreshold) / (next - prevThreshold)) * 100,
    100
  );

  const isMaxed = evolutionStage === "shiny";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-16 right-4 z-[90] select-none"
      >
        {/* Main HUD container */}
        <div
          className="rounded-xl overflow-hidden border backdrop-blur-xl shadow-2xl transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.85)",
            borderColor: accentColors.border,
            boxShadow: `0 0 20px ${accentColors.glow}, 0 10px 30px rgba(0,0,0,0.5)`,
            width: collapsed ? 56 : 220,
          }}
        >
          {/* Toggle bar */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors"
            aria-label={collapsed ? "Expand HUD" : "Collapse HUD"}
          >
            {/* Mini sprite when collapsed */}
            <div className="flex items-center gap-2">
              <PixelSprite starter={starter} stage={evolutionStage} scale={collapsed ? 3 : 2} />
              {!collapsed && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: accentColors.primaryLight }}
                >
                  Lv.{evolutionStage === "shiny" ? "★" : evolutionStage}
                </span>
              )}
            </div>
            {!collapsed &&
              (collapsed ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
              ))}
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 space-y-2.5">
                  {/* Sprite display */}
                  <div className="flex justify-center py-2">
                    <motion.div
                      key={`${evolutionStage}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <PixelSprite starter={starter} stage={evolutionStage} scale={4} />
                    </motion.div>
                  </div>

                  {/* Stage label */}
                  <p className="text-[10px] text-gray-400 text-center leading-tight">
                    {stageLabel}
                  </p>

                  {/* XP Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 font-medium">XP</span>
                      <span className="text-[10px] font-bold" style={{ color: accentColors.primary }}>
                        {xp} / {isMaxed ? "MAX" : next}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: accentColors.gradient,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${isMaxed ? 100 : progressInStage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    {!isMaxed && (
                      <p className="text-[9px] text-gray-600 text-right">
                        Next: {label}
                      </p>
                    )}
                  </div>

                  {/* Shiny bonus message */}
                  {isMaxed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-lg border text-center space-y-2"
                      style={{
                        background: `${accentColors.primary}10`,
                        borderColor: `${accentColors.primary}30`,
                      }}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" style={{ color: "#fbbf24" }} />
                        <span className="text-[10px] font-bold text-yellow-400">
                          JOURNEY COMPLETE!
                        </span>
                        <Sparkles className="w-3 h-3" style={{ color: "#fbbf24" }} />
                      </div>
                      <p className="text-[9px] text-gray-400 leading-relaxed">
                        You&apos;ve fully explored my journey — let&apos;s build something together
                      </p>
                      <div className="flex gap-1.5">
                        <a
                          href="mailto:guptaanuneet10june@gmail.com"
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[9px] font-bold text-white transition-colors"
                          style={{ background: accentColors.primary }}
                        >
                          <Mail className="w-2.5 h-2.5" /> Email
                        </a>
                        <a
                          href="/resume.pdf"
                          download
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[9px] font-bold border text-gray-300 hover:text-white transition-colors"
                          style={{ borderColor: accentColors.border }}
                        >
                          <Download className="w-2.5 h-2.5" /> Resume
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
