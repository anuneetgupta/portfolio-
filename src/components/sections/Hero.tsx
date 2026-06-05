"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, Mail, Trophy, Code, Users } from "lucide-react";
import AvatarCard from "@/components/3d/AvatarCard";
import { useEffect, useState } from "react";

const ROLES = [
  "AI / ML Engineer",
  "Computer Vision Developer",
  "LLM Systems Builder",
  "Data Science Practitioner",
  "Ideathon Winner 2026",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TypewriterRole() {
  const [index,   setIndex]   = useState(0);
  const [display, setDisplay] = useState("");
  const [phase,   setPhase]   = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const word  = ROLES[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, index]);

  return (
    <span className="inline-block min-w-[2ch]">
      <span className="text-blue-400">{display}</span>
      <span className="inline-block w-0.5 h-6 md:h-8 bg-blue-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 items-center">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities · Kanpur, India
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-blue-400 font-semibold tracking-widest uppercase text-sm md:text-base"
              >
                Building AI Products That Solve Real Problems
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400"
              >
                ANUNEET GUPTA
              </motion.h1>
            </div>

            {/* Typewriter role line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 font-light min-h-[2rem] md:min-h-[2.5rem]"
            >
              <TypewriterRole />
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all font-medium flex items-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Projects
              </button>
              <a
                href="/resume.pdf"
                download
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all font-medium flex items-center gap-2 group border border-white/10"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Download Resume
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 rounded-full bg-transparent hover:bg-white/5 transition-all font-medium flex items-center gap-2 group border border-white/20"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <AvatarCard />
          </motion.div>

        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Projects Built",  value: "25+", icon: Code },
            { label: "Models Trained",  value: "50+", icon: Users },
            { label: "Hackathons",      value: "10+", icon: Trophy },
            { label: "Awards Won",      value: "5",   icon: Trophy },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-default group"
            >
              <stat.icon className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-sm text-gray-400 font-medium text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
}
