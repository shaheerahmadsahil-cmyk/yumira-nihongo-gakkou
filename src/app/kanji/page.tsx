import React from "react";
import prisma from "@/lib/db";
import { KanjiLibrary } from "@/components/learning/KanjiLibrary";

export const metadata = {
  title: "JLPT Kanji Library (N5, N4, N3) | Rakib Sensei Academy",
  description: "Comprehensive JLPT Kanji database with Onyomi, Kunyomi, meanings, example words, and Furigana Learning Mode vs Exam Mode switcher.",
};

export default async function KanjiPage() {
  const kanjiList = await prisma.kanji.findMany({
    orderBy: [{ jlptLevel: "desc" }, { order: "asc" }],
  });

  return <KanjiLibrary kanjiList={kanjiList} />;
}
