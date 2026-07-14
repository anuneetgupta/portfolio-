/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress]   = useState(0);
  const [done,     setDone]       = useState(false);
  const [hidden,   setHidden]     = useState(false);

  useEffect(() => {
    // Simulate load progress
    const steps = [15, 35, 55, 70, 85, 95, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, 200 + Math.random() * 150);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setHidden(true), 700);
        }, 300);
      }
    };
    const t = setTimeout(tick, 150);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[998] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scanline overlay */}
          <div className="scanline-overlay absolute inset-0 z-50" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
          </div>

          {/* Retro boot logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-5 mb-12"
          >
            {/* Pixel-style logo box */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-blue-500/20"
              />
              <div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                style={{ imageRendering: "pixelated" }}
              >
                <span className="text-2xl">⚡</span>
              </div>
            </div>

            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-bold tracking-[0.3em] text-white"
                style={{ fontFamily: "var(--font-pixel), monospace", fontSize: "14px" }}
              >
                ANUNEET<span className="text-blue-400">.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-2"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                AI/ML Engineer
              </motion.p>
            </div>
          </motion.div>

          {/* Progress section — retro terminal style */}
          <div className="w-56 space-y-2">
            <div className="h-2 bg-gray-900 rounded-sm overflow-hidden border border-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-sm relative xp-shimmer"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-[9px] text-gray-600 tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                Initializing
              </span>
              <span
                className="text-[9px] text-blue-400 font-bold"
                style={{ fontFamily: "var(--font-pixel), monospace" }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
