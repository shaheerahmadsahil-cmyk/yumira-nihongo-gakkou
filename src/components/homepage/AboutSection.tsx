"use client";

import React from "react";
import { Target, Compass, Award, CheckCircle2, Users, BookOpenCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="ABOUT OUR ACADEMY" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.about.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.about.intro}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-washi-50 border border-washi-200 relative group hover:border-japanRed-300 transition-all shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">
              {t.about.missionTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.missionDesc}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-washi-50 border border-washi-200 relative group hover:border-navy-400 transition-all shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">
              {t.about.visionTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.visionDesc}
            </p>
          </div>
        </div>

        {/* Why Learn With Us Grid */}
        <div className="bg-washi-100/60 rounded-3xl p-8 sm:p-12 border border-washi-200">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900">
              {t.about.whyUs}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.points.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-washi-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-lg bg-japanRed-50 text-japanRed-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-navy-900 mb-2">
                  {pt.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
