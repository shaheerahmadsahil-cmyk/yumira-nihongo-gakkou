"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  Filter,
  ToggleLeft,
  ToggleRight,
  Info,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useFurigana } from "@/lib/context/FuriganaContext";
import { FuriganaText, FuriganaParser } from "@/components/shared/FuriganaText";
import { playJapaneseSpeech } from "@/lib/audio";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export interface KanjiItem {
  id: string;
  character: string;
  jlptLevel: string; // N5, N4, N3
  strokeCount: number;
  onyomi: string;
  kunyomi: string;
  furigana: string;
  meaningEn: string;
  meaningBn: string;
  meaningJa: string;
  exampleWords: string; // JSON
  exampleSentences: string; // JSON
}

export function KanjiLibrary({ kanjiList }: { kanjiList: KanjiItem[] }) {
  const { locale } = useLanguage();
  const { mode, toggleMode, isExamMode } = useFurigana();

  const [levelFilter, setLevelFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const filteredKanji = useMemo(() => {
    return kanjiList.filter((k) => {
      const matchLevel = levelFilter === "ALL" || k.jlptLevel === levelFilter;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchLevel;

      return (
        matchLevel &&
        (k.character.includes(query) ||
          k.onyomi.toLowerCase().includes(query) ||
          k.kunyomi.toLowerCase().includes(query) ||
          k.furigana.toLowerCase().includes(query) ||
          k.meaningEn.toLowerCase().includes(query) ||
          k.meaningBn.includes(query))
      );
    });
  }, [kanjiList, levelFilter, searchQuery]);

  const handleAudio = async (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingAudio(text);
    await playJapaneseSpeech(text);
    setPlayingAudio(null);
  };

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="KANJI SYSTEM" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3.5 py-1 rounded-full border border-japanRed-100">
            JLPT N5 • N4 • N3 • 漢字
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            JLPT Kanji Learning Library
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Master Onyomi, Kunyomi, compound words, and sentence patterns. Switch freely between Learning Mode and Exam Mode.
          </p>
        </div>

        {/* Control Toolbar: Search, Level Filter & Live Furigana Switcher */}
        <div className="bg-washi-50 p-6 rounded-3xl border border-washi-200 shadow-sm mb-12 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search character, meaning, reading..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 transition-all"
              />
            </div>

            {/* Level Selector Pills */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0">
              {["ALL", "N5", "N4", "N3"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    levelFilter === lvl
                      ? "bg-navy-900 text-white shadow"
                      : "bg-white text-navy-900 border border-washi-200 hover:bg-washi-100"
                  }`}
                >
                  {lvl === "ALL" ? "All Levels" : `JLPT ${lvl}`}
                </button>
              ))}
            </div>

            {/* FURIGANA MODE TOGGLE: LEARNING VS EXAM */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-navy-900">
                  {isExamMode ? "Exam Mode" : "Learning Mode"}
                </span>
                <span className="block text-[11px] text-gray-500">
                  {isExamMode ? "Furigana Strictly Hidden" : "Furigana Displayed"}
                </span>
              </div>

              <button
                onClick={toggleMode}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  isExamMode
                    ? "bg-japanRed-600 text-white border-japanRed-700 shadow-md shadow-japanRed-600/25"
                    : "bg-emerald-600 text-white border-emerald-700 shadow-md"
                }`}
              >
                <span>{isExamMode ? "EXAM MODE (OFF)" : "LEARNING MODE (ON)"}</span>
                {isExamMode ? (
                  <ToggleLeft className="w-5 h-5 text-japanRed-200" />
                ) : (
                  <ToggleRight className="w-5 h-5 text-emerald-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mode explanation alert */}
          <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-washi-200/60">
            <Info className="w-4 h-4 text-japanRed-600 shrink-0" />
            <span>
              {isExamMode
                ? "Exam Mode active: All Furigana ruby elements are removed from Kanji, strictly matching real JLPT test conditions."
                : "Learning Mode active: Furigana ruby annotations appear directly above Kanji characters to aid memorization."}
            </span>
          </div>
        </div>

        {/* Kanji Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredKanji.map((item) => {
            let words = [];
            try {
              words = JSON.parse(item.exampleWords);
            } catch {}

            return (
              <div
                key={item.id}
                onClick={() => setSelectedKanji(item)}
                className="cursor-pointer group bg-washi-50 rounded-3xl p-6 border border-washi-200 hover:border-japanRed-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-900 text-white font-mono">
                      {item.jlptLevel}
                    </span>

                    <button
                      onClick={(e) => handleAudio(item.furigana || item.character, e)}
                      title="Pronounce Kanji reading"
                      className={`p-1.5 rounded-full transition-colors ${
                        playingAudio === (item.furigana || item.character)
                          ? "bg-japanRed-600 text-white"
                          : "text-gray-400 hover:text-japanRed-600 hover:bg-white"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Big Kanji Character with Furigana Display */}
                  <div className="text-center py-4 bg-white rounded-2xl border border-washi-200 shadow-sm mb-4 group-hover:border-japanRed-200 transition-colors">
                    <div className="font-japanese text-5xl sm:text-6xl font-bold text-navy-900 group-hover:text-japanRed-600 transition-colors">
                      <FuriganaText
                        kanji={item.character}
                        furigana={item.furigana}
                        className="inline-block"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-2">
                      {item.strokeCount} strokes
                    </span>
                  </div>

                  {/* Meanings */}
                  <div className="text-center space-y-1 mb-4">
                    <h4 className="text-sm font-bold text-navy-900">
                      {item.meaningBn}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.meaningEn}
                    </p>
                  </div>

                  {/* Readings */}
                  <div className="p-3 rounded-xl bg-white border border-washi-100 text-xs space-y-1">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400 text-[10px] font-semibold uppercase">
                        Onyomi:
                      </span>
                      <span className="font-japanese font-semibold text-japanRed-700">
                        {item.onyomi}
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400 text-[10px] font-semibold uppercase">
                        Kunyomi:
                      </span>
                      <span className="font-japanese font-semibold text-navy-900">
                        {item.kunyomi}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-washi-200/80 text-center">
                  <span className="text-xs font-semibold text-japanRed-600 group-hover:underline">
                    View Vocabulary & Sentences →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanji Detail Modal */}
        {selectedKanji && (
          <div
            className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedKanji(null)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-washi-200 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-washi-200">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-900 text-white font-mono">
                  JLPT {selectedKanji.jlptLevel}
                </span>
                <button
                  onClick={() => setSelectedKanji(null)}
                  className="text-gray-400 hover:text-navy-900 p-1 rounded-full text-xs font-bold"
                >
                  ✕ Close
                </button>
              </div>

              {/* Large Character & Audio */}
              <div className="text-center space-y-2">
                <div className="font-japanese text-7xl font-bold text-navy-900">
                  <FuriganaText
                    kanji={selectedKanji.character}
                    furigana={selectedKanji.furigana}
                  />
                </div>
                <button
                  onClick={() =>
                    handleAudio(selectedKanji.furigana || selectedKanji.character)
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-japanRed-600 bg-japanRed-50 rounded-full hover:bg-japanRed-100"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen Pronunciation
                </button>
              </div>

              {/* Meanings */}
              <div className="p-4 rounded-2xl bg-washi-50 text-center space-y-1">
                <div className="text-lg font-bold text-navy-900">
                  {selectedKanji.meaningBn}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {selectedKanji.meaningEn} ({selectedKanji.meaningJa})
                </div>
              </div>

              {/* Readings */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-washi-50 border border-washi-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    On-yomi (音読み)
                  </span>
                  <span className="font-japanese font-bold text-japanRed-700 text-sm">
                    {selectedKanji.onyomi}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-washi-50 border border-washi-200">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Kun-yomi (訓読み)
                  </span>
                  <span className="font-japanese font-bold text-navy-900 text-sm">
                    {selectedKanji.kunyomi}
                  </span>
                </div>
              </div>

              {/* Example Compounds */}
              {(() => {
                let words = [];
                try {
                  words = JSON.parse(selectedKanji.exampleWords);
                } catch {}

                if (!words || words.length === 0) return null;

                return (
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                      Example Vocabulary Words:
                    </h5>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {words.map((w: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-washi-50 border border-washi-100 text-xs"
                        >
                          <div>
                            <span className="font-japanese font-bold text-sm text-navy-900">
                              <FuriganaText kanji={w.word} furigana={w.furigana} />
                            </span>
                            <span className="text-gray-400 ml-2 font-mono">
                              ({w.romaji})
                            </span>
                          </div>
                          <span className="text-gray-600 text-right">
                            {w.meaningBn} / {w.meaningEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Example Sentences */}
              {(() => {
                let sentences = [];
                try {
                  sentences = JSON.parse(selectedKanji.exampleSentences);
                } catch {}

                if (!sentences || sentences.length === 0) return null;

                return (
                  <div className="space-y-2.5 pt-2 border-t border-washi-200">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                      Example Sentence:
                    </h5>
                    {sentences.map((s: any, sIdx: number) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-japanRed-50/50 border border-japanRed-100 text-xs space-y-1">
                        <div className="font-japanese font-semibold text-navy-900 text-sm">
                          <FuriganaParser content={s.sentence} />
                        </div>
                        <div className="text-gray-600">
                          {s.translationBn}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
