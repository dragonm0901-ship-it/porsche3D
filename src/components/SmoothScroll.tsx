"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized options for premium, butter-smooth scroll momentum
    const lenis = new Lenis({
      lerp: 0.065, /* ultra-smooth, premium delayed catch-up */
      duration: 1.5, /* smooth programmatic transitions */
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85, /* slightly softer wheel steps */
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Use GSAP ticker to sync Lenis with the browser's refresh rate
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Clean up
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
