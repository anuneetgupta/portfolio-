"use client";

import { memo } from "react";
import type { StarterType, EvolutionStage } from "@/lib/gameStore";

/* ─────────────────────────────────────────────────────────
   Pixel Sprite Component
   
   Renders CSS-based pixel art using a single <div> with
   box-shadow for each pixel. Each starter has 3 evolution
   stages + a shiny variant (just adds sparkle overlay).
   
   Grid: 12×12 px, each cell = {scale}px
───────────────────────────────────────────────────────── */

type PixelGrid = string[][];  // 12 rows × 12 cols, each cell = color or "" (transparent)

const _ = ""; // transparent alias

/* ── VISION (Fire / Computer Vision) — Abstract Eye Creature ── */
const VISION_STAGE_1: PixelGrid = [
  [_,_,_,_,"#b91c1c","#b91c1c","#b91c1c","#b91c1c",_,_,_,_],
  [_,_,_,"#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444",_,_,_],
  [_,_,"#ef4444","#ef4444","#fff","#fff","#fff","#fff","#ef4444","#ef4444",_,_],
  [_,"#ef4444","#ef4444","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#ef4444","#ef4444",_],
  [_,"#f97316","#ef4444","#fff","#1e1e1e","#3b82f6","#3b82f6","#1e1e1e","#fff","#ef4444","#f97316",_],
  ["#f97316","#f97316","#ef4444","#fff","#1e1e1e","#3b82f6","#3b82f6","#1e1e1e","#fff","#ef4444","#f97316","#f97316"],
  ["#f97316","#f97316","#ef4444","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#ef4444","#f97316","#f97316"],
  [_,"#f97316","#ef4444","#ef4444","#fff","#fff","#fff","#fff","#ef4444","#ef4444","#f97316",_],
  [_,_,"#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444",_,_],
  [_,_,_,"#b91c1c","#ef4444","#ef4444","#ef4444","#ef4444","#b91c1c",_,_,_],
  [_,_,_,_,"#b91c1c","#b91c1c","#b91c1c","#b91c1c",_,_,_,_],
  [_,_,_,_,_,"#7f1d1d","#7f1d1d",_,_,_,_,_],
];

const VISION_STAGE_2: PixelGrid = [
  [_,_,"#f97316",_,_,_,_,_,_,"#f97316",_,_],
  [_,"#f97316","#ef4444","#f97316",_,_,_,_,"#f97316","#ef4444","#f97316",_],
  [_,"#ef4444","#ef4444","#ef4444","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#ef4444","#ef4444","#ef4444",_],
  ["#ef4444","#ef4444","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#ef4444","#ef4444"],
  ["#ef4444","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#ef4444"],
  ["#b91c1c","#fff","#1e1e1e","#3b82f6","#60a5fa","#1e1e1e","#1e1e1e","#3b82f6","#60a5fa","#1e1e1e","#fff","#b91c1c"],
  ["#b91c1c","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#b91c1c"],
  ["#ef4444","#ef4444","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#ef4444","#ef4444"],
  [_,"#ef4444","#ef4444","#b91c1c","#ef4444","#ef4444","#ef4444","#ef4444","#b91c1c","#ef4444","#ef4444",_],
  [_,_,"#b91c1c","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#b91c1c",_,_],
  [_,_,_,"#7f1d1d","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#7f1d1d",_,_,_],
  [_,_,"#7f1d1d",_,_,"#7f1d1d","#7f1d1d",_,_,"#7f1d1d",_,_],
];

const VISION_STAGE_3: PixelGrid = [
  ["#fbbf24","#f97316",_,_,_,_,_,_,_,_,"#f97316","#fbbf24"],
  [_,"#fbbf24","#f97316","#ef4444",_,_,_,_,"#ef4444","#f97316","#fbbf24",_],
  [_,_,"#ef4444","#ef4444","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#ef4444","#ef4444",_,_],
  [_,"#ef4444","#ef4444","#fff","#fff","#fff","#fff","#fff","#fff","#ef4444","#ef4444",_],
  ["#ef4444","#ef4444","#fff","#1e1e1e","#fbbf24","#fff","#fff","#fbbf24","#1e1e1e","#fff","#ef4444","#ef4444"],
  ["#b91c1c","#fff","#1e1e1e","#fbbf24","#ef4444","#1e1e1e","#1e1e1e","#ef4444","#fbbf24","#1e1e1e","#fff","#b91c1c"],
  ["#b91c1c","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#1e1e1e","#1e1e1e","#fff","#fff","#b91c1c"],
  ["#ef4444","#ef4444","#fff","#fff","#fff","#fbbf24","#fbbf24","#fff","#fff","#fff","#ef4444","#ef4444"],
  [_,"#ef4444","#ef4444","#b91c1c","#fbbf24","#ef4444","#ef4444","#fbbf24","#b91c1c","#ef4444","#ef4444",_],
  [_,"#b91c1c","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#ef4444","#b91c1c",_],
  ["#7f1d1d",_,"#b91c1c","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#b91c1c","#b91c1c",_,"#7f1d1d"],
  [_,"#7f1d1d",_,_,"#7f1d1d",_,_,"#7f1d1d",_,_,"#7f1d1d",_],
];

/* ── LEXIS (Grass / NLP) — Abstract Text/Book Creature ── */
const LEXIS_STAGE_1: PixelGrid = [
  [_,_,_,_,"#166534","#166534","#166534","#166534",_,_,_,_],
  [_,_,_,"#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e",_,_,_],
  [_,_,"#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e",_,_],
  [_,"#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e",_],
  [_,"#4ade80","#22c55e","#1e1e1e","#fff","#22c55e","#22c55e","#1e1e1e","#fff","#22c55e","#4ade80",_],
  [_,"#4ade80","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#4ade80",_],
  [_,"#4ade80","#22c55e","#22c55e","#166534","#166534","#166534","#166534","#22c55e","#22c55e","#4ade80",_],
  [_,_,"#22c55e","#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e","#22c55e",_,_],
  [_,_,_,"#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e",_,_,_],
  [_,_,"#166534","#166534","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#166534",_,_],
  [_,_,"#166534",_,_,"#166534","#166534",_,_,"#166534",_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const LEXIS_STAGE_2: PixelGrid = [
  [_,"#4ade80",_,_,_,"#22c55e","#22c55e",_,_,_,"#4ade80",_],
  ["#4ade80","#22c55e","#4ade80",_,"#166534","#22c55e","#22c55e","#166534",_,"#4ade80","#22c55e","#4ade80"],
  [_,"#22c55e","#22c55e","#166534","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#22c55e","#22c55e",_],
  [_,"#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e",_],
  ["#22c55e","#22c55e","#fff","#1e1e1e","#4ade80","#22c55e","#22c55e","#4ade80","#1e1e1e","#fff","#22c55e","#22c55e"],
  ["#166534","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534"],
  ["#166534","#22c55e","#22c55e","#166534","#166534","#fbbf24","#fbbf24","#166534","#166534","#22c55e","#22c55e","#166534"],
  [_,"#22c55e","#22c55e","#22c55e","#fff","#fff","#fff","#fff","#22c55e","#22c55e","#22c55e",_],
  [_,_,"#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e",_,_],
  [_,"#166534","#166534","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#166534",_],
  [_,"#166534",_,"#166534","#166534",_,_,"#166534","#166534",_,"#166534",_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const LEXIS_STAGE_3: PixelGrid = [
  ["#fbbf24","#4ade80",_,_,_,_,_,_,_,_,"#4ade80","#fbbf24"],
  [_,"#4ade80","#22c55e","#4ade80",_,"#166534","#166534",_,"#4ade80","#22c55e","#4ade80",_],
  [_,"#22c55e","#22c55e","#22c55e","#166534","#22c55e","#22c55e","#166534","#22c55e","#22c55e","#22c55e",_],
  ["#22c55e","#22c55e","#22c55e","#fff","#fbbf24","#22c55e","#22c55e","#fbbf24","#fff","#22c55e","#22c55e","#22c55e"],
  ["#22c55e","#22c55e","#fff","#1e1e1e","#22c55e","#22c55e","#22c55e","#22c55e","#1e1e1e","#fff","#22c55e","#22c55e"],
  ["#166534","#22c55e","#22c55e","#22c55e","#22c55e","#fbbf24","#fbbf24","#22c55e","#22c55e","#22c55e","#22c55e","#166534"],
  ["#166534","#22c55e","#22c55e","#166534","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#166534","#22c55e","#22c55e","#166534"],
  [_,"#22c55e","#22c55e","#22c55e","#fff","#fff","#fff","#fff","#22c55e","#22c55e","#22c55e",_],
  [_,"#166534","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534",_],
  ["#166534","#22c55e","#166534","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#22c55e","#166534"],
  [_,"#166534",_,"#166534","#166534",_,_,"#166534","#166534",_,"#166534",_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── FLOWCHAIN (Water / Full-stack) — Abstract Flow/Wave Creature ── */
const FLOWCHAIN_STAGE_1: PixelGrid = [
  [_,_,_,_,"#1e40af","#1e40af","#1e40af","#1e40af",_,_,_,_],
  [_,_,_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_,_,_],
  [_,_,"#3b82f6","#3b82f6","#3b82f6","#60a5fa","#60a5fa","#3b82f6","#3b82f6","#3b82f6",_,_],
  [_,"#3b82f6","#3b82f6","#fff","#fff","#3b82f6","#3b82f6","#fff","#fff","#3b82f6","#3b82f6",_],
  [_,"#60a5fa","#3b82f6","#1e1e1e","#fff","#3b82f6","#3b82f6","#1e1e1e","#fff","#3b82f6","#60a5fa",_],
  [_,"#60a5fa","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#60a5fa",_],
  [_,"#60a5fa","#3b82f6","#3b82f6","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#3b82f6","#3b82f6","#60a5fa",_],
  [_,_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_,_],
  [_,_,_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_,_,_],
  [_,_,"#1e40af","#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af","#1e40af",_,_],
  [_,_,"#1e40af",_,_,"#1e40af","#1e40af",_,_,"#1e40af",_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const FLOWCHAIN_STAGE_2: PixelGrid = [
  [_,"#93c5fd",_,_,_,"#3b82f6","#3b82f6",_,_,_,"#93c5fd",_],
  ["#93c5fd","#60a5fa","#93c5fd",_,"#1e40af","#3b82f6","#3b82f6","#1e40af",_,"#93c5fd","#60a5fa","#93c5fd"],
  [_,"#3b82f6","#3b82f6","#1e40af","#3b82f6","#60a5fa","#60a5fa","#3b82f6","#1e40af","#3b82f6","#3b82f6",_],
  [_,"#3b82f6","#3b82f6","#fff","#fff","#3b82f6","#3b82f6","#fff","#fff","#3b82f6","#3b82f6",_],
  ["#3b82f6","#3b82f6","#fff","#1e1e1e","#60a5fa","#3b82f6","#3b82f6","#60a5fa","#1e1e1e","#fff","#3b82f6","#3b82f6"],
  ["#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af"],
  ["#1e40af","#3b82f6","#3b82f6","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#3b82f6","#3b82f6","#1e40af"],
  [_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_],
  [_,_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_,_],
  [_,"#1e40af","#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af","#1e40af",_],
  [_,"#1e40af",_,"#1e40af","#1e40af",_,_,"#1e40af","#1e40af",_,"#1e40af",_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const FLOWCHAIN_STAGE_3: PixelGrid = [
  ["#fbbf24","#93c5fd",_,_,_,_,_,_,_,_,"#93c5fd","#fbbf24"],
  [_,"#93c5fd","#60a5fa","#93c5fd",_,"#1e40af","#1e40af",_,"#93c5fd","#60a5fa","#93c5fd",_],
  [_,"#3b82f6","#3b82f6","#3b82f6","#1e40af","#60a5fa","#60a5fa","#1e40af","#3b82f6","#3b82f6","#3b82f6",_],
  ["#3b82f6","#3b82f6","#3b82f6","#fff","#fbbf24","#3b82f6","#3b82f6","#fbbf24","#fff","#3b82f6","#3b82f6","#3b82f6"],
  ["#3b82f6","#3b82f6","#fff","#1e1e1e","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e1e1e","#fff","#3b82f6","#3b82f6"],
  ["#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#fbbf24","#fbbf24","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af"],
  ["#1e40af","#3b82f6","#3b82f6","#93c5fd","#fbbf24","#93c5fd","#93c5fd","#fbbf24","#93c5fd","#3b82f6","#3b82f6","#1e40af"],
  [_,"#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6",_],
  [_,"#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af",_],
  ["#1e40af","#3b82f6","#1e40af","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#3b82f6","#1e40af","#3b82f6","#1e40af"],
  [_,"#1e40af",_,"#1e40af","#1e40af",_,_,"#1e40af","#1e40af",_,"#1e40af",_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── Sprite Map ── */
const SPRITE_MAP: Record<StarterType, Record<1 | 2 | 3, PixelGrid>> = {
  vision:    { 1: VISION_STAGE_1,    2: VISION_STAGE_2,    3: VISION_STAGE_3 },
  lexis:     { 1: LEXIS_STAGE_1,     2: LEXIS_STAGE_2,     3: LEXIS_STAGE_3 },
  flowchain: { 1: FLOWCHAIN_STAGE_1, 2: FLOWCHAIN_STAGE_2, 3: FLOWCHAIN_STAGE_3 },
};

/* ── Build box-shadow string from grid ── */
function buildBoxShadow(grid: PixelGrid, scale: number): string {
  const shadows: string[] = [];
  grid.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        shadows.push(`${x * scale}px ${y * scale}px 0 0 ${color}`);
      }
    });
  });
  return shadows.join(",");
}

/* ── Component ── */
interface PixelSpriteProps {
  starter: StarterType;
  stage: EvolutionStage;
  scale?: number;
  className?: string;
}

function PixelSpriteInner({ starter, stage, scale = 4, className = "" }: PixelSpriteProps) {
  const numericStage = stage === "shiny" ? 3 : stage;
  const grid = SPRITE_MAP[starter][numericStage];
  const boxShadow = buildBoxShadow(grid, scale);
  const isShiny = stage === "shiny";

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: 12 * scale, height: 12 * scale }}
      aria-label={`${starter} starter, evolution stage ${stage}`}
    >
      <div
        style={{
          width: scale,
          height: scale,
          boxShadow,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {/* Shiny sparkle overlay */}
      {isShiny && (
        <>
          <div
            className="absolute animate-ping"
            style={{
              top: -2,
              right: -2,
              width: scale * 2,
              height: scale * 2,
              background: "#fbbf24",
              borderRadius: "50%",
              opacity: 0.6,
            }}
          />
          <div
            className="absolute animate-ping"
            style={{
              bottom: scale * 2,
              left: -2,
              width: scale * 1.5,
              height: scale * 1.5,
              background: "#fbbf24",
              borderRadius: "50%",
              opacity: 0.4,
              animationDelay: "0.5s",
            }}
          />
        </>
      )}
    </div>
  );
}

const PixelSprite = memo(PixelSpriteInner);
export default PixelSprite;
