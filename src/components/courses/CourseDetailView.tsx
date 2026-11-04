"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Clock,
  Calendar,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ChevronDown,
  HelpCircle,
  ArrowLeft,
  FileCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface CurriculumModule {
  title: string;
  topics: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface CourseDetailProps {
  course: {
    id: string;
    slug: string;
    level: string;
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
      curriculum: CurriculumModule[];
      features: string[];
      faq: FaqItem[];
    }[];
  };
  whatsappNumber?: string;
}

export function CourseDetailView({ course, whatsappNumber }: CourseDetailProps) {
  const { locale, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-japanRed-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-navy-900 text-white font-mono">
                JLPT {course.level}
              </span>
              {course.badge && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.2]">
              {trans?.title || `JLPT ${course.level}`}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {trans?.subtitle}
            </p>

            <div className="prose text-sm text-gray-700 leading-relaxed">
              <p>{trans?.description}</p>
            </div>

            {/* Quick Metadata Pill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-washi-50 border border-washi-200 text-xs text-navy-900">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-japanRed-600 shrink-0" />
                <div>
                  <span className="text-gray-500 block">Course Duration</span>
                  <strong className="text-sm">{course.duration}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-japanRed-600 shrink-0" />
                <div>
                  <span className="text-gray-500 block">Class Schedule</span>
                  <strong className="text-sm">{course.schedule}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Tuition Fee & WhatsApp Enrollment Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-8 rounded-3xl bg-washi-50 border-2 border-japanRed-200/80 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-japanRed-700 block mb-1">
                  Published Tuition Fee
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-navy-900">
                    {formattedFee}
                  </span>
                  <span className="text-base font-bold text-japanRed-600">
                    {course.currency}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 block mt-1">
                  * Dynamic published fee. Includes workbooks & mock exam access.
                </span>
              </div>

              {/* Admission WhatsApp Button */}
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-sm shadow-lg shadow-japanRed-600/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enroll in JLPT {course.level} (WhatsApp)</span>
              </a>

              {/* Features List in Card */}
              {trans?.features && trans.features.length > 0 && (
                <div className="pt-4 border-t border-washi-200 space-y-3">
                  <span className="text-xs font-bold text-navy-900 block uppercase tracking-wider">
                    What is Included:
                  </span>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {trans.features.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <ToriiDivider title="DETAILED CURRICULUM" />

        {/* Curriculum Modules */}
        {trans?.curriculum && trans.curriculum.length > 0 && (
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-navy-900">
                Course Curriculum & Exam Syllabus
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Structured module-by-module breakdown following international Japanese language standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trans.curriculum.map((module, mIdx) => (
                <div
                  key={mIdx}
                  className="p-6 rounded-2xl bg-washi-50 border border-washi-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-japanRed-100 text-japanRed-600 flex items-center justify-center font-bold text-sm">
                      {mIdx + 1}
                    </span>
                    <h3 className="text-base font-bold text-navy-900">
                      {module.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-600 pl-4 border-l-2 border-japanRed-200">
                    {module.topics?.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-japanRed-500" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {trans?.faq && trans.faq.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-navy-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {trans.faq.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="rounded-2xl border border-washi-200 bg-washi-50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === qIdx ? null : qIdx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-navy-900 hover:text-japanRed-600 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openFaq === qIdx ? "rotate-180 text-japanRed-600" : ""
                      }`}
                    />
                  </button>

                  {openFaq === qIdx && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-washi-200/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
