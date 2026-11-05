import React from "react";
import prisma from "@/lib/db";
import { HiraganaCenter } from "@/components/learning/HiraganaCenter";
import { fallbackHiragana } from "@/lib/kana-data";

export const metadata = {
  title: "Hiragana Learning Center | Yumira Nihongo Gakkou",
  description: "Learn all 46 basic Hiragana, Dakuten, and Handakuten with native Japanese audio pronunciation and interactive practice quizzes.",
};

export default async function HiraganaPage() {
  let characters: any[] = [];
  try {
    characters = await prisma.character.findMany({ where: { type: "hiragana" }, orderBy: { order: "asc" } });
  } catch {}

  if (!characters || characters.length === 0) {
    characters = fallbackHiragana;
  }

  return <HiraganaCenter characters={characters} />;
}
