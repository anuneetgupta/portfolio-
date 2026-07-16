"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   PokedexCard — Flippable skill card with Pokédex styling
   
   Front: Skill name + type badge + icon
   Back: Proficiency bar + description + experience
───────────────────────────────────────────────────────── */

export type SkillType = "Language" | "Framework" | "Domain" | "Tool";

const TYPE_COLORS: Record<SkillType, { bg: string; text: string; border: string }> = {
  Language:  { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  Framework: { bg: "rgba(168,85,247,0.15)",  text: "#c084fc", border: "rgba(168,85,247,0.3)" },
  Domain:    { bg: "rgba(34,197,94,0.15)",   text: "#4ade80", border: "rgba(34,197,94,0.3)" },
  Tool:      { bg: "rgba(156,163,175,0.15)", text: "#d1d5db", border: "rgba(156,163,175,0.3)" },
};

interface PokedexCardProps {
  name: string;
  type: SkillType;
  proficiency: number;
  experience: string;
  projects: string;
  accentColor: string;
  index: number;
  onFlip?: () => void;
}

export default function PokedexCard({
  name,
  type,
  proficiency,
  experience,
  projects,
  accentColor,
  index,
  onFlip,
}: PokedexCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const typeStyle = TYPE_COLORS[type];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && onFlip) {
      onFlip();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
      onKeyDown={(e) => { if (e.key === "Enter") handleFlip(); }}
      tabIndex={0}
      role="button"
      aria-label={`${name} skill card. ${isFlipped ? "Showing details" : "Click to flip"}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-full h-[160px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border transition-shadow duration-300 group-hover:shadow-[0_0_15px_var(--hover-color)]"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15,15,15,0.9)",
            borderColor: "rgba(255,255,255,0.08)",
            "--hover-color": accentColor,
          } as React.CSSProperties}
        >
          {/* Scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          />

          {/* Pokédex red accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: accentColor }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-4 gap-3">
            {/* Pokédex number */}
            <span className="absolute top-2 right-3 text-[10px] text-gray-600 font-mono">
              #{String(index + 1).padStart(3, "0")}
            </span>

            {/* Name */}
            <h4
              className="text-base font-bold text-white text-center"
              style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "11px" }}
            >
              {name}
            </h4>

            {/* Type badge */}
            <span
              className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: typeStyle.bg,
                color: typeStyle.text,
                border: `1px solid ${typeStyle.border}`,
              }}
            >
              {type}
            </span>

            {/* Flip hint */}
            <span className="text-[9px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to flip →
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border transition-shadow duration-300 shadow-[0_0_15px_var(--hover-color)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(15,15,15,0.95)",
            borderColor: "rgba(255,255,255,0.1)",
            "--hover-color": accentColor,
          } as React.CSSProperties}
        >
          {/* Scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          />

          {/* Accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: accentColor }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center p-4 gap-3">
            <h4 className="text-sm font-bold text-white">{name}</h4>

            {/* Proficiency bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-500">Proficiency</span>
                <span className="font-bold" style={{ color: accentColor }}>
                  {proficiency}%
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accentColor }}
                  initial={{ width: 0 }}
                  animate={{ width: isFlipped ? `${proficiency}%` : 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Experience</span>
                <span className="text-gray-300 font-medium">{experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Used In</span>
                <span className="text-gray-300 font-medium text-right max-w-[120px] truncate">
                  {projects}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
