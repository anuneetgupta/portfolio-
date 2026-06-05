"use client";

import { motion } from "framer-motion";
import { GitBranch, Briefcase, Mail, Phone, MapPin, Zap, Heart, ArrowUp } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: GitBranch, href: "https://github.com/anuneetgupta",            label: "GitHub",   color: "hover:text-white" },
  { icon: Briefcase, href: "https://linkedin.com/in/anuneet-gupta",      label: "LinkedIn", color: "hover:text-[#0A66C2]" },
  { icon: Mail,     href: "mailto:guptaanuneet10june@gmail.com",        label: "Email",    color: "hover:text-blue-400" },
  { icon: Phone,    href: "tel:+917392086340",                          label: "Phone",    color: "hover:text-green-400" },
];

const NAV_COLS = [
  {
    heading: "Navigation",
    links: [
      { label: "Home",         href: "#hero" },
      { label: "About",        href: "#about" },
      { label: "Skills",       href: "#skills" },
      { label: "Projects",     href: "#projects" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Achievements", href: "#achievements" },
      { label: "Experience",   href: "#experience" },
      { label: "Blog",         href: "#blog" },
      { label: "Contact",      href: "#contact" },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative w-full bg-black border-t border-gray-900 z-10 overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                ANUNEET<span className="text-blue-400">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              AI/ML Engineer building production-ready intelligent systems. Specializing in Computer Vision, NLP, and LLM-powered applications.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Kanpur, Uttar Pradesh, India</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={`p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-500 ${color} hover:border-gray-600 transition-all hover:scale-110`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map(({ heading, links }, ci) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (ci + 1) * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavClick(href)}
                      className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} Anuneet Gupta. Built with
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            using Next.js & Three.js
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
          >
            Back to top
            <span className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 group-hover:border-gray-600 group-hover:bg-gray-800 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
