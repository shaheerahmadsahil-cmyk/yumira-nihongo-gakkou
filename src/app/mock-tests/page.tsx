import React from "react";
import prisma from "@/lib/db";
import { MockTestPreview, MockTestCardData } from "@/components/homepage/MockTestPreview";

export const metadata = {
  title: "JLPT Mock Tests (N5, N4, N3) | Rakib Sensei Academy",
  description: "Take full-length timed JLPT mock examinations with server-side scoring, exam security, and detailed answer explanations.",
};

export default async function MockTestsPage() {
  const rawTests = await prisma.mockTest.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { jlptLevel: "desc" },
  });

  const tests: MockTestCardData[] = rawTests.map((t) => ({
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

  return (
    <div className="pt-8 pb-16">
      <MockTestPreview tests={tests} />
    </div>
  );
}
