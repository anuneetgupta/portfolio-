"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ── Types ── */
export type StarterType = "vision" | "lexis" | "flowchain";
export type EvolutionStage = 1 | 2 | 3 | "shiny";

export interface AccentColors {
  primary: string;
  primaryLight: string;
  glow: string;
  bg: string;
  border: string;
  gradient: string;
}

/* ── Accent color palettes per starter ── */
const ACCENT_MAP: Record<StarterType, AccentColors> = {
  vision: {
    primary: "#ef4444",
    primaryLight: "#f87171",
    glow: "rgba(239,68,68,0.4)",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    gradient: "linear-gradient(135deg, #ef4444, #f97316)",
  },
  lexis: {
    primary: "#22c55e",
    primaryLight: "#4ade80",
    glow: "rgba(34,197,94,0.4)",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.3)",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  flowchain: {
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    glow: "rgba(59,130,246,0.4)",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.3)",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
};

/* ── Default accent (blue, matches existing site) ── */
const DEFAULT_ACCENT: AccentColors = ACCENT_MAP.flowchain;

/* ── XP thresholds ── */
export const XP_THRESHOLDS = {
  stage2: 41,
  stage3: 81,
  shiny: 121,
};

/* ── Derive evolution stage from XP ── */
function getEvolutionStage(xp: number): EvolutionStage {
  if (xp >= XP_THRESHOLDS.shiny) return "shiny";
  if (xp >= XP_THRESHOLDS.stage3) return 3;
  if (xp >= XP_THRESHOLDS.stage2) return 2;
  return 1;
}

/* ── Store interface ── */
interface GameState {
  /* Selection */
  starter: StarterType | null;
  hasSelectedStarter: boolean;

  /* XP / Evolution */
  xp: number;
  evolutionStage: EvolutionStage;
  prevEvolutionStage: EvolutionStage;
  isEvolving: boolean;

  /* Tracking */
  visitedSections: string[];
  xpSources: string[]; // Dedup: each source string tracked

  /* Mode */
  pokedexMode: boolean;

  /* Derived */
  accentColors: AccentColors;

  /* Actions */
  selectStarter: (type: StarterType) => void;
  addXP: (amount: number, source: string) => void;
  visitSection: (id: string) => void;
  togglePokedexMode: () => void;
  setIsEvolving: (v: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      /* ── Initial state ── */
      starter: null,
      hasSelectedStarter: false,
      xp: 0,
      evolutionStage: 1,
      prevEvolutionStage: 1,
      isEvolving: false,
      visitedSections: [],
      xpSources: [],
      pokedexMode: false,
      accentColors: DEFAULT_ACCENT,

      /* ── Actions ── */
      selectStarter: (type) =>
        set({
          starter: type,
          hasSelectedStarter: true,
          accentColors: ACCENT_MAP[type],
        }),

      addXP: (amount, source) => {
        const state = get();
        // Deduplicate: don't award same source twice
        if (state.xpSources.includes(source)) return;

        const newXP = state.xp + amount;
        const newStage = getEvolutionStage(newXP);
        const stageChanged = newStage !== state.evolutionStage;

        set({
          xp: newXP,
          xpSources: [...state.xpSources, source],
          prevEvolutionStage: state.evolutionStage,
          evolutionStage: newStage,
          isEvolving: stageChanged,
        });
      },

      visitSection: (id) => {
        const state = get();
        if (state.visitedSections.includes(id)) return;

        set({ visitedSections: [...state.visitedSections, id] });

        // Award XP for visiting new sections
        const source = `visit-${id}`;
        state.addXP(10, source);
      },

      togglePokedexMode: () =>
        set((s) => ({ pokedexMode: !s.pokedexMode })),

      setIsEvolving: (v) => set({ isEvolving: v }),

      resetGame: () =>
        set({
          starter: null,
          hasSelectedStarter: false,
          xp: 0,
          evolutionStage: 1,
          prevEvolutionStage: 1,
          isEvolving: false,
          visitedSections: [],
          xpSources: [],
          pokedexMode: false,
          accentColors: DEFAULT_ACCENT,
        }),
    }),
    {
      name: "pokemon-portfolio-game",
      // Only persist certain fields
      partialize: (state) => ({
        starter: state.starter,
        hasSelectedStarter: state.hasSelectedStarter,
        xp: state.xp,
        evolutionStage: state.evolutionStage,
        prevEvolutionStage: state.prevEvolutionStage,
        visitedSections: state.visitedSections,
        xpSources: state.xpSources,
        pokedexMode: state.pokedexMode,
        accentColors: state.accentColors,
      }),
    }
  )
);

/* ── Helper: XP needed for next evolution ── */
export function getXPForNextStage(currentXP: number): { next: number; label: string } {
  if (currentXP >= XP_THRESHOLDS.shiny) return { next: XP_THRESHOLDS.shiny, label: "MAX" };
  if (currentXP >= XP_THRESHOLDS.stage3) return { next: XP_THRESHOLDS.shiny, label: "Shiny" };
  if (currentXP >= XP_THRESHOLDS.stage2) return { next: XP_THRESHOLDS.stage3, label: "Stage 3" };
  return { next: XP_THRESHOLDS.stage2, label: "Stage 2" };
}

/* ── Helper: evolution stage label ── */
export function getStageLabel(stage: EvolutionStage): string {
  switch (stage) {
    case 1: return "2024: Started ML & Data Science";
    case 2: return "2025: Built Computer Vision Projects";
    case 3: return "2026: Production AI & Ideathon Win";
    case "shiny": return "✨ Journey Complete!";
  }
}
