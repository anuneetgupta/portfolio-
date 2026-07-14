"use client";

import { motion } from "framer-motion";
import type { AccentColors } from "@/lib/gameStore";

/* ─────────────────────────────────────────────────────────
   GymBadge — SVG badge component for project achievements
───────────────────────────────────────────────────────── */

interface GymBadgeProps {
  label: string;
  icon?: string;
  colors: AccentColors;
  size?: number;
  className?: string;
}

export default function GymBadge({
  label,
  icon = "⭐",
  colors,
  size = 64,
  className = "",
}: GymBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`relative inline-flex flex-col items-center gap-1 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id={`badge-grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.primaryLight} />
          </linearGradient>
          <linearGradient id={`badge-shine-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Main badge shape — octagon */}
        <polygon
          points="32,4 52,14 60,32 52,50 32,60 12,50 4,32 12,14"
          fill={`url(#badge-grad-${label})`}
          stroke={colors.primaryLight}
          strokeWidth="1.5"
        />

        {/* Shine overlay */}
        <polygon
          points="32,4 52,14 60,32 52,50 32,60 12,50 4,32 12,14"
          fill={`url(#badge-shine-${label})`}
        />

        {/* Inner octagon border */}
        <polygon
          points="32,12 46,18 52,32 46,46 32,52 18,46 12,32 18,18"
          fill="none"
          stroke={colors.primaryLight}
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Center icon */}
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontSize="20"
          dominantBaseline="middle"
        >
          {icon}
        </text>
      </svg>

      <span
        className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight max-w-[80px]"
        style={{ color: colors.primaryLight }}
      >
        {label}
      </span>
    </motion.div>
  );
}
