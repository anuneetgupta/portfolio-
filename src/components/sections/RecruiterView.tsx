"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Award, Code, Download, ExternalLink } from "lucide-react";

export default function RecruiterView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <Briefcase className="w-5 h-5" />
        Recruiter Mode
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12 space-y-12 text-white">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 font-mono text-sm tracking-widest uppercase">Open to opportunities</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold">30-Second Summary</h2>
                  <p className="text-xl text-gray-400 max-w-3xl">
                    I build production-ready AI products, specializing in Computer Vision and LLMs. I have a track record of winning hackathons and delivering real-world applications.
                  </p>
                  <div className="pt-4 flex gap-4">
                    <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Resume
                    </button>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#004182] transition-colors flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Top Projects */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-2xl font-semibold border-b border-gray-800 pb-4">
                      <Code className="w-6 h-6 text-blue-500" />
                      Production Highlights
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">SAMARPAN</h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold">Ideathon Winner 2026</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">AI Quiz Generation & Computer Vision Proctoring.</p>
                      <div className="flex flex-wrap gap-2">
                        {['Next.js', 'Python', 'OpenCV', 'LLMs'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">DHARMA SETU</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold">Live Production</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">Personalized Guidance System mapping ancient texts using LLMs.</p>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Supabase', 'LangChain'].map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Skills & Achievements */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-2xl font-semibold border-b border-gray-800 pb-4">
                      <Award className="w-6 h-6 text-yellow-500" />
                      Core Competencies
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-sm uppercase font-semibold mb-2">AI & Machine Learning</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Computer Vision', 'NLP', 'LLM Engineering', 'Prompt Engineering', 'AI Agents'].map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-blue-900/30 border border-blue-800 text-blue-300 text-sm rounded-lg">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-gray-400 text-sm uppercase font-semibold mb-2">Engineering</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL'].map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 p-6 rounded-2xl mt-6">
                      <h4 className="font-bold text-yellow-500 flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5" />
                        CSJMUIF Ideathon 2026
                      </h4>
                      <p className="text-sm text-yellow-200/70">Top Award Winner among 500+ participants for building Samarpan.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
