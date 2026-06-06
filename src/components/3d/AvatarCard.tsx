"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  Stars,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import PersonalizedScene from "./PersonalizedScene";

export default function AvatarCard() {
  return (
    <div className="relative w-full h-[560px] md:h-[680px] select-none">

      {/* ── Canvas ── */}
      <Canvas
        shadows
        camera={{ position: [0, 0.6, 6.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={1.0} />

        {/* Key light — warm, upper right */}
        <directionalLight
          position={[4, 8, 5]}
          intensity={3.2}
          color="#fff9f0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.1}
          shadow-camera-far={25}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={8}
          shadow-camera-bottom={-4}
        />

        {/* Cool fill from left */}
        <directionalLight position={[-4, 3, 2]} intensity={1.2} color="#bfdbfe" />

        {/* Purple/indigo rim — makes character pop */}
        <directionalLight position={[0, 2, -5]} intensity={1.0} color="#818cf8" />

        {/* Environment for PBR reflections */}
        <Environment preset="city" />

        {/* Stars background */}
        <Stars
          radius={18}
          depth={6}
          count={900}
          factor={1.5}
          saturation={0.15}
          fade
          speed={0.4}
        />

        <Suspense fallback={null}>
          {/* The fully personalized scene */}
          <PersonalizedScene />

          {/* Blue-tinted ground shadow */}
          <ContactShadows
            position={[0, -2.06, 0]}
            opacity={0.6}
            scale={6}
            blur={2.8}
            far={5}
            color="#1e3a8a"
          />

          <Preload all />
        </Suspense>

        {/* Limited orbit controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          dampingFactor={0.07}
          enableDamping
        />
      </Canvas>

      {/* ── Loading overlay (shown while model + fonts load) ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
      >
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
        <p className="text-[11px] text-gray-600 tracking-widest">INITIALIZING</p>
      </motion.div>

      {/* ── Drag hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-gray-600 pointer-events-none z-10"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
        Drag to orbit · Mouse moves character
      </motion.div>

      {/* ── Bottom vignette ── */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10 rounded-b-3xl" />
    </div>
  );
}
