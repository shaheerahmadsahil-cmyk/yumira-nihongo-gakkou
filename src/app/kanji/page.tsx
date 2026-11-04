import React from "react";
import prisma from "@/lib/db";
import { KanjiLibrary, KanjiItem } from "@/components/learning/KanjiLibrary";

export const metadata = {
  title: "JLPT Kanji Library (N5, N4, N3) | Yumira Nihongo Gakkou",
  description: "Comprehensive JLPT Kanji database with Onyomi, Kunyomi, meanings, example words, and Furigana Learning Mode vs Exam Mode switcher.",
};

const defaultKanjiList: KanjiItem[] = [
  {
    id: "kanji-1",
    character: "日",
    onyomi: "ニチ, ジツ",
    kunyomi: "ひ, -び, -か",
    furigana: "ひ",
    meaningEn: "Day, Sun, Japan",
    meaningBn: "দিন, সূর্য, জাপান",
    meaningJa: "日、太陽",
    jlptLevel: "N5",
    strokeCount: 4,
    exampleWords: JSON.stringify([
      { word: "日曜日", reading: "にちようび", meaning: "Sunday / রবিবার" },
      { word: "日本", reading: "にほん", meaning: "Japan / জাপান" },
      { word: "毎日", reading: "まいにち", meaning: "Every day / প্রতিদিন" },
    ]),
    exampleSentences: JSON.stringify([
      { japanese: "今日はいい日です。", reading: "きょうはいいひです。", bangla: "আজ একটি সুন্দর দিন।", english: "Today is a good day." },
    ]),
  },
  {
    id: "kanji-2",
    character: "本",
    onyomi: "ホン",
    kunyomi: "もと",
    furigana: "ほん",
    meaningEn: "Book, Origin, Real",
    meaningBn: "বই, মূল, প্রধান",
    meaningJa: "本、基本",
    jlptLevel: "N5",
    strokeCount: 5,
    exampleWords: JSON.stringify([
      { word: "本", reading: "ほん", meaning: "Book / বই" },
      { word: "日本語", reading: "にほんご", meaning: "Japanese language / জাপানি ভাষা" },
    ]),
    exampleSentences: JSON.stringify([
      { japanese: "この本は面白いです。", reading: "このほんはおもしろいです。", bangla: "এই বইটি আকর্ষণীয়।", english: "This book is interesting." },
    ]),
  },
  {
    id: "kanji-3",
    character: "人",
    onyomi: "ジン, ニン",
    kunyomi: "ひと",
    furigana: "ひと",
    meaningEn: "Person, Human",
    meaningBn: "মানুষ, ব্যক্তি",
    meaningJa: "人、人間",
    jlptLevel: "N5",
    strokeCount: 2,
    exampleWords: JSON.stringify([
      { word: "日本人", reading: "にほんじん", meaning: "Japanese person / জাপানি ব্যক্তি" },
      { word: "あの人", reading: "あのひと", meaning: "That person / ঐ ব্যক্তি" },
    ]),
    exampleSentences: JSON.stringify([
      { japanese: "あの人は先生です。", reading: "あのひとはせんせいです。", bangla: "ঐ ব্যক্তি একজন শিক্ষক।", english: "That person is a teacher." },
    ]),
  },
  {
    id: "kanji-4",
    character: "学",
    onyomi: "ガク",
    kunyomi: "まな・ぶ",
    furigana: "まなぶ",
    meaningEn: "Study, Learn, Science",
    meaningBn: "শেখা, পড়াশোনা, বিদ্যা",
    meaningJa: "学ぶ、学問",
    jlptLevel: "N5",
    strokeCount: 8,
    exampleWords: JSON.stringify([
      { word: "学生", reading: "がくせい", meaning: "Student / ছাত্র" },
      { word: "学校", reading: "がっこう", meaning: "School / বিদ্যালয়" },
      { word: "大学", reading: "だいがく", meaning: "University / বিশ্ববিদ্যালয়" },
    ]),
    exampleSentences: JSON.stringify([
      { japanese: "私は日本語を学びます。", reading: "わたしはにほんごをまなびます。", bangla: "আমি জাপানি ভাষা শিখি।", english: "I study Japanese." },
    ]),
  },
  {
    id: "kanji-5",
    character: "校",
    onyomi: "コウ",
    kunyomi: "",
    furigana: "こう",
    meaningEn: "School, Exam",
    meaningBn: "স্কুল, বিদ্যালয়",
    meaningJa: "学校",
    jlptLevel: "N5",
    strokeCount: 10,
    exampleWords: JSON.stringify([
      { word: "学校", reading: "がっこう", meaning: "School / বিদ্যালয়" },
      { word: "高校", reading: "こうこう", meaning: "High School / উচ্চ বিদ্যালয়" },
    ]),
    exampleSentences: JSON.stringify([
      { japanese: "明日学校へ行きます。", reading: "あした がっこうへ いきます。", bangla: "আগামীকাল স্কুলে যাব।", english: "I will go to school tomorrow." },
    ]),
  },
];

export default async function KanjiPage() {
  let kanjiList: KanjiItem[] = defaultKanjiList;

  try {
    const dbKanji = await prisma.kanji.findMany({
      orderBy: [{ jlptLevel: "desc" }, { order: "asc" }],
    });
    if (dbKanji.length > 0) {
      kanjiList = dbKanji as KanjiItem[];
    }
  } catch (error) {
    console.warn("Using fallback kanji data:", error);
  }

  return <KanjiLibrary kanjiList={kanjiList} />;
}
