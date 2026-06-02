"use client";

import { motion } from "framer-motion";
import { Download, Eye, Mail, Trophy, Code, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-blue-400 font-semibold tracking-widest uppercase text-sm md:text-base">
              Building AI Products That Solve Real Problems
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400">
              ANUNEET GUPTA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              AI Engineer <span className="text-blue-500 mx-2">•</span> Computer Vision Developer <span className="text-blue-500 mx-2">•</span> LLM Product Builder
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all font-medium flex items-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Projects
            </button>
            <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all font-medium flex items-center gap-2 group border border-white/10">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </button>
            <button className="px-8 py-3 rounded-full bg-transparent hover:bg-white/5 transition-all font-medium flex items-center gap-2 group border border-white/20">
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-16"
          >
            {[
              { label: "Projects Built", value: "25+", icon: Code },
              { label: "Models Trained", value: "50+", icon: Users },
              { label: "Hackathons", value: "10+", icon: Trophy },
              { label: "Awards Won", value: "5", icon: Trophy },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <stat.icon className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
