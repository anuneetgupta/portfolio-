"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BrainCircuit } from "lucide-react";

interface Skill {
  name: string;
  experience: string;
  projects: string;
  proficiency: number;
}

const skills: Skill[] = [
  { name: "Machine Learning", experience: "3+ Years", projects: "Disease Detection, Pricing", proficiency: 95 },
  { name: "Python", experience: "4 Years", projects: "All Backend & ML", proficiency: 98 },
  { name: "Computer Vision", experience: "2 Years", projects: "Samarpan, Color Detection", proficiency: 90 },
  { name: "OpenCV", experience: "2 Years", projects: "Proctoring Systems", proficiency: 88 },
  { name: "LLM Engineering", experience: "1.5 Years", projects: "Dharma Setu", proficiency: 92 },
  { name: "NLP", experience: "2 Years", projects: "Spam Detection", proficiency: 85 },
  { name: "Prompt Engineering", experience: "1.5 Years", projects: "Dharma Setu, Samarpan", proficiency: 96 },
  { name: "AI Agents", experience: "1 Year", projects: "Automated Workflows", proficiency: 80 },
  { name: "SQL", experience: "3 Years", projects: "Database Architecture", proficiency: 85 },
  { name: "Git", experience: "4 Years", projects: "Version Control", proficiency: 90 },
  { name: "Vercel", experience: "2 Years", projects: "Frontend Deployment", proficiency: 92 },
  { name: "FastAPI", experience: "2 Years", projects: "ML Model APIs", proficiency: 88 },
  { name: "Next.js", experience: "2 Years", projects: "Dharma Setu Frontend", proficiency: 90 },
  { name: "React", experience: "3 Years", projects: "Various Dashboards", proficiency: 95 },
];

export default function Skills() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = sphereRef.current;
    if (!el) return;

    const items = el.children;
    const count = items.length;
    const radius = window.innerWidth < 768 ? 150 : 250;

    // Golden ratio for even spherical distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    Array.from(items).forEach((item, i) => {
      const htmlItem = item as HTMLElement;
      
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Apply initial 3D transform
      htmlItem.style.transform = `translate3d(${x * radius}px, ${y * radius}px, ${z * radius}px)`;
    });

    let angleY = 0;
    let angleX = 0;
    let animationId: number;

    const animate = () => {
      if (!isPaused) {
        angleY += 0.002;
        angleX += 0.001;
      }
      
      // Rotate the entire sphere container
      el.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad)`;
      
      // Counter-rotate the individual items so they always face the camera
      Array.from(items).forEach((item) => {
         const htmlItem = item as HTMLElement;
         // Extract the initial translate3d string
         const transform = htmlItem.style.transform;
         const translatePart = transform.substring(0, transform.indexOf(')') + 1);
         // Apply translate, then counter-rotate
         htmlItem.style.transform = `${translatePart} rotateY(${-angleY}rad) rotateX(${-angleX}rad)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden flex flex-col items-center justify-center text-white z-10">
      
      <div className="text-center mb-16 space-y-4 z-20">
        <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
          <BrainCircuit className="w-10 h-10 text-blue-500" />
          Technical Arsenal
        </h2>
        <p className="text-gray-400 text-lg">Hover over a node to see proficiency details.</p>
      </div>

      <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32">
        
        {/* 3D Sphere Container */}
        <div 
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] [perspective:1000px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={sphereRef} className="absolute w-full h-full [transform-style:preserve-3d] flex items-center justify-center">
            {skills.map((skill, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveSkill(skill)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-gray-900/80 border border-gray-700/50 backdrop-blur-md text-sm md:text-base font-medium whitespace-nowrap cursor-pointer hover:bg-blue-600/90 hover:border-blue-400 hover:scale-125 hover:z-50 transition-colors shadow-lg"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Details Panel */}
        <div className="w-full max-w-md h-[300px] bg-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col justify-center space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                  <Code2 className="w-8 h-8 text-blue-400" />
                  <h3 className="text-3xl font-bold">{activeSkill.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Experience</span>
                    <span className="font-semibold text-lg">{activeSkill.experience}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Projects</span>
                    <span className="font-semibold text-right max-w-[200px]">{activeSkill.projects}</span>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-blue-400 font-bold">{activeSkill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-gray-500"
              >
                <BrainCircuit className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-center text-lg">Hover over a skill node<br/>to analyze proficiency metrics.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
