/**
 * WhatsApp Helper Module
 * Centralizes WhatsApp message formatting and URL construction.
 * Ensures the official number is configured from settings, with standard fallback.
 */

export const DEFAULT_WHATSAPP_NUMBER = "8801341017323";

export type MessageLocale = "bn" | "en" | "ja";

export interface WhatsAppMessageOptions {
  courseLevel?: "N5" | "N4" | "N3" | "General";
  courseTitle?: string;
  locale?: MessageLocale;
  customMessage?: string;
  whatsappNumber?: string;
}

export function generateWhatsAppMessage(options: WhatsAppMessageOptions): string {
  const { courseLevel = "General", locale = "en", customMessage } = options;

  if (customMessage) return customMessage;

  switch (locale) {
    case "bn":
      if (courseLevel === "General") {
        return "আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোর (Yumira Nihongo Gakkou) জাপানি ভাষা শিক্ষা ও স্টুডেন্ট ভিসা সংক্রান্ত তথ্য জানতে আগ্রহী। বিস্তারিত জানাবেন কি?";
      }
      return `আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোর জেএলপিটি ${courseLevel} কোর্সে ভর্তি হতে আগ্রহী। অনুগ্রহ করে আমাকে কোর্স ফি, ক্লাসের রুটিন ও ভর্তি সংক্রান্ত তথ্য প্রদান করুন।`;

    case "ja":
      if (courseLevel === "General") {
        return "こんにちは。ユミラ日本語学校（Yumira Nihongo Gakkou）の講座や日本留学サポートについて問い合わせをさせていただきます。詳細をご案内いただけますでしょうか。";
      }
      return `こんにちは。ユミラ日本語学校のJLPT ${courseLevel} 対策コースの受講を検討しております。講座の詳細、受講料、時間割および入学手続きについてご案内いただけますでしょうか。`;

    case "en":
    default:
      if (courseLevel === "General") {
        return "Hello! I am interested in learning Japanese and consulting about study visa opportunities at Yumira Nihongo Gakkou. Please provide me with detailed information.";
      }
      return `Hello, I am interested in enrolling in the JLPT ${courseLevel} course at Yumira Nihongo Gakkou. Please provide me with course details, fees, class schedules, and admission information.`;
  }
}

export function buildWhatsAppUrl(options: WhatsAppMessageOptions): string {
  const phone = (options.whatsappNumber || process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP || DEFAULT_WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const message = generateWhatsAppMessage(options);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
