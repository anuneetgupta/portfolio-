"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, BrainCircuit, FolderOpen,
  Trophy, Briefcase, BookOpen, Mail, Command,
  ArrowUpRight, Keyboard, X,
} from "lucide-react";

const COMMANDS = [
  { id: "hero",         label: "Go Home",               icon: Home,         section: "Navigate",  shortcut: "H" },
  { id: "about",        label: "About Me",               icon: User,         section: "Navigate",  shortcut: "A" },
  { id: "skills",       label: "Technical Skills",       icon: BrainCircuit, section: "Navigate",  shortcut: "S" },
  { id: "projects",     label: "Featured Projects",      icon: FolderOpen,   section: "Navigate",  shortcut: "P" },
  { id: "achievements", label: "Trophy Room",            icon: Trophy,       section: "Navigate",  shortcut: null },
  { id: "experience",   label: "Experience & Education", icon: Briefcase,    section: "Navigate",  shortcut: "E" },
  { id: "blog",         label: "Writing & Insights",     icon: BookOpen,     section: "Navigate",  shortcut: "B" },
  { id: "contact",      label: "Contact Me",             icon: Mail,         section: "Navigate",  shortcut: "C" },
  {
    id: "github",
    label: "Open GitHub Profile",
    icon: ArrowUpRight,
    section: "Links",
    shortcut: null,
    href: "https://github.com/anuneetgupta",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn Profile",
    icon: ArrowUpRight,
    section: "Links",
    shortcut: null,
    href: "https://www.linkedin.com/in/anuneet-gupta-57898631a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: "resume",
    label: "Download Resume",
    icon: ArrowUpRight,
    section: "Links",
    shortcut: null,
    href: "/resume.pdf",
  },
];

export default function CommandPalette() {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [active,  setActive]  = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const execute = useCallback((cmd: typeof COMMANDS[number]) => {
    close();
    if ("href" in cmd && cmd.href) {
      window.open(cmd.href, "_blank");
      return;
    }
    const el = document.getElementById(cmd.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [close]);

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % filtered.length); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((a) => (a - 1 + filtered.length) % filtered.length); }
      if (e.key === "Enter")     { e.preventDefault(); if (filtered[active]) execute(filtered[active]); }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, filtered, active, execute, close]);

  // Auto-focus input
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Group by section
  const sections = Array.from(new Set(filtered.map((c) => c.section)));

  return (
    <>
      {/* Trigger hint (bottom-center) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/70 border border-gray-800 text-gray-500 text-xs backdrop-blur-md hover:text-gray-300 hover:border-gray-700 transition-all cursor-pointer select-none"
        onClick={() => setOpen(true)}
      >
        <Command className="w-3 h-3" />
        <span>K</span>
        <span className="mx-1 text-gray-700">·</span>
        <Keyboard className="w-3 h-3" />
        <span>Command palette</span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{   opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                  placeholder="Search commands, sections, links…"
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none"
                />
                <button onClick={close} className="p-1 rounded text-gray-600 hover:text-gray-300 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-600 text-sm">No results for &ldquo;{query}&rdquo;</div>
                ) : (
                  sections.map((section) => {
                    const items = filtered.filter((c) => c.section === section);
                    return (
                      <div key={section}>
                        <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">
                          {section}
                        </div>
                        {items.map((cmd) => {
                          const Icon = cmd.icon;
                          const idx  = filtered.indexOf(cmd);
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => execute(cmd)}
                              onMouseEnter={() => setActive(idx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                active === idx
                                  ? "bg-blue-600/15 text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              <span className={`p-1.5 rounded-lg ${active === idx ? "bg-blue-600/25" : "bg-gray-800"}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                              {cmd.shortcut && (
                                <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-gray-800 border border-gray-700 text-gray-500 font-mono">
                                  {cmd.shortcut}
                                </kbd>
                              )}
                              {"href" in cmd && cmd.href && (
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-800 px-4 py-2 flex items-center gap-4 text-[10px] text-gray-600">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono">↵</kbd> Select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono">Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
