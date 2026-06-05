"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowUpRight, Code, Cpu, ExternalLink } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Building Real-Time AI Proctoring Systems",
    excerpt: "Deep dive into the architecture and computer vision techniques used in the Samarpan project to achieve 98% accuracy. Covers face detection, gaze tracking, and multi-person alert systems.",
    category: "AI/ML",
    icon: Cpu,
    readTime: "8 min read",
    date: "May 15, 2026",
    color: "from-blue-500/20 to-indigo-900/20",
    border: "border-blue-500/30",
    featured: true,
    href: "#blog",
  },
  {
    id: 2,
    title: "Optimizing React Three Fiber for Web",
    excerpt: "Learn how to maintain 60 FPS while rendering complex 3D scenes in Next.js applications.",
    category: "Web Dev",
    icon: Code,
    readTime: "5 min read",
    date: "Apr 22, 2026",
    color: "from-green-500/20 to-emerald-900/20",
    border: "border-green-500/30",
    featured: false,
    href: "#blog",
  },
  {
    id: 3,
    title: "Mapping Ancient Texts to Vector Databases",
    excerpt: "How Dharma Setu leverages LLMs and vector search to provide personalized guidance from historical scriptures.",
    category: "Architecture",
    icon: BookOpen,
    readTime: "10 min read",
    date: "Mar 10, 2026",
    color: "from-purple-500/20 to-fuchsia-900/20",
    border: "border-purple-500/30",
    featured: false,
    href: "#blog",
  },
];

export default function Blog() {
  return (
    <section className="relative w-full py-32 px-6 z-10 text-white border-t border-gray-900 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-purple-900/30 border border-purple-800 text-purple-300 text-sm font-semibold tracking-wider uppercase mb-4">
            Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Writing &amp; Insights</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts on Artificial Intelligence, Web Development, and the intersection of modern technology with ancient wisdom.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const Icon = post.icon;
            return (
              <motion.a
                href={post.href}
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative rounded-3xl bg-gradient-to-br ${post.color} border ${post.border} p-8 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-sm h-[400px] ${
                  post.featured ? "lg:col-span-2" : "lg:col-span-1"
                } hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-0" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold backdrop-blur-md">
                      <Icon className="w-3.5 h-3.5" />
                      {post.category}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <h3 className={`font-bold leading-tight ${post.featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 text-xs font-medium text-gray-400">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Coming Soon CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <div className="text-center sm:text-left">
            <p className="text-gray-300 font-medium">More articles coming soon.</p>
            <p className="text-gray-500 text-sm">Follow me to get notified.</p>
          </div>
          <a
            href="https://github.com/anuneetgupta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-800 hover:border-gray-600 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Visit GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
