/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Rocket, Download, GitBranch, Briefcase } from "lucide-react";
import Image from "next/image";
import { useGameStore } from "@/lib/gameStore";

const timeline = [
  {
    year: "2024",
    title: "Started ML & Data Science",
    description: "Began deep dive into machine learning algorithms, data analysis, and mathematical foundations of AI.",
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    gameLabel: "🌱 Base Form Unlocked",
  },
  {
    year: "2025",
    title: "Built Computer Vision Projects",
    description: "Developed advanced CV models, focusing on object detection, real-time image processing and proctoring.",
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    gameLabel: "⚡ First Evolution",
  },
  {
    year: "2026",
    title: "Production AI & Ideathon Win",
    description: "Built Dharma Setu and Samarpan. Won Ideathon 2026 for creating a fully functional AI proctoring and quiz generation system.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    gameLabel: "🔥 Final Evolution",
  },
];

export default function About() {
  const accentColors = useGameStore((s) => s.accentColors);
  const pokedexMode = useGameStore((s) => s.pokedexMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !pokedexMode;

  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black/40">
      <div className="max-w-6xl mx-auto w-full">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 gap-2"
        >
          {showGameMode && (
            <div
              className="game-section-label"
              style={{
                background: `${accentColors.primary}15`,
                color: accentColors.primaryLight,
                border: `1px solid ${accentColors.border}`,
              }}
            >
              🏠 Pallet Town
            </div>
          )}
          <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase">
            About Me
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Avatar photo card */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-1">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="Anuneet Gupta"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
              {/* Info overlay */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Anuneet Gupta</h3>
                    <p className="text-sm font-medium" style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>AI / ML Engineer</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-900/30 border border-green-700/40 text-xs font-semibold text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to Work
                  </div>
                </div>
                <p className="text-sm text-gray-400">BCA · CSJMU, Kanpur · CGPA 8.4</p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                    style={{ background: showGameMode ? accentColors.primary : "#2563eb" }}
                  >
                    <Download className="w-4 h-4" /> Resume
                  </a>
                  <a
                    href="https://github.com/anuneetgupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/anuneet-gupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all"
                  >
                    <Briefcase className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Bridging the gap between <span style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>theory</span> and <span style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>production</span>.
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Final-year BCA student (CGPA 8.4) with hands-on experience in machine learning, NLP, and Computer Vision. Built Samarpan — an AI-powered quiz and proctoring platform that won 3rd place at CSJMUIF Ideathon 2026.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                Also built and deployed Dharma Setu, a full-stack LLM-powered product live in production. Comfortable across the full ML pipeline from data preprocessing to model deployment.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-4xl font-bold text-white mb-1">2+</h3>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-4xl font-bold text-white mb-1">100%</h3>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Deployment Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <div className="relative border-l border-gray-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group cursor-pointer"
              >
                {/* Timeline Node */}
                <div className={`absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 rounded-full ${item.bg} border-2 ${item.border} flex items-center justify-center group-hover:scale-150 transition-transform duration-300 ${item.glow}`}>
                  <div className={`w-2 h-2 rounded-full ${item.bg.replace('/10', '')}`} />
                </div>

                {/* Content Card */}
                <div className={`p-8 rounded-3xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition-all duration-500 backdrop-blur-md group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]`}>
                  {/* Game mode label */}
                  {showGameMode && (
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace" }}>
                      {item.gameLabel}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-mono text-lg font-bold ${item.color}`}>{item.year}</h4>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Future teaser */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
              </div>
              <div className="p-6 rounded-3xl border border-dashed border-gray-800 text-gray-600">
                {showGameMode && (
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                    ✨ Next Chapter...
                  </div>
                )}
                <p className="font-mono text-sm">2027 · Next Chapter...</p>
                <p className="text-sm mt-1">Full-time ML Engineering role. Building the future.</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
