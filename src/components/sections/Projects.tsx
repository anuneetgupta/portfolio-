/* eslint-disable */
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, PlayCircle, BarChart3, Users, Zap, ArrowUpRight, Swords, Shield, Heart, Gauge } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";
import GymBadge from "@/components/game/GymBadge";

const ML_PROJECTS = [
  {
    title: "Disease Detection",
    category: "ML Classification",
    description: "Random Forest & SVM ensemble for multi-class disease prediction from clinical data.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    color: "from-red-500/15 to-red-900/20",
    border: "border-red-500/25",
    accent: "text-red-400",
    github: "https://github.com/anuneetgupta",
    encounterType: "Wild Encounter — Route 1",
  },
  {
    title: "Car Price Prediction",
    category: "Regression Pipeline",
    description: "End-to-end regression pipeline with feature engineering and XGBoost tuning.",
    tech: ["Python", "XGBoost", "NumPy"],
    color: "from-blue-500/15 to-blue-900/20",
    border: "border-blue-500/25",
    accent: "text-blue-400",
    github: "https://github.com/anuneetgupta",
    encounterType: "Wild Encounter — Route 1",
  },
  {
    title: "Spam Detection",
    category: "NLP + TF-IDF",
    description: "NLP pipeline using TF-IDF vectorization + Naive Bayes achieving 97% accuracy.",
    tech: ["Python", "NLTK", "TF-IDF"],
    color: "from-purple-500/15 to-purple-900/20",
    border: "border-purple-500/25",
    accent: "text-purple-400",
    github: "https://github.com/anuneetgupta",
    encounterType: "Wild Encounter — Route 2",
  },
  {
    title: "Color Detection",
    category: "Computer Vision",
    description: "Real-time color detection and labeling from webcam feed using OpenCV.",
    tech: ["Python", "OpenCV", "Pandas"],
    color: "from-emerald-500/15 to-emerald-900/20",
    border: "border-emerald-500/25",
    accent: "text-emerald-400",
    github: "https://github.com/anuneetgupta",
    encounterType: "Wild Encounter — Route 2",
  },
];

/* ── Gym Leader Stats Bar ── */
function StatBar({ label, value, max, color, icon: Icon }: {
  label: string; value: string; max: number; color: string;
  icon: any;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
      <span className="text-[10px] text-gray-500 w-8 uppercase font-bold">{label}</span>
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${max}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-[10px] font-bold text-gray-300 w-16 text-right">{value}</span>
    </div>
  );
}

export default function Projects() {
  const [expandedEncounter, setExpandedEncounter] = useState<number | null>(null);

  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const addXP = useGameStore((s) => s.addXP);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white">
      <div className="max-w-7xl mx-auto space-y-28">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          {showGameMode && (
            <div
              className="game-section-label mb-2"
              style={{ background: `${accentColors.primary}15`, color: accentColors.primaryLight, border: `1px solid ${accentColors.border}` }}
            >
              🏟️ Gym Challenges
            </div>
          )}
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border"
            style={showGameMode ? {
              background: `${accentColors.primary}20`,
              borderColor: `${accentColors.primary}40`,
              color: accentColors.primaryLight
            } : {
              background: "rgba(30,58,138,0.3)",
              borderColor: "rgba(29,78,216,0.4)",
              color: "#93c5fd"
            }}
          >
            Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            {showGameMode ? "Gym Leader Battles" : "Featured Products"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world AI applications built for scale. From ideathon-winning proctoring systems to ancient knowledge mapping.
          </p>
        </motion.div>

        {/* ── GYM LEADER 1: QYRO ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12 backdrop-blur-sm transition-colors group relative overflow-hidden ${
            showGameMode ? "game-border" : "bg-gray-900/40 border border-gray-800 hover:border-blue-500/20"
          }`}
        >
          {/* Game mode: scanline overlay */}
          {showGameMode && <div className="scanline-overlay absolute inset-0 z-0 opacity-30" />}

          <div className="space-y-8 relative z-10">
            <div>
              {showGameMode && (
                <div className="flex items-center gap-3 mb-3">
                  <GymBadge
                    label="Ideathon Badge"
                    icon="🏆"
                    colors={accentColors}
                    size={48}
                  />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                      Gym Leader Battle #1
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-900/50 border border-red-700 text-red-400 text-xs font-bold italic" style={{ fontFamily: "var(--font-pixel), monospace" }}>VS</span>
                      <span className="text-white font-bold tracking-widest uppercase">Leader Qyro</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
                🏆 Ideathon Winner 2026
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">QYRO</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                A comprehensive AI-driven platform for automated quiz generation from PDFs combined with advanced Computer Vision proctoring.
              </p>
            </div>

            {/* Stats — Game mode shows as RPG stats, clean mode shows as metrics */}
            {showGameMode ? (
              <div className="space-y-2.5 p-4 rounded-xl bg-black/40 border border-gray-800">
                <StatBar label="SPD" value="98% Accuracy" max={98} color="#22c55e" icon={Gauge} />
                <StatBar label="HP" value="500+ Users" max={85} color="#3b82f6" icon={Heart} />
                <StatBar label="DEF" value="3rd Place" max={90} color="#f59e0b" icon={Shield} />
                <StatBar label="ATK" value="AI Proctoring" max={92} color="#ef4444" icon={Swords} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider">Core Features</h4>
                  <ul className="text-gray-300 space-y-1.5 text-sm">
                    {["AI Quiz Generation", "PDF Question Creation", "CV Proctoring", "Face Detection", "Live Results"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/30 flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">98% Accuracy</div>
                      <div className="text-xs text-gray-500">Proctoring model</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-900/20 border border-blue-700/30 flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">500+ Users</div>
                      <div className="text-xs text-gray-500">Active usage</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-900/20 border border-yellow-700/30 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">3rd Place</div>
                      <div className="text-xs text-gray-500">CSJMUIF Ideathon</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack — shown as "Move Set" in game mode */}
            <div>
              <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">
                {showGameMode ? "Move Set" : "Tech Stack"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Python', 'OpenCV', 'LLMs', 'FastAPI', 'MongoDB'].map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-lg border text-gray-300"
                    style={showGameMode ? {
                      background: `${accentColors.primary}10`,
                      borderColor: accentColors.border,
                    } : {
                      background: "rgba(31,41,55,1)",
                      borderColor: "rgba(55,65,81,1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://qyroarena.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-qyro-live")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <ExternalLink className="w-5 h-5" /> Visit Qyro
              </a>
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-qyro-github")}
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                <GitBranch className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative w-full aspect-video rounded-2xl bg-black border border-blue-800/30 overflow-hidden z-10">
            <video
              src="https://media.githubusercontent.com/media/anuneetgupta/portfolio-/main/public/videos/iqrp%20demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* ── GYM LEADER 2: DHARMA SETU ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12 backdrop-blur-sm transition-colors relative overflow-hidden ${
            showGameMode ? "game-border" : "bg-gray-900/40 border border-gray-800 hover:border-green-500/20"
          }`}
        >
          {showGameMode && <div className="scanline-overlay absolute inset-0 z-0 opacity-30" />}

          {/* Video Player */}
          <div className="order-2 lg:order-1 relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl bg-black border border-green-800/30 overflow-hidden z-10">
            <video
              src="https://media.githubusercontent.com/media/anuneetgupta/portfolio-/main/public/videos/dharma%20setu%20demo%20.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2 relative z-10">
            <div>
              {showGameMode && (
                <div className="flex items-center gap-3 mb-3">
                  <GymBadge
                    label="Deploy Badge"
                    icon="🚀"
                    colors={{ ...accentColors, primary: "#22c55e", primaryLight: "#4ade80" }}
                    size={48}
                  />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                      Gym Leader Battle #2
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-900/50 border border-red-700 text-red-400 text-xs font-bold italic" style={{ fontFamily: "var(--font-pixel), monospace" }}>VS</span>
                      <span className="text-white font-bold tracking-widest uppercase">Leader Dharma Setu</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="inline-block px-4 py-2 rounded-full bg-green-900/30 border border-green-800 text-green-300 text-sm font-semibold tracking-wider uppercase mb-4">
                🚀 Production AI Application
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">DHARMA SETU</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                An LLM-integrated personalized guidance system mapping ancient texts like the Bhagavad Gita, Ramayana, and Mahabharata to solve modern problems.
              </p>
            </div>

            {showGameMode && (
              <div className="space-y-2.5 p-4 rounded-xl bg-black/40 border border-gray-800">
                <StatBar label="ATK" value="LLM Integration" max={95} color="#22c55e" icon={Swords} />
                <StatBar label="DEF" value="Vector DB" max={88} color="#3b82f6" icon={Shield} />
                <StatBar label="SPD" value="Real-time RAG" max={90} color="#f59e0b" icon={Gauge} />
                <StatBar label="HP" value="Production Live" max={100} color="#ef4444" icon={Heart} />
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">
                {showGameMode ? "Move Set" : "Key Technologies & Features"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {['LLM Integration', 'Bhagavad Gita Mapping', 'Knowledge Graph', 'Vector Database', 'Personalized Guidance', 'Supabase', 'LangChain'].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-lg border text-gray-300"
                    style={showGameMode ? {
                      background: `${accentColors.primary}10`,
                      borderColor: accentColors.border,
                    } : {
                      background: "rgba(31,41,55,1)",
                      borderColor: "rgba(55,65,81,1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://dharma-set.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-dharmasetu-live")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" /> Live Application
              </a>
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-dharmasetu-github")}
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                <GitBranch className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── GYM LEADER 3: SAFARNAMA ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 lg:p-12 backdrop-blur-sm transition-colors group relative overflow-hidden ${
            showGameMode ? "game-border" : "bg-gray-900/40 border border-gray-800 hover:border-yellow-500/20"
          }`}
        >
          {/* Game mode: scanline overlay */}
          {showGameMode && <div className="scanline-overlay absolute inset-0 z-0 opacity-30" />}

          <div className="space-y-8 relative z-10">
            <div>
              {showGameMode && (
                <div className="flex items-center gap-3 mb-3">
                  <GymBadge
                    label="Explorer Badge"
                    icon="🏕️"
                    colors={{ ...accentColors, primary: "#a3e635", primaryLight: "#bef264" }}
                    size={48}
                  />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                      Gym Leader Battle #3
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-900/50 border border-red-700 text-red-400 text-xs font-bold italic" style={{ fontFamily: "var(--font-pixel), monospace" }}>VS</span>
                      <span className="text-white font-bold tracking-widest uppercase">Leader Safarnama</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="inline-block px-4 py-2 rounded-full bg-yellow-900/30 border border-yellow-800 text-yellow-300 text-sm font-semibold tracking-wider uppercase mb-4">
                🗺️ Student Travel Platform
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">SAFARNAMA</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                A digital gateway to high-energy travel tailored for students. Join the tribe, explore curated destinations, and create lifelong memories with features like real-time updates and group tracking.
              </p>
            </div>

            {/* Stats */}
            {showGameMode ? (
              <div className="space-y-2.5 p-4 rounded-xl bg-black/40 border border-gray-800">
                <StatBar label="ATK" value="1,000+ Users" max={92} color="#a3e635" icon={Users} />
                <StatBar label="DEF" value="Safe & Verified" max={88} color="#3b82f6" icon={Shield} />
                <StatBar label="SPD" value="Real-Time Updates" max={95} color="#f59e0b" icon={Gauge} />
                <StatBar label="HP" value="Production Live" max={100} color="#ef4444" icon={Heart} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider">Core Features</h4>
                  <ul className="text-gray-300 space-y-1.5 text-sm">
                    {["Curated Itineraries", "Group Coordination", "Verified Stays", "Live Trip Tracking", "Exclusive Deals"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/30 flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">1,000+</div>
                      <div className="text-xs text-gray-500">Happy Travelers</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-900/20 border border-blue-700/30 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">Verified</div>
                      <div className="text-xs text-gray-500">Safe & Secure</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-900/20 border border-yellow-700/30 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-yellow-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">4.9★</div>
                      <div className="text-xs text-gray-500">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">
                {showGameMode ? "Move Set" : "Tech Stack"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'UI/UX Design'].map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-lg border text-gray-300"
                    style={showGameMode ? {
                      background: `${accentColors.primary}10`,
                      borderColor: accentColors.border,
                    } : {
                      background: "rgba(31,41,55,1)",
                      borderColor: "rgba(55,65,81,1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://safarnama-khaki.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-safarnama-live")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <ExternalLink className="w-5 h-5" /> Visit Safarnama
              </a>
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP(15, "project-safarnama-github")}
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                <GitBranch className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>

          {/* Visual Placeholder for Safarnama */}
          <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-yellow-900/20 to-gray-900 border border-yellow-800/30 flex flex-col items-center justify-center overflow-hidden cursor-pointer group/vid z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-emerald-600/5 group-hover/vid:from-yellow-600/10 group-hover/vid:to-emerald-600/10 transition-all duration-500" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(163,230,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <ExternalLink className="w-16 h-16 text-yellow-400/60 group-hover/vid:text-yellow-400 group-hover/vid:scale-110 transition-all z-10" />
            <p className="mt-4 text-gray-500 font-medium z-10 text-sm">Explore the Platform</p>
          </div>
        </motion.div>

        {/* ── WILD ENCOUNTERS (ML & CV Pipelines) ── */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <h3 className="text-3xl font-bold">
              {showGameMode ? "Wild Encounters — Route 1" : "ML & Computer Vision Pipelines"}
            </h3>
            <p className="text-gray-500">
              {showGameMode ? "Smaller projects encountered along the journey" : "Standalone research and engineering projects"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ML_PROJECTS.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setExpandedEncounter(expandedEncounter === i ? null : i)}
                className={`p-6 rounded-2xl bg-gradient-to-br ${proj.color} border ${proj.border} hover:-translate-y-1 transition-all cursor-pointer backdrop-blur-sm group relative overflow-hidden ${
                  showGameMode ? "wild-encounter" : "hover:scale-105"
                } ${expandedEncounter === i ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] ring-2 ring-white/20" : ""}`}
              >
                {/* Game mode encounter label */}
                {showGameMode && (
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                      ⚡ {proj.encounterType}
                    </div>
                    {expandedEncounter === i && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-bold animate-pulse">
                        FIGHTING...
                      </span>
                    )}
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className={`w-4 h-4 ${proj.accent}`} />
                </div>
                <h4 className={`text-lg font-bold text-white mb-1`}>{proj.title}</h4>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${proj.accent}`}>{proj.category}</p>
                
                <AnimatePresence>
                  {expandedEncounter === i ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">{proj.description} The system was trained on custom datasets to ensure robust performance across various edge cases, achieving state-of-transform benchmarks in local testing environments.</p>
                      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-black/40 border border-white/5">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">HP</div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-3/4 rounded-full" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-11/12 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{proj.description}</p>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-black/30 text-gray-400 border border-white/10">{t}</span>
                  ))}
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-300 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <GitBranch className="w-3.5 h-3.5" /> GitHub
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
