"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const submissionSchema = z.object({
  mockTestId: z.string(),
  answers: z.record(z.string()), // questionId -> optionId
  timeSpentSeconds: z.number().nonnegative(),
  studentName: z.string().optional(),
  studentEmail: z.string().optional(),
});

export async function submitMockTestAttempt(data: {
  mockTestId: string;
  answers: Record<string, string>;
  timeSpentSeconds: number;
  studentName?: string;
  studentEmail?: string;
}) {
  try {
    const validated = submissionSchema.parse(data);

    // Fetch test and questions with correct answers FROM SERVER ONLY
    const mockTest = await prisma.mockTest.findUnique({
      where: { id: validated.mockTestId },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!mockTest) {
      return { success: false, error: "Mock test not found" };
    }

    let earnedScore = 0;
    let totalPossible = 0;

    const reviewItems = mockTest.questions.map((question) => {
      totalPossible += question.marks;
      const selectedOptionId = validated.answers[question.id] || null;

      const correctOption = question.options.find((opt) => opt.isCorrect);
      const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);

      const isCorrect = !!(correctOption && selectedOptionId === correctOption.id);
      if (isCorrect) {
        earnedScore += question.marks;
      }

      return {
        questionId: question.id,
        category: question.category,
        questionText: question.questionText,
        questionTextFurigana: question.questionTextFurigana,
        passage: question.passage,
        marks: question.marks,
        explanation: question.explanation,
        explanationBn: question.explanationBn,
        options: question.options.map((opt) => ({
          id: opt.id,
          label: opt.label,
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
        selectedOptionId,
        correctOptionId: correctOption?.id || null,
        isCorrect,
      };
    });

    const passed = earnedScore >= mockTest.passingScore;

    // Persist attempt safely in database (with graceful fallback on serverless)
    let attemptId = "attempt-" + Date.now();
    try {
      const attempt = await prisma.testAttempt.create({
        data: {
          mockTestId: mockTest.id,
          studentName: validated.studentName || "Anonymous Student",
          studentEmail: validated.studentEmail || null,
          score: earnedScore,
          totalPossible,
          passed,
          timeSpentSeconds: validated.timeSpentSeconds,
          answersJson: JSON.stringify(reviewItems),
        },
      });
      attemptId = attempt.id;
    } catch (saveErr) {
      console.warn("Could not save test attempt to database:", saveErr);
    }

    return {
      success: true,
      attemptId,
      score: earnedScore,
      totalPossible,
      passingScore: mockTest.passingScore,
      passed,
      percentage: Math.round((earnedScore / (totalPossible || 1)) * 100),
      timeSpentSeconds: validated.timeSpentSeconds,
      reviewItems,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to grade mock test" };
  }
}
