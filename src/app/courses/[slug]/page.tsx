import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { CourseDetailView } from "@/components/courses/CourseDetailView";
import { fallbackCourses, fallbackSettings } from "@/lib/fallback-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: { translations: true },
    });

    if (course) {
      const enTrans = course.translations.find((t) => t.locale === "en") || course.translations[0];
      return {
        title: `${enTrans?.title || course.slug.toUpperCase()} | Yumira Nihongo Gakkou`,
        description: enTrans?.subtitle || enTrans?.description,
      };
    }
  } catch {}

  const fb = fallbackCourses.find((c) => c.slug === slug || slug.includes(c.level.toLowerCase()));
  if (fb) {
    return {
      title: `${fb.translations[0].title} | Yumira Nihongo Gakkou`,
      description: fb.translations[0].subtitle,
    };
  }

  return { title: "Course Details | Yumira Nihongo Gakkou" };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  let course: any = null;
  let settingsMap: Record<string, string> = fallbackSettings;

  try {
    const [dbCourse, settings] = await Promise.all([
      prisma.course.findUnique({
        where: { slug },
        include: {
          translations: true,
          modules: true,
        },
      }),
      prisma.websiteSetting.findMany(),
    ]);

    if (dbCourse) {
      course = dbCourse;
    }
    if (settings) {
      settingsMap = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, { ...fallbackSettings });
    }
  } catch (err) {
    console.warn("DB error fetching course, using fallback:", err);
  }

  if (!course) {
    const fb = fallbackCourses.find((c) => c.slug === slug || slug.includes(c.level.toLowerCase()));
    if (!fb) notFound();

    course = {
      ...fb,
      modules: [
        { id: "m1", title: "Writing & Pronunciation", description: "Scripts and sounds", order: 1 },
        { id: "m2", title: "Grammar & Patterns", description: "Core grammar structures", order: 2 },
        { id: "m3", title: "Kanji & Vocabulary", description: "Essential characters", order: 3 },
      ],
      translations: fb.translations.map((tr) => ({
        ...tr,
        curriculum: [
          { module: "Module 1", hours: "30h", topics: ["Kana", "Pronunciation", "Greetings"] },
          { module: "Module 2", hours: "40h", topics: ["Particles", "Verb Conjugations", "Sentences"] },
        ],
        features: tr.features,
        faq: [
          { q: "ক্লাস কি অনলাইনে হবে?", a: "হ্যাঁ, লাইভ ইন্টারেক্টিভ জুম ক্লাসে ক্লাস হবে এবং ক্লাস রেকর্ডিং দেওয়া হবে।" },
          { q: "ভর্তি হতে কী লাগবে?", a: "আমাদের WhatsApp নম্বরে মেসেজ দিয়ে বা ফর্ম পূরণ করে সহজেই ভর্তি সম্পন্ন করতে পারবেন।" },
        ],
      })),
    };
  }

  const parsedCourse = {
    ...course,
    translations: course.translations.map((tr: any) => {
      let curriculum = tr.curriculum || [];
      let features = tr.features || [];
      let faq = tr.faq || [];

      if (typeof curriculum === "string") {
        try { curriculum = JSON.parse(curriculum); } catch { curriculum = []; }
      }
      if (typeof features === "string") {
        try { features = JSON.parse(features); } catch { features = []; }
      }
      if (typeof faq === "string") {
        try { faq = JSON.parse(faq); } catch { faq = []; }
      }

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
