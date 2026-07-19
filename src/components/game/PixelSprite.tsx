"use client";

import { memo, useState } from "react";
import Image from "next/image";
import type { StarterType, EvolutionStage } from "@/lib/gameStore";
import { getPokemonSpriteUrl, getEvolutionName } from "@/lib/gameStore";

/* ─────────────────────────────────────────────────────────
   Pixel Sprite Component — Real Pokemon Artwork Edition
   
   Renders official Pokemon artwork from PokeAPI CDN.
   Each of the 4 Pokemon has 3 evolution stages + a shiny
   variant (adds sparkle overlay + golden tint).
   
   Pokemon: Charmander, Squirtle, Bulbasaur, Pikachu
   Props are backwards-compatible with the old pixel version.
───────────────────────────────────────────────────────── */

interface PixelSpriteProps {
  starter: StarterType;
  stage: EvolutionStage;
  scale?: number;
  className?: string;
}

function PixelSpriteInner({ starter, stage, scale = 4, className = "" }: PixelSpriteProps) {
  const [imgError, setImgError] = useState(false);

  // Defensive check: ensure starter is valid
  const validStarters = ["charmander", "squirtle", "bulbasaur", "pikachu"];
  if (!starter || !validStarters.includes(starter)) {
    console.warn(`PixelSprite: Invalid starter "${starter}". Using pikachu as fallback.`);
    return null;
  }

  const isShiny = stage === "shiny";
  const spriteUrl = getPokemonSpriteUrl(starter, stage);
  const pokemonName = getEvolutionName(starter, stage);

  // Size based on scale — maintains backwards compatibility
  // Old pixel art was 12×scale px, new images scale similarly
  const size = scale * 12;

  // Fallback emoji if image fails to load
  const FALLBACK_EMOJI: Record<StarterType, string> = {
    charmander: "🔥",
    squirtle: "💧",
    bulbasaur: "🌿",
    pikachu: "⚡",
  };

  if (imgError || !spriteUrl) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        aria-label={`${pokemonName}, evolution stage ${stage}`}
      >
        <span style={{ fontSize: size * 0.5 }}>{FALLBACK_EMOJI[starter] || "❓"}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${pokemonName}, evolution stage ${stage}`}
    >
      {/* Pokemon artwork image */}
      <Image
        src={spriteUrl}
        alt={pokemonName}
        width={size}
        height={size}
        className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        style={{
          imageRendering: "auto",
          filter: isShiny
            ? "drop-shadow(0 0 8px rgba(251,191,36,0.6)) saturate(1.3) brightness(1.1)"
            : "none",
          transition: "filter 0.3s ease",
        }}
        onError={() => setImgError(true)}
        unoptimized
      />

      {/* Shiny sparkle overlay */}
      {isShiny && (
        <>
          <div
            className="absolute animate-ping"
            style={{
              top: -2,
              right: -2,
              width: Math.max(scale * 2, 8),
              height: Math.max(scale * 2, 8),
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
              width: Math.max(scale * 1.5, 6),
              height: Math.max(scale * 1.5, 6),
              background: "#fbbf24",
              borderRadius: "50%",
              opacity: 0.4,
              animationDelay: "0.5s",
            }}
          />
          <div
            className="absolute animate-ping"
            style={{
              top: "40%",
              right: -4,
              width: Math.max(scale * 1.2, 5),
              height: Math.max(scale * 1.2, 5),
              background: "#fde68a",
              borderRadius: "50%",
              opacity: 0.5,
              animationDelay: "1s",
            }}
          />
        </>
      )}
    </div>
  );
}

const PixelSprite = memo(PixelSpriteInner);
export default PixelSprite;
