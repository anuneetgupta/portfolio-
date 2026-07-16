/* eslint-disable */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowUpRight, Code, Cpu, ExternalLink } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

const posts = [
  {
    id: 1,
    title: "Building Real-Time AI Proctoring Systems",
    excerpt: "Deep dive into the architecture and computer vision techniques used in the Samarpan project to achieve 98% accuracy. Covers face detection, gaze tracking, and multi-person alert systems.",
    category: "AI/ML",
    icon: Cpu,
    readTime: "8 min read",
    date: "May 15, 2026",
    color: "from-blue-500/20 to-indigo-900/20",
    border: "border-blue-500/30",
    featured: true,
    href: "#blog",
    boxSlot: "BOX 1 — Slot 1",
  },
  {
    id: 2,
    title: "Optimizing React Three Fiber for Web",
    excerpt: "Learn how to maintain 60 FPS while rendering complex 3D scenes in Next.js applications.",
    category: "Web Dev",
    icon: Code,
    readTime: "5 min read",
    date: "Apr 22, 2026",
    color: "from-green-500/20 to-emerald-900/20",
    border: "border-green-500/30",
    featured: false,
    href: "#blog",
    boxSlot: "BOX 1 — Slot 2",
  },
  {
    id: 3,
    title: "Mapping Ancient Texts to Vector Databases",
    excerpt: "How Dharma Setu leverages LLMs and vector search to provide personalized guidance from historical scriptures.",
    category: "Architecture",
    icon: BookOpen,
    readTime: "10 min read",
    date: "Mar 10, 2026",
    color: "from-purple-500/20 to-fuchsia-900/20",
    border: "border-purple-500/30",
    featured: false,
    href: "#blog",
    boxSlot: "BOX 1 — Slot 3",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          {showGameMode && (
            <div
              className="game-section-label mx-auto"
              style={{
                background: `${accentColors.primary}15`,
                color: accentColors.primaryLight,
                border: `1px solid ${accentColors.border}`,
              }}
            >
              💾 PC Storage Box
            </div>
          )}
          <div className="inline-block px-4 py-2 rounded-full bg-purple-900/30 border border-purple-800 text-purple-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            {showGameMode ? "PC Storage — Articles" : "Writing & Insights"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {showGameMode
              ? "Articles stored in your PC. Access anytime from any Pokémon Center."
              : "Thoughts on Artificial Intelligence, Web Development, and the intersection of modern technology with ancient wisdom."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const Icon = post.icon;
            return (
              <motion.div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative rounded-3xl bg-gradient-to-br ${post.color} border ${post.border} p-8 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-sm h-[400px] ${
                  post.featured ? "lg:col-span-2" : "lg:col-span-1"
                } hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-0" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      {showGameMode && (
                        <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                          {post.boxSlot}
                        </span>
                      )}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold backdrop-blur-md">
                        <Icon className="w-3.5 h-3.5" />
                        {post.category}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <h3 className={`font-bold leading-tight ${post.featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 text-xs font-medium text-gray-400">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <div className="text-center sm:text-left">
            <p className="text-gray-300 font-medium">More articles coming soon.</p>
            <p className="text-gray-500 text-sm">Follow me to get notified.</p>
          </div>
          <a
            href="https://github.com/anuneetgupta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-800 hover:border-gray-600 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Visit GitHub
          </a>
        </motion.div>

      </div>

      {/* Modal Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-gray-950 border p-8 md:p-12 relative ${showGameMode ? 'game-border' : 'border-gray-800'}`}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <span className="text-white">{selectedPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
              <span>•</span>
              <span className="uppercase tracking-wider">{selectedPost.category}</span>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{selectedPost.title}</h3>
            
            <div className="prose prose-invert prose-blue max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">{selectedPost.excerpt}</p>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <selectedPost.icon className="w-12 h-12 text-blue-400 opacity-50" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Full Article Coming Soon</h4>
                  <p className="text-gray-400 text-sm">This is a placeholder for the modal reader. The full content will be added in a future update.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
