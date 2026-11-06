"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export function JapanStudyHeroVisuals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* ========================================================= */}
      {/* 1. BACKGROUND: CLEAN FLIGHT ROUTE & SKY COMPASS          */}
      {/* ========================================================= */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] sm:opacity-[0.32]">
        <svg
          viewBox="0 0 1000 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-6xl object-contain"
        >
          {/* Subtle Latitude/Longitude lines & Sky Navigation Grid */}
          <g stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.35">
            <line x1="40" y1="160" x2="960" y2="160" />
            <line x1="40" y1="340" x2="960" y2="340" />
            <line x1="40" y1="520" x2="960" y2="520" />
            {/* Elegant navigational compass rose */}
            <circle cx="860" cy="140" r="38" strokeWidth="0.8" />
            <circle cx="860" cy="140" r="20" strokeWidth="0.5" />
            <line x1="860" y1="95" x2="860" y2="185" strokeWidth="0.6" />
            <line x1="815" y1="140" x2="905" y2="140" strokeWidth="0.6" />
            <text x="860" y="90" fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
          </g>

          {/* FLIGHT PATH CURVE: Bangladesh (South-West) to Japan (North-East) */}
          <g>
            {/* Origin: Bangladesh */}
            <circle cx="120" cy="480" r="5" fill="#059669" />
            <circle cx="120" cy="480" r="13" stroke="#059669" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <text x="120" y="510" fill="#047857" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              বাংলাদেশ 🇧🇩
            </text>

            {/* Destination Hub: Japan (Nicely positioned to the right sky) */}
            <circle cx="840" cy="220" r="6" fill="#DC2626" />
            <circle cx="840" cy="220" r="15" stroke="#DC2626" strokeWidth="1.5" opacity="0.7" />
            <text x="840" y="250" fill="#991B1B" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              জাপান 🇯🇵
            </text>

            {/* Smooth High-Altitude Flight Arc over Mount Fuji */}
            <path
              id="heroFlightRoute"
              d="M120 480 C 320 220, 620 150, 840 220"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeDasharray="6 8"
              fill="none"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 2. ANIMATED FLYING AIRPLANE WITH SMOOTH FLIGHT MOTION     */}
      {/* ========================================================= */}
      {/* Desktop / Tablet Flying Airplane */}
      <motion.div
        animate={{
          x: ["-10vw", "22vw", "52vw", "82vw", "105vw"],
          y: ["46vh", "28vh", "18vh", "24vh", "30vh"],
          rotate: [-16, -6, 2, 10, 16],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.85, 1],
        }}
        className="absolute top-0 left-0 z-10 hidden sm:flex items-center gap-2"
      >
        <div className="relative">
          {/* Glowing Airplane Icon with Jet Trail */}
          <div className="p-2 sm:p-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-japanRed-200 text-japanRed-600 flex items-center justify-center">
            <Plane className="w-5 h-5 sm:w-6 sm:h-6 fill-japanRed-600 rotate-45 transform" />
          </div>
          {/* Flight destination pill badge: বাংলাদেশ ➔ জাপান */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-japanRed-200 shadow-lg whitespace-nowrap text-[11px] sm:text-xs font-bold text-navy-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-japanRed-600 animate-ping" />
            <span>বাংলাদেশ ➔ জাপান • 日本へ</span>
          </div>
        </div>
      </motion.div>

      {/* Mobile Flying Airplane */}
      <motion.div
        animate={{
          x: ["-10vw", "105vw"],
          y: ["14vh", "10vh"],
          rotate: [10, 16],
          opacity: [0, 0.9, 0.9, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 z-0 sm:hidden flex items-center"
      >
        <div className="p-1.5 rounded-full bg-white/95 shadow-md border border-japanRed-200 text-japanRed-600 flex items-center gap-1.5">
          <Plane className="w-3.5 h-3.5 fill-japanRed-600 rotate-45" />
          <span className="text-[10px] font-bold text-navy-900 pr-1">বাংলাদেশ ➔ জাপান ✈</span>
        </div>
      </motion.div>
    </div>
  );
}
