import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { MockTestEngine, CleanQuestion } from "@/components/mock-tests/MockTestEngine";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const test = await prisma.mockTest.findUnique({
    where: { id },
  });

  if (!test) return { title: "Test Not Found" };

  return {
    title: `${test.title} | JLPT Exam Engine`,
    description: test.description,
  };
}

export default async function MockTestSessionPage({ params }: PageProps) {
  const { id } = await params;

  const test = await prisma.mockTest.findUnique({
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

  if (!test || !test.published) {
    notFound();
  }

  // Security: STRIP isCorrect from options so answer keys are NEVER exposed to client browser!
  const sanitizedQuestions: CleanQuestion[] = test.questions.map((q) => ({
    id: q.id,
    category: q.category,
    questionText: q.questionText,
    passage: q.passage,
    audioUrl: q.audioUrl,
    marks: q.marks,
    order: q.order,
    options: q.options.map((opt) => ({
      id: opt.id,
      label: opt.label,
      text: opt.text,
      // isCorrect omitted!
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
