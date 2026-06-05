"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing:   (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Make anchor scroll targets work
    const handleAnchor = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      e.preventDefault();
      const id = (target as HTMLAnchorElement).getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener("click", handleAnchor);

    let raf: number;
    const animate = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
