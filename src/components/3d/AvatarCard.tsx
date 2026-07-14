"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import PersonalizedScene from "./PersonalizedScene";

export default function AvatarCard() {
  return (
    <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[500px] select-none overflow-hidden rounded-[28px] border border-blue-500/10 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.18),rgba(2,6,23,0.72)_48%,rgba(0,0,0,0)_78%)]">
      <Canvas
        shadows
        camera={{ position: [0, 0.38, 4.25], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.05} />
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
        <directionalLight position={[-4, 3, 2]} intensity={1.2} color="#bfdbfe" />
        <directionalLight position={[0, 2, -5]} intensity={1.0} color="#818cf8" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <PersonalizedScene />
          <ContactShadows
            position={[0, -1.94, 0]}
            opacity={0.42}
            scale={3.6}
            blur={2.8}
            far={3}
            color="#1e3a8a"
          />
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
          dampingFactor={0.07}
          enableDamping
        />
      </Canvas>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
      >
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
        <p className="text-[11px] text-gray-600 tracking-widest">INITIALIZING</p>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
