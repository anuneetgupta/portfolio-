/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Mic, Award, Users, ChevronRight, ExternalLink } from "lucide-react";
import { useGameStore } from "@/lib/gameStore";

const activities = [
  {
    id: 1,
    role: "Cultural Performance",
    organization: "CSJMU Hostel Events",
    location: "Kanpur, UP",
    period: "2024",
    type: "cultural",
    highlight: "Appreciation",
    highlightColor: "text-pink-400",
    description: [
      "Awarded Certificate of Appreciation for enthusiastic participation.",
      "Valuable contribution in celebrating the essence of Hostel events."
    ],
    healingLabel: "🎵 Poké Flute — Awakened",
    icon: Users,
    certLink: "/cultural-certificate.pdf"
  },
  {
    id: 2,
    role: "Speech Competition (Mahakumbh)",
    organization: "CSJMU Foundation Day",
    location: "Kanpur, UP",
    period: "2025",
    type: "speaking",
    highlight: "Consolation Prize",
    highlightColor: "text-orange-400",
    description: [
      "Participated in the university-level speech competition on 'Mahakumbh: Diversity of India'.",
      "Awarded consolation prize in the first round among numerous participants."
    ],
    healingLabel: "🗣️ Roar — Attack Up",
    icon: Mic,
    certLink: "/speech-certificate.pdf"
  },
  {
    id: 3,
    role: "English Extempore",
    organization: "Air Force School",
    location: "Gorakhpur, UP",
    period: "April 2022",
    type: "speaking",
    highlight: "3rd Position",
    highlightColor: "text-yellow-400",
    description: [
      "Secured 3rd position in the English Extempore competition during Class XII.",
      "Demonstrated quick thinking and effective communication skills."
    ],
    healingLabel: "⚡ Quick Attack — Speed Up",
    icon: Award,
    certLink: "/extempore-certificate.pdf"
  }
];

export default function Extracurriculars() {
  const accentColors = useGameStore((s) => s.accentColors);
  const plainMode = useGameStore((s) => s.plainMode);
  const hasSelectedStarter = useGameStore((s) => s.hasSelectedStarter);

  const showGameMode = hasSelectedStarter && !plainMode;

  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black/40">
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
              🎭 Contest Hall
            </div>
          )}
          <div className="inline-block px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-gray-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Beyond Tech
          </div>
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Users className="w-10 h-10 text-pink-500" />
            {showGameMode ? "Contest Hall — Extracurriculars" : "Extracurriculars & Leadership"}
          </h2>
          <p className="text-gray-400 text-lg">
            {showGameMode ? "Ribbons and accolades beyond standard gym battles" : "Internships, cultural events, and non-technical achievements"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 hover:-translate-y-2 hover:border-gray-600 transition-all group flex flex-col h-full"
                style={showGameMode ? { borderColor: accentColors.border } : {}}
              >
                {showGameMode && (
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-4 px-2 py-1 bg-white/5 border border-white/10 w-fit rounded" style={{ color: accentColors.primaryLight, fontFamily: "var(--font-pixel), monospace" }}>
                    {activity.healingLabel}
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    {activity.role}
                  </h3>
                  <Icon className={`w-6 h-6 ${activity.highlightColor} shrink-0 ml-4`} />
                </div>
                <div className={`text-lg font-black mb-4 ${activity.highlightColor}`}>
                  {activity.highlight}
                </div>
                <div className="flex flex-col gap-1.5 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-300">{activity.organization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span>{activity.period} • {activity.location}</span>
                  </div>
                </div>
                <ul className="space-y-2 mt-auto border-t border-gray-800/50 pt-4 mb-6">
                  {activity.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: showGameMode ? accentColors.primary : "#9ca3af" }} />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={activity.certLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gray-800 hover:bg-gray-800/60 transition-colors cursor-pointer group/link mt-auto"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <Award className={`w-4 h-4 ${activity.highlightColor}`} />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 group-hover/link:text-white">View Certificate</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover/link:text-white transition-colors" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
