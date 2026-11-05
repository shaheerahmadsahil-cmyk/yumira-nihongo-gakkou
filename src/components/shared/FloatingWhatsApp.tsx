"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-2.5 sm:gap-3 flex-col sm:flex-row-reverse"
    >
      {/* Floating Action Button with spring animation */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Admission Support"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:opacity-60" />

        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 fill-white stroke-[#25D366] stroke-1" />

        {/* Online Status Dot */}
        <span className="absolute top-1 right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </motion.a>

      {/* Tooltip Card with AnimatePresence */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 10 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-navy-900 text-xs font-medium px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 max-w-xs"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
