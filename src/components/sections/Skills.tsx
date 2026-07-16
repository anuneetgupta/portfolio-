/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BrainCircuit } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";
import PokedexCard from "@/components/game/PokedexCard";
import type { SkillType } from "@/components/game/PokedexCard";

interface Skill {
  name: string;
  experience: string;
  projects: string;
  proficiency: number;
  type: SkillType;
}

const skills: Skill[] = [
  { name: "Python", experience: "2 Years", projects: "Backend & ML", proficiency: 95, type: "Language" },
  { name: "SQL", experience: "2 Years", projects: "Database Queries", proficiency: 85, type: "Language" },
  { name: "HTML/CSS", experience: "2 Years", projects: "Frontend Structure", proficiency: 90, type: "Language" },
  { name: "Machine Learning", experience: "2 Years", projects: "Disease Detection", proficiency: 92, type: "Domain" },
  { name: "Scikit-learn", experience: "2 Years", projects: "Model Building", proficiency: 90, type: "Framework" },
  { name: "Pandas/NumPy", experience: "2 Years", projects: "Data Preprocessing", proficiency: 95, type: "Framework" },
  { name: "Computer Vision", experience: "1.5 Years", projects: "Samarpan, Color Detection", proficiency: 88, type: "Domain" },
  { name: "OpenCV", experience: "1.5 Years", projects: "Face-based Proctoring", proficiency: 85, type: "Framework" },
  { name: "NLP", experience: "1.5 Years", projects: "Spam Detection", proficiency: 85, type: "Domain" },
  { name: "LLM APIs", experience: "1 Year", projects: "Dharma Setu", proficiency: 92, type: "Domain" },
  { name: "AI Agents", experience: "1 Year", projects: "Foundational Workflow", proficiency: 80, type: "Domain" },
  { name: "Jupyter Notebook", experience: "2 Years", projects: "EDA & Prototyping", proficiency: 95, type: "Tool" },
  { name: "Git", experience: "2 Years", projects: "Version Control", proficiency: 90, type: "Tool" },
  { name: "Vercel", experience: "1 Year", projects: "Dharma Setu Frontend", proficiency: 90, type: "Tool" },
];

export default function Skills() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCount, setFlippedCount] = useState(0);
  const [activeTab, setActiveTab] = useState<SkillType | "All">("All");

  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);
  const addXP = useGameStore((s) => s.addXP);

  const showGameMode = hasSelectedStarter && !plainMode;

  // Track skill card flips for XP
  const handleFlip = () => {
    const newCount = flippedCount + 1;
    setFlippedCount(newCount);
    if (newCount >= 3) {
      addXP(10, "skills-3-flipped");
    }
  };

  // Original sphere animation (used in plain/clean mode)
  useEffect(() => {
    if (showGameMode) return; // Don't run sphere in game mode

    const el = sphereRef.current;
    if (!el) return;

    const items = el.children;
    const count = items.length;
    const radius = window.innerWidth < 768 ? 150 : 250;
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    Array.from(items).forEach((item, i) => {
      const htmlItem = item as HTMLElement;
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
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
      el.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad)`;
      Array.from(items).forEach((item) => {
         const htmlItem = item as HTMLElement;
         const transform = htmlItem.style.transform;
         const translatePart = transform.substring(0, transform.indexOf(')') + 1);
         htmlItem.style.transform = `${translatePart} rotateY(${-angleY}rad) rotateX(${-angleX}rad)`;
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, showGameMode]);

  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden flex flex-col items-center justify-center text-white z-10 border-t border-gray-900">
      
      <div className="text-center mb-16 space-y-4 z-20">
        {showGameMode && (
          <div
            className="game-section-label mb-2"
            style={{ background: `${accentColors.primary}15`, color: accentColors.primaryLight, border: `1px solid ${accentColors.border}` }}
          >
            ⚔️ Training Grounds
          </div>
        )}
        <div 
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 border"
          style={showGameMode ? {
            background: `${accentColors.primary}20`,
            borderColor: `${accentColors.primary}40`,
            color: accentColors.primaryLight
          } : {
            background: "rgba(30,58,138,0.3)",
            borderColor: "rgba(29,78,216,0.4)",
            color: "#93c5fd"
          }}
        >
          Expertise
        </div>
        <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
          <BrainCircuit className="w-10 h-10 text-blue-500" />
          {showGameMode ? "Pokédex" : "Technical Arsenal"}
        </h2>
        <p className="text-gray-400 text-lg">
          {showGameMode ? "Click a card to flip and reveal proficiency details." : "Hover a node to see proficiency details."}
        </p>
      </div>

      {/* ── GAME MODE: Pokédex Grid ── */}
      {showGameMode ? (
        <div className="w-full max-w-5xl px-6 z-20 flex flex-col items-center">
          
          {/* Type Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 bg-black/40 border border-gray-800 rounded-xl backdrop-blur-sm">
            {(["All", "Language", "Domain", "Framework", "Tool"] as (SkillType | "All")[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all border ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                }`}
                style={
                  activeTab === tab
                    ? {
                        background: `${accentColors.primary}20`,
                        borderColor: accentColors.primary,
                        textShadow: `0 0 8px ${accentColors.glow}`,
                      }
                    : {}
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <AnimatePresence mode="popLayout">
              {skills
                .filter((s) => activeTab === "All" || s.type === activeTab)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PokedexCard
                      name={skill.name}
                      type={skill.type}
                      proficiency={skill.proficiency}
                      experience={skill.experience}
                      projects={skill.projects}
                      accentColor={accentColors.primary}
                      index={index}
                      onFlip={handleFlip}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* ── CLEAN MODE: Original Sphere ── */
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
      )}
    </section>
  );
}
