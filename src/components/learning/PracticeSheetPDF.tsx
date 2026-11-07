"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, Download, ArrowLeft, Check, Sparkles, Globe, Phone, MapPin, BookOpen } from "lucide-react";

interface PracticeSheetPDFProps {
  initialType?: "hiragana" | "katakana";
  settings?: {
    agency_name?: string;
    agency_phone?: string;
    agency_email?: string;
    agency_address?: string;
    whatsapp_number?: string;
  };
}

// 46 Basic Characters Gojuon Chart
const HIRAGANA_GRID = [
  { row: "Vowels (স্বরধ্বনি)", chars: [
    { kana: "あ", romaji: "a", bn: "আ" },
    { kana: "い", romaji: "i", bn: "ই" },
    { kana: "う", romaji: "u", bn: "উ" },
    { kana: "え", romaji: "e", bn: "এ" },
    { kana: "お", romaji: "o", bn: "ও" },
  ]},
  { row: "K-Line (ক-ধ্বনি)", chars: [
    { kana: "か", romaji: "ka", bn: "কা" },
    { kana: "き", romaji: "ki", bn: "কি" },
    { kana: "く", romaji: "ku", bn: "কু" },
    { kana: "け", romaji: "ke", bn: "কে" },
    { kana: "こ", romaji: "ko", bn: "কো" },
  ]},
  { row: "S-Line (স/শ-ধ্বনি)", chars: [
    { kana: "さ", romaji: "sa", bn: "সা" },
    { kana: "し", romaji: "shi", bn: "শি" },
    { kana: "す", romaji: "su", bn: "সু" },
    { kana: "せ", romaji: "se", bn: "সে" },
    { kana: "そ", romaji: "so", bn: "সো" },
  ]},
  { row: "T-Line (ত/চ-ধ্বনি)", chars: [
    { kana: "た", romaji: "ta", bn: "তা" },
    { kana: "ち", romaji: "chi", bn: "চি" },
    { kana: "つ", romaji: "tsu", bn: "ৎসু" },
    { kana: "て", romaji: "te", bn: "তে" },
    { kana: "と", romaji: "to", bn: "তো" },
  ]},
  { row: "N-Line (ন-ধ্বনি)", chars: [
    { kana: "な", romaji: "na", bn: "না" },
    { kana: "に", romaji: "ni", bn: "নি" },
    { kana: "ぬ", romaji: "nu", bn: "নু" },
    { kana: "ね", romaji: "ne", bn: "নে" },
    { kana: "の", romaji: "no", bn: "নো" },
  ]},
  { row: "H-Line (হ/ফ-ধ্বনি)", chars: [
    { kana: "は", romaji: "ha", bn: "হা" },
    { kana: "ひ", romaji: "hi", bn: "হি" },
    { kana: "ふ", romaji: "fu", bn: "ফু" },
    { kana: "へ", romaji: "he", bn: "হে" },
    { kana: "ほ", romaji: "ho", bn: "হো" },
  ]},
  { row: "M-Line (ম-ধ্বনি)", chars: [
    { kana: "ま", romaji: "ma", bn: "মা" },
    { kana: "み", romaji: "mi", bn: "মি" },
    { kana: "む", romaji: "mu", bn: "মু" },
    { kana: "め", romaji: "me", bn: "মে" },
    { kana: "も", romaji: "mo", bn: "মো" },
  ]},
  { row: "Y-Line (য-ধ্বনি)", chars: [
    { kana: "や", romaji: "ya", bn: "য়া" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ゆ", romaji: "yu", bn: "য়ু" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "よ", romaji: "yo", bn: "য়ো" },
  ]},
  { row: "R-Line (র-ধ্বনি)", chars: [
    { kana: "ら", romaji: "ra", bn: "রা" },
    { kana: "り", romaji: "ri", bn: "রি" },
    { kana: "る", romaji: "ru", bn: "রু" },
    { kana: "れ", romaji: "re", bn: "রে" },
    { kana: "ろ", romaji: "ro", bn: "রো" },
  ]},
  { row: "W/N-Line (ওয়/অনুস্বার)", chars: [
    { kana: "わ", romaji: "wa", bn: "ওয়া" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "を", romaji: "wo", bn: "ও (পার্টিকেল)" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ん", romaji: "n", bn: "ন্ / ং" },
  ]},
];

const KATAKANA_GRID = [
  { row: "Vowels (স্বরধ্বনি)", chars: [
    { kana: "ア", romaji: "a", bn: "আ" },
    { kana: "イ", romaji: "i", bn: "ই" },
    { kana: "ウ", romaji: "u", bn: "উ" },
    { kana: "エ", romaji: "e", bn: "এ" },
    { kana: "オ", romaji: "o", bn: "ও" },
  ]},
  { row: "K-Line (ক-ধ্বনি)", chars: [
    { kana: "カ", romaji: "ka", bn: "কা" },
    { kana: "キ", romaji: "ki", bn: "কি" },
    { kana: "ク", romaji: "ku", bn: "কু" },
    { kana: "ケ", romaji: "ke", bn: "কে" },
    { kana: "コ", romaji: "ko", bn: "কো" },
  ]},
  { row: "S-Line (স/শ-ধ্বনি)", chars: [
    { kana: "サ", romaji: "sa", bn: "সা" },
    { kana: "シ", romaji: "shi", bn: "শি" },
    { kana: "ス", romaji: "su", bn: "সু" },
    { kana: "セ", romaji: "se", bn: "সে" },
    { kana: "ソ", romaji: "so", bn: "সো" },
  ]},
  { row: "T-Line (ত/চ-ধ্বনি)", chars: [
    { kana: "タ", romaji: "ta", bn: "তা" },
    { kana: "チ", romaji: "chi", bn: "চি" },
    { kana: "ツ", romaji: "tsu", bn: "ৎসু" },
    { kana: "テ", romaji: "te", bn: "তে" },
    { kana: "ト", romaji: "to", bn: "তো" },
  ]},
  { row: "N-Line (ন-ধ্বনি)", chars: [
    { kana: "ナ", romaji: "na", bn: "না" },
    { kana: "ニ", romaji: "ni", bn: "নি" },
    { kana: "ヌ", romaji: "nu", bn: "নু" },
    { kana: "ネ", romaji: "ne", bn: "নে" },
    { kana: "ノ", romaji: "no", bn: "নো" },
  ]},
  { row: "H-Line (হ/ফ-ধ্বনি)", chars: [
    { kana: "ハ", romaji: "ha", bn: "হা" },
    { kana: "ヒ", romaji: "hi", bn: "হি" },
    { kana: "フ", romaji: "fu", bn: "ফু" },
    { kana: "ヘ", romaji: "he", bn: "হে" },
    { kana: "ホ", romaji: "ho", bn: "হো" },
  ]},
  { row: "M-Line (ম-ধ্বনি)", chars: [
    { kana: "マ", romaji: "ma", bn: "মা" },
    { kana: "ミ", romaji: "mi", bn: "মি" },
    { kana: "ム", romaji: "mu", bn: "মু" },
    { kana: "メ", romaji: "me", bn: "মে" },
    { kana: "モ", romaji: "mo", bn: "মো" },
  ]},
  { row: "Y-Line (য-ধ্বনি)", chars: [
    { kana: "ヤ", romaji: "ya", bn: "য়া" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ユ", romaji: "yu", bn: "য়ু" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ヨ", romaji: "yo", bn: "য়ো" },
  ]},
  { row: "R-Line (র-ধ্বনি)", chars: [
    { kana: "ラ", romaji: "ra", bn: "রা" },
    { kana: "リ", romaji: "ri", bn: "রি" },
    { kana: "ル", romaji: "ru", bn: "রু" },
    { kana: "レ", romaji: "re", bn: "রে" },
    { kana: "ロ", romaji: "ro", bn: "রো" },
  ]},
  { row: "W/N-Line (ওয়/অনুস্বার)", chars: [
    { kana: "ワ", romaji: "wa", bn: "ওয়া" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ヲ", romaji: "wo", bn: "ও" },
    { kana: "", romaji: "-", bn: "" },
    { kana: "ン", romaji: "n", bn: "ন্ / ং" },
  ]},
];

// Dakuten & Handakuten (ভ্যারিয়েশন)
const HIRAGANA_DAKUTEN = [
  { line: "G-Line (গ)", chars: [
    { kana: "が", romaji: "ga", bn: "গা" },
    { kana: "ぎ", romaji: "gi", bn: "গি" },
    { kana: "ぐ", romaji: "gu", bn: "গু" },
    { kana: "げ", romaji: "ge", bn: "গে" },
    { kana: "ご", romaji: "go", bn: "গো" },
  ]},
  { line: "Z-Line (জ)", chars: [
    { kana: "ざ", romaji: "za", bn: "জা" },
    { kana: "じ", romaji: "ji", bn: "জি" },
    { kana: "ず", romaji: "zu", bn: "জু" },
    { kana: "ぜ", romaji: "ze", bn: "জে" },
    { kana: "ぞ", romaji: "zo", bn: "জো" },
  ]},
  { line: "D-Line (দ/জ)", chars: [
    { kana: "だ", romaji: "da", bn: "দা" },
    { kana: "ぢ", romaji: "ji", bn: "জি" },
    { kana: "づ", romaji: "zu", bn: "জু" },
    { kana: "で", romaji: "de", bn: "দে" },
    { kana: "ど", romaji: "do", bn: "দো" },
  ]},
  { line: "B-Line (ব)", chars: [
    { kana: "ば", romaji: "ba", bn: "বা" },
    { kana: "び", romaji: "bi", bn: "বি" },
    { kana: "ぶ", romaji: "bu", bn: "বু" },
    { kana: "べ", romaji: "be", bn: "বে" },
    { kana: "ぼ", romaji: "bo", bn: "বো" },
  ]},
  { line: "P-Line (প - Handakuten)", chars: [
    { kana: "ぱ", romaji: "pa", bn: "পা" },
    { kana: "ぴ", romaji: "pi", bn: "পি" },
    { kana: "ぷ", romaji: "pu", bn: "পু" },
    { kana: "ぺ", romaji: "pe", bn: "পে" },
    { kana: "ぽ", romaji: "po", bn: "পো" },
  ]},
];

const KATAKANA_DAKUTEN = [
  { line: "G-Line (গ)", chars: [
    { kana: "ガ", romaji: "ga", bn: "গা" },
    { kana: "ギ", romaji: "gi", bn: "গি" },
    { kana: "グ", romaji: "gu", bn: "গু" },
    { kana: "ゲ", romaji: "ge", bn: "গে" },
    { kana: "ゴ", romaji: "go", bn: "গো" },
  ]},
  { line: "Z-Line (জ)", chars: [
    { kana: "ザ", romaji: "za", bn: "জা" },
    { kana: "ジ", romaji: "ji", bn: "জি" },
    { kana: "ズ", romaji: "zu", bn: "জু" },
    { kana: "ゼ", romaji: "ze", bn: "জে" },
    { kana: "ゾ", romaji: "zo", bn: "জো" },
  ]},
  { line: "D-Line (দ/জ)", chars: [
    { kana: "ダ", romaji: "da", bn: "দা" },
    { kana: "ヂ", romaji: "ji", bn: "জি" },
    { kana: "ヅ", romaji: "zu", bn: "জু" },
    { kana: "デ", romaji: "de", bn: "দে" },
    { kana: "ド", romaji: "do", bn: "দো" },
  ]},
  { line: "B-Line (ব)", chars: [
    { kana: "バ", romaji: "ba", bn: "বা" },
    { kana: "ビ", romaji: "bi", bn: "বি" },
    { kana: "ブ", romaji: "bu", bn: "বু" },
    { kana: "ベ", romaji: "be", bn: "বে" },
    { kana: "ボ", romaji: "bo", bn: "বো" },
  ]},
  { line: "P-Line (প - Handakuten)", chars: [
    { kana: "パ", romaji: "pa", bn: "পা" },
    { kana: "ピ", romaji: "pi", bn: "পি" },
    { kana: "プ", romaji: "pu", bn: "পু" },
    { kana: "ペ", romaji: "pe", bn: "পে" },
    { kana: "ポ", romaji: "po", bn: "পো" },
  ]},
];

export function PracticeSheetPDF({ initialType = "hiragana", settings }: PracticeSheetPDFProps) {
  const [sheetType, setSheetType] = useState<"hiragana" | "katakana">(initialType);

  const agencyName = settings?.agency_name || "Yumira Nihongo Gakkou";
  const agencyPhone = settings?.agency_phone || "+880 1341-017323";
  const agencyAddress = settings?.agency_address || "Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213";
  const siteUrl = "https://yumiranihongogakkou.vercel.app";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isHiragana = sheetType === "hiragana";
  const gridData = isHiragana ? HIRAGANA_GRID : KATAKANA_GRID;
  const dakutenData = isHiragana ? HIRAGANA_DAKUTEN : KATAKANA_DAKUTEN;

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 text-navy-900 print:p-0 print:m-0 print:bg-white print:min-h-0">
      {/* ============================================================== */}
      {/* 1. TOP SCREEN TOOLBAR (AUTOMATICALLY HIDDEN DURING PRINT/PDF)    */}
      {/* ============================================================== */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={isHiragana ? "/hiragana" : "/katakana"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ফিরে যান</span>
            </Link>

            {/* Type Switcher */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setSheetType("hiragana")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  isHiragana
                    ? "bg-japanRed-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                হিরাগানা শিট (Hiragana)
              </button>
              <button
                onClick={() => setSheetType("katakana")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  !isHiragana
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                কাতাকানা শিট (Katakana)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-japanRed-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Printer className="w-4 h-4" />
              <span>PDF ডাউনলোড / প্রিন্ট করুন</span>
            </button>
          </div>
        </div>

        {/* Helpful Tip for Saving as PDF */}
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>💡 PDF হিসেবে সেভ করার সহজ নিয়ম:</strong> উপরের <strong>"PDF ডাউনলোড / প্রিন্ট করুন"</strong> বাটনে ক্লিক করলে আপনার ব্রাউজারের প্রিন্ট উইন্ডো খুলবে। সেখানে <em>Destination</em> ড্রপডাউন থেকে <strong>"Save as PDF"</strong> বা <strong>"পিডিএফ হিসেবে সংরক্ষণ"</strong> নির্বাচন করে <em>Save</em> চাপুন। পুরো শিটটি অফিশিয়াল লোগো, নাম, সাইট ও নাম্বারসহ আপনার ফোনে বা কম্পিউটারে সেভ হয়ে যাবে।
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. THE OFFICIAL PRACTICE SHEET (A4 PRINT & PDF READY)          */}
      {/* ============================================================== */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none border border-slate-300 print:border-none rounded-none sm:rounded-2xl print:rounded-none overflow-hidden p-6 sm:p-10 print:p-4 print:max-w-none">
        
        {/* ============================================================ */}
        {/* A. HEADER: INSTITUTION NAME, LOGO, SITE ADDRESS & NUMBER     */}
        {/* ============================================================ */}
        <div className="border-b-2 border-japanRed-600 pb-4 mb-4 relative">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo & Names */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-amber-300 bg-white shadow-sm shrink-0">
                <Image
                  src="/images/yumira-logo.jpg"
                  alt="Yumira Nihongo Gakkou"
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight leading-tight">
                    {agencyName}
                  </h1>
                  <span className="font-japanese text-sm sm:text-base font-bold text-japanRed-600">
                    ユミラ日本語学校
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-700 font-semibold tracking-wide uppercase">
                  জাপানিজ ল্যাঙ্গুয়েজ একাডেমি • স্বপ্ন ও ভবিষ্যৎ (Dream • Grow • Achieve)
                </p>
                <div className="text-[10px] text-gray-500 font-medium">
                  JLPT N5, N4, N3, JFT-Basic & জাপান স্টুডেন্ট/SSW ভিসা কনসালটেন্সি
                </div>
              </div>
            </div>

            {/* Right: Site Address, Phone & Hanko Seal */}
            <div className="flex items-center gap-3 text-right">
              <div className="space-y-1 text-[10px] sm:text-[11px] text-gray-700">
                <div className="flex items-center justify-end gap-1 font-semibold text-japanRed-700">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{siteUrl}</span>
                </div>
                <div className="flex items-center justify-end gap-1 font-bold text-navy-900">
                  <Phone className="w-3.5 h-3.5 text-japanRed-600" />
                  <span>হেল্পলাইন: {agencyPhone}</span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[9px] sm:text-[10px] text-gray-500">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate max-w-[210px]">{agencyAddress}</span>
                </div>
              </div>

              {/* Japanese Official Red Hanko Stamp */}
              <div className="w-12 h-12 rounded-xl border-2 border-japanRed-600 bg-japanRed-50 flex flex-col items-center justify-center font-japanese text-[10px] font-bold text-japanRed-700 rotate-3 shrink-0 shadow-xs">
                <span>ユミラ</span>
                <span>認定</span>
              </div>
            </div>
          </div>

          {/* Sub-header Banner */}
          <div className="mt-3 py-1.5 px-3 bg-japanRed-50 border border-japanRed-200 rounded-lg flex items-center justify-between text-xs">
            <span className="font-bold text-japanRed-700 uppercase tracking-wide">
              {isHiragana
                ? "★ অফিশিয়াল জাপানিজ হিরাগানা (ひらがな) চার্ট ও প্র্যাকটিস শিট"
                : "★ অফিশিয়াল জাপানিজ কাতাকানা (カタカナ) চার্ট ও প্র্যাকটিস শিট"}
            </span>
            <span className="text-[10px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
              ফ্রি স্টুডেন্ট এডুকেশন সংস্করণ • Free Printable PDF
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* B. SECTION 1: 46 BASIC CHARACTERS (GOJUON TABLE)             */}
        {/* ============================================================ */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-bold text-navy-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-japanRed-600" />
              <span>১. মূল ৪৬টি বর্ণমালার পূর্ণ ছক (Gojuon - ৫০ ধ্বনি)</span>
            </h2>
            <span className="text-[10px] text-gray-500">
              উচ্চারণ ও রোমাজি সহ মুখস্থ ও পড়ার গাইড
            </span>
          </div>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-center">
            {/* Table Header Columns (A, I, U, E, O) */}
            <div className="grid grid-cols-6 bg-navy-900 text-white text-[11px] font-bold py-1.5 border-b border-navy-800">
              <div>লাইন (Line)</div>
              <div>- a (আ)</div>
              <div>- i (ই)</div>
              <div>- u (উ)</div>
              <div>- e (এ)</div>
              <div>- o (ও)</div>
            </div>

            {/* Grid Rows */}
            {gridData.map((rowItem, rIdx) => (
              <div
                key={rIdx}
                className={`grid grid-cols-6 text-xs border-b border-slate-200 last:border-b-0 items-center ${
                  rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                }`}
              >
                {/* Row Label */}
                <div className="py-1 px-1 font-semibold text-[10px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-2">
                  {rowItem.row}
                </div>

                {/* 5 Character Cells */}
                {rowItem.chars.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="py-1.5 px-1 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[46px]"
                  >
                    {c.kana ? (
                      <>
                        <span className="font-japanese text-xl sm:text-2xl font-bold text-navy-900 leading-none">
                          {c.kana}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-gray-600 font-medium">
                          <span className="font-mono font-bold text-japanRed-600">{c.romaji}</span>
                          <span className="text-gray-400">({c.bn})</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* C. SECTION 2: GENKOUYOUSHI PRACTICE GRID (WRITING BOXES)     */}
        {/* ============================================================ */}
        <div className="mb-6 print:break-inside-avoid">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-bold text-navy-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-japanRed-600" />
              <span>২. বর্ণ লেখার প্র্যাকটিস গ্রিড (Handwriting & Stroke Practice Grid)</span>
            </h2>
            <span className="text-[10px] text-gray-500">
              প্রিন্ট করে পেনসিল দিয়ে প্রতিটি ঘরে লিখে অনুশীলন করুন
            </span>
          </div>

          <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50/50">
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 text-center">
              {[
                { label: "あ / ア", sub: "Vowels" },
                { label: "か / カ", sub: "K-Line" },
                { label: "さ / サ", sub: "S-Line" },
                { label: "た / タ", sub: "T-Line" },
                { label: "な / ナ", sub: "N-Line" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-300 rounded p-1.5 flex flex-col items-center">
                  <div className="text-[11px] font-bold text-navy-900 mb-1">{item.label}</div>
                  {/* Practice writing boxes with dotted center crosshair */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map((box) => (
                      <div
                        key={box}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-dashed border-slate-400 rounded-sm relative flex items-center justify-center bg-white"
                      >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-[0.5px] bg-slate-200" />
                          <div className="h-full w-[0.5px] bg-slate-200 absolute" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 text-center mt-2">
              {[
                { label: "は / ハ", sub: "H-Line" },
                { label: "ま / マ", sub: "M-Line" },
                { label: "や / ヤ", sub: "Y-Line" },
                { label: "ら / ラ", sub: "R-Line" },
                { label: "わ / ワ", sub: "W/N-Line" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-300 rounded p-1.5 flex flex-col items-center">
                  <div className="text-[11px] font-bold text-navy-900 mb-1">{item.label}</div>
                  {/* Practice writing boxes with dotted center crosshair */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map((box) => (
                      <div
                        key={box}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-dashed border-slate-400 rounded-sm relative flex items-center justify-center bg-white"
                      >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-[0.5px] bg-slate-200" />
                          <div className="h-full w-[0.5px] bg-slate-200 absolute" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* D. SECTION 3: DAKUTEN & HANDAKUTEN (VARIATION CHART)         */}
        {/* ============================================================ */}
        <div className="mb-6 print:break-inside-avoid">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs sm:text-sm font-bold text-navy-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>৩. দাকুতেন ও হান্দাকুতেন ভ্যারিয়েশন (Dakuten & Handakuten)</span>
            </h2>
            <span className="text-[10px] text-gray-500">
              তেনতেন ( ゛ ) ও মারু ( ゜ ) যোগে গঠিত নতুন ধ্বনি
            </span>
          </div>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
            <div className="grid grid-cols-6 bg-slate-800 text-white text-[10px] font-bold py-1">
              <div>লাইন</div>
              <div>- a</div>
              <div>- i</div>
              <div>- u</div>
              <div>- e</div>
              <div>- o</div>
            </div>

            {dakutenData.map((dRow, dIdx) => (
              <div
                key={dIdx}
                className={`grid grid-cols-6 border-b border-slate-200 last:border-b-0 items-center ${
                  dIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                }`}
              >
                <div className="py-1 px-1 font-semibold text-[10px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-2">
                  {dRow.line}
                </div>
                {dRow.chars.map((dc, dcIdx) => (
                  <div
                    key={dcIdx}
                    className="py-1 px-1 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center"
                  >
                    <span className="font-japanese text-lg font-bold text-navy-900 leading-none">
                      {dc.kana}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">
                      {dc.romaji} ({dc.bn})
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* E. FOOTER: OFFICIAL INSTITUTION CONTACT & SCHOLARSHIP NOTE   */}
        {/* ============================================================ */}
        <div className="pt-3 border-t-2 border-japanRed-600 text-center text-[10px] sm:text-[11px] text-gray-600 space-y-1">
          <div className="font-bold text-navy-900 flex flex-wrap items-center justify-center gap-2">
            <span>{agencyName} (ইউমিরা নিহোঙ্গো গাক্কো)</span>
            <span>•</span>
            <span className="text-japanRed-600">ভর্তি ও ক্যারিয়ার হটলাইন: {agencyPhone}</span>
            <span>•</span>
            <span className="text-slate-700">ওয়েবসাইট: {siteUrl}</span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-500">
            © {new Date().getFullYear()} {agencyName}. সর্বস্বত্ব সংরক্ষিত। শিক্ষার্থীদের পড়ার সুবিধার্থে বিনামূল্যে সরবরাহকৃত।
          </p>
        </div>

      </div>
    </div>
  );
}
