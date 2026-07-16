"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   RouteMap — Phase 3 update
   - Uses gameStore.isMapOpen instead of local state
   - Keyboard navigation & ARIA labels added
   - Hero node added as "Pallet Town"
   - Snaps to bottom-sheet on mobile
───────────────────────────────────────────────────────── */

interface MapLocation {
  id: string;
  name: string;
  gameName: string;
  x: number;
  y: number;
  icon: string;
}

const LOCATIONS: MapLocation[] = [
  { id: "hero",         name: "Home",         gameName: "Pallet Town",      x: 150, y: 50,  icon: "🏠" },
  { id: "about",        name: "About",        gameName: "Prof's Lab",       x: 150, y: 120, icon: "🔬" },
  { id: "skills",       name: "Skills",       gameName: "Training Grounds", x: 280, y: 120, icon: "⚔️" },
  { id: "projects",     name: "Projects",     gameName: "Gyms",             x: 150, y: 200, icon: "🏟️" },
  { id: "achievements", name: "Achievements", gameName: "Elite Four",       x: 60,  y: 260, icon: "🏆" },
  { id: "experience",   name: "Experience",   gameName: "Pokémon Center",   x: 240, y: 280, icon: "🏥" },
  { id: "blog",         name: "Blog",         gameName: "PC Storage",       x: 320, y: 200, icon: "💾" },
  { id: "contact",      name: "Contact",      gameName: "Poké Mart",        x: 150, y: 350, icon: "🛒" },
];

const PATHS: [number, number][] = [
  [0, 1], // Hero → About
  [1, 2], // About → Skills
  [1, 3], // About → Projects
  [2, 6], // Skills → Blog
  [3, 4], // Projects → Achievements
  [3, 5], // Projects → Experience
  [5, 6], // Experience → Blog
  [4, 7], // Achievements → Contact
  [5, 7], // Experience → Contact
];

export default function RouteMap() {
  const { accentColors, visitedSections, plainMode, isMapOpen, setIsMapOpen } = useGameStore();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMapOpen(false);
    }
  }, [setIsMapOpen]);

  if (plainMode) return null;

  return (
    <AnimatePresence>
      {isMapOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/85 backdrop-blur-sm p-0 md:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMapOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-t-3xl md:rounded-2xl overflow-hidden border-t md:border"
            style={{
              background: "rgba(10,10,10,0.95)",
              borderColor: accentColors.border,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 md:py-3 border-b"
              style={{ borderColor: accentColors.border }}
            >
              <h3
                className="text-sm font-bold tracking-wider uppercase"
                style={{
                  color: accentColors.primaryLight,
                  fontFamily: "var(--font-pixel), monospace",
                }}
              >
                🗺️ Route Map
              </h3>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close map"
              >
                <X className="w-5 h-5 md:w-4 md:h-4" />
              </button>
            </div>

            {/* SVG Map */}
            <div className="p-4 md:p-6 pb-8 md:pb-4">
              <svg
                viewBox="0 0 380 410"
                className="w-full"
                style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))" }}
                role="application"
                aria-label="Interactive Route Map"
              >
                {/* Grid pattern background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="380" height="410" fill="url(#grid)" rx="8" />

                {/* Paths between locations */}
                {PATHS.map(([from, to], i) => {
                  const a = LOCATIONS[from];
                  const b = LOCATIONS[to];
                  const visited =
                    visitedSections.includes(a.id) &&
                    visitedSections.includes(b.id);
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={visited ? accentColors.primary : "rgba(255,255,255,0.1)"}
                      strokeWidth={visited ? 3 : 2}
                      strokeDasharray={visited ? "none" : "6 4"}
                      strokeLinecap="round"
                      style={{
                        filter: visited ? `drop-shadow(0 0 4px ${accentColors.glow})` : "none",
                        transition: "all 0.5s ease",
                      }}
                    />
                  );
                })}

                {/* Location nodes */}
                {LOCATIONS.map((loc) => {
                  const visited = visitedSections.includes(loc.id);
                  const isHovered = hoveredLocation === loc.id;

                  return (
                    <g
                      key={loc.id}
                      className="cursor-pointer outline-none"
                      onClick={() => handleNavigate(loc.id)}
                      onMouseEnter={() => setHoveredLocation(loc.id)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onFocus={() => setHoveredLocation(loc.id)}
                      onBlur={() => setHoveredLocation(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleNavigate(loc.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Travel to ${loc.name} (${loc.gameName})`}
                      style={{ transition: "transform 0.2s ease" }}
                    >
                      {/* Glow ring for visited */}
                      {visited && (
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={isHovered ? 28 : 24}
                          fill="none"
                          stroke={accentColors.primary}
                          strokeWidth="1.5"
                          opacity="0.4"
                          style={{
                            filter: `drop-shadow(0 0 6px ${accentColors.glow})`,
                          }}
                        >
                          <animate
                            attributeName="r"
                            values={isHovered ? "26;30;26" : "22;26;22"}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.4;0.8;0.4"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Focus ring for accessibility */}
                      {isHovered && (
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={32}
                          fill="none"
                          stroke={accentColors.primaryLight}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      )}

                      {/* Background circle */}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isHovered ? 22 : 18}
                        fill={visited ? `${accentColors.primary}30` : "rgba(30,30,30,0.9)"}
                        stroke={visited ? accentColors.primary : "rgba(255,255,255,0.15)"}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        style={{ transition: "all 0.2s ease" }}
                      />

                      {/* Icon */}
                      <text
                        x={loc.x}
                        y={loc.y + 5}
                        textAnchor="middle"
                        fontSize={isHovered ? "16" : "14"}
                        style={{ transition: "font-size 0.2s ease" }}
                      >
                        {loc.icon}
                      </text>

                      {/* Label */}
                      <text
                        x={loc.x}
                        y={loc.y + 36}
                        textAnchor="middle"
                        fill={visited ? accentColors.primaryLight : "rgba(255,255,255,0.5)"}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="var(--font-pixel), monospace"
                        letterSpacing="0.5"
                      >
                        {loc.gameName}
                      </text>

                      {/* "Visited" badge */}
                      {visited && (
                        <circle
                          cx={loc.x + 14}
                          cy={loc.y - 14}
                          r={4}
                          fill={accentColors.primary}
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0.5;1"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-5 text-[10px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: accentColors.primary }}
                  />
                  <span>Visited</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <span>Undiscovered</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
