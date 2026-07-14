"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { Map, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   RouteMap — Pokémon-style Overworld Map (SVG)
   
   A Pallet-Town-style top-down map connecting all sections
   as game locations. Clickable for smooth-scroll navigation.
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
  { id: "about",        name: "About",        gameName: "Pallet Town",      x: 150, y: 60,  icon: "🏠" },
  { id: "skills",       name: "Skills",       gameName: "Training Grounds", x: 280, y: 120, icon: "⚔️" },
  { id: "projects",     name: "Projects",     gameName: "Gyms",             x: 150, y: 190, icon: "🏟️" },
  { id: "achievements", name: "Achievements", gameName: "Elite Four",       x: 50,  y: 260, icon: "🏆" },
  { id: "experience",   name: "Experience",   gameName: "Pokémon Center",   x: 220, y: 280, icon: "🏥" },
  { id: "blog",         name: "Blog",         gameName: "PC Storage",       x: 320, y: 220, icon: "💾" },
  { id: "contact",      name: "Contact",      gameName: "Poké Mart",        x: 150, y: 350, icon: "🛒" },
];

// Paths connecting locations (index pairs)
const PATHS: [number, number][] = [
  [0, 1], // About → Skills
  [0, 2], // About → Projects
  [1, 5], // Skills → Blog
  [2, 3], // Projects → Achievements
  [2, 4], // Projects → Experience
  [4, 5], // Experience → Blog
  [3, 6], // Achievements → Contact
  [4, 6], // Experience → Contact
];

export default function RouteMap() {
  const { accentColors, visitedSections, pokedexMode } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  }, []);

  if (pokedexMode) return null;

  return (
    <>
      {/* Map toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[80] p-3 rounded-xl border backdrop-blur-xl shadow-lg transition-all hover:scale-110 group"
        style={{
          background: "rgba(0,0,0,0.8)",
          borderColor: accentColors.border,
          boxShadow: `0 0 15px ${accentColors.glow}`,
        }}
        aria-label="Open route map"
      >
        <Map className="w-5 h-5" style={{ color: accentColors.primary }} />
      </motion.button>

      {/* Map overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(10,10,10,0.95)",
                borderColor: accentColors.border,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
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
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SVG Map */}
              <div className="p-4">
                <svg
                  viewBox="0 0 380 410"
                  className="w-full"
                  style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))" }}
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
                        className="cursor-pointer"
                        onClick={() => handleNavigate(loc.id)}
                        onMouseEnter={() => setHoveredLocation(loc.id)}
                        onMouseLeave={() => setHoveredLocation(null)}
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
                <div className="flex items-center justify-center gap-6 mt-3 text-[10px] text-gray-500">
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
    </>
  );
}
