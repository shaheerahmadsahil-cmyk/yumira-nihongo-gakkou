import React from "react";
import prisma from "@/lib/db";
import { MockTestPreview, MockTestCardData } from "@/components/homepage/MockTestPreview";
import { fallbackMockTests } from "@/lib/fallback-data";

export const metadata = {
  title: "JLPT Mock Tests (N5, N4, N3) | Yumira Nihongo Gakkou",
  description: "Take full-length timed JLPT mock examinations with server-side scoring, exam security, and detailed answer explanations.",
};

export default async function MockTestsPage() {
  let tests: MockTestCardData[] = fallbackMockTests;

  try {
    const rawTests = await prisma.mockTest.findMany({
      where: { published: true },
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { jlptLevel: "desc" },
    });

    if (rawTests.length > 0) {
      tests = rawTests.map((t) => ({
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
    }
  } catch (error) {
    console.warn("Using fallback mock tests data:", error);
  }

  return (
    <div className="pt-8 pb-16">
      <MockTestPreview tests={tests} />
    </div>
  );
}
