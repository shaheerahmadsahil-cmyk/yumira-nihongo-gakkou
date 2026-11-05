"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Clock, Calendar, Check, ArrowRight, Sparkles } from "lucide-react";
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

  return (
    <section id="courses" className="py-12 sm:py-20 bg-washi-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="ACADEMY COURSES" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.courses.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.courses.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal">
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
                className="flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-washi-200 shadow-sm hover:shadow-2xl hover:border-japanRed-300 transition-shadow duration-300 overflow-hidden group"
              >
                {/* Header Badge */}
                <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-washi-100 relative">
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-navy-900 text-white font-mono">
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

                {/* Course Metadata (Schedule & Duration) */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-washi-50/60 border-b border-washi-100 text-xs text-gray-600 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-japanRed-600 shrink-0" />
                    <span>
                      <strong>{t.courses.durationLabel}:</strong> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-japanRed-600 shrink-0" />
                    <span>
                      <strong>{t.courses.scheduleLabel}:</strong> {course.schedule}
                    </span>
                  </div>
                </div>

                {/* Dynamic Course Fee Section - Online & Offline */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="mb-4 sm:mb-6 space-y-2.5 sm:space-y-3">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      {locale === "bn" ? "কোর্স ফি (অনলাইন ও ক্যাম্পাস)" : locale === "ja" ? "受講料（オンライン / 通学）" : "Tuition Fee (Online & Offline)"}
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Online Fee */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col transition-transform group-hover:scale-[1.02]">
                        <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 flex items-center gap-1">
                          🌐 {locale === "bn" ? "অনলাইন" : locale === "ja" ? "オンライン" : "Online"}
                        </span>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-extrabold text-navy-900 tracking-tight">
                            ৳{new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(course.onlineFee ?? course.baseFee)}
                          </span>
                        </div>
                      </div>

                      {/* Offline Fee */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-japanRed-50/70 border border-japanRed-100 flex flex-col transition-transform group-hover:scale-[1.02]">
                        <span className="text-[10px] sm:text-[11px] font-bold text-japanRed-700 flex items-center gap-1">
                          🏫 {locale === "bn" ? "অফলাইন" : locale === "ja" ? "通学" : "Offline"}
                        </span>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-extrabold text-navy-900 tracking-tight">
                            ৳{new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(course.offlineFee ?? (course.baseFee + 2000))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {trans?.features && trans.features.length > 0 && (
                    <ul className="space-y-2 mb-4 sm:mb-6 text-xs text-gray-600">
                      {trans.features.slice(0, 4).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTAs */}
                  <div className="space-y-2 pt-1 sm:pt-2">
                    <a
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-japanRed-600 hover:bg-japanRed-700 shadow-md shadow-japanRed-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>{t.courses.enrollWhatsApp}</span>
                    </a>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-4 rounded-xl text-xs font-semibold text-navy-900 hover:text-japanRed-600 hover:bg-washi-100 border border-washi-200 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <span>{t.courses.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
