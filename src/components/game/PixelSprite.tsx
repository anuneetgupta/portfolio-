"use client";

import { memo } from "react";
import type { StarterType, EvolutionStage } from "@/lib/gameStore";

/* ─────────────────────────────────────────────────────────
   Pixel Sprite Component — Real Pokemon Edition
   
   Renders CSS-based pixel art using a single <div> with
   box-shadow for each pixel. Each of the 4 Pokemon has 
   3 evolution stages + a shiny variant (adds sparkle overlay).
   
   Pokemon: Charmander, Squirtle, Bulbasaur, Pikachu
   Grid: 12×12 px, each cell = {scale}px
───────────────────────────────────────────────────────── */

type PixelGrid = string[][];  // 12 rows × 12 cols, each cell = color or "" (transparent)

const _ = ""; // transparent alias

/* ── CHARMANDER (Fire Type / Computer Vision) ── */
const CHARMANDER_STAGE_1: PixelGrid = [
  [_,_,_,_,_,"#ea580c",_,_,_,_,_,_],
  [_,_,_,_,"#ea580c","#ea580c","#ea580c",_,_,_,_,_],
  [_,_,_,"#ea580c","#fff","#fff","#ea580c","#ea580c",_,_,_,_],
  [_,_,"#ea580c","#ea580c","#000","#000","#ea580c","#ea580c","#ea580c",_,_,_],
  [_,_,"#ea580c","#fff","#fff","#fff","#fff","#ea580c","#ea580c",_,_,_],
  [_,_,_,"#fbbf24","#ea580c","#ea580c","#ea580c","#fbbf24",_,_,_,_],
  [_,_,"#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c",_,_,_,_],
  [_,"#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c",_,_,_],
  [_,"#fbbf24",_,_,"#ea580c",_,_,"#ea580c",_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const CHARMANDER_STAGE_2: PixelGrid = [
  [_,_,"#fbbf24",_,_,"#c2410c","#c2410c",_,_,_,_,_],
  [_,_,"#fbbf24","#fbbf24","#ea580c","#ea580c","#ea580c","#c2410c",_,_,_,_],
  [_,"#fbbf24","#fbbf24","#ea580c","#fff","#fff","#ea580c","#ea580c","#ea580c",_,_,_],
  ["#fbbf24","#fbbf24","#ea580c","#ea580c","#000","#000","#ea580c","#ea580c","#ea580c","#c2410c",_,_],
  ["#fbbf24","#fbbf24","#ea580c","#fff","#fff","#fff","#fff","#ea580c","#ea580c","#c2410c",_,_],
  [_,"#fbbf24","#ea580c","#fbbf24","#ea580c","#ea580c","#ea580c","#fbbf24","#ea580c",_,_,_],
  [_,"#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c",_,_,_],
  ["#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c",_,_],
  [_,"#ea580c","#fbbf24",_,"#ea580c","#fbbf24",_,"#ea580c","#fbbf24",_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const CHARMANDER_STAGE_3: PixelGrid = [
  [_,_,"#fbbf24",_,_,"#7c2d12","#7c2d12",_,"#fbbf24","#fbbf24",_,_],
  [_,"#fbbf24","#fbbf24","#fbbf24","#ea580c","#ea580c","#ea580c","#7c2d12","#fbbf24","#fbbf24",_,_],
  ["#fbbf24","#fbbf24","#fbbf24","#ea580c","#fff","#fff","#ea580c","#ea580c","#ea580c","#7c2d12",_,_],
  ["#fbbf24","#fbbf24","#ea580c","#ea580c","#000","#000","#ea580c","#ea580c","#ea580c","#7c2d12","#7c2d12",_],
  ["#fbbf24","#fbbf24","#ea580c","#fff","#fff","#fff","#fff","#ea580c","#ea580c","#7c2d12","#7c2d12",_],
  [_,"#fbbf24","#ea580c","#fbbf24","#ea580c","#ea580c","#ea580c","#fbbf24","#ea580c","#7c2d12",_,_],
  [_,"#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#7c2d12",_,_],
  ["#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#ea580c","#7c2d12",_],
  ["#7c2d12","#ea580c","#fbbf24","#fbbf24","#ea580c","#fbbf24","#fbbf24","#ea580c","#fbbf24","#7c2d12",_,_],
  [_,"#7c2d12","#7c2d12",_,"#7c2d12",_,_,"#7c2d12","#7c2d12",_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── SQUIRTLE (Water Type / Full-Stack) ── */
const SQUIRTLE_STAGE_1: PixelGrid = [
  [_,_,_,_,_,"#0369a1","#0369a1",_,_,_,_,_],
  [_,_,_,"#0369a1","#0369a1","#0369a1","#0369a1","#0369a1",_,_,_,_],
  [_,_,"#0369a1","#0369a1","#fff","#fff","#0369a1","#0369a1","#0369a1",_,_,_],
  [_,"#0369a1","#0369a1","#fff","#000","#000","#fff","#0369a1","#0369a1","#0369a1",_,_],
  [_,"#0369a1","#0369a1","#fff","#fff","#fff","#fff","#0369a1","#0369a1",_,_,_],
  [_,_,"#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1",_,_,_,_],
  [_,_,"#0369a1","#0369a1","#93c5fd","#93c5fd","#0369a1","#0369a1",_,_,_,_],
  [_,"#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1",_,_,_],
  [_,"#0369a1",_,_,"#0369a1",_,_,"#0369a1",_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const SQUIRTLE_STAGE_2: PixelGrid = [
  [_,_,"#0369a1",_,_,"#0c4a6e","#0c4a6e",_,_,_,"#0369a1",_],
  [_,"#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0c4a6e",_,_,"#0369a1","#0369a1"],
  ["#0369a1","#0369a1","#0369a1","#fff","#fff","#0369a1","#0369a1","#0c4a6e","#0369a1","#0369a1","#0369a1",_],
  ["#0369a1","#0369a1","#fff","#000","#000","#fff","#0369a1","#0c4a6e","#0369a1","#0369a1","#0369a1",_],
  ["#0369a1","#0369a1","#fff","#fff","#fff","#fff","#0369a1","#0c4a6e","#0369a1",_,_,_],
  ["#0c4a6e","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1",_,_,_],
  ["#0c4a6e","#0369a1","#0369a1","#93c5fd","#93c5fd","#0369a1","#0369a1","#0369a1","#0369a1",_,_,_],
  ["#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1",_,_],
  ["#0369a1","#0369a1",_,_,"#0369a1","#93c5fd",_,"#0369a1","#93c5fd",_,_,_],
  [_,"#0369a1",_,"#0369a1",_,_,_,"#0369a1",_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const SQUIRTLE_STAGE_3: PixelGrid = [
  [_,"#0369a1","#0369a1","#0369a1",_,"#0c4a6e","#0c4a6e",_,"#0369a1","#0369a1","#0369a1",_],
  ["#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0c4a6e","#0369a1","#0369a1","#0369a1","#0369a1"],
  ["#0369a1","#0369a1","#0369a1","#fff","#fff","#0369a1","#0369a1","#0c4a6e","#0369a1","#0369a1","#0369a1","#0369a1"],
  ["#0c4a6e","#0369a1","#fff","#000","#000","#fff","#0369a1","#0c4a6e","#0369a1","#0369a1","#0c4a6e","#0c4a6e"],
  ["#0c4a6e","#0369a1","#fff","#fff","#fff","#fff","#0369a1","#0c4a6e","#0369a1","#0c4a6e","#0c4a6e","#0c4a6e"],
  ["#0c4a6e","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0c4a6e",_,_],
  ["#0c4a6e","#0369a1","#0369a1","#93c5fd","#93c5fd","#0369a1","#0369a1","#0369a1","#0369a1","#0c4a6e",_,_],
  ["#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0369a1","#0c4a6e",_],
  ["#0369a1","#0369a1","#0c4a6e",_,"#0369a1","#93c5fd","#93c5fd","#0369a1","#93c5fd","#0369a1","#0c4a6e",_],
  ["#0c4a6e","#0369a1","#0c4a6e","#0369a1","#0c4a6e",_,_,"#0c4a6e","#0c4a6e","#0c4a6e",_,_],
  [_,"#0c4a6e",_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── BULBASAUR (Grass Type / NLP) ── */
const BULBASAUR_STAGE_1: PixelGrid = [
  [_,_,_,_,"#166534","#166534",_,_,_,_,_,_],
  [_,_,_,"#166534","#22c55e","#22c55e","#166534",_,_,_,_,_],
  [_,_,"#166534","#22c55e","#22c55e","#22c55e","#166534","#166534",_,_,_,_],
  [_,"#166534","#22c55e","#22c55e","#fff","#fff","#22c55e","#166534","#166534",_,_,_],
  [_,"#166534","#22c55e","#fff","#000","#000","#fff","#22c55e","#166534",_,_,_],
  [_,_,"#166534","#22c55e","#22c55e","#22c55e","#22c55e","#166534",_,_,_,_],
  [_,_,"#166534","#22c55e","#22c55e","#22c55e","#166534",_,_,_,_,_],
  [_,_,"#166534","#166534","#166534","#166534",_,_,_,_,_,_],
  [_,_,"#22c55e",_,_,"#22c55e",_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const BULBASAUR_STAGE_2: PixelGrid = [
  [_,"#22c55e",_,"#166534","#166534",_,_,"#166534","#166534",_,_,_],
  ["#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534",_,"#22c55e","#22c55e","#22c55e",_,_],
  ["#166534","#22c55e","#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e","#22c55e","#166534","#166534",_],
  ["#166534","#22c55e","#22c55e","#fff","#000","#000","#fff","#22c55e","#166534","#22c55e","#166534","#166534"],
  [_,"#166534","#22c55e","#fff","#fff","#fff","#fff","#22c55e","#166534","#22c55e","#166534",_],
  [_,"#166534","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#166534",_,"#166534",_,_],
  [_,_,"#166534","#22c55e","#22c55e","#22c55e","#166534",_,_,_,_,_],
  [_,_,"#166534","#166534","#166534","#166534",_,_,_,_,_,_],
  [_,_,"#22c55e","#4ade80",_,"#22c55e","#4ade80",_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const BULBASAUR_STAGE_3: PixelGrid = [
  ["#22c55e","#22c55e",_,"#166534","#166534","#166534",_,"#166534","#166534","#166534",_,_],
  ["#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#166534",_],
  ["#166534","#22c55e","#22c55e","#22c55e","#fff","#fff","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#166534"],
  ["#166534","#22c55e","#22c55e","#fff","#000","#000","#fff","#22c55e","#166534","#22c55e","#166534","#166534"],
  ["#166534","#166534","#22c55e","#fff","#fff","#fff","#fff","#22c55e","#166534","#22c55e","#166534","#166534"],
  [_,"#166534","#22c55e","#22c55e","#22c55e","#22c55e","#166534","#166534","#22c55e","#166534","#166534",_],
  [_,"#166534","#166534","#22c55e","#22c55e","#22c55e","#166534","#22c55e","#22c55e","#166534",_,_],
  [_,_,"#166534","#166534","#166534","#166534","#166534","#166534","#166534",_,_,_],
  [_,_,"#22c55e","#4ade80","#4ade80","#22c55e","#4ade80","#4ade80","#22c55e",_,_,_],
  [_,_,_,"#166534","#166534",_,"#166534","#166534",_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── PIKACHU (Electric Type / Full-Stack Master) ── */
const PIKACHU_STAGE_1: PixelGrid = [
  [_,_,_,_,"#fbbf24","#fbbf24",_,_,_,_,_,_],
  [_,_,_,"#fbbf24","#fbbf24","#fbbf24","#fbbf24",_,_,_,_,_],
  [_,_,"#fbbf24","#fbbf24","#fff","#fff","#fbbf24","#fbbf24",_,_,_,_],
  [_,"#fbbf24","#fbbf24","#fff","#000","#000","#fff","#fbbf24","#fbbf24",_,_,_],
  [_,"#fbbf24","#fbbf24","#fff","#fff","#fff","#fff","#fbbf24","#fbbf24",_,_,_],
  [_,_,"#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24",_,_,_,_],
  [_,"#000","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#000",_,_,_],
  [_,"#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24",_,_,_],
  [_,"#fbbf24","#000",_,"#fbbf24",_,_,"#fbbf24","#000",_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const PIKACHU_STAGE_2: PixelGrid = [
  [_,_,"#fbbf24",_,_,"#ea580c","#ea580c",_,"#fbbf24","#fbbf24",_,_],
  [_,"#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c","#fbbf24","#fbbf24",_,_],
  ["#fbbf24","#fbbf24","#fbbf24","#fff","#fff","#fbbf24","#fbbf24","#ea580c","#fbbf24","#fbbf24","#fbbf24",_],
  ["#fbbf24","#fbbf24","#fff","#000","#000","#fff","#fbbf24","#ea580c","#fbbf24","#fbbf24","#fbbf24",_],
  ["#fbbf24","#fbbf24","#fff","#fff","#fff","#fff","#fbbf24","#ea580c","#fbbf24",_,_,_],
  ["#ea580c","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c","#fbbf24",_,_,_],
  ["#ea580c","#000","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#000","#ea580c",_,_],
  ["#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c",_],
  ["#fbbf24","#fbbf24","#000","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#000","#ea580c",_,_],
  ["#ea580c","#ea580c",_,"#fbbf24",_,_,_,"#ea580c","#ea580c",_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

const PIKACHU_STAGE_3: PixelGrid = [
  ["#ea580c","#ea580c","#fbbf24",_,"#fbbf24","#ea580c","#ea580c",_,"#fbbf24","#fbbf24","#ea580c","#ea580c"],
  ["#ea580c","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c","#fbbf24","#fbbf24","#fbbf24","#ea580c"],
  ["#fbbf24","#fbbf24","#fbbf24","#fff","#fff","#fbbf24","#fbbf24","#ea580c","#fbbf24","#fbbf24","#fbbf24","#fbbf24"],
  ["#fbbf24","#fbbf24","#fff","#000","#000","#fff","#fbbf24","#ea580c","#fbbf24","#fbbf24","#ea580c","#ea580c"],
  ["#fbbf24","#fbbf24","#fff","#fff","#fff","#fff","#fbbf24","#ea580c","#fbbf24","#ea580c","#ea580c","#ea580c"],
  ["#ea580c","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c","#fbbf24","#ea580c",_,_],
  ["#ea580c","#000","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#000","#ea580c",_,_],
  ["#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c",_],
  ["#fbbf24","#fbbf24","#000","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#000","#ea580c","#ea580c",_],
  ["#ea580c","#ea580c","#ea580c","#fbbf24","#fbbf24","#fbbf24","#fbbf24","#ea580c","#ea580c","#ea580c",_,_],
  ["#ea580c",_,"#ea580c",_,_,"#ea580c","#ea580c",_,"#ea580c",_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_],
];

/* ── Sprite Map ── */
const SPRITE_MAP: Record<StarterType, Record<1 | 2 | 3, PixelGrid>> = {
  charmander: { 1: CHARMANDER_STAGE_1, 2: CHARMANDER_STAGE_2, 3: CHARMANDER_STAGE_3 },
  squirtle:   { 1: SQUIRTLE_STAGE_1,   2: SQUIRTLE_STAGE_2,   3: SQUIRTLE_STAGE_3 },
  bulbasaur:  { 1: BULBASAUR_STAGE_1,  2: BULBASAUR_STAGE_2,  3: BULBASAUR_STAGE_3 },
  pikachu:    { 1: PIKACHU_STAGE_1,    2: PIKACHU_STAGE_2,    3: PIKACHU_STAGE_3 },
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
  
  // Defensive check: ensure starter exists in SPRITE_MAP
  if (!starter || !SPRITE_MAP[starter]) {
    console.warn(`PixelSprite: Invalid starter "${starter}". Using pikachu as fallback.`);
    return null;
  }
  
  const grid = SPRITE_MAP[starter][numericStage];
  
  // Defensive check: ensure stage exists
  if (!grid) {
    console.warn(`PixelSprite: No sprite for starter "${starter}" at stage ${numericStage}`);
    return null;
  }
  
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
