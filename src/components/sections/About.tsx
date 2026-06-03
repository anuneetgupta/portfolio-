"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Rocket } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Started ML & Data Science",
    description: "Began deep dive into machine learning algorithms, data analysis, and mathematical foundations.",
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30"
  },
  {
    year: "2025",
    title: "Built Computer Vision Projects",
    description: "Developed advanced CV models, focusing on object detection and real-time image processing architectures.",
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30"
  },
  {
    year: "2026",
    title: "Production AI & Ideathon Win",
    description: "Built Dharma Setu and Samarpan. Won Ideathon 2026 for creating a fully functional AI proctoring and quiz generation system.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30"
  }
];

export default function About() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 flex flex-col items-center z-10 text-white">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold tracking-wider uppercase mb-4">
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Bridging the gap between <span className="text-blue-400">theory</span> and <span className="text-blue-400">production</span>.
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            Final-year BCA student (CGPA 8.4) with hands-on experience in machine learning, NLP, and Computer Vision. Built Samarpan an AI-powered quiz and proctoring platform that won 3rd place at CSJMUIF Ideathon 2026.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Also built and deployed Dharma Setu, a full-stack LLM-powered product live in production. Comfortable across the full ML pipeline from Data Preprocessing to model deployment, and experienced connecting LLM APIs to real user-facing products.
          </p>
          
          <div className="pt-8 grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-white mb-2">2+</h3>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Deployment Rate</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Interactive Timeline */}
        <div className="relative border-l border-gray-800 ml-4 md:ml-12 pl-8 md:pl-12 space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group cursor-pointer"
            >
              {/* Timeline Node */}
              <div className={`absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full ${item.bg} border-2 ${item.border} flex items-center justify-center group-hover:scale-150 transition-transform duration-300`}>
                <div className={`w-2 h-2 rounded-full ${item.bg.replace('/10', '')}`} />
              </div>

              {/* Content Card */}
              <div className={`p-8 rounded-3xl bg-gray-900/40 border border-gray-800 hover:border-gray-600 transition-all duration-500 backdrop-blur-md group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-mono text-xl font-bold ${item.color}`}>{item.year}</h4>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
