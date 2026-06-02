"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, PlayCircle, BarChart3, Users, Zap, Layout } from "lucide-react";

export default function Projects() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Featured Products</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world AI applications built for scale. From ideathon-winning proctoring systems to ancient knowledge mapping.
          </p>
        </div>

        {/* HERO PROJECT 1: SAMARPAN */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/40 border border-gray-800 rounded-3xl p-8 lg:p-12 backdrop-blur-sm"
        >
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
                Ideathon Winner 2026
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">SAMARPAN</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                A comprehensive AI-driven platform for automated quiz generation from PDFs combined with advanced Computer Vision proctoring.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm uppercase text-gray-500 font-bold">Core Features</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• AI Quiz Generation</li>
                  <li>• PDF Question Creation</li>
                  <li>• CV Proctoring</li>
                  <li>• Face Detection</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-gray-200">98% Accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-gray-200">500+ Users</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-gray-200">High Performance</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Live Demo
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700">
                <GitBranch className="w-5 h-5" /> GitHub
              </button>
              <button className="px-6 py-3 bg-transparent text-white font-semibold rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2 border border-gray-600">
                <Layout className="w-5 h-5" /> Case Study
              </button>
            </div>
          </div>

          {/* Placeholder for Video/Image */}
          <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex flex-col items-center justify-center overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors" />
            <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-white group-hover:scale-110 transition-all z-10" />
            <p className="mt-4 text-gray-500 font-medium z-10">Samarpan Demo Video (Coming Soon)</p>
          </div>
        </motion.div>


        {/* HERO PROJECT 2: DHARMA SETU */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/40 border border-gray-800 rounded-3xl p-8 lg:p-12 backdrop-blur-sm"
        >
          {/* Placeholder for Architecture Diagram */}
          <div className="order-2 lg:order-1 relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl bg-gradient-to-bl from-gray-800 to-gray-900 border border-gray-700 flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-colors" />
            <Layout className="w-16 h-16 text-white/50 group-hover:text-white transition-colors z-10" />
            <p className="mt-4 text-gray-500 font-medium z-10 text-center px-4">Dharma Setu Architecture Diagram<br/>(Coming Soon)</p>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-green-900/30 border border-green-800 text-green-300 text-sm font-semibold tracking-wider uppercase mb-4">
                Production AI Application
              </div>
              <h3 className="text-5xl font-bold mb-4 text-white">DHARMA SETU</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                An LLM-integrated personalized guidance system mapping ancient texts like the Bhagavad Gita, Ramayana, and Mahabharata to solve modern problems.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm uppercase text-gray-500 font-bold">Key Technologies & Features</h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {['LLM Integration', 'Bhagavad Gita Mapping', 'Knowledge Graph', 'Vector Database', 'Personalized Guidance'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-gray-800 border border-gray-700 text-sm rounded-lg text-gray-300">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ExternalLink className="w-5 h-5" /> Live Application
              </button>
            </div>
          </div>
        </motion.div>


        {/* ML & CV PIPELINES (Bento Grid) */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">Machine Learning & Computer Vision Pipelines</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Disease Detection", category: "ML Classification", color: "from-red-500/20 to-red-900/20", border: "border-red-500/30" },
              { title: "Car Price Prediction", category: "Regression Pipeline", color: "from-blue-500/20 to-blue-900/20", border: "border-blue-500/30" },
              { title: "Spam Detection", category: "NLP + TF-IDF", color: "from-purple-500/20 to-purple-900/20", border: "border-purple-500/30" },
              { title: "Color Detection", category: "Computer Vision", color: "from-emerald-500/20 to-emerald-900/20", border: "border-emerald-500/30" }
            ].map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${proj.color} border ${proj.border} hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm group`}
              >
                <div className="h-full flex flex-col justify-between space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{proj.title}</h4>
                  <p className="text-sm text-gray-300 font-medium uppercase tracking-wider">{proj.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
