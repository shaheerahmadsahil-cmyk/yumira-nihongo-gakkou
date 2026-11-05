"use client";

import React from "react";
import { 
  Target, 
  Compass, 
  CheckCircle2, 
  Award, 
  Plane, 
  Headphones, 
  Sparkles,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export function AboutSection() {
  const { t } = useLanguage();

  // Custom visual theme for each of the 4 "Why Us" points
  const pointIcons = [
    {
      icon: Award,
      badgeColor: "bg-japanRed-50 text-japanRed-600 border-japanRed-100",
      accentGlow: "group-hover:border-japanRed-300",
      accentBar: "bg-japanRed-600",
      number: "01",
    },
    {
      icon: Plane,
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accentGlow: "group-hover:border-emerald-300",
      accentBar: "bg-emerald-600",
      number: "02",
    },
    {
      icon: Headphones,
      badgeColor: "bg-navy-50 text-navy-800 border-navy-100",
      accentGlow: "group-hover:border-navy-300",
      accentBar: "bg-navy-900",
      number: "03",
    },
    {
      icon: GraduationCap,
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      accentGlow: "group-hover:border-amber-300",
      accentBar: "bg-amber-500",
      number: "04",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 bg-gradient-to-b from-washi-50 via-white to-washi-100/50 relative overflow-hidden">
      {/* ========================================================= */}
      {/* 1. JAPANESE GEOMETRIC PATTERN & AMBIENT GRAPHICS          */}
      {/* ========================================================= */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        {/* Soft Radial Ambient Glow Orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-japanRed-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-navy-900/10 rounded-full blur-3xl"
        />

        {/* Japanese Seigaiha Wave Pattern Overlay (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
          <pattern id="seigaihaAbout" width="60" height="30" patternUnits="userSpaceOnUse">
            <path d="M 0 30 Q 15 15, 30 30 Q 45 15, 60 30" fill="none" stroke="#DC2626" strokeWidth="1.5" />
            <path d="M 0 15 Q 15 0, 30 15 Q 45 0, 60 15" fill="none" stroke="#0F172A" strokeWidth="1.5" />
            <path d="M 30 30 Q 45 15, 60 30" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#seigaihaAbout)" />
        </svg>

        {/* Faint Traditional Japanese Calligraphy Watermarks */}
        <span className="absolute top-12 right-6 lg:right-16 font-japanese text-8xl sm:text-9xl font-bold text-navy-900/[0.04]">
          志
        </span>
        <span className="absolute bottom-16 left-6 lg:left-16 font-japanese text-8xl sm:text-9xl font-bold text-japanRed-600/[0.04]">
          成
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ToriiDivider title="ABOUT OUR ACADEMY" />

        {/* Section Header with Graphic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-japanRed-50 border border-japanRed-200/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-japanRed-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-japanRed-700">
              {t.about.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {t.about.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.about.intro}
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. MISSION & VISION WITH JAPANESE HANKO SEALS & 3D CARDS  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-washi-200/90 relative group hover:border-japanRed-300 transition-all shadow-md hover:shadow-2xl overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-japanRed-600 via-amber-400 to-japanRed-500" />

            {/* Hanko Stamp (Traditional Japanese Red Seal) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-japanRed-500/40 bg-japanRed-50/60 flex flex-col items-center justify-center font-japanese text-[11px] font-bold text-japanRed-700 rotate-6 group-hover:rotate-0 transition-transform select-none shadow-sm">
              <span>使</span>
              <span>命</span>
            </div>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 rounded-xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-japanRed-600 group-hover:text-white transition-all shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-japanRed-600 uppercase font-mono">
                  OUR MISSION
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-navy-900">
                  {t.about.missionTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pr-8">
              {t.about.missionDesc}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-washi-200/90 relative group hover:border-navy-400 transition-all shadow-md hover:shadow-2xl overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 via-japanRed-500 to-navy-800" />

            {/* Hanko Stamp: 理想 (Ideal / Vision) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-navy-500/40 bg-navy-50/60 flex flex-col items-center justify-center font-japanese text-[11px] font-bold text-navy-900 -rotate-6 group-hover:rotate-0 transition-transform select-none shadow-sm">
              <span>理</span>
              <span>想</span>
            </div>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-navy-900 group-hover:text-white transition-all shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-navy-700 uppercase font-mono">
                  OUR VISION
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-navy-900">
                  {t.about.visionTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pr-8">
              {t.about.visionDesc}
            </p>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 3. TRUST HIGHLIGHT PILLS TICKER                           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-japanRed-50/80 via-white to-washi-100/90 border border-japanRed-200/60 shadow-sm flex flex-wrap items-center justify-around gap-3 sm:gap-6 text-xs font-semibold text-navy-900"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-japanRed-600" />
            <span>অভিজ্ঞ জাপানিজ সেনসেই মেন্টরশিপ</span>
          </div>
          <div className="hidden xs:flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>JLPT N5~N1 বিশেষায়িত কারিকুলাম</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-emerald-600" />
            <span>১০০% ভিসা ডকুমেন্টেশন সহায়তা</span>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 4. WHY LEARN WITH US WITH DYNAMIC CARDS & GRAPHICS        */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-washi-200/90 shadow-xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-japanRed-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-japanRed-50 text-japanRed-600 text-[11px] font-bold mb-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yumira Excellence</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              {t.about.whyUs}
            </h3>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {t.about.points.map((pt, idx) => {
              const theme = pointIcons[idx % pointIcons.length];
              const IconComp = theme.icon;

              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                    },
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`bg-white p-5 sm:p-6 rounded-2xl border border-washi-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${theme.accentGlow}`}
                >
                  {/* Top accent highlight bar on card */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBar} opacity-60 group-hover:opacity-100 group-hover:h-1.5 transition-all`} />

                  {/* Number Tag */}
                  <div className="absolute top-3.5 right-4 font-mono text-xs font-extrabold text-gray-300 group-hover:text-gray-500 transition-colors">
                    {theme.number}
                  </div>

                  {/* Icon badge */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-transform group-hover:scale-110 shadow-sm ${theme.badgeColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-navy-900 mb-2 group-hover:text-japanRed-600 transition-colors">
                    {pt.title}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-normal">
                    {pt.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-washi-100 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>প্রমাণিত কার্যকারিতা</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
