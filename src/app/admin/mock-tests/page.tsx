import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { FileQuestion, Clock, Award, Users, Play } from "lucide-react";

export const metadata = {
  title: "Mock Tests Management | Admin",
};

export default async function AdminMockTestsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const tests = await prisma.mockTest.findMany({
    include: {
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
    orderBy: { jlptLevel: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            JLPT Mock Test Management
          </h1>
          <p className="text-xs text-slate-500">
            Create, publish, and inspect timed examination sets for N5, N4, and N3.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-900 text-white">
                  JLPT {t.jlptLevel}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {t.published ? "Active" : "Draft"}
                </span>
              </div>

              <h3 className="text-base font-bold text-navy-900">
                {t.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {t.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <div><strong>Questions:</strong> {t._count.questions} questions</div>
                <div><strong>Time Limit:</strong> {t.timeLimitMinutes} minutes</div>
                <div><strong>Total Marks:</strong> {t.totalMarks} pts (Pass: {t.passingScore} pts)</div>
                <div><strong>Student Attempts:</strong> {t._count.attempts} submissions</div>
              </div>
            </div>

            <Link
              href={`/mock-tests/${t.id}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Preview Exam Engine</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
