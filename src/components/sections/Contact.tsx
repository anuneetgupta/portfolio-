"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, GitBranch, Briefcase, MessageSquare, CheckCircle2 } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build mailto link and open it
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body    = encodeURIComponent(
      `Hi Anuneet,\n\nMy name is ${formState.name}.\n\n${formState.message}\n\nBest,\n${formState.name}\n${formState.email}`
    );
    window.open(`mailto:guptaanuneet10june@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      // Reset success state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 text-white bg-black border-t border-gray-900 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center space-y-4 mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Let&apos;s Build Something
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-3xl bg-gray-900/50 border border-gray-800 backdrop-blur-md relative overflow-hidden"
          >
            {/* Success state */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/95 rounded-3xl z-10"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-center max-w-xs">
                    Your email client opened. Looking forward to chatting with you!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
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
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none placeholder-gray-600"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600 pointer-events-none">
                Interactive 3D Globe
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:guptaanuneet10june@gmail.com"
                className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-blue-500/40 hover:bg-blue-900/10 transition-all group"
              >
                <Mail className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white mb-1">Email</h4>
                <p className="text-xs text-gray-400 break-all">guptaanuneet10june@gmail.com</p>
              </a>
              <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
                <MapPin className="w-8 h-8 text-purple-500 mb-4" />
                <h4 className="font-semibold text-white mb-1">Location</h4>
                <p className="text-sm text-gray-400">Kanpur, UP, India</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/anuneetgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all font-medium text-sm"
              >
                <GitBranch className="w-5 h-5" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/anuneet-gupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all font-medium text-sm"
              >
                <Briefcase className="w-5 h-5" /> LinkedIn
              </a>
              <a
                href="tel:+917392086340"
                className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-green-500 hover:border-green-500/50 transition-all font-medium text-sm"
              >
                <Phone className="w-5 h-5" /> Call
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
