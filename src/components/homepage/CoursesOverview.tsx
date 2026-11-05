"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Clock, Calendar, Check, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export interface CourseCardData {
  id: string;
  slug: string;
  level: string; // N5, N4, N3
  baseFee: number;
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
    <section id="courses" className="py-20 bg-washi-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="ACADEMY COURSES" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.courses.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.courses.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            // Find active translation or fallback to first
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

            const formattedFee = new Intl.NumberFormat(
              locale === "bn" ? "bn-BD" : "en-US"
            ).format(course.baseFee);

            return (
              <div
                key={course.id}
                className="flex flex-col bg-white rounded-3xl border border-washi-200 shadow-sm hover:shadow-xl hover:border-japanRed-300 transition-all duration-300 overflow-hidden group"
              >
                {/* Header Badge */}
                <div className="p-6 pb-4 border-b border-washi-100 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-900 text-white font-mono">
                      JLPT {course.level}
                    </span>
                    {course.badge && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-japanRed-600 bg-japanRed-50 px-2.5 py-0.5 rounded-full border border-japanRed-100">
                        <Sparkles className="w-3 h-3" />
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-japanRed-600 transition-colors line-clamp-1">
                    {trans?.title || `JLPT ${course.level}`}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {trans?.subtitle}
                  </p>
                </div>

                {/* Course Metadata (Schedule & Duration) */}
                <div className="px-6 py-4 bg-washi-50/60 border-b border-washi-100 text-xs text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-japanRed-600 shrink-0" />
                    <span>
                      <strong>{t.courses.durationLabel}:</strong> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-japanRed-600 shrink-0" />
                    <span>
                      <strong>{t.courses.scheduleLabel}:</strong> {course.schedule}
                    </span>
                  </div>
                </div>

                {/* Dynamic Course Fee Section - ALWAYS FROM DATABASE */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <span className="text-xs font-medium text-gray-500 block mb-1">
                      {t.courses.feeLabel}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-navy-900 tracking-tight">
                        {formattedFee}
                      </span>
                      <span className="text-sm font-semibold text-japanRed-600">
                        {course.currency}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {trans?.features && trans.features.length > 0 && (
                    <ul className="space-y-2.5 mb-6 text-xs text-gray-600">
                      {trans.features.slice(0, 4).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTAs */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-japanRed-600 hover:bg-japanRed-700 shadow-md shadow-japanRed-600/25 transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>{t.courses.enrollWhatsApp}</span>
                    </a>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-navy-900 hover:text-japanRed-600 hover:bg-washi-100 border border-washi-200 transition-colors"
                    >
                      <span>{t.courses.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
