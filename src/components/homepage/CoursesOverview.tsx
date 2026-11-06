"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Clock, Calendar, Check, ArrowRight, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export interface CourseCardData {
  id: string;
  slug: string;
  level: string; // N5, N4, N3, JFT-A2
  baseFee: number;
  onlineFee?: number | null;
  offlineFee?: number | null;
  currency: string;
  duration: string;
  schedule: string;
  badge?: string | null;
  startDate?: string | null;
  translations: {
    locale: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[]; // parsed
  }[];
}

interface CoursesOverviewProps {
  courses: CourseCardData[];
  whatsappNumber?: string;
}

export function CoursesOverview({ courses, whatsappNumber }: CoursesOverviewProps) {
  const { locale, t } = useLanguage();

  // Japanese level stamps for each course tier
  const getLevelSeal = (level: string) => {
    switch (level.toUpperCase()) {
      case "N5":
        return { label: "入門", sub: "N5 Beginner" };
      case "N4":
        return { label: "初級", sub: "N4 Elementary" };
      case "N3":
        return { label: "中級", sub: "N3 Intermediate" };
      default:
        return { label: "特定", sub: "SSW Career" };
    }
  };

  return (
    <section id="courses" className="py-12 sm:py-20 bg-gradient-to-b from-washi-100/50 via-washi-50/70 to-white relative overflow-hidden">
      {/* Decorative Subtle Japanese Kanji Watermark & Ambient Radial Glow */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-japanRed-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-10 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl"
        />

        <span className="absolute top-10 left-6 lg:left-14 font-japanese text-8xl sm:text-9xl font-bold text-navy-900/[0.04]">
          講座
        </span>
        <span className="absolute bottom-12 right-6 lg:right-14 font-japanese text-8xl sm:text-9xl font-bold text-japanRed-600/[0.04]">
          夢
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ToriiDivider title="ACADEMY COURSES" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-japanRed-50 border border-japanRed-200/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-japanRed-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-japanRed-700">
              {t.courses.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {t.courses.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.courses.subtitle}
          </p>
        </motion.div>

        {/* Course Cards Grid */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {courses.map((course) => {
            const trans =
              course.translations.find((tr) => tr.locale === locale) ||
              course.translations.find((tr) => tr.locale === "en") ||
              course.translations[0];

            const applyUrl = buildWhatsAppUrl({
              courseLevel: course.level as "N5" | "N4" | "N3",
              courseTitle: trans?.title,
              locale,
              whatsappNumber,
            });

            const seal = getLevelSeal(course.level);

            return (
              <motion.div
                key={course.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.98 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                  },
                }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-washi-200/90 shadow-md hover:shadow-2xl hover:border-japanRed-300 transition-all duration-300 overflow-hidden group relative"
              >
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-japanRed-500 via-amber-400 to-navy-900 group-hover:h-2 transition-all" />

                {/* Hanko Level Stamp */}
                <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-xl border border-japanRed-500/40 bg-japanRed-50/70 flex flex-col items-center justify-center font-japanese text-[10px] font-bold text-japanRed-700 rotate-6 group-hover:rotate-0 transition-transform shadow-xs">
                  <span>{seal.label.charAt(0)}</span>
                  <span>{seal.label.charAt(1)}</span>
                </div>

                {/* Header Badge */}
                <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-washi-100 relative pr-14">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-navy-900 text-white font-mono shadow-xs">
                      JLPT {course.level}
                    </span>
                    {course.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-japanRed-600 bg-japanRed-50 px-2 py-0.5 rounded-full border border-japanRed-100 animate-pulse">
                        <Sparkles className="w-3 h-3 text-japanRed-500" />
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-navy-900 group-hover:text-japanRed-600 transition-colors line-clamp-1">
                    {trans?.title || `JLPT ${course.level}`}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {trans?.subtitle}
                  </p>
                </div>

                {/* Course Metadata (Start Date, Duration & Schedule) */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-washi-50/70 border-b border-washi-100 text-xs text-gray-600 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      <strong className="text-navy-900">ক্লাস শুরু:</strong>{" "}
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                        {course.startDate || "নতুন ব্যাচে ভর্তি চলছে"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-japanRed-600 shrink-0" />
                    <span>
                      <strong>{t.courses.durationLabel}:</strong> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-navy-700 shrink-0" />
                    <span>
                      <strong>{t.courses.scheduleLabel}:</strong> {course.schedule}
                    </span>
                  </div>
                </div>

                {/* Fees Grid */}
                <div className="p-4 sm:p-6 py-3 sm:py-4 border-b border-washi-100 bg-white">
                  <div className="grid grid-cols-2 gap-2 p-2 sm:p-2.5 bg-washi-100/60 rounded-xl border border-washi-200/80">
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-gray-500">অনলাইন ফি</div>
                      <div className="text-sm sm:text-base font-extrabold text-navy-900">
                        ৳{(course.onlineFee ?? course.baseFee).toLocaleString()}
                      </div>
                    </div>
                    <div className="border-l border-washi-200/80 pl-2">
                      <div className="text-[10px] sm:text-[11px] font-medium text-japanRed-600 font-semibold">অফলাইন ফি</div>
                      <div className="text-sm sm:text-base font-extrabold text-japanRed-600">
                        ৳{(course.offlineFee ?? (course.baseFee + 2000)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-4 sm:p-6 flex-1 bg-white">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 font-mono">
                    COURSE HIGHLIGHTS
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {trans?.features?.slice(0, 4).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA with Glowing Pulse */}
                <div className="p-4 sm:p-6 pt-0 bg-white">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-japanRed-600/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.courses.enrollWhatsApp}</span>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
