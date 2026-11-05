import React from "react";
import prisma from "@/lib/db";
import { ContactSection } from "@/components/homepage/ContactSection";

export const metadata = {
  title: "Contact & Admissions | Yumira Nihongo Gakkou",
  description: "Get in touch with Rakib Sensei Academy. Inquire about course fees, batch schedules, JLPT coaching, and Japan student visas.",
};

export default async function ContactPage() {
  let settingsMap: Record<string, string> = {};
  try {
    const settings = await prisma.websiteSetting.findMany();
    settings.forEach((curr) => { settingsMap[curr.key] = curr.value; });
  } catch {}

  return (
    <div className="pt-8 pb-16">
      <ContactSection whatsappNumber={settingsMap.whatsapp_number} />
    </div>
  );
}
