import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { CourseDetailView } from "@/components/courses/CourseDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { translations: true },
  });

  if (!course) return { title: "Course Not Found" };

  const enTrans = course.translations.find((t) => t.locale === "en") || course.translations[0];

  return {
    title: `${enTrans?.title || course.slug.toUpperCase()} | Rakib Sensei Academy`,
    description: enTrans?.subtitle || enTrans?.description,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  const [course, settings] = await Promise.all([
    prisma.course.findUnique({
      where: { slug },
      include: {
        translations: true,
        modules: true,
      },
    }),
    prisma.websiteSetting.findMany(),
  ]);

  if (!course) {
    notFound();
  }

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const parsedCourse = {
    ...course,
    translations: course.translations.map((tr) => {
      let curriculum = [];
      let features = [];
      let faq = [];
      try {
        curriculum = JSON.parse(tr.curriculum);
      } catch {}
      try {
        features = JSON.parse(tr.features);
      } catch {}
      try {
        faq = JSON.parse(tr.faq);
      } catch {}

      return {
        locale: tr.locale,
        title: tr.title,
        subtitle: tr.subtitle,
        description: tr.description,
        curriculum,
        features,
        faq,
      };
    }),
  };

  return (
    <CourseDetailView
      course={parsedCourse}
      whatsappNumber={settingsMap.whatsapp_number}
    />
  );
}
