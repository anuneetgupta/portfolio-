"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function AvatarCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Springy smooth versions for fluid motion
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations from mouse position
  const rotateX = useTransform(smoothY, [0, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12]);

  // Parallax shifts for layered depth
  const bgX = useTransform(smoothX, [0, 1], [15, -15]);
  const bgY = useTransform(smoothY, [0, 1], [15, -15]);
  const imgX = useTransform(smoothX, [0, 1], [8, -8]);
  const imgY = useTransform(smoothY, [0, 1], [8, -8]);
  const fgX = useTransform(smoothX, [0, 1], [-10, 10]);
  const fgY = useTransform(smoothY, [0, 1], [-10, 10]);

  // Dynamic light position
  const lightX = useTransform(smoothX, [0, 1], [20, 80]);
  const lightY = useTransform(smoothY, [0, 1], [20, 80]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Idle floating animation
  const [idlePhase, setIdlePhase] = useState(0);
  useEffect(() => {
    if (isHovered) return;
    let raf: number;
    const animate = () => {
      setIdlePhase((p) => p + 0.015);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  const idleY = isHovered ? 0 : Math.sin(idlePhase) * 10;
  const idleRotate = isHovered ? 0 : Math.sin(idlePhase * 0.7) * 2;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* 3D tilt container */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : idleRotate,
          rotateY: isHovered ? rotateY : 0,
          y: idleY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-[300px] h-[380px] md:w-[360px] md:h-[450px]"
      >
        {/* ─── LAYER 1: Background glow (furthest back) ─── */}
        <motion.div
          style={{ x: bgX, y: bgY, translateZ: "-60px" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full bg-blue-600/15 blur-[60px]" />
          <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-purple-600/10 blur-[50px] translate-x-8 translate-y-4" />
        </motion.div>

        {/* ─── LAYER 2: Orbiting rings (behind avatar) ─── */}
        <motion.div
          style={{ x: bgX, y: bgY, translateZ: "-30px" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute w-[260px] h-[260px] md:w-[330px] md:h-[330px] rounded-full border border-blue-500/15 animate-[spin_25s_linear_infinite]" />
          <div className="absolute w-[300px] h-[300px] md:w-[370px] md:h-[370px] rounded-full border border-purple-500/10 animate-[spin_35s_linear_infinite_reverse]" />
          <div className="absolute w-[220px] h-[220px] md:w-[290px] md:h-[290px] rounded-full border border-blue-400/10 border-dashed animate-[spin_18s_linear_infinite]" />
        </motion.div>

        {/* ─── LAYER 3: Main avatar image ─── */}
        <motion.div
          style={{ x: imgX, y: imgY, translateZ: "0px" }}
          className="absolute inset-0"
        >
          <Image
            src="/avatar.png"
            alt="Anuneet Gupta - AI/ML Engineer"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            priority
          />
        </motion.div>

        {/* ─── LAYER 4: Dynamic light overlay ─── */}
        <motion.div
          style={{
            translateZ: "10px",
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(59,130,246,0.12) 0%, transparent 60%)`,
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />

        {/* ─── LAYER 5: Foreground floating particles ─── */}
        <motion.div
          style={{ x: fgX, y: fgY, translateZ: "40px" }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Particle dots */}
          <div className="absolute top-[15%] right-[10%] w-2 h-2 rounded-full bg-blue-400/60 animate-[float_3s_ease-in-out_infinite]" />
          <div className="absolute top-[45%] left-[5%] w-1.5 h-1.5 rounded-full bg-purple-400/50 animate-[float_4s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-[25%] right-[15%] w-1 h-1 rounded-full bg-cyan-400/50 animate-[float_3.5s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-yellow-400/40 animate-[float_4.5s_ease-in-out_infinite_1.5s]" />
          <div className="absolute bottom-[40%] left-[10%] w-1 h-1 rounded-full bg-blue-300/40 animate-[float_3s_ease-in-out_infinite_2s]" />
        </motion.div>

        {/* ─── LAYER 6: Floating tech badges (closest to viewer) ─── */}
        <motion.div
          style={{ x: fgX, y: fgY, translateZ: "60px" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-[8%] right-[-5%] px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 backdrop-blur-md text-xs font-semibold text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-[float_3s_ease-in-out_infinite_0.3s]">
            🧠 AI / ML
          </div>
          <div className="absolute bottom-[18%] left-[-8%] px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] animate-[float_3.5s_ease-in-out_infinite_0.8s]">
            👁️ Computer Vision
          </div>
          <div className="absolute top-[40%] left-[-12%] px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-[float_3s_ease-in-out_infinite_1.3s]">
            📊 Data Science
          </div>
          <div className="absolute bottom-[35%] right-[-5%] px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 backdrop-blur-md text-xs font-semibold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-[float_4s_ease-in-out_infinite_1.8s]">
            🏆 Ideathon Winner
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
