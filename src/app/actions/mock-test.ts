"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import { allMockTestsDataset, n5MockTest } from "@/lib/comprehensive-mock-tests";

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

    let questionsList: any[] = [];

    // First check our comprehensive dataset
    if (allMockTestsDataset[validated.mockTestId]) {
      questionsList = allMockTestsDataset[validated.mockTestId].questions;
    } else {
      try {
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
        if (mockTest && mockTest.questions.length > 0) {
          questionsList = mockTest.questions;
        }
      } catch (err) {
        console.warn("DB query failed during grading, using fallback dataset:", err);
      }
    }

    // Fail-safe: if still empty, default to N5 standard comprehensive test
    if (questionsList.length === 0) {
      questionsList = n5MockTest.questions;
    }

    let earnedScore = 0;
    let totalPossible = 0;

    const reviewItems = questionsList.map((question) => {
      totalPossible += question.marks;
      const selectedOptionId = validated.answers[question.id] || null;

      const correctOption = question.options.find((opt: any) => opt.isCorrect);
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
        audioUrl: question.audioUrl,
        audioText: question.audioText,
        marks: question.marks,
        explanation: question.explanation,
        explanationBn: question.explanationBn,
        options: question.options.map((opt: any) => ({
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

    const percentage = Math.round((earnedScore / (totalPossible || 1)) * 100);
    // Standard JLPT passing score is 60%
    const passed = percentage >= 60;
    const passingScore = Math.round(totalPossible * 0.6);

    // Persist attempt safely in database (with graceful fallback on serverless)
    let attemptId = "attempt-" + Date.now();
    try {
      const attempt = await prisma.testAttempt.create({
        data: {
          mockTestId: validated.mockTestId,
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
      passingScore,
      passed,
      percentage,
      timeSpentSeconds: validated.timeSpentSeconds,
      reviewItems,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to grade mock test" };
  }
}
