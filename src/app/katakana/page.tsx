import React from "react";
import prisma from "@/lib/db";
import { KatakanaCenter } from "@/components/learning/KatakanaCenter";

export const metadata = {
  title: "Katakana Learning Center | Rakib Sensei Academy",
  description: "Learn all 46 basic Katakana, Dakuten, and loanword vocabulary with native Japanese pronunciation and interactive quizzes.",
};

export default async function KatakanaPage() {
  const characters = await prisma.character.findMany({
    where: { type: "katakana" },
    orderBy: { order: "asc" },
  });

  return <KatakanaCenter characters={characters} />;
}
