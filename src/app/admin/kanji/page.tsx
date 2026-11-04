import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { Languages, Plus, Search, BookOpen } from "lucide-react";

export const metadata = {
  title: "Kanji Management | Admin",
};

export default async function AdminKanjiPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  let kanjiList: any[] = [];
  try {
    kanjiList = await prisma.kanji.findMany({
      orderBy: [{ jlptLevel: "desc" }, { order: "asc" }],
    });
  } catch (error) {
    console.warn("Could not fetch kanji list from DB:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            JLPT Kanji Database
          </h1>
          <p className="text-xs text-slate-500">
            Manage characters, readings, furigana, and Bengali/English meanings across N5, N4, and N3.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {kanjiList.map((k) => (
          <div
            key={k.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center"
          >
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-navy-900 text-white mb-2">
              JLPT {k.jlptLevel}
            </span>
            <span className="font-japanese text-4xl font-bold text-navy-900 my-1">
              {k.character}
            </span>
            <div className="text-xs font-semibold text-japanRed-600">
              {k.furigana}
            </div>
            <div className="text-[11px] text-slate-500 truncate w-full mt-1">
              {k.meaningBn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
