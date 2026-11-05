"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Sparkles, Compass, Bookmark, Award } from "lucide-react";

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
            {/* Sapporo Marker */}
            <circle cx="740" cy="115" r="3.5" fill="#DC2626" />
            <text x="750" y="118" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              札幌 Sapporo
            </text>

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
            <text x="290" y="528" fill="#64748B" fontSize="9" fontWeight="500">沖縄 Okinawa</text>
          </g>

          {/* FLIGHT PATH CURVE: Dhaka (Bangladesh) to Tokyo (Japan) */}
          <g>
            {/* Origin: Dhaka, Bangladesh Indicator */}
            <circle cx="130" cy="460" r="6" fill="#059669" />
            <circle cx="130" cy="460" r="14" stroke="#059669" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <text x="130" y="492" fill="#047857" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Dhaka (DAC) 🇧🇩
            </text>

            {/* Destination Hub: Tokyo, Japan */}
            <circle cx="615" cy="315" r="7" fill="#DC2626" />
            <circle cx="615" cy="315" r="16" stroke="#DC2626" strokeWidth="1.5" opacity="0.7" />
            <text x="645" y="320" fill="#991B1B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              東京 Tokyo 🇯🇵
            </text>

            {/* Osaka / Kyoto Hub */}
            <circle cx="515" cy="365" r="5" fill="#DC2626" />
            <text x="515" y="390" fill="#64748B" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
              大阪 Osaka
            </text>

            {/* Fukuoka Hub */}
            <circle cx="365" cy="445" r="4.5" fill="#DC2626" />
            <text x="365" y="468" fill="#64748B" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
              福岡 Fukuoka
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
            {/* Secondary Domestic Connection Route Tokyo to Osaka */}
            <path
              d="M615 315 C 570 330, 545 350, 515 365"
              stroke="#64748B"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              fill="none"
              opacity="0.6"
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
          {/* Flight destination pill badge */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-japanRed-200 shadow-lg whitespace-nowrap text-[11px] font-bold text-navy-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-japanRed-600 animate-ping" />
            <span>Dhaka ➔ Tokyo • 日本留学</span>
          </div>
        </div>
      </motion.div>

      {/* Mobile Flying Airplane (Smaller & Smooth) */}
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
        <div className="p-1.5 rounded-full bg-white/90 shadow-md border border-japanRed-200 text-japanRed-600 flex items-center gap-1">
          <Plane className="w-3.5 h-3.5 fill-japanRed-600 rotate-45" />
          <span className="text-[9px] font-bold text-navy-900 pr-1">Tokyo ✈</span>
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* 3. LEFT FLOATING ELEMENT: JAPANESE TEXTBOOK WITH KANJI     */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 30 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -14, 0],
          rotate: [-2, 3, -2],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 },
          x: { duration: 0.8, delay: 0.2 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-3 lg:left-8 xl:left-14 top-24 sm:top-36 md:top-40 z-10 hidden md:block"
      >
        <div className="relative group">
          {/* Floating Kanji Sparkle: 合格 (Pass) */}
          <motion.div
            animate={{ y: [-4, -16, -4], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-2 px-2.5 py-0.5 rounded-full bg-japanRed-600 text-white font-japanese text-[11px] font-bold shadow-md flex items-center gap-1 z-20"
          >
            <Sparkles className="w-3 h-3 fill-white" />
            <span>合格 (Pass)</span>
          </motion.div>

          {/* Floating Kanji Token: 夢 (Dream) */}
          <motion.div
            animate={{ y: [0, -12, 0], opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-3 w-8 h-8 rounded-full bg-amber-500 text-white font-japanese text-sm font-bold shadow-md flex items-center justify-center z-20"
          >
            夢
          </motion.div>

          {/* 3D-styled Japanese Study Book */}
          <div className="w-40 lg:w-48 p-4 bg-gradient-to-br from-white via-washi-50 to-white/95 backdrop-blur-md rounded-2xl border-2 border-japanRed-200/90 shadow-xl shadow-japanRed-900/10 relative overflow-hidden">
            {/* Book Spine accent band */}
            <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-japanRed-600 rounded-l-2xl" />

            {/* Bookmark ribbon */}
            <div className="absolute -top-1 right-6 text-amber-500">
              <Bookmark className="w-5 h-6 fill-amber-500" />
            </div>

            <div className="pl-2">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-washi-200">
                <span className="text-[10px] font-extrabold tracking-wider text-japanRed-600 uppercase font-sans">
                  JLPT N5~N1
                </span>
                <span className="text-[10px] font-japanese font-semibold text-gray-500">
                  文法・漢字
                </span>
              </div>

              {/* Japanese Book Title */}
              <div className="text-center py-1">
                <div className="text-2xl lg:text-3xl font-extrabold text-navy-900 font-japanese tracking-widest">
                  日本語
                </div>
                <div className="text-[11px] font-semibold text-japanRed-600 mt-0.5">
                  জাপানি পাঠ্যবই
                </div>
              </div>

              {/* Study Notes footer */}
              <div className="mt-2.5 pt-2 border-t border-dashed border-washi-200 text-[10px] text-gray-600 flex items-center justify-between">
                <span className="font-japanese text-xs font-bold text-navy-900">初志貫徹</span>
                <span className="font-sans text-[9px] text-japanRed-700 bg-japanRed-50 px-1.5 py-0.5 rounded font-bold">
                  100% প্রস্তুতি
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* 4. RIGHT FLOATING ELEMENT: STUDY ABROAD JAPAN VISA TICKET  */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, 14, 0],
          rotate: [2, -3, 2],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.35 },
          x: { duration: 0.8, delay: 0.35 },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute right-3 lg:right-8 xl:right-14 top-28 sm:top-40 md:top-44 z-10 hidden md:block"
      >
        <div className="relative group">
          {/* Top Badge: Visa Support */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-sans text-[10px] font-bold shadow-md flex items-center gap-1 z-20"
          >
            <Award className="w-3 h-3" />
            <span>Japan Visa Approved</span>
          </motion.div>

          {/* Floating Kanji: 進 (Progress) */}
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute -bottom-4 -right-2 w-8 h-8 rounded-full bg-japanRed-600 text-white font-japanese text-sm font-bold shadow-md flex items-center justify-center z-20"
          >
            進
          </motion.div>

          {/* Boarding Pass Style Card */}
          <div className="w-42 lg:w-48 p-4 bg-gradient-to-br from-white via-washi-50 to-white/95 backdrop-blur-md rounded-2xl border-2 border-japanRed-200/90 shadow-xl shadow-japanRed-900/10">
            {/* Header */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-semibold mb-2">
              <span className="flex items-center gap-1 text-navy-900 font-bold">
                <Compass className="w-3.5 h-3.5 text-japanRed-600" />
                STUDY IN JAPAN
              </span>
              <span className="font-japanese text-[11px] text-japanRed-600 font-bold">留学</span>
            </div>

            {/* Flight Route DAC -> TYO */}
            <div className="flex items-center justify-between py-1.5 px-2 bg-washi-100 rounded-lg">
              <div className="text-left">
                <div className="text-xs font-extrabold text-navy-900">DAC</div>
                <div className="text-[9px] text-gray-500">Dhaka</div>
              </div>
              <div className="flex flex-col items-center px-1">
                <Plane className="w-4 h-4 text-japanRed-600 rotate-45" />
                <div className="w-10 h-[1px] bg-japanRed-300 border-t border-dashed my-0.5" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-japanRed-600">TYO</div>
                <div className="text-[9px] text-gray-500">Tokyo</div>
              </div>
            </div>

            {/* Footer Features */}
            <div className="mt-2.5 text-[10px] text-gray-600 text-center font-medium leading-tight">
              স্টুডেন্ট ও SSW ওয়ার্কিং ভিসা প্রসেসিং
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
