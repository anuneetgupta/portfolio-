/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Rocket, Download, GitBranch, Briefcase, MapPin } from "lucide-react";
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
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !plainMode;

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
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border"
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
            About Me
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Professional Summary / Trainer Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Avatar photo card (Trainer Card in Game Mode) */}
            <div 
              className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 p-1 ${
                showGameMode ? 'game-border' : 'border border-gray-800'
              }`}
            >
              {showGameMode && <div className="scanline-overlay absolute inset-0 z-10 opacity-20 pointer-events-none" />}
              
              {showGameMode && (
                <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-20" style={{ background: accentColors.primary }}>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-pixel), monospace" }}>Trainer Card</span>
                  <span className="text-[10px] font-bold text-white/70 font-mono">IDNo. 20261</span>
                </div>
              )}

              <div className={`relative w-full h-56 overflow-hidden ${showGameMode ? 'mt-8 rounded-t-xl rounded-b-sm border-b border-gray-700' : 'rounded-2xl'}`}>
                <Image
                  src="/avatar.png"
                  alt="Anuneet Gupta"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover object-top scale-110 ${showGameMode ? 'grayscale contrast-125' : ''}`}
                />
                {!showGameMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                )}
                {showGameMode && (
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none" />
                )}
              </div>
              
              {/* Info overlay / Card Details */}
              <div className={`p-6 space-y-4 relative z-20 ${showGameMode ? 'bg-[#0f1115]' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold text-white ${showGameMode ? 'tracking-wider' : ''}`} style={showGameMode ? { fontFamily: "var(--font-pixel), monospace", fontSize: '14px' } : {}}>
                      Anuneet Gupta
                    </h3>
                    <p className={`text-sm font-medium mt-1`} style={{ color: showGameMode ? accentColors.primary : "#60a5fa" }}>
                      AI / ML Engineer
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${showGameMode ? 'bg-black border border-green-500 text-green-400' : 'bg-green-900/30 border border-green-700/40 text-green-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to Work
                  </div>
                </div>

                {showGameMode ? (
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mt-4 p-3 bg-black/50 rounded-lg border border-gray-800">
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-0.5">LOCATION</span>
                      <span className="text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-400"/> Kanpur, UP</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-0.5">EDUCATION</span>
                      <span className="text-gray-300">BCA, CSJMU</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-0.5">SCORE</span>
                      <span className="text-green-400 font-bold">CGPA 8.4</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-0.5">BADGES</span>
                      <div className="flex gap-1 mt-0.5">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" title="Ideathon Winner" />
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" title="Full Stack Deploy" />
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" title="Computer Vision" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">BCA · CSJMU, Kanpur · CGPA 8.4</p>
                )}

                <div className="flex gap-3 pt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-all ${showGameMode ? 'rounded-md border-2 hover:bg-white/10' : 'rounded-xl'}`}
                    style={showGameMode ? { borderColor: accentColors.primary, color: accentColors.primaryLight } : { background: "#2563eb" }}
                  >
                    <Download className="w-4 h-4" /> Resume
                  </a>
                  <a
                    href="https://github.com/anuneetgupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 transition-all flex items-center justify-center ${showGameMode ? 'rounded-md border-2 border-gray-700 bg-black hover:border-gray-500' : 'rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'}`}
                  >
                    <GitBranch className="w-4 h-4 text-gray-300" />
                  </a>
                  <a
                    href="https://linkedin.com/in/anuneet-gupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 transition-all flex items-center justify-center ${showGameMode ? 'rounded-md border-2 border-gray-700 bg-black hover:border-[#0A66C2]' : 'rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50'}`}
                  >
                    <Briefcase className="w-4 h-4 text-gray-300 group-hover:text-[#0A66C2]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {showGameMode ? (
                <div className="dialogue-box dark-dialogue relative z-20 mt-4">
                  <p className="text-white text-sm md:text-base leading-loose" style={{ fontFamily: "var(--font-vt323), monospace", fontSize: '20px' }}>
                    I bridge the gap between <span style={{ color: accentColors.primaryLight }}>theory</span> and <span style={{ color: accentColors.primaryLight }}>production</span>.<br/><br/>
                    Final-year BCA student with hands-on experience in machine learning, NLP, and Computer Vision. Built Samarpan — an AI-powered quiz and proctoring platform that won 3rd place at CSJMUIF Ideathon 2026.
                  </p>
                  <div className="absolute bottom-2 right-3 animate-bounce">
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent" style={{ borderTopColor: accentColors.primary }} />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    Bridging the gap between <span className="text-blue-400">theory</span> and <span className="text-blue-400">production</span>.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Final-year BCA student (CGPA 8.4) with hands-on experience in machine learning, NLP, and Computer Vision. Built Samarpan — an AI-powered quiz and proctoring platform that won 3rd place at CSJMUIF Ideathon 2026.
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed">
                    Also built and deployed Dharma Setu, a full-stack LLM-powered product live in production. Comfortable across the full ML pipeline from data preprocessing to model deployment.
                  </p>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-6 border transition-colors ${showGameMode ? 'rounded-lg bg-black border-gray-800' : 'rounded-2xl bg-white/5 border-white/10'}`}>
                <h3 className={`text-4xl font-bold mb-1 ${showGameMode ? '' : 'text-white'}`} style={showGameMode ? { color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace", fontSize: '24px' } : {}}>2+</h3>
                <p className={`text-sm font-medium uppercase tracking-wider ${showGameMode ? 'text-gray-500' : 'text-gray-400'}`}>Years Experience</p>
              </div>
              <div className={`p-6 border transition-colors ${showGameMode ? 'rounded-lg bg-black border-gray-800' : 'rounded-2xl bg-white/5 border-white/10'}`}>
                <h3 className={`text-4xl font-bold mb-1 ${showGameMode ? '' : 'text-white'}`} style={showGameMode ? { color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace", fontSize: '24px' } : {}}>100%</h3>
                <p className={`text-sm font-medium uppercase tracking-wider ${showGameMode ? 'text-gray-500' : 'text-gray-400'}`}>Deployment Rate</p>
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
                <div className={`absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  showGameMode 
                    ? `border-2 bg-black z-10 group-hover:scale-125` 
                    : `${item.bg} border-2 ${item.border} group-hover:scale-150 ${item.glow}`
                }`}
                style={showGameMode ? { borderColor: accentColors.primary } : {}}
                >
                  <div className={`w-2 h-2 rounded-full ${showGameMode ? '' : item.bg.replace('/10', '')}`} style={showGameMode ? { background: accentColors.primaryLight } : {}} />
                </div>

                {/* Content Card */}
                <div className={`p-8 border transition-all duration-500 backdrop-blur-md ${
                  showGameMode 
                    ? `rounded-xl bg-[#0a0a0a] border-gray-800 hover:border-gray-600` 
                    : `rounded-3xl bg-gray-900/40 border-gray-800 hover:border-gray-700 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]`
                }`}>
                  {/* Game mode label */}
                  {showGameMode && (
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-3 inline-block px-2 py-1 rounded bg-white/5 border border-white/10" style={{ color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace" }}>
                      {item.gameLabel}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 transition-colors ${showGameMode ? 'rounded-lg bg-black border border-gray-800' : `rounded-xl ${item.bg} ${item.color}`}`}>
                      <item.icon className="w-6 h-6" style={showGameMode ? { color: accentColors.primaryLight } : {}} />
                    </div>
                    <div>
                      <h4 className={`font-mono text-lg font-bold ${showGameMode ? 'text-gray-500' : item.color}`}>{item.year}</h4>
                      <h3 className={`text-xl font-bold ${showGameMode ? 'text-gray-200' : 'text-white'}`}>{item.title}</h3>
                    </div>
                  </div>
                  <p className={`${showGameMode ? 'text-gray-400 text-sm leading-relaxed font-mono' : 'text-gray-400 leading-relaxed'}`}>
                    {showGameMode ? `> ${item.description}` : item.description}
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
              <div className={`p-6 border border-dashed border-gray-800 text-gray-600 ${showGameMode ? 'rounded-xl' : 'rounded-3xl'}`}>
                {showGameMode && (
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                    ✨ Next Chapter...
                  </div>
                )}
                <p className="font-mono text-sm">2027 · {showGameMode ? 'Awaiting assignment' : 'Next Chapter...'}</p>
                <p className="text-sm mt-1">Full-time ML Engineering role. Building the future.</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
