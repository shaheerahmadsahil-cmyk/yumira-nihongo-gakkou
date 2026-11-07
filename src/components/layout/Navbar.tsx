"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  BookOpen,
  Award,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  Shield,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useFurigana } from "@/lib/context/FuriganaContext";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Navbar({ whatsappNumber }: { whatsappNumber?: string }) {
  const { locale, setLocale, t, availableLocales } = useLanguage();
  const { mode, toggleMode, isExamMode } = useFurigana();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCoursesDropdown(false);
    setLangDropdown(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    {
      label: t.nav.courses,
      isDropdown: true,
      children: [
        { href: "/courses/n5", label: "JLPT N5 (Beginner)" },
        { href: "/courses/n4", label: "JLPT N4 (Intermediate)" },
        { href: "/courses/n3", label: "JLPT N3 (Pre-Advanced)" },
        { href: "/courses/jft-basic", label: "JFT-Basic (SSW Visa)" },
        { href: "/courses", label: t.nav.coursesAll },
      ],
    },
    { href: "/hiragana", label: t.nav.hiragana },
    { href: "/katakana", label: t.nav.katakana },
    { href: "/kanji", label: t.nav.kanji },
    {
      href: "/practice-sheets",
      label: locale === "bn" ? "ফ্রি শিট (PDF)" : locale === "ja" ? "無料シート (PDF)" : "Free Sheets (PDF)",
    },
    { href: "/mock-tests", label: t.nav.mockTests },
    { href: "/contact", label: t.nav.contact },
  ];

  const currentLang = availableLocales.find((l) => l.code === locale) || availableLocales[0];
  const applyUrl = buildWhatsAppUrl({ courseLevel: "General", locale, whatsappNumber });

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 print:hidden ${
        scrolled
          ? "bg-washi-50/95 backdrop-blur-md shadow-md border-b border-washi-200"
          : "bg-washi-50/80 backdrop-blur-sm border-b border-washi-200/60"
      }`}
    >
      {/* Top Banner with Furigana Switcher & Office Contact */}
      <div className="bg-navy-900 text-washi-100 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-japanRed-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-japanRed-500 animate-ping" />
              {locale === "bn"
                ? "নতুন ব্যাচে ভর্তি চলছে! সীমিত আসন"
                : locale === "ja"
                ? "新学期受講生募集中！早期割引受付中"
                : "New JLPT Batches Enrolling Now! Limited Seats Available"}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">
              WhatsApp: <strong className="text-white">+880 1341-017323</strong>
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Furigana Mode Switcher */}
            <button
              onClick={toggleMode}
              title={
                isExamMode
                  ? "Exam Mode active (Furigana hidden). Click to enable Learning Mode"
                  : "Learning Mode active (Furigana shown). Click to enable Exam Mode"
              }
              className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full transition-colors text-xs font-medium border ${
                isExamMode
                  ? "bg-japanRed-950/80 border-japanRed-600 text-japanRed-200"
                  : "bg-emerald-950/80 border-emerald-600 text-emerald-200"
              }`}
            >
              <span className="text-[11px]">
                {isExamMode ? "Exam Mode (Furigana OFF)" : "Learning Mode (Furigana ON)"}
              </span>
              {isExamMode ? (
                <ToggleLeft className="w-4 h-4 text-japanRed-400" />
              ) : (
                <ToggleRight className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Free Sheet Link */}
            <Link
              href="/practice-sheets"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === "bn" ? "ফ্রি শিট (PDF)" : "Free PDF Sheets"}</span>
            </Link>

            {/* Admin Link */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-japanRed-400" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-md shadow-amber-900/10 border-2 border-amber-200/80 bg-white group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
              <Image
                src="/images/yumira-logo.jpg"
                alt="Yumira Nihongo Gakkou Logo"
                fill
                sizes="48px"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-lg font-bold font-sans text-navy-900 tracking-tight leading-tight group-hover:text-japanRed-600 transition-colors truncate max-w-[175px] xs:max-w-[220px] sm:max-w-none">
                Yumira Nihongo Gakkou
              </span>
              <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-amber-700 uppercase font-sans truncate max-w-[175px] xs:max-w-[220px] sm:max-w-none">
                {locale === "bn"
                  ? "জাপানিজ একাডেমি • স্বপ্ন ও ভবিষ্যৎ"
                  : locale === "ja"
                  ? "ユミラ日本語学校 • Dream • Grow • Achieve"
                  : "Japanese Language Academy • Dream • Grow • Achieve"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item, idx) => {
              if (item.isDropdown) {
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setCoursesDropdown(true)}
                    onMouseLeave={() => setCoursesDropdown(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith("/courses")
                          ? "text-japanRed-600 bg-japanRed-50/70"
                          : "text-navy-900 hover:text-japanRed-600 hover:bg-washi-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </button>

                    {coursesDropdown && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-washi-200 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                        {item.children?.map((child, cIdx) => (
                          <Link
                            key={cIdx}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-900 hover:text-japanRed-600 hover:bg-washi-100 transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-japanRed-500 shrink-0" />
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const href = item.href || "/";
              const isActive = pathname === href;
              return (
                <Link
                  key={idx}
                  href={href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-japanRed-600 bg-japanRed-50/70 font-semibold"
                      : "text-navy-900 hover:text-japanRed-600 hover:bg-washi-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items: Language Switcher & WhatsApp CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-washi-300 bg-white hover:bg-washi-100 text-navy-900 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4 text-japanRed-600" />
                <span>{currentLang.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {langDropdown && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-washi-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseLeave={() => setLangDropdown(false)}
                >
                  {availableLocales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => {
                        setLocale(loc.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors ${
                        locale === loc.code
                          ? "bg-japanRed-50 text-japanRed-700 font-bold"
                          : "text-navy-900 hover:bg-washi-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{loc.flag}</span>
                        <span>{loc.nativeName}</span>
                      </span>
                      {locale === loc.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-japanRed-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admission WhatsApp CTA */}
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-japanRed-600 hover:bg-japanRed-700 rounded-xl shadow-md shadow-japanRed-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.nav.applyNow}</span>
            </a>
          </div>

          {/* Mobile Menu Button & Quick Actions */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Lang Switch on Mobile */}
            <button
              onClick={() => {
                const next = locale === "bn" ? "en" : locale === "en" ? "ja" : "bn";
                setLocale(next);
              }}
              className="px-2 py-1.5 text-xs font-bold border border-washi-300 rounded-lg bg-white text-navy-900 shadow-sm active:scale-95 transition-transform"
            >
              {currentLang.flag} {currentLang.code.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-navy-900 bg-white border border-washi-300 hover:bg-washi-100 shadow-sm focus:outline-none active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-washi-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Furigana Mode Toggle Mobile */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-washi-100 border border-washi-200">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-navy-900">
                {isExamMode ? "Exam Mode" : "Learning Mode"}
              </span>
              <span className="text-[11px] text-gray-500">
                {isExamMode ? "Furigana ruby hidden" : "Furigana ruby displayed"}
              </span>
            </div>
            <button
              onClick={toggleMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                isExamMode
                  ? "bg-japanRed-600 text-white border-japanRed-700"
                  : "bg-emerald-600 text-white border-emerald-700"
              }`}
            >
              {isExamMode ? "Switch to Learning" : "Switch to Exam"}
            </button>
          </div>

          <div className="divide-y divide-washi-200">
            {navLinks.map((item, idx) => {
              if (item.isDropdown) {
                return (
                  <div key={idx} className="py-2 space-y-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
                      {item.label}
                    </span>
                    <div className="pl-2 space-y-1 mt-1">
                      {item.children?.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.href}
                          className="block px-3 py-2 text-sm font-medium text-navy-900 hover:text-japanRed-600 rounded-lg hover:bg-washi-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const href = item.href || "/";
              return (
                <Link
                  key={idx}
                  href={href}
                  className="block px-3 py-2.5 text-sm font-medium text-navy-900 hover:text-japanRed-600 rounded-lg hover:bg-washi-100"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Language Selector in Mobile Drawer */}
          <div className="pt-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
              Select Language
            </span>
            <div className="grid grid-cols-3 gap-2">
              {availableLocales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => setLocale(loc.code)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium border text-center ${
                    locale === loc.code
                      ? "bg-japanRed-600 text-white border-japanRed-700 font-bold"
                      : "bg-white text-navy-900 border-washi-300"
                  }`}
                >
                  {loc.flag} {loc.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Admission Button */}
          <div className="pt-2">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-japanRed-600 rounded-xl shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.nav.applyNow}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
