"use client";

import React, { useState } from "react";
import { Volume2, Sparkles, BookOpen, CheckCircle, RefreshCw, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { playJapaneseSpeech } from "@/lib/audio";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export interface KanaCharacter {
  id: string;
  kana: string;
  romaji: string;
  category: string; // basic, dakuten, handakuten, yoon
  meaningBn?: string | null;
  meaningEn?: string | null;
  exampleWord?: string | null;
  exampleWordKana?: string | null;
  exampleMeaningBn?: string | null;
  exampleMeaningEn?: string | null;
  audioUrl?: string | null;
}

export function HiraganaCenter({ characters }: { characters: KanaCharacter[] }) {
  const { locale } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<"basic" | "dakuten" | "practice">("basic");
  const [activeModalChar, setActiveModalChar] = useState<KanaCharacter | null>(null);
  const [playingKana, setPlayingKana] = useState<string | null>(null);

  // Practice state
  const [practiceQuestion, setPracticeQuestion] = useState<{
    target: KanaCharacter;
    options: string[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [practiceScore, setPracticeScore] = useState(0);

  const basicChars = characters.filter((c) => c.category === "basic");
  const dakutenChars = characters.filter((c) => c.category === "dakuten" || c.category === "handakuten");

  const handleAudio = async (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingKana(text);
    await playJapaneseSpeech(text);
    setPlayingKana(null);
  };

  // Practice generator
  const startNewQuestion = () => {
    if (basicChars.length === 0) return;
    const randomTarget = basicChars[Math.floor(Math.random() * basicChars.length)];
    const otherChars = basicChars.filter((c) => c.kana !== randomTarget.kana);
    const shuffledOthers = [...otherChars].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [randomTarget.romaji, ...shuffledOthers.map((c) => c.romaji)].sort(
      () => 0.5 - Math.random()
    );

    setPracticeQuestion({
      target: randomTarget,
      options,
    });
    setSelectedAnswer(null);
  };

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="HIRAGANA CENTER" />

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3.5 py-1 rounded-full border border-japanRed-100">
            Writing System • ひらがな
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Complete Hiragana Learning Center
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Master the foundation of Japanese. Click any character to hear native audio pronunciation, view example vocabulary, and practice romaji recognition.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedTab("basic")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedTab === "basic"
                ? "bg-japanRed-600 text-white shadow-md shadow-japanRed-600/30"
                : "bg-washi-100 text-navy-900 hover:bg-washi-200"
            }`}
          >
            Basic Hiragana (46 Characters)
          </button>

          <button
            onClick={() => setSelectedTab("dakuten")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedTab === "dakuten"
                ? "bg-japanRed-600 text-white shadow-md shadow-japanRed-600/30"
                : "bg-washi-100 text-navy-900 hover:bg-washi-200"
            }`}
          >
            Dakuten & Handakuten
          </button>

          <button
            onClick={() => {
              setSelectedTab("practice");
              if (!practiceQuestion) startNewQuestion();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedTab === "practice"
                ? "bg-navy-900 text-white shadow-md"
                : "bg-washi-100 text-navy-900 hover:bg-washi-200"
            }`}
          >
            Interactive Quiz Mode
          </button>
        </div>

        {/* Basic & Dakuten Character Grids */}
        {(selectedTab === "basic" || selectedTab === "dakuten") && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {(selectedTab === "basic" ? basicChars : dakutenChars).map((char) => (
              <div
                key={char.id}
                onClick={() => setActiveModalChar(char)}
                className="cursor-pointer group relative bg-washi-50 rounded-2xl p-4 border border-washi-200 hover:border-japanRed-400 hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-between min-h-[140px]"
              >
                {/* Audio Button */}
                <button
                  onClick={(e) => handleAudio(char.kana, e)}
                  title="Listen to Japanese pronunciation"
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors ${
                    playingKana === char.kana
                      ? "bg-japanRed-600 text-white"
                      : "text-gray-400 hover:text-japanRed-600 hover:bg-white"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Kana Glyph */}
                <div className="my-auto text-center pt-2">
                  <span className="font-japanese text-4xl sm:text-5xl font-bold text-navy-900 group-hover:text-japanRed-600 transition-colors">
                    {char.kana}
                  </span>
                  <div className="text-xs font-mono font-bold text-gray-500 mt-1">
                    {char.romaji}
                  </div>
                </div>

                {/* Example Word Pill */}
                {char.exampleWord && (
                  <div className="w-full text-center pt-2 border-t border-washi-200/80 text-[11px] text-gray-600 line-clamp-1">
                    {char.exampleWord}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Practice Mode */}
        {selectedTab === "practice" && practiceQuestion && (
          <div className="max-w-xl mx-auto bg-washi-50 rounded-3xl p-8 sm:p-12 border border-washi-200 shadow-lg text-center space-y-8">
            <div className="flex items-center justify-between text-xs text-gray-500 border-b border-washi-200 pb-3">
              <span>Score: <strong className="text-navy-900 font-bold">{practiceScore} pts</strong></span>
              <button
                onClick={startNewQuestion}
                className="flex items-center gap-1 text-japanRed-600 font-semibold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Skip / Next
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Select the correct Romaji reading:
              </span>
              <div className="w-32 h-32 mx-auto rounded-3xl bg-white border-2 border-japanRed-200 shadow-md flex items-center justify-center font-japanese text-6xl font-extrabold text-navy-900">
                {practiceQuestion.target.kana}
              </div>
              <button
                onClick={() => handleAudio(practiceQuestion.target.kana)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-japanRed-600 bg-japanRed-50 rounded-full hover:bg-japanRed-100"
              >
                <Volume2 className="w-3.5 h-3.5" /> Play Pronunciation
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {practiceQuestion.options.map((opt, oIdx) => {
                const isCorrect = opt === practiceQuestion.target.romaji;
                const isSelected = selectedAnswer === opt;

                let btnStyle = "bg-white text-navy-900 border-washi-300 hover:border-japanRed-400";
                if (selectedAnswer) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-red-600 text-white border-red-600";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={!!selectedAnswer}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      if (isCorrect) {
                        setPracticeScore((prev) => prev + 10);
                        setTimeout(startNewQuestion, 1200);
                      }
                    }}
                    className={`py-3.5 px-6 rounded-xl font-mono text-base font-bold border transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <div className="pt-2">
                {selectedAnswer === practiceQuestion.target.romaji ? (
                  <span className="text-xs font-bold text-emerald-600">
                    Correct! Next character loading...
                  </span>
                ) : (
                  <button
                    onClick={startNewQuestion}
                    className="text-xs font-bold text-japanRed-600 underline"
                  >
                    Incorrect. Try next character →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Detail Modal for Selected Kana */}
        {activeModalChar && (
          <div
            className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveModalChar(null)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-sm w-full border border-washi-200 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-24 h-24 mx-auto rounded-3xl bg-japanRed-50 border border-japanRed-100 flex items-center justify-center font-japanese text-6xl font-bold text-japanRed-600">
                {activeModalChar.kana}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-navy-900 font-mono">
                  {activeModalChar.romaji}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {activeModalChar.meaningBn || activeModalChar.meaningEn}
                </p>
              </div>

              {activeModalChar.exampleWord && (
                <div className="p-4 rounded-xl bg-washi-50 text-xs space-y-1 text-left">
                  <div className="text-gray-400 font-semibold uppercase text-[10px]">
                    Example Word:
                  </div>
                  <div className="font-bold text-navy-900 text-sm font-japanese">
                    {activeModalChar.exampleWord}
                  </div>
                  <div className="text-gray-600">
                    {activeModalChar.exampleMeaningBn} / {activeModalChar.exampleMeaningEn}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAudio(activeModalChar.kana)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-japanRed-600 text-white font-bold text-xs shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce</span>
                </button>
                <button
                  onClick={() => setActiveModalChar(null)}
                  className="px-5 py-3 rounded-xl bg-washi-100 text-navy-900 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
