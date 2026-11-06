import React from "react";
import prisma from "@/lib/db";
import { CoursesOverview, CourseCardData } from "@/components/homepage/CoursesOverview";
import { fallbackCourses, fallbackSettings } from "@/lib/fallback-data";

export const metadata = {
  title: "Japanese Language Courses | Yumira Nihongo Gakkou",
  description: "Browse JLPT N5, N4, and N3 comprehensive Japanese courses. Dynamic fees, class schedules, and WhatsApp enrollment.",
};

export default async function CoursesPage() {
  let courses: CourseCardData[] = fallbackCourses;
  let whatsappNumber = fallbackSettings.whatsapp_number;

  try {
    const [settings, rawCourses] = await Promise.all([
      prisma.websiteSetting.findMany(),
      prisma.course.findMany({
        where: { published: true },
        include: { translations: true },
        orderBy: { level: "desc" },
      }),
    ]);

    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, { ...fallbackSettings });

    whatsappNumber = settingsMap.whatsapp_number;

    if (rawCourses.length > 0) {
      courses = rawCourses.map((c) => ({
        id: c.id,
        slug: c.slug,
        level: c.level,
        baseFee: c.baseFee,
        onlineFee: c.onlineFee ?? c.baseFee,
        offlineFee: c.offlineFee ?? (c.baseFee + 2000),
        currency: c.currency,
        duration: c.duration,
        schedule: c.schedule,
        startDate: c.startDate ?? "নতুন ব্যাচে ভর্তি চলছে",
        badge: c.badge,
        translations: c.translations.map((tr) => {
          let features: string[] = [];
          try {
            features = JSON.parse(tr.features);
          } catch {
            features = [];
          }
          return {
            locale: tr.locale,
            title: tr.title,
            subtitle: tr.subtitle,
            description: tr.description,
            features,
          };
        }),
      }));
    }
  } catch (error) {
    console.warn("Using fallback courses data:", error);
  }

  return (
    <div className="pt-8 pb-16">
      <CoursesOverview courses={courses} whatsappNumber={whatsappNumber} />
    </div>
  );
}
