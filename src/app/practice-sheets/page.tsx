import React from "react";
import prisma from "@/lib/db";
import { PracticeSheetPDF } from "@/components/learning/PracticeSheetPDF";

export const metadata = {
  title: "Free Hiragana & Katakana Practice Sheet (PDF Printable) | Yumira Nihongo Gakkou",
  description: "Download official free Japanese Hiragana and Katakana writing practice sheets (PDF) with stroke order guide, pronunciation, and writing grids from Yumira Nihongo Gakkou.",
};

export default async function PracticeSheetsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialType = resolvedParams?.type === "katakana" ? "katakana" : "hiragana";

  let settings: Record<string, string> = {
    agency_name: "Yumira Nihongo Gakkou",
    agency_phone: "+880 1341-017323",
    agency_email: "admissions@yumira.com",
    agency_address: "Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213",
  };

  try {
    const dbSettings = await prisma.websiteSetting.findMany();
    if (dbSettings && dbSettings.length > 0) {
      settings = dbSettings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);
    }
  } catch {}

  return <PracticeSheetPDF initialType={initialType} settings={settings} />;
}
