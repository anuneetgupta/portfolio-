"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ── Types ── */
export type StarterType = "charmander" | "squirtle" | "bulbasaur" | "pikachu";
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
  charmander: {
    primary: "#ea580c",
    primaryLight: "#fb923c",
    glow: "rgba(234,88,12,0.4)",
    bg: "rgba(234,88,12,0.1)",
    border: "rgba(234,88,12,0.3)",
    gradient: "linear-gradient(135deg, #ea580c, #f97316)",
  },
  squirtle: {
    primary: "#0369a1",
    primaryLight: "#0284c7",
    glow: "rgba(3,105,161,0.4)",
    bg: "rgba(3,105,161,0.1)",
    border: "rgba(3,105,161,0.3)",
    gradient: "linear-gradient(135deg, #0369a1, #0284c7)",
  },
  bulbasaur: {
    primary: "#22c55e",
    primaryLight: "#4ade80",
    glow: "rgba(34,197,94,0.4)",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.3)",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
  },
  pikachu: {
    primary: "#fbbf24",
    primaryLight: "#fcd34d",
    glow: "rgba(251,191,36,0.4)",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.3)",
    gradient: "linear-gradient(135deg, #fbbf24, #facc15)",
  },
};

/* ── Default accent (gold Pikachu, represents full-stack) ── */
const DEFAULT_ACCENT: AccentColors = ACCENT_MAP.pikachu;

/* ── XP thresholds ── */
export const XP_THRESHOLDS = {
  stage2: 41,
  stage3: 81,
  shiny: 120, // 120+ XP unlocks shiny / "fully explored" CTA
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

  /* Mode — plainMode=true strips all game chrome for a clean recruiter layout */
  plainMode: boolean;
  isMapOpen: boolean;
  isSummaryOpen: boolean;

  /* Derived */
  accentColors: AccentColors;

  /* Actions */
  selectStarter: (type: StarterType) => void;
  addXP: (amount: number, source: string) => void;
  visitSection: (id: string) => void;
  togglePlainMode: () => void;
  setIsEvolving: (v: boolean) => void;
  setIsMapOpen: (v: boolean) => void;
  setIsSummaryOpen: (v: boolean) => void;
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
      plainMode: false,
      isMapOpen: false,
      isSummaryOpen: false,
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

      togglePlainMode: () =>
        set((s) => ({ plainMode: !s.plainMode })),

      setIsEvolving: (v) => set({ isEvolving: v }),
      
      setIsMapOpen: (v) => set({ isMapOpen: v }),

      setIsSummaryOpen: (v) => set({ isSummaryOpen: v }),

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
          plainMode: false,
          isSummaryOpen: false,
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
        plainMode: state.plainMode,
        accentColors: state.accentColors,
      }),
      onRehydrateStorage: () => (state) => {
        // Validate starter after rehydration from localStorage
        if (state) {
          const validStarters = ["charmander", "squirtle", "bulbasaur", "pikachu"];
          if (state.starter && !validStarters.includes(state.starter)) {
            console.warn(`[Zustand] Invalid starter "${state.starter}" in localStorage. Resetting to null.`);
            state.starter = null;
            state.hasSelectedStarter = false;
          }
        }
      },
    }
  )
);

/* ── Evolution name map ── */
export const EVOLUTION_NAMES: Record<StarterType, Record<1 | 2 | 3, string>> = {
  charmander: { 1: "Charmander", 2: "Charmeleon", 3: "Charizard" },
  squirtle:   { 1: "Squirtle",   2: "Wartortle",  3: "Blastoise" },
  bulbasaur:  { 1: "Bulbasaur",  2: "Ivysaur",    3: "Venusaur" },
  pikachu:    { 1: "Pikachu",    2: "Raichu",     3: "Raichu" },
};

/* ── Pokedex IDs for PokeAPI sprite URLs ── */
const POKEDEX_IDS: Record<StarterType, Record<1 | 2 | 3, number>> = {
  charmander: { 1: 4,  2: 5,  3: 6 },
  squirtle:   { 1: 7,  2: 8,  3: 9 },
  bulbasaur:  { 1: 1,  2: 2,  3: 3 },
  pikachu:    { 1: 25, 2: 26, 3: 26 },
};

/* ── Helper: Get evolution name for a starter + stage ── */
export function getEvolutionName(starter: StarterType, stage: EvolutionStage): string {
  const numericStage = stage === "shiny" ? 3 : stage;
  const names = EVOLUTION_NAMES[starter];
  if (!names) return starter;
  return names[numericStage] || starter;
}

/* ── Helper: Get Pokemon sprite URL from PokeAPI CDN ── */
export function getPokemonSpriteUrl(starter: StarterType, stage: EvolutionStage): string {
  const numericStage = stage === "shiny" ? 3 : stage;
  const ids = POKEDEX_IDS[starter];
  if (!ids) return "";
  const id = ids[numericStage];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

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
