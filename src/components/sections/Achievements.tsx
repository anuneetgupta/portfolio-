"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import * as THREE from "three";
import { Float, Environment, ContactShadows } from "@react-three/drei";

function TrophyModel() {
  const trophyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
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

export default function Achievements() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white bg-black/50 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center space-y-4 mb-24">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Trophy Room
          </h2>
          <p className="text-gray-400 text-lg">Honors, Awards, and Hackathon Victories</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 3D Trophy Canvas */}
          <div className="relative w-full h-[500px] rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors pointer-events-none z-10" />
            
            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#fbbf24" />
              <spotLight position={[-5, 10, -5]} intensity={1} color="#ffffff" />
              <Environment preset="city" />
              <TrophyModel />
              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
            </Canvas>
          </div>

          {/* Achievement Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 backdrop-blur-sm relative overflow-hidden">
              <Star className="absolute -top-4 -right-4 w-24 h-24 text-yellow-500/10 animate-pulse" />
              
              <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold tracking-wider uppercase mb-6">
                Top Award Display
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-4">CSJMUIF Ideathon 2026</h3>
              <h4 className="text-2xl text-yellow-500 font-medium mb-6">Winner / First Place</h4>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Secured the top position against hundreds of participants by pitching and presenting the Samarpan AI proctoring and quiz generation system. Recognized for innovation, technical execution, and real-world applicability.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white font-bold">Certificate of Excellence</p>
                  <p className="text-sm text-gray-500">Verified by CSJMUIF Innovation Foundation</p>
                </div>
              </div>
            </div>

            {/* Animated Certificate Showcase Placeholder */}
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {[1, 2, 3].map((cert) => (
                <div key={cert} className="flex-shrink-0 w-64 h-48 rounded-xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors group">
                  <Award className="w-8 h-8 text-gray-500 group-hover:text-yellow-500 transition-colors mb-2" />
                  <span className="text-sm text-gray-400 font-medium">Certificate {cert}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
