import prisma from "@/lib/db";
import { HeroSection } from "@/components/homepage/HeroSection";
import { AboutSection } from "@/components/homepage/AboutSection";
import { CoursesOverview, CourseCardData } from "@/components/homepage/CoursesOverview";
import { LearningPreview } from "@/components/homepage/LearningPreview";
import { MockTestPreview, MockTestCardData } from "@/components/homepage/MockTestPreview";
import { ContactSection } from "@/components/homepage/ContactSection";

export const revalidate = 60; // ISR cache revalidation

async function getHomepageData() {
  const [settings, rawCourses, rawTests] = await Promise.all([
    prisma.websiteSetting.findMany(),
    prisma.course.findMany({
      where: { published: true },
      include: { translations: true },
      orderBy: { level: "desc" },
    }),
    prisma.mockTest.findMany({
      where: { published: true },
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { jlptLevel: "desc" },
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

  const mockTests: MockTestCardData[] = rawTests.map((t) => ({
    id: t.id,
    jlptLevel: t.jlptLevel,
    title: t.title,
    titleBn: t.titleBn,
    titleJa: t.titleJa,
    description: t.description,
    descriptionBn: t.descriptionBn,
    descriptionJa: t.descriptionJa,
    timeLimitMinutes: t.timeLimitMinutes,
    totalMarks: t.totalMarks,
    passingScore: t.passingScore,
    _count: t._count,
  }));

  return { settings: settingsMap, courses, mockTests };
}

export default async function HomePage() {
  const { settings, courses, mockTests } = await getHomepageData();

  return (
    <div className="flex flex-col">
      <HeroSection whatsappNumber={settings.whatsapp_number} />
      <AboutSection />
      <CoursesOverview courses={courses} whatsappNumber={settings.whatsapp_number} />
      <LearningPreview />
      <MockTestPreview tests={mockTests} />
      <ContactSection whatsappNumber={settings.whatsapp_number} />
    </div>
  );
}
