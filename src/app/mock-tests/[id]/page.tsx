import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { MockTestEngine, CleanQuestion } from "@/components/mock-tests/MockTestEngine";
import { fallbackMockTests } from "@/lib/fallback-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  try {
    const test = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (test) {
      return {
        title: `${test.title} | JLPT Exam Engine`,
        description: test.description,
      };
    }
  } catch {}

  const fb = fallbackMockTests.find((t) => t.id === id);
  return {
    title: `${fb?.title || "JLPT Mock Test"} | JLPT Exam Engine`,
    description: fb?.description || "Online JLPT Mock Exam",
  };
}

const sampleQuestions: CleanQuestion[] = [
  {
    id: "q1",
    category: "VOCABULARY",
    questionText: "「日曜日」の正しい読み方はどれですか。",
    passage: null,
    audioUrl: null,
    marks: 10,
    order: 1,
    options: [
      { id: "opt1", label: "A", text: "にちようび" },
      { id: "opt2", label: "B", text: "きんようび" },
      { id: "opt3", label: "C", text: "どようび" },
      { id: "opt4", label: "D", text: "げつようび" },
    ],
  },
  {
    id: "q2",
    category: "GRAMMAR",
    questionText: "わたしは まいにち 日本語 _____ べんきょうします。",
    passage: null,
    audioUrl: null,
    marks: 10,
    order: 2,
    options: [
      { id: "opt5", label: "A", text: "を" },
      { id: "opt6", label: "B", text: "に" },
      { id: "opt7", label: "C", text: "で" },
      { id: "opt8", label: "D", text: "へ" },
    ],
  },
  {
    id: "q3",
    category: "KANJI",
    questionText: "あした、_____へ 行きます。[がっこう]",
    passage: null,
    audioUrl: null,
    marks: 10,
    order: 3,
    options: [
      { id: "opt9", label: "A", text: "学校" },
      { id: "opt10", label: "B", text: "学生" },
      { id: "opt11", label: "C", text: "会社" },
      { id: "opt12", label: "D", text: "病院" },
    ],
  },
];

export default async function MockTestSessionPage({ params }: PageProps) {
  const { id } = await params;

  let test: any = null;

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

    if (dbTest && dbTest.published) {
      test = dbTest;
    }
  } catch (err) {
    console.warn("Could not fetch test from DB, using fallback:", err);
  }

  if (!test) {
    const fb = fallbackMockTests.find((t) => t.id === id) || fallbackMockTests[0];
    test = {
      ...fb,
      questions: sampleQuestions,
    };
  }

  const sanitizedQuestions: CleanQuestion[] = test.questions.map((q: any) => ({
    id: q.id,
    category: q.category,
    questionText: q.questionText,
    passage: q.passage,
    audioUrl: q.audioUrl,
    marks: q.marks,
    order: q.order,
    options: q.options.map((opt: any) => ({
      id: opt.id,
      label: opt.label,
      text: opt.text,
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
