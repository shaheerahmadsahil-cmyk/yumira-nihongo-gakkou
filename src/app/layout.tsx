import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { FuriganaProvider } from "@/lib/context/FuriganaContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { SakuraPetals } from "@/components/shared/SakuraPetals";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Yumira Nihongo Gakkou | Learn Japanese & Study in Japan",
  description:
    "Yumira Nihongo Gakkou (ইউমিরা নিহোঙ্গো গাক্কো) — স্বপ্ন ও ভবিষ্যৎ • Dream, Grow, Achieve. Premier Japanese Language Academy. Expert JLPT N5, N4, N3 Preparation and higher study & SSW visa consultancy.",
  keywords: [
    "Yumira Nihongo Gakkou",
    "ইউমিরা নিহোঙ্গো গাক্কো",
    "Japanese Language Academy",
    "JLPT N5",
    "JLPT N4",
    "JLPT N3",
    "Learn Japanese in Bangladesh",
    "Japan Student Visa",
    "SSW Visa Japan",
    "Hiragana",
    "Katakana",
    "Kanji",
    "NAT-TEST",
  ],
  authors: [{ name: "Yumira Nihongo Gakkou" }],
  openGraph: {
    title: "Yumira Nihongo Gakkou — স্বপ্ন ও ভবিষ্যৎ",
    description: "Learn Japanese & Unlock Your Future in Japan with Yumira Nihongo Gakkou",
    type: "website",
    locale: "en_US",
  },
};

async function getWebsiteSettings() {
  try {
    const settings = await prisma.websiteSetting.findMany();
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch {
    return {
      whatsapp_number: "8801341017323",
      agency_name: "Yumira Nihongo Gakkou",
      agency_phone: "+880 1341-017323",
      agency_address: "ঢাকা, বাংলাদেশ",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();
  const whatsappNumber = settings.whatsapp_number || "8801341017323";

  return (
    <html lang="bn" className="overflow-x-hidden scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-washi-50 text-navy-900 antialiased overflow-x-hidden selection:bg-japanRed-100 selection:text-japanRed-900">
        <LanguageProvider>
          <FuriganaProvider>
            {/* Soft Floating Sakura Petals */}
            <SakuraPetals />

            {/* Navigation Header */}
            <Navbar whatsappNumber={whatsappNumber} />

            {/* Main Page Content */}
            <main className="flex-1 overflow-x-hidden">{children}</main>

            {/* Floating WhatsApp Action Button */}
            <FloatingWhatsApp whatsappNumber={whatsappNumber} />

            {/* Footer */}
            <Footer settings={settings} />
          </FuriganaProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
