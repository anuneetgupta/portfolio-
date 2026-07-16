/* eslint-disable */
"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Trophy, Award, Star, ExternalLink, Calendar, Users } from "lucide-react";
import * as THREE from "three";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useGameStore } from "@/lib/gameStore";
import GymBadge from "@/components/game/GymBadge";

function TrophyModel() {
  const trophyRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={trophyRef} position={[0, -1, 0]}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1.2, 0.5, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.4, 2, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={1} />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[1.5, 0.2, 1.5, 32, 1, true]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={1} side={THREE.DoubleSide} />
        </mesh>
        {/* Handles */}
        <mesh position={[1.5, 2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.6, 0.1, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={1} />
        </mesh>
        <mesh position={[-1.5, 2.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.6, 0.1, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={1} />
        </mesh>
        <pointLight position={[0, 3, 0]} intensity={2} color="#fcd34d" />
      </group>
    </Float>
  );
}

const CERTIFICATES = [
  { title: "Ideathon Winner 2026", org: "CSJMUIF Innovation Foundation", color: "border-yellow-500/40 bg-yellow-900/10 text-yellow-400", gameLabel: "TM01" },
  { title: "Python for Data Science", org: "Online Certification", color: "border-blue-500/40 bg-blue-900/10 text-blue-400", gameLabel: "TM02" },
  { title: "Machine Learning Fundamentals", org: "Coursera / NPTEL", color: "border-purple-500/40 bg-purple-900/10 text-purple-400", gameLabel: "HM01" },
];

export default function Achievements() {
  const [activeCard, setActiveCard] = useState(0);

  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white bg-black/50 border-t border-gray-900">
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
              🏆 Elite Four / Trophy Room
            </div>
          )}
          <div className="inline-block px-4 py-2 rounded-full bg-yellow-900/30 border border-yellow-800 text-yellow-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Recognition
          </div>
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            {showGameMode ? "Elite Four / Trophy Room" : "Trophy Room"}
          </h2>
          <p className="text-gray-400 text-lg">Honors, Awards, and Hackathon Victories</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* 3D Trophy Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className={`relative w-full h-[400px] overflow-hidden group transition-all ${
                showGameMode 
                  ? "rounded-xl border-4 border-gray-700 bg-[#0a0a0a] shadow-[inset_0_0_20px_rgba(0,0,0,1)]" 
                  : "rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-gray-800"
              }`}
            >
              {/* Game Mode: Badge Case details */}
              {showGameMode && (
                <>
                  <div className="absolute top-3 left-4 z-20 text-[10px] font-bold text-yellow-500 uppercase tracking-widest" style={{ fontFamily: "var(--font-pixel), monospace", textShadow: "1px 1px 0px #000" }}>
                    Badge Case
                  </div>
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black shadow-inner" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black shadow-inner" />
                  </div>
                  <div className="absolute inset-0 border-8 border-black/40 pointer-events-none z-10 rounded-xl" />
                </>
              )}
              
              <div className={`absolute inset-0 pointer-events-none z-10 transition-colors ${showGameMode ? 'scanline-overlay opacity-30' : 'bg-yellow-500/5 group-hover:bg-yellow-500/10'}`} />
              
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#fbbf24" />
                <spotLight position={[-5, 10, -5]} intensity={1} color="#ffffff" />
                <Environment preset="city" />
                <TrophyModel />
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
              </Canvas>
            </div>

            {/* Stats strip with optional gym badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Trophy, value: "1st", label: "Major Win", color: "text-yellow-400" },
                { icon: Users,  value: "500+", label: "Competed With", color: "text-blue-400" },
                { icon: Star,   value: "3rd", label: "Rank Achieved", color: "text-purple-400" },
              ].map(({ icon: Icon, value, label, color }, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Gym Badges row (game mode only) */}
            {showGameMode && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <GymBadge label="Ideathon Badge" icon="🏆" colors={accentColors} size={52} />
                <GymBadge label="Deploy Badge" icon="🚀" colors={{ ...accentColors, primary: "#22c55e", primaryLight: "#4ade80" }} size={52} />
              </div>
            )}
          </motion.div>

          {/* Achievement Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Award Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-900/25 to-orange-900/20 border border-yellow-700/30 backdrop-blur-sm relative overflow-hidden">
              <Star className="absolute -top-4 -right-4 w-24 h-24 text-yellow-500/10 animate-pulse" />
              
              <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold tracking-wider uppercase mb-6">
                Top Award
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">CSJMUIF Ideathon 2026</h3>
              <h4 className="text-xl text-yellow-400 font-semibold mb-4">3rd Place / IIIrd Rank</h4>
              
              <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 2026</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 500+ participants</span>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                Secured the 3rd rank by pitching and presenting the <span className="text-white font-medium">Samarpan</span> AI proctoring and quiz generation system. Recognized for innovation, technical execution, and real-world applicability.
              </p>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-yellow-700/20">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Certificate of Excellence</p>
                  <p className="text-xs text-gray-500">Verified by CSJMUIF Innovation Foundation</p>
                </div>
              </div>
            </div>

            {/* Certificate Showcase — styled as TM/HM in game mode */}
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-4">
                {showGameMode ? "TM / HM Collection" : "Certifications & Recognition"}
              </h4>
              <div className="space-y-3">
                {CERTIFICATES.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveCard(i)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeCard === i
                        ? cert.color
                        : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {showGameMode && (
                        <span className="text-[10px] font-bold text-gray-500" style={{ fontFamily: "var(--font-pixel), monospace" }}>
                          {cert.gameLabel}
                        </span>
                      )}
                      <Award className={`w-5 h-5 ${activeCard === i ? cert.color.split(" ")[2] : "text-gray-600"}`} />
                      <div>
                        <p className="font-semibold text-sm text-white">{cert.title}</p>
                        <p className="text-xs text-gray-500">{cert.org}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
