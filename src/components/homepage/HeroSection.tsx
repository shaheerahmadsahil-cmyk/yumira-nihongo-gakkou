"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, BookOpen, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FujiWatermark } from "@/components/shared/FujiWatermark";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export interface HeroStatsProps {
  successRate?: string;
  successLabel?: string;
  students?: string;
  studentsLabel?: string;
  visas?: string;
  visasLabel?: string;
  nativeAudio?: string;
  nativeAudioLabel?: string;
}

export function HeroSection({
  whatsappNumber,
  stats,
}: {
  whatsappNumber?: string;
  stats?: HeroStatsProps;
}) {
  const { locale, t } = useLanguage();

  const applyUrl = buildWhatsAppUrl({
    courseLevel: "General",
    locale,
    whatsappNumber,
  });

  const statItems = [
    {
      value: stats?.successRate || t.hero.stats.successRate,
      label: stats?.successLabel || t.hero.stats.successLabel,
      color: "text-japanRed-600",
      accent: "hover:border-japanRed-300",
    },
    {
      value: stats?.students || t.hero.stats.students,
      label: stats?.studentsLabel || t.hero.stats.studentsLabel,
      color: "text-navy-900",
      accent: "hover:border-navy-300",
    },
    {
      value: stats?.visas || t.hero.stats.visas,
      label: stats?.visasLabel || t.hero.stats.visasLabel,
      color: "text-japanRed-600",
      accent: "hover:border-japanRed-300",
    },
    {
      value: stats?.nativeAudio || t.hero.stats.nativeAudio,
      label: stats?.nativeAudioLabel || t.hero.stats.nativeAudioLabel,
      color: "text-navy-900",
      accent: "hover:border-navy-300",
    },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-washi-100 via-washi-50 to-washi-50">
      {/* Mount Fuji Background Watermark */}
      <FujiWatermark className="bottom-0" />

      {/* Decorative Japanese Red Accent Glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-japanRed-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge Tag with spring bounce */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-japanRed-50 border border-japanRed-200/80 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-japanRed-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-japanRed-700 tracking-wide font-sans">
              {t.hero.tag}
            </span>
          </motion.div>

          {/* Main Headline with reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]"
          >
            {t.hero.headlinePrefix}{" "}
            <span className="relative inline-block text-japanRed-600">
              <span className="relative z-10">{t.hero.headlineHighlight}</span>
              {/* Subtle calligraphy stroke underline */}
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-1 left-0 w-full h-3 bg-japanRed-100 -rotate-1 -z-0 rounded origin-left"
              />
            </span>{" "}
            {t.hero.headlineSuffix}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            {t.hero.subheading}
          </motion.p>

          {/* Call to Actions with interactive hover/tap animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-japanRed-600/30 transition-colors animate-pulse-glow"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.hero.whatsappApply}</span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-washi-100 text-navy-900 border border-washi-300 font-semibold text-sm sm:text-base shadow-sm transition-colors"
              >
                <BookOpen className="w-5 h-5 text-japanRed-600" />
                <span>{t.hero.exploreCourses}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Japanese Kanji & Motto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 font-medium"
          >
            <span className="font-japanese text-sm text-amber-600 font-bold">
              「ユミラ」
            </span>
            <span>•</span>
            <span className="font-semibold text-navy-900">স্বপ্ন ও ভবিষ্যৎ</span>
            <span>•</span>
            <span className="tracking-wider text-gray-600 uppercase text-[11px]">Dream • Grow • Achieve</span>
            <span>•</span>
            <span className="font-japanese text-sm text-japanRed-600 font-semibold">
              「初志貫徹」
            </span>
          </motion.div>
        </div>

        {/* Highlight Metrics Cards with staggered scroll animation & hover elevation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.45,
              },
            },
          }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                },
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className={`p-5 bg-white/95 backdrop-blur-sm rounded-2xl border border-washi-200 shadow-sm text-center transition-all cursor-default hover:shadow-lg ${item.accent}`}
            >
              <div className={`text-2xl sm:text-3xl font-extrabold ${item.color} mb-1 tracking-tight`}>
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
