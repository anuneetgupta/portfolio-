/* eslint-disable */
"use client";

import { GitBranch, Mail, Briefcase, Zap, Heart, Save } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

export default function Footer() {
  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const xp = useGameStore((s) => s.xp);
  const evolutionStage = useGameStore((s) => s.evolutionStage);
  const visitedSections = useGameStore((s) => s.visitedSections);

  const showGameMode = hasSelectedStarter && !plainMode;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-16 px-6 border-t border-gray-800 bg-black text-white z-10">
      <div className="max-w-6xl mx-auto">

        {/* Game mode: session save indicator */}
        {showGameMode && (
          <div
            className="flex items-center justify-center gap-2 mb-8 px-4 py-2 rounded-full mx-auto w-fit border text-xs"
            style={{
              background: `${accentColors.primary}10`,
              borderColor: accentColors.border,
              color: accentColors.primaryLight,
              fontFamily: "var(--font-pixel), monospace",
            }}
          >
            <Save className="w-3.5 h-3.5 animate-pulse" />
            <span className="opacity-90">Game Saved · {visitedSections.length}/8 locations visited · {xp} XP · Stage {evolutionStage === "shiny" ? "★" : evolutionStage}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: showGameMode ? accentColors.primary : "#2563eb",
                boxShadow: `0 0 15px ${showGameMode ? accentColors.glow : "rgba(37,99,235,0.4)"}`,
              }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg text-white tracking-wider">
                ANUNEET<span style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>.</span>
              </p>
              <p className="text-xs text-gray-500">AI/ML Engineer</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/anuneetgupta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
              aria-label="GitHub"
            >
              <GitBranch className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/anuneet-gupta-57898631a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all"
              aria-label="LinkedIn"
            >
              <Briefcase className="w-5 h-5" />
            </a>
            <a
              href="mailto:guptaanuneet10june@gmail.com"
              className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 text-center md:text-right">
            <p className="flex items-center gap-1.5 justify-center md:justify-end">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> by Anuneet Gupta
            </p>
            <p className="mt-1">&copy; {currentYear} · All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
