import React from "react";
import prisma from "@/lib/db";
import { KatakanaCenter } from "@/components/learning/KatakanaCenter";
import { fallbackKatakana } from "@/lib/kana-data";

export const metadata = {
  title: "Katakana Learning Center | Yumira Nihongo Gakkou",
  description: "Learn all 46 basic Katakana, Dakuten, and loanword vocabulary with native Japanese pronunciation and interactive quizzes.",
};

export default async function KatakanaPage() {
  let characters: any[] = [];
  try {
    characters = await prisma.character.findMany({ where: { type: "katakana" }, orderBy: { order: "asc" } });
  } catch {}

  if (!characters || characters.length === 0) {
    characters = fallbackKatakana;
  }

  return <KatakanaCenter characters={characters} />;
}
