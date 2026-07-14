"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   GameDialogueBox
   
   RPG-style dialogue box with typewriter text reveal,
   pixel-art borders, and a "▼ Continue" prompt.
───────────────────────────────────────────────────────── */

interface GameDialogueBoxProps {
  lines: string[];
  onComplete: () => void;
  speaker?: string;
  accentColor?: string;
  typingSpeed?: number;
  className?: string;
}

export default function GameDialogueBox({
  lines,
  onComplete,
  speaker,
  accentColor = "#3b82f6",
  typingSpeed = 30,
  className = "",
}: GameDialogueBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentLine = lines[lineIndex] || "";
  const displayText = currentLine.slice(0, charIndex);
  const isLastLine = lineIndex >= lines.length - 1;
  const isLineComplete = charIndex >= currentLine.length;

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || isLineComplete) {
      setIsTyping(false);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((c) => c + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, isLineComplete, typingSpeed]);

  // Handle click/tap to advance
  const handleAdvance = useCallback(() => {
    if (isTyping) {
      // Skip to end of current line
      setCharIndex(currentLine.length);
      setIsTyping(false);
      return;
    }

    if (isLastLine) {
      onComplete();
      return;
    }

    // Next line
    setLineIndex((i) => i + 1);
    setCharIndex(0);
    setIsTyping(true);
  }, [isTyping, isLastLine, currentLine.length, onComplete]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleAdvance]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={handleAdvance}
        className={`relative cursor-pointer select-none ${className}`}
        role="dialog"
        aria-label="Game dialogue"
        tabIndex={0}
      >
        {/* Outer border - pixel style */}
        <div
          className="relative p-1 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
          }}
        >
          {/* Inner box */}
          <div className="bg-gray-950 rounded-md px-6 py-5 min-h-[120px] flex flex-col justify-between">
            {/* Speaker name */}
            {speaker && (
              <div
                className="absolute -top-3 left-4 px-3 py-0.5 rounded-md text-xs font-bold tracking-wider uppercase"
                style={{
                  background: accentColor,
                  color: "#fff",
                }}
              >
                {speaker}
              </div>
            )}

            {/* Text content */}
            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-[var(--font-outfit)] min-h-[60px] pt-1">
              {displayText}
              {isTyping && (
                <span
                  className="inline-block w-2 h-5 ml-0.5 align-middle animate-pulse"
                  style={{ background: accentColor }}
                />
              )}
            </p>

            {/* Continue indicator */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end items-center gap-2 mt-2"
              >
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  {isLastLine ? "CLOSE" : "CONTINUE"}
                </span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-sm"
                  style={{ color: accentColor }}
                >
                  ▼
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
