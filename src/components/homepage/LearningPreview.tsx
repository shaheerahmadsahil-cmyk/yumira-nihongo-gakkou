"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Volume2, BookOpen, Sparkles, ArrowRight, ToggleLeft, ToggleRight } from "lucide-react";
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
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="JAPANESE LEARNING HUB" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.learning.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.learning.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.learning.subtitle}
          </p>
        </div>

        {/* 3 Main Pillars Cards: Hiragana, Katakana, Kanji */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Hiragana Card */}
          <div className="bg-washi-50 rounded-3xl p-8 border border-washi-200 hover:border-japanRed-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center font-japanese text-2xl font-bold mb-6">
                あ
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">
                {t.learning.hiraganaCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                {t.learning.hiraganaCard.desc}
              </p>

              {/* Interactive Kana Grid Preview with Audio */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {sampleKana.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAudio(item.sound)}
                    title={`Click to listen: ${item.romaji}`}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      playingChar === item.sound
                        ? "bg-japanRed-600 text-white scale-105 border-japanRed-600"
                        : "bg-white text-navy-900 border-washi-200 hover:border-japanRed-400 hover:bg-japanRed-50"
                    }`}
                  >
                    <span className="font-japanese text-base font-bold">{item.kana}</span>
                    <span className="text-[10px] opacity-75">{item.romaji}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/hiragana"
              className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white border border-washi-200 text-xs font-semibold text-navy-900 hover:text-japanRed-600 hover:border-japanRed-300 transition-all"
            >
              <span>{t.learning.hiraganaCard.btn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Katakana Card */}
          <div className="bg-washi-50 rounded-3xl p-8 border border-washi-200 hover:border-japanRed-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center font-japanese text-2xl font-bold mb-6">
                ア
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">
                {t.learning.katakanaCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                {t.learning.katakanaCard.desc}
              </p>

              <div className="p-4 rounded-xl bg-white border border-washi-200 space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-washi-100">
                  <span className="font-japanese font-bold text-sm text-japanRed-600">コーヒー</span>
                  <span className="text-gray-500">koohii (Coffee)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-washi-100">
                  <span className="font-japanese font-bold text-sm text-japanRed-600">カメラ</span>
                  <span className="text-gray-500">kamera (Camera)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-japanese font-bold text-sm text-japanRed-600">ホテル</span>
                  <span className="text-gray-500">hoteru (Hotel)</span>
                </div>
              </div>
            </div>

            <Link
              href="/katakana"
              className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white border border-washi-200 text-xs font-semibold text-navy-900 hover:text-japanRed-600 hover:border-japanRed-300 transition-all"
            >
              <span>{t.learning.katakanaCard.btn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Kanji Card with Live Furigana Mode Switcher */}
          <div className="bg-washi-50 rounded-3xl p-8 border border-washi-200 hover:border-japanRed-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-japanRed-600 text-white flex items-center justify-center font-japanese text-2xl font-bold shadow-md">
                  漢
                </div>
                {/* Live Furigana Switcher */}
                <button
                  onClick={toggleMode}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                    isExamMode
                      ? "bg-japanRed-600 text-white border-japanRed-700"
                      : "bg-emerald-600 text-white border-emerald-700"
                  }`}
                >
                  <span>{isExamMode ? "Exam Mode" : "Learning Mode"}</span>
                  {isExamMode ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                </button>
              </div>

              <h3 className="text-xl font-bold text-navy-900 mb-2">
                {t.learning.kanjiCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {t.learning.kanjiCard.desc}
              </p>

              <div className="p-4 rounded-xl bg-white border border-washi-200 space-y-2.5 mb-6">
                {sampleKanji.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs pb-1.5 border-b border-washi-100 last:border-b-0">
                    <span className="font-japanese font-bold text-base">
                      <FuriganaText kanji={item.kanji} furigana={item.furigana} />
                    </span>
                    <span className="text-gray-500 font-sans">{item.meaningBn} ({item.meaningEn})</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/kanji"
              className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white border border-washi-200 text-xs font-semibold text-navy-900 hover:text-japanRed-600 hover:border-japanRed-300 transition-all"
            >
              <span>{t.learning.kanjiCard.btn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
