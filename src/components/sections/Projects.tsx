"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, PlayCircle, BarChart3, Users, Zap, ArrowUpRight } from "lucide-react";

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
  },
];

export default function Projects() {
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
          <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Featured Products</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world AI applications built for scale. From ideathon-winning proctoring systems to ancient knowledge mapping.
          </p>
        </motion.div>

        {/* ── HERO PROJECT 1: SAMARPAN ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/40 border border-gray-800 hover:border-blue-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-sm transition-colors group"
        >
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
                🏆 Ideathon Winner 2026
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">SAMARPAN</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                A comprehensive AI-driven platform for automated quiz generation from PDFs combined with advanced Computer Vision proctoring.
              </p>
            </div>

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

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Python', 'OpenCV', 'LLMs', 'FastAPI', 'MongoDB'].map(t => (
                  <span key={t} className="px-3 py-1 text-xs rounded-lg bg-gray-800 border border-gray-700 text-gray-300">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <PlayCircle className="w-5 h-5" /> Live Demo
              </button>
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                                <GitBranch className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-blue-900/20 to-gray-900 border border-blue-800/30 flex flex-col items-center justify-center overflow-hidden cursor-pointer group/vid">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 group-hover/vid:from-blue-600/10 group-hover/vid:to-purple-600/10 transition-all duration-500" />
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <PlayCircle className="w-16 h-16 text-blue-400/60 group-hover/vid:text-blue-400 group-hover/vid:scale-110 transition-all z-10" />
            <p className="mt-4 text-gray-500 font-medium z-10 text-sm">Demo Coming Soon</p>
          </div>
        </motion.div>

        {/* ── HERO PROJECT 2: DHARMA SETU ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/40 border border-gray-800 hover:border-green-500/20 rounded-3xl p-8 lg:p-12 backdrop-blur-sm transition-colors"
        >
          {/* Architecture Visual */}
          <div className="order-2 lg:order-1 relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl bg-gradient-to-bl from-green-900/20 to-gray-900 border border-green-800/30 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            {/* Architecture diagram mockup */}
            <div className="relative z-10 flex flex-col items-center gap-3 w-full px-8">
              {[
                { label: "User Interface (React)", color: "border-green-500/50 bg-green-900/20 text-green-300" },
                { label: "LangChain Orchestrator", color: "border-blue-500/50 bg-blue-900/20 text-blue-300" },
                { label: "Vector DB (Supabase)", color: "border-purple-500/50 bg-purple-900/20 text-purple-300" },
                { label: "Bhagavad Gita / Ramayana Corpus", color: "border-yellow-500/50 bg-yellow-900/20 text-yellow-300" },
              ].map((layer, i) => (
                <div key={i} className="w-full">
                  <div className={`px-4 py-2 rounded-lg border text-center text-xs font-semibold ${layer.color}`}>
                    {layer.label}
                  </div>
                  {i < 3 && <div className="flex justify-center py-0.5"><div className="w-px h-3 bg-gray-600" /></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-green-900/30 border border-green-800 text-green-300 text-sm font-semibold tracking-wider uppercase mb-4">
                🚀 Production AI Application
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">DHARMA SETU</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                An LLM-integrated personalized guidance system mapping ancient texts like the Bhagavad Gita, Ramayana, and Mahabharata to solve modern problems.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-3">Key Technologies &amp; Features</h4>
              <div className="flex flex-wrap gap-2">
                {['LLM Integration', 'Bhagavad Gita Mapping', 'Knowledge Graph', 'Vector Database', 'Personalized Guidance', 'Supabase', 'LangChain'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-gray-800 border border-gray-700 text-sm rounded-lg text-gray-300">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://dharma-set.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" /> Live Application
              </a>
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
              >
                                <GitBranch className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── ML & CV Pipelines Grid ── */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <h3 className="text-3xl font-bold">ML &amp; Computer Vision Pipelines</h3>
            <p className="text-gray-500">Standalone research and engineering projects</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ML_PROJECTS.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${proj.color} border ${proj.border} hover:scale-105 hover:-translate-y-1 transition-all cursor-pointer backdrop-blur-sm group relative overflow-hidden`}
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className={`w-4 h-4 ${proj.accent}`} />
                </div>
                <h4 className={`text-lg font-bold text-white mb-1 group-hover:${proj.accent} transition-colors`}>{proj.title}</h4>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${proj.accent}`}>{proj.category}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{proj.description}</p>
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
