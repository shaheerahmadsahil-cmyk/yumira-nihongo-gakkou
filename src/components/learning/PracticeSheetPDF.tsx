"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, ArrowLeft, Globe, Phone, MapPin, BookOpen, Check, Sparkles } from "lucide-react";

interface PracticeSheetPDFProps {
  settings?: {
    agency_name?: string;
    agency_phone?: string;
    agency_email?: string;
    agency_address?: string;
    whatsapp_number?: string;
  };
}

// 46 Basic Hiragana
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

// 46 Basic Katakana
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

// Hiragana Dakuten & Handakuten
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
  { line: "P-Line (প)", chars: [
    { kana: "ぱ", romaji: "pa", bn: "পা" },
    { kana: "ぴ", romaji: "pi", bn: "পি" },
    { kana: "ぷ", romaji: "pu", bn: "পু" },
    { kana: "ぺ", romaji: "pe", bn: "পে" },
    { kana: "ぽ", romaji: "po", bn: "পো" },
  ]},
];

// Katakana Dakuten & Handakuten
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
  { line: "P-Line (প)", chars: [
    { kana: "パ", romaji: "pa", bn: "পা" },
    { kana: "ピ", romaji: "pi", bn: "পি" },
    { kana: "プ", romaji: "pu", bn: "পু" },
    { kana: "ペ", romaji: "pe", bn: "পে" },
    { kana: "ポ", romaji: "po", bn: "পো" },
  ]},
];

// Hiragana Yoon (যুক্তবর্ণ - Contracted Sounds)
const HIRAGANA_YOON = [
  { group: "K", chars: [{ kana: "きゃ", romaji: "kya", bn: "ক্যা" }, { kana: "きゅ", romaji: "kyu", bn: "কিউ" }, { kana: "きょ", romaji: "kyo", bn: "কিয়ো" }] },
  { group: "S", chars: [{ kana: "しゃ", romaji: "sha", bn: "শা" }, { kana: "しゅ", romaji: "shu", bn: "শু" }, { kana: "しょ", romaji: "sho", bn: "শো" }] },
  { group: "T", chars: [{ kana: "ちゃ", romaji: "cha", bn: "চা" }, { kana: "ちゅ", romaji: "chu", bn: "চু" }, { kana: "ちょ", romaji: "cho", bn: "চো" }] },
  { group: "N", chars: [{ kana: "にゃ", romaji: "nya", bn: "নিয়া" }, { kana: "にゅ", romaji: "nyu", bn: "নিউ" }, { kana: "にょ", romaji: "nyo", bn: "নিয়ো" }] },
  { group: "H", chars: [{ kana: "ひゃ", romaji: "hya", bn: "হিয়া" }, { kana: "ひゅ", romaji: "hyu", bn: "হিউ" }, { kana: "ひょ", romaji: "hyo", bn: "হিয়ো" }] },
  { group: "M", chars: [{ kana: "みゃ", romaji: "mya", bn: "মিয়া" }, { kana: "みゅ", romaji: "myu", bn: "মিউ" }, { kana: "みょ", romaji: "myo", bn: "মিয়ো" }] },
  { group: "R", chars: [{ kana: "りゃ", romaji: "rya", bn: "রিয়া" }, { kana: "りゅ", romaji: "ryu", bn: "রিউ" }, { kana: "りょ", romaji: "ryo", bn: "রিয়ো" }] },
  { group: "G", chars: [{ kana: "ぎゃ", romaji: "gya", bn: "গিয়া" }, { kana: "ぎゅ", romaji: "gyu", bn: "গিউ" }, { kana: "ぎょ", romaji: "gyo", bn: "গিয়ো" }] },
  { group: "J", chars: [{ kana: "じゃ", romaji: "ja", bn: "জা" }, { kana: "じゅ", romaji: "ju", bn: "জু" }, { kana: "じょ", romaji: "jo", bn: "জো" }] },
  { group: "B", chars: [{ kana: "びゃ", romaji: "bya", bn: "বিয়া" }, { kana: "びゅ", romaji: "byu", bn: "বিউ" }, { kana: "びょ", romaji: "byo", bn: "বিয়ো" }] },
  { group: "P", chars: [{ kana: "ぴゃ", romaji: "pya", bn: "পিয়া" }, { kana: "ぴゅ", romaji: "pyu", bn: "পিউ" }, { kana: "ぴょ", romaji: "pyo", bn: "পিয়ো" }] },
];

// Katakana Yoon (যুক্তবর্ণ - Contracted Sounds)
const KATAKANA_YOON = [
  { group: "K", chars: [{ kana: "キャ", romaji: "kya", bn: "ক্যা" }, { kana: "キュ", romaji: "kyu", bn: "কিউ" }, { kana: "キョ", romaji: "kyo", bn: "কিয়ো" }] },
  { group: "S", chars: [{ kana: "シャ", romaji: "sha", bn: "শা" }, { kana: "シュ", romaji: "shu", bn: "শু" }, { kana: "ショ", romaji: "sho", bn: "শো" }] },
  { group: "T", chars: [{ kana: "チャ", romaji: "cha", bn: "চা" }, { kana: "チュ", romaji: "chu", bn: "চু" }, { kana: "チョ", romaji: "cho", bn: "চো" }] },
  { group: "N", chars: [{ kana: "ニャ", romaji: "nya", bn: "নিয়া" }, { kana: "ニュ", romaji: "nyu", bn: "নিউ" }, { kana: "ニョ", romaji: "nyo", bn: "নিয়ো" }] },
  { group: "H", chars: [{ kana: "ヒャ", romaji: "hya", bn: "হিয়া" }, { kana: "ヒュ", romaji: "hyu", bn: "হিউ" }, { kana: "ヒョ", romaji: "hyo", bn: "হিয়ো" }] },
  { group: "M", chars: [{ kana: "ミャ", romaji: "mya", bn: "মিয়া" }, { kana: "ミュ", romaji: "myu", bn: "মিউ" }, { kana: "ミョ", romaji: "myo", bn: "মিয়ো" }] },
  { group: "R", chars: [{ kana: "リャ", romaji: "rya", bn: "রিয়া" }, { kana: "リュ", romaji: "ryu", bn: "রিউ" }, { kana: "リョ", romaji: "ryo", bn: "রিয়ো" }] },
  { group: "G", chars: [{ kana: "ギャ", romaji: "gya", bn: "গিয়া" }, { kana: "ギュ", romaji: "gyu", bn: "গিউ" }, { kana: "ギョ", romaji: "gyo", bn: "গিয়ো" }] },
  { group: "J", chars: [{ kana: "ジャ", romaji: "ja", bn: "জা" }, { kana: "ジュ", romaji: "ju", bn: "জু" }, { kana: "ジョ", romaji: "jo", bn: "জো" }] },
  { group: "B", chars: [{ kana: "ビャ", romaji: "bya", bn: "বিয়া" }, { kana: "ビュ", romaji: "byu", bn: "বিউ" }, { kana: "ビョ", romaji: "byo", bn: "বিয়ো" }] },
  { group: "P", chars: [{ kana: "ピャ", romaji: "pya", bn: "পিয়া" }, { kana: "ピュ", romaji: "pyu", bn: "পিউ" }, { kana: "ピョ", romaji: "pyo", bn: "পিয়ো" }] },
];

export function PracticeSheetPDF({ settings }: PracticeSheetPDFProps) {
  const agencyName = settings?.agency_name || "Yumira Nihongo Gakkou";
  const agencyPhone = settings?.agency_phone || "+880 1341-017323";
  const agencyAddress = settings?.agency_address || "Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213";
  const siteUrl = "https://yumiranihongogakkou.vercel.app";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-8 text-navy-900 print:p-0 print:m-0 print:bg-white print:min-h-0">
      {/* ============================================================== */}
      {/* 1. TOP TOOLBAR (AUTOMATICALLY HIDDEN DURING PRINT / PDF)       */}
      {/* ============================================================== */}
      <div className="max-w-4xl mx-auto px-4 mb-5 print:hidden">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/hiragana"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>লার্নিং সেন্টারে ফিরুন</span>
            </Link>

            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
              ১টি পিডিএফ-এ সম্পূর্ণ চার্ট: <strong>পৃষ্ঠা ১ (হিরাগানা + যুক্তবর্ণ)</strong> • <strong>পৃষ্ঠা ২ (কাতাকানা + যুক্তবর্ণ)</strong>
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-japanRed-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>PDF ডাউনলোড / প্রিন্ট করুন (২ পৃষ্ঠা একসাথে)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. THE COMPLETE TWO-PAGE PDF DOCUMENT                          */}
      {/* ============================================================== */}
      <div className="max-w-[210mm] mx-auto space-y-8 print:space-y-0 print:max-w-none">
        
        {/* ============================================================ */}
        {/* PAGE 1: HIRAGANA (ひらがな)                                   */}
        {/* ============================================================ */}
        <div className="pdf-sheet-page bg-white shadow-xl print:shadow-none p-4 sm:p-6 print:p-3 rounded-xl print:rounded-none relative border-4 border-japanRed-600 outline outline-2 outline-amber-500 outline-offset-[-5px] print:break-after-page" style={{ pageBreakAfter: "always", breakAfter: "page" }}>
          
          {/* Header */}
          <div className="border-b-2 border-japanRed-600 pb-2.5 mb-2.5">
            <div className="flex items-center justify-between gap-3">
              {/* Left: Logo & Names */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 border-amber-400 bg-white shadow-sm shrink-0">
                  <Image
                    src="/images/yumira-logo.jpg"
                    alt="Yumira Nihongo Gakkou"
                    fill
                    sizes="52px"
                    className="object-cover object-center"
                    priority
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h1 className="text-lg sm:text-xl font-black text-navy-900 tracking-tight leading-tight">
                      {agencyName}
                    </h1>
                    <span className="font-japanese text-xs sm:text-sm font-bold text-japanRed-600">
                      ユミラ日本語学校
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-semibold tracking-wide uppercase">
                    জাপানিজ ল্যাঙ্গুয়েজ একাডেমি • স্বপ্ন ও ভবিষ্যৎ (Dream • Grow • Achieve)
                  </p>
                  <div className="text-[9px] text-gray-500 font-medium">
                    JLPT N5, N4, N3, JFT-Basic & জাপান স্টুডেন্ট/SSW ভিসা কনসালটেন্সি
                  </div>
                </div>
              </div>

              {/* Right: Site, Phone & Hanko Stamp */}
              <div className="flex items-center gap-2.5 text-right">
                <div className="space-y-0.5 text-[9px] sm:text-[10px] text-gray-700">
                  <div className="flex items-center justify-end gap-1 font-semibold text-japanRed-700">
                    <Globe className="w-3 h-3" />
                    <span>{siteUrl}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 font-bold text-navy-900">
                    <Phone className="w-3 h-3 text-japanRed-600" />
                    <span>হেল্পলাইন: {agencyPhone}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[8px] sm:text-[9px] text-gray-500">
                    <MapPin className="w-2.5 h-2.5 text-gray-400" />
                    <span className="truncate max-w-[190px]">{agencyAddress}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-lg border-2 border-japanRed-600 bg-japanRed-50 flex flex-col items-center justify-center font-japanese text-[9px] font-bold text-japanRed-700 rotate-2 shrink-0">
                  <span>ユミラ</span>
                  <span>認定</span>
                </div>
              </div>
            </div>

            {/* Page Title Bar */}
            <div className="mt-2 py-1 px-3 bg-japanRed-50 border border-japanRed-200 rounded-md flex items-center justify-between text-[11px]">
              <span className="font-bold text-japanRed-700 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>পৃষ্ঠা ১: জাপানিজ হিরাগানা (ひらがな) — মূল বর্ণমালা, পরিবর্তিত ধ্বনি ও যুক্তবর্ণ চার্ট</span>
              </span>
              <span className="text-[9px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                Page 1 of 2 • Hiragana
              </span>
            </div>
          </div>

          {/* Section 1: 46 Basic Characters Gojuon Table */}
          <div className="mb-2.5">
            <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
              <span className="w-1.5 h-3 bg-japanRed-600 rounded-sm" />
              <span>১. মূল ৪৬টি মৌলিক বর্ণমালা (Gojuon - ৫০ ধ্বনি)</span>
            </div>

            <div className="border border-slate-300 rounded-lg overflow-hidden text-center">
              <div className="grid grid-cols-6 bg-navy-900 text-white text-[9px] font-bold py-0.5 border-b border-navy-800">
                <div>লাইন</div>
                <div>- a (আ)</div>
                <div>- i (ই)</div>
                <div>- u (উ)</div>
                <div>- e (এ)</div>
                <div>- o (ও)</div>
              </div>

              {HIRAGANA_GRID.map((rowItem, rIdx) => (
                <div
                  key={rIdx}
                  className={`grid grid-cols-6 text-xs border-b border-slate-200 last:border-b-0 items-center ${
                    rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                  }`}
                >
                  <div className="py-0.5 px-1 font-semibold text-[8px] sm:text-[9px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-1.5">
                    {rowItem.row}
                  </div>

                  {rowItem.chars.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[32px] sm:min-h-[34px]"
                    >
                      {c.kana ? (
                        <>
                          <span className="font-japanese text-lg sm:text-xl font-bold text-navy-900 leading-none">
                            {c.kana}
                          </span>
                          <div className="flex items-center gap-0.5 mt-0.5 text-[8px] text-gray-600 font-medium">
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

          {/* Section 2 & 3: SIDE-BY-SIDE DAKUTEN + YOON (যুক্তবর্ণ) */}
          <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-2 mb-2">
            
            {/* Left: Dakuten & Handakuten (5 cols on grid) */}
            <div className="md:col-span-5 print:col-span-5">
              <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>২. দাকুতেন ও হান্দাকুতেন</span>
              </div>

              <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
                <div className="grid grid-cols-6 bg-slate-800 text-white text-[8px] font-bold py-0.5">
                  <div>লাইন</div>
                  <div>- a</div>
                  <div>- i</div>
                  <div>- u</div>
                  <div>- e</div>
                  <div>- o</div>
                </div>

                {HIRAGANA_DAKUTEN.map((dRow, dIdx) => (
                  <div
                    key={dIdx}
                    className={`grid grid-cols-6 border-b border-slate-200 last:border-b-0 items-center ${
                      dIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                    }`}
                  >
                    <div className="py-0.5 px-0.5 font-semibold text-[8px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-1">
                      {dRow.line}
                    </div>
                    {dRow.chars.map((dc, dcIdx) => (
                      <div
                        key={dcIdx}
                        className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[29px]"
                      >
                        <span className="font-japanese text-sm font-bold text-navy-900 leading-none">
                          {dc.kana}
                        </span>
                        <span className="text-[7px] text-gray-500 font-mono">
                          {dc.romaji} ({dc.bn})
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Yoon (যুক্তবর্ণ - Contracted Sounds) (7 cols on grid) */}
            <div className="md:col-span-7 print:col-span-7">
              <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>৩. জাপানিজ যুক্তবর্ণ (Yoon - 拗音)</span>
              </div>

              <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
                <div className="grid grid-cols-4 bg-amber-700 text-white text-[8px] font-bold py-0.5">
                  <div>গ্রুপ</div>
                  <div>- ya (য়া)</div>
                  <div>- yu (য়ু)</div>
                  <div>- yo (য়ো)</div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-200 bg-white">
                  {/* Sub-column 1 (K, S, T, N, H, M) */}
                  <div>
                    {HIRAGANA_YOON.slice(0, 6).map((yItem, yIdx) => (
                      <div
                        key={yIdx}
                        className={`grid grid-cols-4 border-b border-slate-200 last:border-b-0 items-center ${
                          yIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        }`}
                      >
                        <div className="py-0.5 px-1 font-bold text-[8px] text-amber-800 bg-amber-50 border-r border-slate-200 text-center">
                          {yItem.group}
                        </div>
                        {yItem.chars.map((yc, ycIdx) => (
                          <div
                            key={ycIdx}
                            className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[23px]"
                          >
                            <span className="font-japanese text-xs font-bold text-navy-900 leading-none">
                              {yc.kana}
                            </span>
                            <span className="text-[7px] text-gray-500 font-mono">
                              {yc.romaji} ({yc.bn})
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Sub-column 2 (R, G, J, B, P) */}
                  <div>
                    {HIRAGANA_YOON.slice(6).map((yItem, yIdx) => (
                      <div
                        key={yIdx}
                        className={`grid grid-cols-4 border-b border-slate-200 last:border-b-0 items-center ${
                          yIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        }`}
                      >
                        <div className="py-0.5 px-1 font-bold text-[8px] text-amber-800 bg-amber-50 border-r border-slate-200 text-center">
                          {yItem.group}
                        </div>
                        {yItem.chars.map((yc, ycIdx) => (
                          <div
                            key={ycIdx}
                            className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[23px]"
                          >
                            <span className="font-japanese text-xs font-bold text-navy-900 leading-none">
                              {yc.kana}
                            </span>
                            <span className="text-[7px] text-gray-500 font-mono">
                              {yc.romaji} ({yc.bn})
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Page 1 Footer */}
          <div className="pt-1.5 border-t-2 border-japanRed-600 text-center text-[9px] text-gray-600 space-y-0.5">
            <div className="font-bold text-navy-900 flex flex-wrap items-center justify-center gap-2">
              <span>{agencyName} (ইউমিরা নিহোঙ্গো গাক্কো)</span>
              <span>•</span>
              <span className="text-japanRed-600">ভর্তি ও ক্যারিয়ার হটলাইন: {agencyPhone}</span>
              <span>•</span>
              <span className="text-slate-700">ওয়েবসাইট: {siteUrl}</span>
            </div>
            <p className="text-[8px] text-gray-500">
              © {new Date().getFullYear()} {agencyName}. সর্বস্বত্ব সংরক্ষিত। শিক্ষার্থীদের পড়ার সুবিধার্থে বিনামূল্যে সরবরাহকৃত।
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PAGE 2: KATAKANA (カタカナ)                                   */}
        {/* ============================================================ */}
        <div className="pdf-sheet-page bg-white shadow-xl print:shadow-none p-4 sm:p-6 print:p-3 rounded-xl print:rounded-none relative border-4 border-japanRed-600 outline outline-2 outline-amber-500 outline-offset-[-5px] print:break-before-page" style={{ pageBreakBefore: "always", breakBefore: "page" }}>
          
          {/* Header */}
          <div className="border-b-2 border-japanRed-600 pb-2.5 mb-2.5">
            <div className="flex items-center justify-between gap-3">
              {/* Left: Logo & Names */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 border-amber-400 bg-white shadow-sm shrink-0">
                  <Image
                    src="/images/yumira-logo.jpg"
                    alt="Yumira Nihongo Gakkou"
                    fill
                    sizes="52px"
                    className="object-cover object-center"
                    priority
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h1 className="text-lg sm:text-xl font-black text-navy-900 tracking-tight leading-tight">
                      {agencyName}
                    </h1>
                    <span className="font-japanese text-xs sm:text-sm font-bold text-japanRed-600">
                      ユミラ日本語学校
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-semibold tracking-wide uppercase">
                    জাপানিজ ল্যাঙ্গুয়েজ একাডেমি • স্বপ্ন ও ভবিষ্যৎ (Dream • Grow • Achieve)
                  </p>
                  <div className="text-[9px] text-gray-500 font-medium">
                    JLPT N5, N4, N3, JFT-Basic & জাপান স্টুডেন্ট/SSW ভিসা কনসালটেন্সি
                  </div>
                </div>
              </div>

              {/* Right: Site, Phone & Hanko Stamp */}
              <div className="flex items-center gap-2.5 text-right">
                <div className="space-y-0.5 text-[9px] sm:text-[10px] text-gray-700">
                  <div className="flex items-center justify-end gap-1 font-semibold text-japanRed-700">
                    <Globe className="w-3 h-3" />
                    <span>{siteUrl}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 font-bold text-navy-900">
                    <Phone className="w-3 h-3 text-japanRed-600" />
                    <span>হেল্পলাইন: {agencyPhone}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[8px] sm:text-[9px] text-gray-500">
                    <MapPin className="w-2.5 h-2.5 text-gray-400" />
                    <span className="truncate max-w-[190px]">{agencyAddress}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-lg border-2 border-japanRed-600 bg-japanRed-50 flex flex-col items-center justify-center font-japanese text-[9px] font-bold text-japanRed-700 rotate-2 shrink-0">
                  <span>ユミラ</span>
                  <span>認定</span>
                </div>
              </div>
            </div>

            {/* Page Title Bar */}
            <div className="mt-2 py-1 px-3 bg-navy-50 border border-navy-200 rounded-md flex items-center justify-between text-[11px]">
              <span className="font-bold text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-japanRed-600" />
                <span>পৃষ্ঠা ২: জাপানিজ কাতাকানা (カタカナ) — মূল বর্ণমালা, পরিবর্তিত ধ্বনি ও যুক্তবর্ণ চার্ট</span>
              </span>
              <span className="text-[9px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                Page 2 of 2 • Katakana
              </span>
            </div>
          </div>

          {/* Section 1: 46 Basic Katakana Gojuon Table */}
          <div className="mb-2.5">
            <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
              <span className="w-1.5 h-3 bg-navy-900 rounded-sm" />
              <span>১. মূল ৪৬টি মৌলিক বর্ণমালা (Gojuon - ৫০ ধ্বনি)</span>
            </div>

            <div className="border border-slate-300 rounded-lg overflow-hidden text-center">
              <div className="grid grid-cols-6 bg-navy-900 text-white text-[9px] font-bold py-0.5 border-b border-navy-800">
                <div>লাইন</div>
                <div>- a (আ)</div>
                <div>- i (ই)</div>
                <div>- u (উ)</div>
                <div>- e (এ)</div>
                <div>- o (ও)</div>
              </div>

              {KATAKANA_GRID.map((rowItem, rIdx) => (
                <div
                  key={rIdx}
                  className={`grid grid-cols-6 text-xs border-b border-slate-200 last:border-b-0 items-center ${
                    rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                  }`}
                >
                  <div className="py-0.5 px-1 font-semibold text-[8px] sm:text-[9px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-1.5">
                    {rowItem.row}
                  </div>

                  {rowItem.chars.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[32px] sm:min-h-[34px]"
                    >
                      {c.kana ? (
                        <>
                          <span className="font-japanese text-lg sm:text-xl font-bold text-navy-900 leading-none">
                            {c.kana}
                          </span>
                          <div className="flex items-center gap-0.5 mt-0.5 text-[8px] text-gray-600 font-medium">
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

          {/* Section 2 & 3: SIDE-BY-SIDE DAKUTEN + YOON (যুক্তবর্ণ) */}
          <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-2 mb-2">
            
            {/* Left: Dakuten & Handakuten (5 cols on grid) */}
            <div className="md:col-span-5 print:col-span-5">
              <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>২. দাকুতেন ও হান্দাকুতেন</span>
              </div>

              <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
                <div className="grid grid-cols-6 bg-slate-800 text-white text-[8px] font-bold py-0.5">
                  <div>লাইন</div>
                  <div>- a</div>
                  <div>- i</div>
                  <div>- u</div>
                  <div>- e</div>
                  <div>- o</div>
                </div>

                {KATAKANA_DAKUTEN.map((dRow, dIdx) => (
                  <div
                    key={dIdx}
                    className={`grid grid-cols-6 border-b border-slate-200 last:border-b-0 items-center ${
                      dIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                    }`}
                  >
                    <div className="py-0.5 px-0.5 font-semibold text-[8px] text-slate-700 bg-slate-100 border-r border-slate-200 text-left pl-1">
                      {dRow.line}
                    </div>
                    {dRow.chars.map((dc, dcIdx) => (
                      <div
                        key={dcIdx}
                        className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[29px]"
                      >
                        <span className="font-japanese text-sm font-bold text-navy-900 leading-none">
                          {dc.kana}
                        </span>
                        <span className="text-[7px] text-gray-500 font-mono">
                          {dc.romaji} ({dc.bn})
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Yoon (যুক্তবর্ণ - Contracted Sounds) (7 cols on grid) */}
            <div className="md:col-span-7 print:col-span-7">
              <div className="text-[10px] font-bold text-navy-900 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>৩. জাপানিজ যুক্তবর্ণ (Yoon - 拗音)</span>
              </div>

              <div className="border border-slate-300 rounded-lg overflow-hidden text-center text-xs">
                <div className="grid grid-cols-4 bg-navy-800 text-white text-[8px] font-bold py-0.5">
                  <div>গ্রুপ</div>
                  <div>- ya (য়া)</div>
                  <div>- yu (য়ু)</div>
                  <div>- yo (য়ো)</div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-200 bg-white">
                  {/* Sub-column 1 (K, S, T, N, H, M) */}
                  <div>
                    {KATAKANA_YOON.slice(0, 6).map((yItem, yIdx) => (
                      <div
                        key={yIdx}
                        className={`grid grid-cols-4 border-b border-slate-200 last:border-b-0 items-center ${
                          yIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        }`}
                      >
                        <div className="py-0.5 px-1 font-bold text-[8px] text-navy-800 bg-navy-50 border-r border-slate-200 text-center">
                          {yItem.group}
                        </div>
                        {yItem.chars.map((yc, ycIdx) => (
                          <div
                            key={ycIdx}
                            className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[23px]"
                          >
                            <span className="font-japanese text-xs font-bold text-navy-900 leading-none">
                              {yc.kana}
                            </span>
                            <span className="text-[7px] text-gray-500 font-mono">
                              {yc.romaji} ({yc.bn})
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Sub-column 2 (R, G, J, B, P) */}
                  <div>
                    {KATAKANA_YOON.slice(6).map((yItem, yIdx) => (
                      <div
                        key={yIdx}
                        className={`grid grid-cols-4 border-b border-slate-200 last:border-b-0 items-center ${
                          yIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        }`}
                      >
                        <div className="py-0.5 px-1 font-bold text-[8px] text-navy-800 bg-navy-50 border-r border-slate-200 text-center">
                          {yItem.group}
                        </div>
                        {yItem.chars.map((yc, ycIdx) => (
                          <div
                            key={ycIdx}
                            className="py-0.5 px-0.5 border-r border-slate-200 last:border-r-0 flex flex-col items-center justify-center min-h-[23px]"
                          >
                            <span className="font-japanese text-xs font-bold text-navy-900 leading-none">
                              {yc.kana}
                            </span>
                            <span className="text-[7px] text-gray-500 font-mono">
                              {yc.romaji} ({yc.bn})
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Page 2 Footer */}
          <div className="pt-1.5 border-t-2 border-japanRed-600 text-center text-[9px] text-gray-600 space-y-0.5">
            <div className="font-bold text-navy-900 flex flex-wrap items-center justify-center gap-2">
              <span>{agencyName} (ইউমিরা নিহোঙ্গো গাক্কো)</span>
              <span>•</span>
              <span className="text-japanRed-600">ভর্তি ও ক্যারিয়ার হটলাইন: {agencyPhone}</span>
              <span>•</span>
              <span className="text-slate-700">ওয়েবসাইট: {siteUrl}</span>
            </div>
            <p className="text-[8px] text-gray-500">
              © {new Date().getFullYear()} {agencyName}. সর্বস্বত্ব সংরক্ষিত। শিক্ষার্থীদের পড়ার সুবিধার্থে বিনামূল্যে সরবরাহকৃত।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
