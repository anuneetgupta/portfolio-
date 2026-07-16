/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight, GraduationCap } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

const experiences = [
  {
    id: 1,
    role: "Bachelor of Computer Applications (BCA)",
    company: "CSJMU, Kanpur",
    location: "Kanpur, UP",
    period: "2nd Year · Pursuing",
    type: "education",
    highlight: "CGPA: 8.4 / 10",
    highlightColor: "text-blue-400",
    description: [
      "CGPA: 8.4 / 10 — consistently top performer.",
      "Winner (3rd place) at CSJMUIF Ideathon 2026 for building Samarpan.",
      "Coursework includes Data Structures, DBMS, Computer Networks & OS.",
    ],
    healingLabel: "💊 Full Restore — Active Quest",
  },
  {
    id: 2,
    role: "Intermediate — PCM",
    company: "Air Force School",
    location: "Gorakhpur, UP",
    period: "Completed",
    type: "education",
    highlight: "80%",
    highlightColor: "text-purple-400",
    description: [
      "Percentage: 80% in Physics, Chemistry, and Mathematics.",
      "Strong mathematical foundation applied to ML algorithms.",
    ],
    healingLabel: "💊 Super Potion — Completed",
  },
  {
    id: 3,
    role: "High School",
    company: "Stepping Stone Inter College",
    location: "Gorakhpur, UP",
    period: "Completed",
    type: "education",
    highlight: "92%",
    highlightColor: "text-green-400",
    description: [
      "Percentage: 92% — School topper in Mathematics.",
    ],
    healingLabel: "💊 Potion — Origin Story",
  },
];

export default function Experience() {
  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black/60">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 mb-24"
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
              🏥 Pokémon Center
            </div>
          )}
          <div className="inline-block px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-gray-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Background
          </div>
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Briefcase className="w-10 h-10 text-blue-500" />
            {showGameMode ? "Pokémon Center — Rest Log" : "Experience & Education"}
          </h2>
          <p className="text-gray-400 text-lg">
            {showGameMode ? "Healing station records — education & training milestones" : "My academic journey and professional background"}
          </p>
        </motion.div>

        {showGameMode ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/60 border-2 rounded-2xl p-6 hover:-translate-y-2 transition-all group shadow-lg"
                style={{ borderColor: accentColors.border }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider mb-4 px-2 py-1 bg-white/5 border border-white/10 w-fit rounded" style={{ color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace" }}>
                  {exp.healingLabel}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h3>
                <div className={`text-xl font-black mb-4 ${exp.highlightColor}`}>
                  {exp.highlight}
                </div>
                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" style={{ color: accentColors.primary }} />
                    <span>{exp.company} - {exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mt-4 border-t border-gray-800 pt-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `${accentColors.primary}90` }} />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative ml-4 xl:ml-0">
            <div className="absolute left-0 xl:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 xl:-translate-x-1/2" />

            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const Icon = exp.type === "education" ? GraduationCap : Briefcase;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative mb-14 lg:mb-20 xl:mb-24 xl:grid xl:grid-cols-2 xl:gap-x-28"
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-[-7px] xl:left-1/2 xl:-translate-x-1/2 top-6 w-4 h-4 rounded-full shadow-lg z-10"
                    style={{
                      background: "#3b82f6",
                      boxShadow: "0 0 15px rgba(59,130,246,0.6)",
                    }}
                  />

                  {/* Content Panel */}
                  <div className={`w-full pl-8 xl:pl-0 ${isEven ? "xl:col-start-2" : "xl:col-start-1"}`}>
                    <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700/50 p-5 sm:p-6 lg:p-7 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">

                      {/* Header row */}
                      <div className="flex flex-col gap-3 mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <h3 className="min-w-0 break-words text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                            {exp.role}
                          </h3>
                          <span className={`text-xl sm:text-2xl font-black shrink-0 ${exp.highlightColor}`}>
                            {exp.highlight}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-300 w-fit">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Icon className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-blue-500/70" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Looking for work CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-semibold text-sm tracking-wider uppercase">Open to Internships &amp; Full-time Roles</span>
          </div>
          <p className="text-gray-300 text-lg font-medium">Looking for my first professional role in AI/ML Engineering.</p>
          <p className="text-gray-500 text-sm max-w-md mx-auto">I bring 2+ years of hands-on project experience, a hackathon win, and production deployments to the table.</p>
          <a
            href="mailto:guptaanuneet10june@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl transition-all mt-2"
            style={{
              background: showGameMode ? accentColors.primary : "#2563eb",
              boxShadow: `0 0 20px ${showGameMode ? accentColors.glow : "rgba(37,99,235,0.4)"}`,
            }}
          >
            Get in Touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
