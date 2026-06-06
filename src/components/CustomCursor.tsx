/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false);
  const [isHover, setIsHover]   = useState(false);
  const [isClick, setIsClick]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot: snappy
  const dotX = useSpring(rawX, { stiffness: 600, damping: 40 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 40 });

  // Ring: lagging
  const ringX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Skip on mobile / touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const checkHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverable = t.closest("a, button, [data-cursor-hover], input, textarea, select, label");
      setIsHover(!!hoverable);
    };

    const down = () => setIsClick(true);
    const up   = () => setIsClick(false);

    window.addEventListener("mousemove",  move);
    window.addEventListener("mousemove",  checkHover);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown",  down);
    window.addEventListener("mouseup",    up);

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove",  move);
      window.removeEventListener("mousemove",  checkHover);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown",  down);
      window.removeEventListener("mouseup",    up);
      document.documentElement.style.cursor = "";
    };
  }, [rawX, rawY, visible]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width:   isHover ? 48 : isClick ? 16 : 32,
            height:  isHover ? 48 : isClick ? 16 : 32,
            opacity: isHover ? 0.6 : 0.35,
            borderColor: isHover ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.5)",
            backgroundColor: isHover ? "rgba(59,130,246,0.08)" : "rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="rounded-full border"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width:  isHover ? 6 : isClick ? 12 : 5,
            height: isHover ? 6 : isClick ? 12 : 5,
            backgroundColor: isHover
              ? "rgba(59,130,246,1)"
              : "rgba(255,255,255,0.9)",
            boxShadow: isHover
              ? "0 0 12px rgba(59,130,246,0.8)"
              : "0 0 6px rgba(255,255,255,0.4)",
          }}
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
