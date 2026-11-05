"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    // Generate a subtle number of petals (10-14 for high performance)
    const generated: Petal[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      animationDuration: 10 + Math.random() * 8, // 10s - 18s
      animationDelay: Math.random() * 8,
      size: 10 + Math.random() * 8, // 10px - 18px
      opacity: 0.35 + Math.random() * 0.45,
    }));

    setPetals(generated);
  }, []);

  if (prefersReducedMotion || petals.length === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-[30]"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          style={{
            position: "absolute",
            top: "-30px",
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.35}px`,
            opacity: petal.opacity,
            animation: `petalFall ${petal.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: `${petal.animationDelay}s`,
            background: "radial-gradient(ellipse at 40% 40%, #ffd1dc 0%, #ff9ebb 55%, #f43f5e 100%)",
            borderRadius: "70% 30% 70% 30% / 80% 30% 70% 20%",
            transform: "rotate(25deg)",
            willChange: "transform, opacity",
            filter: "drop-shadow(0 2px 4px rgba(244, 63, 94, 0.15))",
          }}
        />
      ))}
    </div>
  );
}
