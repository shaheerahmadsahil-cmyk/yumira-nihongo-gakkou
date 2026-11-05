"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, BookOpen, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
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

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-washi-100 via-washi-50 to-washi-50">
      {/* Mount Fuji Background Watermark */}
      <FujiWatermark className="bottom-0" />

      {/* Decorative Japanese Red Accent Glow */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-japanRed-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-japanRed-50 border border-japanRed-200/80 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-japanRed-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-japanRed-700 tracking-wide font-sans">
              {t.hero.tag}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
            {t.hero.headlinePrefix}{" "}
            <span className="relative inline-block text-japanRed-600">
              <span className="relative z-10">{t.hero.headlineHighlight}</span>
              {/* Subtle calligraphy stroke underline */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 w-full h-3 bg-japanRed-100 -rotate-1 -z-0 rounded"
              />
            </span>{" "}
            {t.hero.headlineSuffix}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.hero.subheading}
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-japanRed-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.hero.whatsappApply}</span>
            </a>

            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-washi-100 text-navy-900 border border-washi-300 font-semibold text-sm sm:text-base shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5 text-japanRed-600" />
              <span>{t.hero.exploreCourses}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </Link>
          </div>

          {/* Japanese Kanji & Yumira Motto */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 font-medium">
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
          </div>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-washi-200 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-japanRed-600 mb-1">
              {stats?.successRate || t.hero.stats.successRate}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {stats?.successLabel || t.hero.stats.successLabel}
            </div>
          </div>

          <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-washi-200 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-1">
              {stats?.students || t.hero.stats.students}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {stats?.studentsLabel || t.hero.stats.studentsLabel}
            </div>
          </div>

          <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-washi-200 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-japanRed-600 mb-1">
              {stats?.visas || t.hero.stats.visas}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {stats?.visasLabel || t.hero.stats.visasLabel}
            </div>
          </div>

          <div className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-washi-200 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-1">
              {stats?.nativeAudio || t.hero.stats.nativeAudio}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {stats?.nativeAudioLabel || t.hero.stats.nativeAudioLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
