/**
 * WhatsApp Helper Module
 * Centralizes WhatsApp message formatting and URL construction.
 * Ensures the official number is configured from settings, with standard fallback.
 */

export const DEFAULT_WHATSAPP_NUMBER = "8801341017323";

export type MessageLocale = "bn" | "en" | "ja";

export interface WhatsAppMessageOptions {
  courseLevel?: "N5" | "N4" | "N3" | "JFT-Basic" | "JFT-A2" | "General" | string;
  courseTitle?: string;
  batchMode?: "Online" | "Offline" | string;
  locale?: MessageLocale;
  customMessage?: string;
  whatsappNumber?: string;
}

export function generateWhatsAppMessage(options: WhatsAppMessageOptions): string {
  const { courseLevel = "General", locale = "en", batchMode, customMessage } = options;

  if (customMessage) return customMessage;

  const isJFT = courseLevel.toUpperCase().includes("JFT");
  const modeTextBn = batchMode === "Offline" ? "অফলাইন (ক্যাম্পাস)" : batchMode === "Online" ? "অনলাইন" : "";
  const modeTextEn = batchMode === "Offline" ? "Offline Campus" : batchMode === "Online" ? "Online" : "";

  switch (locale) {
    case "bn":
      if (isJFT) {
        return `আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোর JFT-Basic (A2) স্পেশাল SSW ওয়ার্কিং ভিসা কোর্সে${modeTextBn ? ` (${modeTextBn} ব্যাচে)` : ""} ভর্তি হতে আগ্রহী। অনুগ্রহ করে আমাকে কোর্স ফি, ব্যাচ রুটিন ও ভর্তি প্রক্রিয়া জানান।`;
      }
      if (courseLevel === "General") {
        return "আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোর (Yumira Nihongo Gakkou) জাপানি ভাষা শিক্ষা ও স্টুডেন্ট ভিসা সংক্রান্ত তথ্য জানতে আগ্রহী। বিস্তারিত জানাবেন কি?";
      }
      return `আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোর জেএলপিটি ${courseLevel} কোর্সের${modeTextBn ? ` ${modeTextBn} ব্যাচে` : ""} ভর্তি হতে আগ্রহী। অনুগ্রহ করে আমাকে কোর্স ফি, ক্লাসের রুটিন ও ভর্তি সংক্রান্ত তথ্য প্রদান করুন।`;

    case "ja":
      if (isJFT) {
        return "こんにちは。ユミラ日本語学校のJFT-Basic（A2）特定技能ビザ対策コースの受講について問い合わせをさせていただきます。受講料および開講日程をご案内いただけますでしょうか。";
      }
      if (courseLevel === "General") {
        return "こんにちは。ユミラ日本語学校（Yumira Nihongo Gakkou）の講座や日本留学サポートについて問い合わせをさせていただきます。詳細をご案内いただけますでしょうか。";
      }
      return `こんにちは。ユミラ日本語学校のJLPT ${courseLevel} 対策コースの受講を検討しております。講座の詳細、受講料、時間割および入学手続きについてご案内いただけますでしょうか。`;

    case "en":
    default:
      if (isJFT) {
        return `Hello, I am interested in enrolling in the JFT-Basic (A2) SSW Working Visa course${modeTextEn ? ` (${modeTextEn} Batch)` : ""} at Yumira Nihongo Gakkou. Please provide me with course fees, schedules, and admission details.`;
      }
      if (courseLevel === "General") {
        return "Hello! I am interested in learning Japanese and consulting about study visa opportunities at Yumira Nihongo Gakkou. Please provide me with detailed information.";
      }
      return `Hello, I am interested in enrolling in the JLPT ${courseLevel} course${modeTextEn ? ` (${modeTextEn} Batch)` : ""} at Yumira Nihongo Gakkou. Please provide me with course details, fees, class schedules, and admission information.`;
  }
}

export function buildWhatsAppUrl(options: WhatsAppMessageOptions): string {
  const phone = (options.whatsappNumber || process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP || DEFAULT_WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const message = generateWhatsAppMessage(options);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
