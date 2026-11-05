"use client";

import React from "react";
import Link from "next/link";
import { Timer, Play, Sparkles, BookOpen, Headphones, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export interface MockTestCardData {
  id: string;
  jlptLevel: string;
  title: string;
  titleBn: string;
  titleJa: string;
  description: string;
  descriptionBn: string;
  descriptionJa: string;
  timeLimitMinutes: number;
  totalMarks: number;
  passingScore: number;
  _count?: {
    questions: number;
  };
}

export function MockTestPreview({ tests }: { tests: MockTestCardData[] }) {
  const { locale, t } = useLanguage();

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-washi-50 via-washi-100/40 to-white relative overflow-hidden">
      {/* Decorative Subtle Japanese Kanji Watermark & Ambient Radial Glow */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-japanRed-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-navy-900/10 rounded-full blur-3xl"
        />
        <span className="absolute top-12 left-6 lg:left-14 font-japanese text-8xl sm:text-9xl font-bold text-navy-900/[0.04]">
          試験
        </span>
        <span className="absolute bottom-12 right-6 lg:right-14 font-japanese text-8xl sm:text-9xl font-bold text-japanRed-600/[0.04]">
          満点
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ToriiDivider title="SIMULATED EXAMINATIONS" />

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
              {t.mockTest.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {t.mockTest.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.mockTest.subtitle}
          </p>
        </motion.div>

        {/* Test Cards Grid with Framer Motion Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {tests.map((test) => {
            const displayTitle =
              locale === "bn"
                ? test.titleBn
                : locale === "ja"
                ? test.titleJa
                : test.title;

            const displayDesc =
              locale === "bn"
                ? test.descriptionBn
                : locale === "ja"
                ? test.descriptionJa
                : test.description;

            return (
              <motion.div
                key={test.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                  },
                }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-washi-200/90 shadow-md hover:shadow-2xl hover:border-japanRed-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 via-japanRed-500 to-amber-400 group-hover:h-2 transition-all" />

                {/* Hanko Exam Stamp: 試験 (Exam) */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-japanRed-500/40 bg-japanRed-50/70 flex flex-col items-center justify-center font-japanese text-[10px] font-bold text-japanRed-700 rotate-6 group-hover:rotate-0 transition-transform shadow-xs">
                  <span>試</span>
                  <span>験</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 pr-12">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-navy-900 text-white font-mono shadow-xs">
                      JLPT {test.jlptLevel}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-japanRed-600 font-semibold bg-japanRed-50 px-2.5 py-1 rounded-full border border-japanRed-100">
                      <Timer className="w-3.5 h-3.5 text-japanRed-500" />
                      {test.timeLimitMinutes} {t.mockTest.minutes}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5 sm:mb-2 group-hover:text-japanRed-600 transition-colors">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 sm:mb-6 leading-relaxed">
                    {displayDesc}
                  </p>

                  {/* Section badges preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] font-medium text-gray-500">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-washi-100 text-navy-900">
                      <BookOpen className="w-3 h-3 text-japanRed-600" />
                      문자・어휘・문법
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-washi-100 text-navy-900">
                      <Headphones className="w-3 h-3 text-emerald-600" />
                      청해 (Listening)
                    </span>
                  </div>

                  {/* Marks & Passing score box */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-washi-50 border border-washi-100 mb-4 sm:mb-6 text-xs text-gray-600">
                    <div>
                      <span className="block text-gray-400 text-[10px] sm:text-[11px]">
                        {t.mockTest.totalMarks}
                      </span>
                      <strong className="text-navy-900 font-bold text-xs sm:text-sm">
                        {test.totalMarks} pts
                      </strong>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[10px] sm:text-[11px]">
                        {t.mockTest.passingScore}
                      </span>
                      <strong className="text-emerald-600 font-bold text-xs sm:text-sm">
                        {test.passingScore} pts
                      </strong>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/mock-tests/${test.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-navy-900 hover:bg-japanRed-600 shadow-md transition-all active:scale-95 group-hover:shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.mockTest.startBtn}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
