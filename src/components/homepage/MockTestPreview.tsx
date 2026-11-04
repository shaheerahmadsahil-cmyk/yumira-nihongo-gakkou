"use client";

import React from "react";
import Link from "next/link";
import { Timer, CheckCircle, Award, ShieldCheck, ArrowRight, Play } from "lucide-react";
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
    <section className="py-20 bg-washi-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="SIMULATED EXAMINATIONS" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.mockTest.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.mockTest.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.mockTest.subtitle}
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div
                key={test.id}
                className="bg-white rounded-3xl p-8 border border-washi-200 shadow-sm hover:shadow-xl hover:border-japanRed-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-900 text-white font-mono">
                      JLPT {test.jlptLevel}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-japanRed-600 font-semibold bg-japanRed-50 px-2.5 py-1 rounded-full">
                      <Timer className="w-3.5 h-3.5" />
                      {test.timeLimitMinutes} {t.mockTest.minutes}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-japanRed-600 transition-colors">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    {displayDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-washi-50 border border-washi-100 mb-6 text-xs text-gray-600">
                    <div>
                      <span className="block text-gray-400 text-[11px]">
                        {t.mockTest.totalMarks}
                      </span>
                      <strong className="text-navy-900 font-bold text-sm">
                        {test.totalMarks} pts
                      </strong>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[11px]">
                        {t.mockTest.passingScore}
                      </span>
                      <strong className="text-emerald-600 font-bold text-sm">
                        {test.passingScore} pts
                      </strong>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/mock-tests/${test.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-navy-900 hover:bg-japanRed-600 shadow transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.mockTest.startBtn}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
