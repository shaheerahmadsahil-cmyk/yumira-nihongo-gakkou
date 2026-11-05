"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ToggleLeft, ToggleRight, Sparkles, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useFurigana } from "@/lib/context/FuriganaContext";
import { FuriganaText } from "@/components/shared/FuriganaText";
import { playJapaneseSpeech } from "@/lib/audio";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export function LearningPreview() {
  const { t } = useLanguage();
  const { isExamMode, toggleMode } = useFurigana();
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  const sampleKana = [
    { kana: "あ", romaji: "a", bn: "আ", sound: "あ" },
    { kana: "か", romaji: "ka", bn: "কা", sound: "か" },
    { kana: "さ", romaji: "sa", bn: "সা", sound: "さ" },
    { kana: "た", romaji: "ta", bn: "তা", sound: "た" },
    { kana: "な", romaji: "na", bn: "না", sound: "な" },
  ];

  const sampleKanji = [
    { kanji: "学校", furigana: "がっこう", romaji: "gakkou", meaningBn: "স্কুল", meaningEn: "School" },
    { kanji: "先生", furigana: "せんせい", romaji: "sensei", meaningBn: "শিক্ষক", meaningEn: "Teacher" },
    { kanji: "日本語", furigana: "にほんご", romaji: "nihongo", meaningBn: "জাপানি ভাষা", meaningEn: "Japanese language" },
    { kanji: "友達", furigana: "ともだち", romaji: "tomodachi", meaningBn: "বন্ধু", meaningEn: "Friend" },
  ];

  const handleAudio = async (text: string) => {
    setPlayingChar(text);
    await playJapaneseSpeech(text);
    setPlayingChar(null);
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white via-rose-50/20 to-washi-50 relative overflow-hidden">
      {/* Decorative Subtle Japanese Kana Watermark & Ambient Radial Glow */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-japanRed-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-navy-900/10 rounded-full blur-3xl"
        />
        <span className="absolute top-14 right-8 lg:right-20 font-japanese text-8xl sm:text-9xl font-bold text-navy-900/[0.035]">
          あいう
        </span>
        <span className="absolute bottom-14 left-8 lg:left-20 font-japanese text-8xl sm:text-9xl font-bold text-japanRed-600/[0.035]">
          漢字
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ToriiDivider title="JAPANESE LEARNING HUB" />

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
              {t.learning.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {t.learning.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.learning.subtitle}
          </p>
        </motion.div>

        {/* 3 Main Pillars Cards: Hiragana, Katakana, Kanji */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16"
        >
          {/* Hiragana Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-washi-200/90 hover:border-japanRed-300 transition-all flex flex-col justify-between group shadow-md hover:shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-japanRed-500 to-rose-400 group-hover:h-2 transition-all" />

            {/* Hanko Stamp: 平仮 (Hiragana) */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-japanRed-500/40 bg-japanRed-50/70 flex flex-col items-center justify-center font-japanese text-[10px] font-bold text-japanRed-700 rotate-6 group-hover:rotate-0 transition-transform shadow-xs">
              <span>平</span>
              <span>仮</span>
            </div>

            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center font-japanese text-xl sm:text-2xl font-bold mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-sm">
                あ
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-1.5 sm:mb-2 group-hover:text-japanRed-600 transition-colors">
                {t.learning.hiraganaCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6 pr-6">
                {t.learning.hiraganaCard.desc}
              </p>

              {/* Interactive Kana Grid Preview with Audio */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {sampleKana.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAudio(item.sound)}
                    title={`Click to listen: ${item.romaji}`}
                    className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border flex flex-col items-center justify-center transition-all ${
                      playingChar === item.sound
                        ? "bg-japanRed-600 text-white scale-105 border-japanRed-600 shadow-md animate-pulse"
                        : "bg-washi-50 text-navy-900 border-washi-200 hover:border-japanRed-400 hover:bg-japanRed-50 hover:shadow-sm"
                    }`}
                  >
                    <span className="font-japanese text-sm sm:text-base font-bold">{item.kana}</span>
                    <span className="text-[9px] sm:text-[10px] opacity-75">{item.romaji}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <Link
              href="/hiragana"
              className="inline-flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-washi-50 border border-washi-200 text-xs font-semibold text-navy-900 hover:text-white hover:bg-japanRed-600 hover:border-japanRed-600 transition-all group-hover:shadow-sm"
            >
              <span>{t.learning.hiraganaCard.btn}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Katakana Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-washi-200/90 hover:border-navy-400 transition-all flex flex-col justify-between group shadow-md hover:shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 to-japanRed-500 group-hover:h-2 transition-all" />

            {/* Hanko Stamp: 片仮 (Katakana) */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-navy-500/40 bg-navy-50/70 flex flex-col items-center justify-center font-japanese text-[10px] font-bold text-navy-900 -rotate-6 group-hover:rotate-0 transition-transform shadow-xs">
              <span>片</span>
              <span>仮</span>
            </div>

            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-japanese text-xl sm:text-2xl font-bold mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-sm">
                ア
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-1.5 sm:mb-2 group-hover:text-navy-700 transition-colors">
                {t.learning.katakanaCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6 pr-6">
                {t.learning.katakanaCard.desc}
              </p>

              <div className="p-3 sm:p-4 rounded-xl bg-washi-50 border border-washi-200 space-y-2 mb-4 sm:mb-6 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-washi-100">
                  <span className="font-japanese font-bold text-xs sm:text-sm text-japanRed-600">コーヒー</span>
                  <span className="text-gray-500 text-[11px] sm:text-xs">koohii (Coffee)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-washi-100">
                  <span className="font-japanese font-bold text-xs sm:text-sm text-japanRed-600">カメラ</span>
                  <span className="text-gray-500 text-[11px] sm:text-xs">kamera (Camera)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-japanese font-bold text-xs sm:text-sm text-japanRed-600">ホテル</span>
                  <span className="text-gray-500 text-[11px] sm:text-xs">hoteru (Hotel)</span>
                </div>
              </div>
            </div>

            <Link
              href="/katakana"
              className="inline-flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-washi-50 border border-washi-200 text-xs font-semibold text-navy-900 hover:text-white hover:bg-navy-900 hover:border-navy-900 transition-all group-hover:shadow-sm"
            >
              <span>{t.learning.katakanaCard.btn}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Kanji Card with Live Furigana Mode Switcher */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-washi-200/90 hover:border-amber-300 transition-all flex flex-col justify-between group shadow-md hover:shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-japanRed-500 to-amber-600 group-hover:h-2 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-japanRed-600 text-white flex items-center justify-center font-japanese text-xl sm:text-2xl font-bold shadow-md group-hover:scale-110 transition-transform">
                  漢
                </div>
                {/* Live Furigana Switcher */}
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={toggleMode}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border transition-colors shadow-sm ${
                    isExamMode
                      ? "bg-japanRed-600 text-white border-japanRed-700"
                      : "bg-emerald-600 text-white border-emerald-700"
                  }`}
                >
                  <span>{isExamMode ? "Exam Mode" : "Learning Mode"}</span>
                  {isExamMode ? <ToggleLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ToggleRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </motion.button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-1.5 sm:mb-2 group-hover:text-amber-600 transition-colors">
                {t.learning.kanjiCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                {t.learning.kanjiCard.desc}
              </p>

              <div className="p-3 sm:p-4 rounded-xl bg-washi-50 border border-washi-200 space-y-2 mb-4 sm:mb-6">
                {sampleKanji.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs pb-1.5 border-b border-washi-100 last:border-b-0">
                    <span className="font-japanese font-bold text-sm sm:text-base">
                      <FuriganaText kanji={item.kanji} furigana={item.furigana} />
                    </span>
                    <span className="text-gray-500 font-sans text-[11px] sm:text-xs">{item.meaningBn} ({item.meaningEn})</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/kanji"
              className="inline-flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-washi-50 border border-washi-200 text-xs font-semibold text-navy-900 hover:text-white hover:bg-amber-600 hover:border-amber-600 transition-all group-hover:shadow-sm"
            >
              <span>{t.learning.kanjiCard.btn}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
