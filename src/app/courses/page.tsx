import React from "react";
import prisma from "@/lib/db";
import { CoursesOverview, CourseCardData } from "@/components/homepage/CoursesOverview";

export const metadata = {
  title: "Japanese Language Courses | Rakib Sensei Academy",
  description: "Browse JLPT N5, N4, and N3 comprehensive Japanese courses. Dynamic fees, class schedules, and WhatsApp enrollment.",
};

export default async function CoursesPage() {
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
  }, {} as Record<string, string>);

  const courses: CourseCardData[] = rawCourses.map((c) => ({
    id: c.id,
    slug: c.slug,
    level: c.level,
    baseFee: c.baseFee,
    currency: c.currency,
    duration: c.duration,
    schedule: c.schedule,
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

  return (
    <div className="pt-8 pb-16">
      <CoursesOverview courses={courses} whatsappNumber={settingsMap.whatsapp_number} />
    </div>
  );
}
