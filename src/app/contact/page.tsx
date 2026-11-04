import React from "react";
import prisma from "@/lib/db";
import { ContactSection } from "@/components/homepage/ContactSection";

export const metadata = {
  title: "Contact & Admissions | Rakib Sensei Japanese Academy",
  description: "Get in touch with Rakib Sensei Academy. Inquire about course fees, batch schedules, JLPT coaching, and Japan student visas.",
};

export default async function ContactPage() {
  const settings = await prisma.websiteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="pt-8 pb-16">
      <ContactSection whatsappNumber={settingsMap.whatsapp_number} />
    </div>
  );
}
