import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { SettingsManager } from "@/components/admin/SettingsManager";

import { fallbackSettings } from "@/lib/fallback-data";

export const metadata = {
  title: "Website Settings | Admin",
};

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  let settingsMap: Record<string, string> = { ...fallbackSettings };
  try {
    const settings = await prisma.websiteSetting.findMany();
    if (settings && settings.length > 0) {
      settingsMap = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, { ...fallbackSettings });
    }
  } catch (error) {
    console.warn("Could not fetch settings from DB:", error);
  }

  return <SettingsManager initialSettings={settingsMap} />;
}
