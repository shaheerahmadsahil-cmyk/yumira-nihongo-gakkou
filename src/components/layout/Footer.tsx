"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Shield,
  Heart,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface FooterProps {
  settings?: {
    agency_name?: string;
    agency_tagline?: string;
    agency_phone?: string;
    agency_email?: string;
    agency_address?: string;
    whatsapp_number?: string;
    office_hours?: string;
    facebook_url?: string;
  };
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer({ settings }: FooterProps) {
  const { locale, t } = useLanguage();

  const agencyName = settings?.agency_name || "Yumira Nihongo Gakkou";
  const phone = settings?.agency_phone || "+880 1341-017323";
  const email = settings?.agency_email || "admissions@yumira.com";
  const address =
    settings?.agency_address ||
    "Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213, Bangladesh";
  const officeHours =
    settings?.office_hours || "Saturday – Thursday: 9:00 AM – 8:00 PM (Friday Closed)";

  const directWhatsApp = buildWhatsAppUrl({
    courseLevel: "General",
    locale,
    whatsappNumber: settings?.whatsapp_number,
  });

  return (
    <footer className="relative bg-navy-950 text-gray-300 pt-10 sm:pt-16 pb-8 sm:pb-12 overflow-hidden border-t-2 border-japanRed-600">
      {/* Background Japanese Watermark Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-seigaiha-pattern"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-lg border border-amber-300/40 shrink-0">
                <Image
                  src="/images/yumira-logo.jpg"
                  alt="Yumira Nihongo Gakkou Logo"
                  fill
                  sizes="48px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  Yumira Nihongo Gakkou
                </h3>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase font-sans">
                  Japanese Language Academy • স্বপ্ন ও ভবিষ্যৎ
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={directWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.facebook.com/muhammad.abdur.razzak.583568"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold rounded-lg shadow transition-colors"
                title="Muhammad Abdur Razzak Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-japanRed-600 rounded-sm" />
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/hiragana" className="hover:text-white transition-colors">
                  {t.nav.hiragana} (Hiragana Center)
                </Link>
              </li>
              <li>
                <Link href="/katakana" className="hover:text-white transition-colors">
                  {t.nav.katakana} (Katakana Center)
                </Link>
              </li>
              <li>
                <Link href="/kanji" className="hover:text-white transition-colors">
                  {t.nav.kanji} (Kanji Library)
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="hover:text-white transition-colors">
                  {t.nav.mockTests} (JLPT Mock Exams)
                </Link>
              </li>
              <li>
                <Link href="/practice-sheets" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                  <span>🎁 ফ্রি প্র্যাকটিস শিট (PDF)</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-japanRed-600 rounded-sm" />
              {t.footer.courses}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/courses/n5" className="hover:text-white transition-colors">
                  JLPT N5 (Beginner Mastery)
                </Link>
              </li>
              <li>
                <Link href="/courses/n4" className="hover:text-white transition-colors">
                  JLPT N4 (Intermediate Accelerator)
                </Link>
              </li>
              <li>
                <Link href="/courses/n3" className="hover:text-white transition-colors">
                  JLPT N3 (Pre-Advanced & Corporate)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  {t.nav.coursesAll}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-japanRed-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus & Contact Information */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-japanRed-600 rounded-sm" />
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-japanRed-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-japanRed-500 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-japanRed-500 shrink-0" />
                <span>{email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-japanRed-500 shrink-0 mt-0.5" />
                <span>{officeHours}</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://www.facebook.com/muhammad.abdur.razzak.583568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                  <span>Muhammad Abdur Razzak (Facebook)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {agencyName}. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & PostgreSQL</span>
            <Link href="/admin/login" className="hover:text-gray-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
