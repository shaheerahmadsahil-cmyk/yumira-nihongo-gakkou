"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp({ whatsappNumber }: { whatsappNumber?: string }) {
  const { locale } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const directUrl = buildWhatsAppUrl({
    courseLevel: "General",
    locale,
    whatsappNumber,
  });

  const tooltipText = {
    bn: "ভর্তি ও ভিসার তথ্যের জন্য WhatsApp-এ কথা বলুন!",
    en: "Chat with an advisor on WhatsApp!",
    ja: "入学・ビザ相談はこちら（WhatsApp）",
  }[locale];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 flex-col sm:flex-row-reverse">
      {/* Floating Action Button */}
      <a
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Admission Support"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:opacity-60" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 fill-white stroke-[#25D366] stroke-1" />

        {/* Online Status Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>

      {/* Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-navy-900 text-xs font-medium px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="flex-1">{tooltipText}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 ml-1 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
