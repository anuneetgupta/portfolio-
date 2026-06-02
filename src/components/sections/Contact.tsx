"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, GitBranch, Briefcase, MessageSquare } from "lucide-react";
import * as THREE from "three";
import { Float, Environment, ContactShadows } from "@react-three/drei";

function GlobeModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={groupRef}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Wireframe outer sphere */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
        </mesh>
        
        {/* Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>

        {/* Orbiting particle */}
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>

        <pointLight position={[3, 3, 3]} intensity={2} color="#3b82f6" />
        <pointLight position={[-3, -3, -3]} intensity={1} color="#8b5cf6" />
      </group>
    </Float>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white bg-black border-t border-gray-900 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Send className="w-10 h-10 text-blue-500" />
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Leave a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-3xl bg-gray-900/50 border border-gray-800 backdrop-blur-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & 3D Element */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between h-full space-y-10"
          >
            {/* 3D Canvas */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-gray-800 overflow-hidden cursor-grab active:cursor-grabbing">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <Environment preset="city" />
                <GlobeModel />
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
              </Canvas>
            </div>

            {/* Direct Contact Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
                <Mail className="w-8 h-8 text-blue-500 mb-4" />
                <h4 className="font-semibold text-white mb-1">Email</h4>
                <p className="text-sm text-gray-400 truncate">hello@example.com</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
                <MapPin className="w-8 h-8 text-purple-500 mb-4" />
                <h4 className="font-semibold text-white mb-1">Location</h4>
                <p className="text-sm text-gray-400">San Francisco, CA</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all">
                <GitBranch className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all">
                <Briefcase className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all">
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
