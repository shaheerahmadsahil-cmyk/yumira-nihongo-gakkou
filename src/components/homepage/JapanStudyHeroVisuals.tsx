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
      {/* 1. BACKGROUND: MAP OF JAPAN WITH FLIGHT ROUTE & HUBS     */}
      {/* ========================================================= */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.34]">
        <svg
          viewBox="0 0 1000 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-6xl object-contain"
        >
          {/* Subtle Latitude/Longitude and Compass grid */}
          <g stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.45">
            <line x1="40" y1="140" x2="960" y2="140" />
            <line x1="40" y1="320" x2="960" y2="320" />
            <line x1="40" y1="500" x2="960" y2="500" />
            <circle cx="840" cy="180" r="50" strokeWidth="0.8" />
            <circle cx="840" cy="180" r="28" strokeWidth="0.5" />
            <line x1="840" y1="120" x2="840" y2="240" strokeWidth="0.6" />
            <line x1="780" y1="180" x2="900" y2="180" strokeWidth="0.6" />
            <text x="840" y="115" fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
          </g>

          {/* JAPAN ARCHIPELAGO (Stylized Vector Map) */}
          <g fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2">
            {/* Hokkaido (北海道) */}
            <path
              d="M710 65 C745 60 775 75 795 100 C810 120 800 148 785 158 C758 168 726 153 700 132 C682 118 688 85 710 65 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
            />

            {/* Honshu (本州 - Main Island Arc) */}
            <path
              d="M675 175 C690 195 680 230 655 260 C630 290 620 315 585 335 C550 355 520 370 485 390 C455 405 430 410 405 430 C390 440 370 435 380 420 C400 390 435 375 465 355 C505 330 545 295 580 255 C615 215 645 175 675 175 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
            />

            {/* Shikoku (四国) */}
            <path
              d="M440 428 C465 423 480 438 470 453 C455 463 430 458 425 443 C422 433 430 428 440 428 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
            />

            {/* Kyushu (九州) */}
            <path
              d="M360 432 C375 432 385 447 380 467 C370 492 350 507 335 492 C325 477 335 452 350 437 C355 432 358 432 360 432 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
            />

            {/* Okinawa (沖縄) */}
            <circle cx="260" cy="540" r="3.5" fill="#94A3B8" />
            <circle cx="280" cy="525" r="3" fill="#94A3B8" />
          </g>

          {/* FLIGHT PATH CURVE: Bangladesh to Japan */}
          <g>
            {/* Origin: Bangladesh */}
            <circle cx="130" cy="460" r="6" fill="#059669" />
            <circle cx="130" cy="460" r="14" stroke="#059669" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <text x="130" y="492" fill="#047857" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              বাংলাদেশ 🇧🇩
            </text>

            {/* Destination Hub: Japan */}
            <circle cx="615" cy="315" r="7" fill="#DC2626" />
            <circle cx="615" cy="315" r="16" stroke="#DC2626" strokeWidth="1.5" opacity="0.7" />
            <text x="645" y="320" fill="#991B1B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              জাপান (Japan) 🇯🇵
            </text>

            {/* International Flight Arc Trail */}
            <path
              id="heroFlightRoute"
              d="M130 460 C 260 250, 440 210, 615 315"
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              fill="none"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 2. ANIMATED FLYING AIRPLANE WITH DYNAMIC FLIGHT MOTION     */}
      {/* ========================================================= */}
      {/* Desktop / Tablet Flying Airplane */}
      <motion.div
        animate={{
          x: ["-10vw", "22vw", "55vw", "88vw", "105vw"],
          y: ["44vh", "26vh", "18vh", "26vh", "32vh"],
          rotate: [-16, -6, 2, 12, 16],
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
