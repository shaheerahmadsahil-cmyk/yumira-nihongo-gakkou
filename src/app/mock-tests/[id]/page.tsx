import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { MockTestEngine, CleanQuestion } from "@/components/mock-tests/MockTestEngine";
import { allMockTestsDataset, n5MockTest } from "@/lib/comprehensive-mock-tests";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  if (allMockTestsDataset[id]) {
    const t = allMockTestsDataset[id];
    return {
      title: `${t.titleBn || t.title} | Yumira Nihongo Gakkou`,
      description: t.descriptionBn || t.description,
    };
  }

  try {
    const test = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (test) {
      return {
        title: `${test.titleBn || test.title} | JLPT Exam Engine`,
        description: test.descriptionBn || test.description,
      };
    }
  } catch {}

  return {
    title: "JLPT Mock Exam | Yumira Nihongo Gakkou",
    description: "Online JLPT Mock Exam",
  };
}

export default async function MockTestSessionPage({ params }: PageProps) {
  const { id } = await params;

  let test: any = null;

  // 1. Check comprehensive predefined dataset first
  if (allMockTestsDataset[id]) {
    test = allMockTestsDataset[id];
  } else {
    // 2. Check Database
    try {
      const dbTest = await prisma.mockTest.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              options: true,
            },
            orderBy: { order: "asc" },
          },
        },
      });

      if (dbTest && dbTest.published && dbTest.questions.length > 0) {
        test = dbTest;
      }
    } catch (err) {
      console.warn("Could not fetch test from DB, using fallback dataset:", err);
    }
  }

  // 3. Fallback to comprehensive N5 test with all 16 questions
  if (!test) {
    test = n5MockTest;
  }

  // Security: STRIP isCorrect from options so answer keys are NEVER exposed to client browser!
  const sanitizedQuestions: CleanQuestion[] = test.questions.map((q: any) => ({
    id: q.id,
    category: q.category,
    questionText: q.questionText,
    passage: q.passage,
    audioUrl: q.audioUrl || null,
    audioText: q.audioText || null,
    marks: q.marks,
    order: q.order,
    options: q.options.map((opt: any) => ({
      id: opt.id,
      label: opt.label,
      text: opt.text,
      // isCorrect omitted for exam integrity!
    })),
  }));

  const sanitizedTest = {
    id: test.id,
    jlptLevel: test.jlptLevel,
    title: test.title,
    titleBn: test.titleBn,
    titleJa: test.titleJa,
    description: test.description,
    timeLimitMinutes: test.timeLimitMinutes,
    totalMarks: test.totalMarks,
    passingScore: test.passingScore,
    questions: sanitizedQuestions,
  };

  return <MockTestEngine test={sanitizedTest} />;
}
