/* eslint-disable */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gamepad2, X, Download, ExternalLink, GitBranch, Mail, MapPin, GraduationCap, Cpu, Brain, Code, Award } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

/*
  RecruiterView — Phase 1 repurpose:

  The bottom-right button is now a PERSISTENT LAYOUT TOGGLE.
    plainMode=false  →  full game experience  →  button says "Plain Mode 🔍"
    plainMode=true   →  clean scroll layout   →  button says "Game Mode 🎮"

  A secondary "Quick Summary" button gives recruiters the at-a-glance panel
  without disrupting the toggle semantics.
*/

function QuickSummaryPanel({ onClose }: { onClose: () => void }) {
  const accentColors = useGameStore((s) => s.accentColors);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const plainMode = useGameStore((s) => s.plainMode);
  const togglePlainMode = useGameStore((s) => s.togglePlainMode);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="bg-gray-950 border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 space-y-10 text-white">

          {/* ── Header ── */}
          <div className="space-y-4 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">Open to opportunities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">30-Second Summary</h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              I build production-ready AI products, specializing in <span className="text-blue-400 font-medium">Computer Vision</span> and <span className="text-purple-400 font-medium">LLMs</span>. I have a track record of winning hackathons and delivering real-world applications.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500" /> Kanpur, UP, India</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-purple-500" /> BCA, CSJMU (CGPA 8.4)</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-green-500" /> guptaanuneet10june@gmail.com</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="https://www.linkedin.com/in/anuneet-gupta-57898631a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#004182] transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                LinkedIn Profile
              </a>
              <a
                href="mailto:guptaanuneet10june@gmail.com"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>

            {/* Plain Mode toggle inside panel */}
            {hasSelectedStarter && (
              <button
                onClick={() => {
                  togglePlainMode();
                  onClose();
                }}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-all"
                style={{
                  borderColor: accentColors.border,
                  color: accentColors.primaryLight,
                  background: `${accentColors.primary}10`,
                }}
              >
                <BookOpen className="w-4 h-4" />
                {plainMode ? "Switch to Game Mode" : "Switch to Plain Mode (Clean View)"}
              </button>
            )}
          </div>

          {/* ── Main Grid ── */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Production Highlights */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xl font-semibold border-b border-gray-800 pb-4">
                <Code className="w-5 h-5 text-blue-500" />
                Production Highlights
              </div>

              {/* Samarpan */}
              <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">SAMARPAN</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold shrink-0 ml-2">🏆 Ideathon Winner</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">AI Quiz Generation from PDFs &amp; Computer Vision proctoring. 98% accuracy, 500+ users.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'Python', 'OpenCV', 'LLMs', 'FastAPI'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-300">{tech}</span>
                  ))}
                </div>
                <a
                  href="https://github.com/anuneetgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" /> View on GitHub
                </a>
              </div>

              {/* Dharma Setu */}
              <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 hover:border-green-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">DHARMA SETU</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold shrink-0 ml-2">🚀 Live</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Personalized guidance system mapping ancient texts (Gita, Ramayana) using LLMs &amp; vector search.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'Supabase', 'LangChain', 'Vercel'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-300">{tech}</span>
                  ))}
                </div>
                <a
                  href="https://dharma-set.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live at dharma-set.vercel.app
                </a>
              </div>
            </div>

            {/* Skills & Competencies */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xl font-semibold border-b border-gray-800 pb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                Core Competencies
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <h4 className="text-gray-300 text-sm uppercase font-semibold tracking-wider">AI &amp; Machine Learning</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Computer Vision', 'NLP', 'LLM Engineering', 'Prompt Engineering', 'AI Agents', 'Scikit-learn'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-300 text-sm rounded-lg">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <h4 className="text-gray-300 text-sm uppercase font-semibold tracking-wider">Engineering</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'OpenCV', 'Pandas'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-gray-800/80 border border-gray-700/50 text-gray-300 text-sm rounded-lg">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Award Card */}
              <div className="bg-gradient-to-r from-yellow-900/25 to-orange-900/25 border border-yellow-700/30 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <h4 className="font-bold text-yellow-400 text-lg mb-1">CSJMUIF Ideathon 2026</h4>
                    <p className="text-sm text-yellow-200/70 leading-relaxed">
                      3rd Place Winner (Top Award) among 500+ participants for building Samarpan — a full AI proctoring &amp; quiz system.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Projects", value: "25+" },
                  { label: "Models Trained", value: "50+" },
                  { label: "Experience", value: "2 Yrs" },
                ].map(s => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RecruiterView() {
  const isSummaryOpen = useGameStore((s) => s.isSummaryOpen);
  const setIsSummaryOpen = useGameStore((s) => s.setIsSummaryOpen);
  const plainMode = useGameStore((s) => s.plainMode);
  const togglePlainMode = useGameStore((s) => s.togglePlainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const accentColors = useGameStore((s) => s.accentColors);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <>
      {/* ── Primary Toggle: Plain Mode / Game Mode ── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={togglePlainMode}
        id="plain-mode-toggle"
        aria-pressed={plainMode}
        aria-label={plainMode ? "Switch to Game Mode" : "Switch to Plain Mode"}
        className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 group text-sm"
        style={
          showGameMode
            ? {
                background: `linear-gradient(135deg, ${accentColors.primary}, ${accentColors.primaryLight})`,
                boxShadow: `0 0 25px ${accentColors.glow}`,
                color: "#fff",
              }
            : plainMode
            ? {
                background: "linear-gradient(135deg, #1f2937, #374151)",
                boxShadow: "0 0 25px rgba(156,163,175,0.3)",
                color: "#e5e7eb",
                border: "1px solid rgba(255,255,255,0.1)",
              }
            : {
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                boxShadow: "0 0 25px rgba(37,99,235,0.5)",
                color: "#fff",
              }
        }
      >
        {plainMode ? (
          <Gamepad2 className="w-4 h-4" />
        ) : (
          <BookOpen className="w-4 h-4" />
        )}
        <span>{plainMode ? "Game Mode" : (showGameMode ? "Plain Mode" : "Recruiter Mode")}</span>
        {!plainMode && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
      </motion.button>

      {/* ── Secondary: Quick Summary (shown always, below toggle) ── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        onClick={() => setIsSummaryOpen(true)}
        className="fixed bottom-16 right-6 z-50 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 bg-black/60 backdrop-blur-sm transition-all"
        aria-label="Open 30-second summary panel"
      >
        30s Summary ↗
      </motion.button>

      {/* ── Quick Summary Panel ── */}
      <AnimatePresence>
        {isSummaryOpen && <QuickSummaryPanel onClose={() => setIsSummaryOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
