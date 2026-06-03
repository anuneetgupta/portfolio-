"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight, GraduationCap } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Bachelor of Computer Applications (BCA)",
    company: "CSJMU, Kanpur",
    location: "Kanpur, UP",
    period: "2nd Year (Pursuing)",
    type: "education",
    description: [
      "CGPA: 8.4 / 10",
      "Winner (3rd place) at CSJMUIF Ideathon 2026 for building Samarpan."
    ]
  },
  {
    id: 2,
    role: "Intermediate (PCM)",
    company: "Air Force School",
    location: "Gorakhpur, UP",
    period: "Completed",
    type: "education",
    description: [
      "Percentage: 80%",
      "Physics, Chemistry, and Mathematics."
    ]
  },
  {
    id: 3,
    role: "High School",
    company: "Stepping Stone Inter College",
    location: "Gorakhpur, UP",
    period: "Completed",
    type: "education",
    description: [
      "Percentage: 92%"
    ]
  }
];

export default function Experience() {
  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black/60">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-24">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Briefcase className="w-10 h-10 text-blue-500" />
            Experience & Education
          </h2>
          <p className="text-gray-400 text-lg">My professional journey and academic background</p>
        </div>

        <div className="relative border-l-2 border-gray-800 ml-4 lg:ml-0 lg:left-1/2 lg:-translate-x-[1px]">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const Icon = exp.type === 'education' ? GraduationCap : Briefcase;
            
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-16 lg:mb-24 flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10" />
                
                {/* Content Panel */}
                <div className={`w-full lg:w-1/2 pl-8 lg:pl-0 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700/50 p-6 lg:p-8 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-colors group">
                    
                    <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between mb-4 gap-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-300 w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Icon className="w-4 h-4 text-blue-500" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 text-gray-400">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-blue-500/70 shrink-0 mt-0.5" />
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
      </div>
    </section>
  );
}
