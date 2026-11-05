"use client";

import React from "react";
import { Target, Compass, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="ABOUT OUR ACADEMY" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.about.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            {t.about.intro}
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-washi-50 border border-washi-200 relative group hover:border-japanRed-300 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 sm:mb-3">
              {t.about.missionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.about.missionDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-washi-50 border border-washi-200 relative group hover:border-navy-400 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 sm:mb-3">
              {t.about.visionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.about.visionDesc}
            </p>
          </motion.div>
        </div>

        {/* Why Learn With Us Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-washi-100/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-washi-200"
        >
          <div className="text-center mb-6 sm:mb-10">
            <h3 className="text-lg sm:text-2xl font-bold text-navy-900">
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
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {t.about.points.map((pt, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
                  },
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-washi-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-japanRed-50 text-japanRed-600 flex items-center justify-center mb-3 sm:mb-4">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-navy-900 mb-1.5 sm:mb-2">
                  {pt.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                  {pt.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
