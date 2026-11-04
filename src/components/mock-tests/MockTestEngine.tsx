"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Timer,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Award,
  RefreshCw,
  Home,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { submitMockTestAttempt } from "@/app/actions/mock-test";
import { FuriganaParser } from "@/components/shared/FuriganaText";

export interface CleanQuestion {
  id: string;
  category: string;
  questionText: string; // Clean text for exam mode (NO furigana)
  passage?: string | null;
  audioUrl?: string | null;
  marks: number;
  order: number;
  options: {
    id: string;
    label: string;
    text: string;
    // isCorrect is NEVER provided to client before submission!
  }[];
}

interface TestData {
  id: string;
  jlptLevel: string;
  title: string;
  titleBn: string;
  titleJa: string;
  description: string;
  timeLimitMinutes: number;
  totalMarks: number;
  passingScore: number;
  questions: CleanQuestion[];
}

export function MockTestEngine({ test }: { test: TestData }) {
  const { locale, t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [secondsRemaining, setSecondsRemaining] = useState(test.timeLimitMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Countdown Timer
  useEffect(() => {
    if (result) return; // Stop timer once test is completed

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [result]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (result) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleAutoSubmit = async () => {
    await performSubmission();
  };

  const performSubmission = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const timeSpent = Math.min(
      test.timeLimitMinutes * 60,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const res = await submitMockTestAttempt({
      mockTestId: test.id,
      answers,
      timeSpentSeconds: timeSpent,
    });

    setIsSubmitting(false);

    if (res.success) {
      setResult(res);
      if (res.passed) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }
    } else {
      alert(res.error || "Failed to calculate test score");
    }
  };

  const currentQ = test.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = test.questions.length;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isTimeCritical = secondsRemaining <= 300; // Under 5 mins

  // If Test Result is Available: Show Result & Full Review Screen
  if (result) {
    return (
      <div className="py-12 md:py-20 bg-washi-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Result Card */}
          <div
            className={`p-8 sm:p-12 rounded-3xl border-2 text-center shadow-xl space-y-6 ${
              result.passed
                ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                : "bg-red-50/90 border-red-300 text-red-950"
            }`}
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-md flex items-center justify-center">
              {result.passed ? (
                <Award className="w-12 h-12 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-red-600" />
              )}
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-white shadow-sm">
                JLPT {test.jlptLevel} • Final Evaluation
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">
                {result.passed ? t.mockTest.resultPass : t.mockTest.resultFail}
              </h1>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-navy-900">
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-washi-200">
                <span className="text-[11px] text-gray-500 block uppercase font-bold">
                  {t.mockTest.yourScore}
                </span>
                <strong className="text-2xl font-extrabold text-japanRed-600">
                  {result.score}
                </strong>
                <span className="text-xs text-gray-400"> / {result.totalPossible} pts</span>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-washi-200">
                <span className="text-[11px] text-gray-500 block uppercase font-bold">
                  Accuracy
                </span>
                <strong className="text-2xl font-extrabold text-navy-900">
                  {result.percentage}%
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-washi-200">
                <span className="text-[11px] text-gray-500 block uppercase font-bold">
                  Passing Score
                </span>
                <strong className="text-2xl font-extrabold text-emerald-600">
                  {result.passingScore} pts
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-washi-200">
                <span className="text-[11px] text-gray-500 block uppercase font-bold">
                  Time Spent
                </span>
                <strong className="text-2xl font-extrabold text-navy-900">
                  {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
                </strong>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs sm:text-sm shadow"
              >
                <RefreshCw className="w-4 h-4" /> Retake Mock Exam
              </button>

              <Link
                href="/mock-tests"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-washi-300 hover:bg-washi-100 text-navy-900 font-semibold text-xs sm:text-sm"
              >
                <BookOpen className="w-4 h-4" /> All Mock Tests
              </Link>
            </div>
          </div>

          {/* Question by Question Review */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-washi-200 shadow-sm space-y-8">
            <div className="border-b border-washi-200 pb-4">
              <h2 className="text-xl font-bold text-navy-900">
                {t.mockTest.reviewAnswers}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Carefully review each question with full Furigana explanations in English and Bengali.
              </p>
            </div>

            <div className="space-y-8">
              {result.reviewItems.map((item: any, qIdx: number) => (
                <div
                  key={item.questionId}
                  className={`p-6 rounded-2xl border-2 space-y-4 ${
                    item.isCorrect
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-red-50/40 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Question {qIdx + 1} • {item.category.toUpperCase()} • ({item.marks} marks)
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        item.isCorrect
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isCorrect ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Correct (+{item.marks})
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (0)
                        </>
                      )}
                    </span>
                  </div>

                  {item.passage && (
                    <div className="p-4 rounded-xl bg-white border border-washi-200 text-xs sm:text-sm leading-relaxed text-gray-800 font-japanese">
                      {item.passage}
                    </div>
                  )}

                  {/* Question with study mode furigana for review */}
                  <div className="font-japanese text-base sm:text-lg font-bold text-navy-900">
                    <FuriganaParser content={item.questionTextFurigana || item.questionText} />
                  </div>

                  {/* Options Review */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.options.map((opt: any) => {
                      const isChosen = item.selectedOptionId === opt.id;
                      const isAnswer = opt.isCorrect;

                      let optClass = "bg-white border-washi-200 text-gray-700";
                      if (isAnswer) {
                        optClass = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                      } else if (isChosen && !isAnswer) {
                        optClass = "bg-red-100 border-red-500 text-red-950 font-medium line-through";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${optClass}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/80 border flex items-center justify-center font-bold text-xs shrink-0">
                              {opt.label}
                            </span>
                            <span>{opt.text}</span>
                          </span>
                          {isAnswer && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                          {isChosen && !isAnswer && <XCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanations */}
                  {(item.explanation || item.explanationBn) && (
                    <div className="p-4 rounded-xl bg-white border border-washi-200 text-xs space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-japanRed-600 block">
                        Detailed Explanation:
                      </span>
                      {item.explanation && (
                        <p className="text-gray-700">{item.explanation}</p>
                      )}
                      {item.explanationBn && (
                        <p className="text-gray-600">{item.explanationBn}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="py-8 md:py-12 bg-washi-50 min-h-screen select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Bar: Test info, Timer, Progress */}
        <div className="bg-white p-5 rounded-3xl border border-washi-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy-900 text-white font-mono">
                JLPT {test.jlptLevel}
              </span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Section: {currentQ?.category?.toUpperCase()}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-navy-900 mt-1 line-clamp-1">
              {test.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm ${
                isTimeCritical
                  ? "bg-red-50 border-red-300 text-red-600 animate-pulse"
                  : "bg-washi-100 border-washi-200 text-navy-900"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>

            {/* Finish & Submit Button */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 rounded-2xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
            >
              {t.mockTest.submitExam}
            </button>
          </div>
        </div>

        {/* Question Index Pill Navigator */}
        <div className="bg-white p-4 rounded-2xl border border-washi-200 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-bold text-gray-400 mr-2">
              {t.mockTest.questionNav}:
            </span>
            {test.questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-japanRed-600 text-white shadow-md ring-2 ring-japanRed-300 scale-105"
                      : isAnswered
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-washi-100 text-gray-600 hover:bg-washi-200"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Box */}
        {currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-washi-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-washi-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600">
                Question {currentIndex + 1} of {totalQuestions} • ({currentQ.marks} Marks)
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Answered: {answeredCount} / {totalQuestions}
              </span>
            </div>

            {/* Reading Passage if present */}
            {currentQ.passage && (
              <div className="p-5 rounded-2xl bg-washi-50 border border-washi-200 text-sm leading-relaxed text-navy-900 font-japanese">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">
                  Read the passage carefully:
                </span>
                {currentQ.passage}
              </div>
            )}

            {/* Question Text (EXAM MODE: Strictly clean Kanji without furigana) */}
            <div className="font-japanese text-lg sm:text-xl font-bold text-navy-900 leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-japanRed-50 border-japanRed-500 text-navy-950 font-bold shadow-sm"
                        : "bg-white border-washi-300 text-gray-700 hover:bg-washi-50 hover:border-japanRed-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                          isSelected
                            ? "bg-japanRed-600 text-white"
                            : "bg-washi-100 text-gray-600"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="font-japanese text-sm sm:text-base">
                        {opt.text}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-japanRed-600 bg-japanRed-600 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Previous & Next Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-washi-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-washi-300 text-xs font-semibold text-navy-900 hover:bg-washi-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.mockTest.prev}</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
                  }
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-japanRed-600 text-white text-xs font-semibold transition-colors"
                >
                  <span>{t.mockTest.next}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <span>{t.mockTest.submitExam}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-washi-200 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-150">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy-900">
                  {t.mockTest.submitExam}?
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  You have answered <strong>{answeredCount}</strong> of <strong>{totalQuestions}</strong> questions.
                  Are you ready to submit for server scoring?
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={isSubmitting}
                  onClick={performSubmission}
                  className="flex-1 py-3 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Grading..." : "Yes, Submit Exam"}
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-3 rounded-xl bg-washi-100 text-navy-900 font-bold text-xs hover:bg-washi-200 transition-colors"
                >
                  Review Questions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
