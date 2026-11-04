import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  BookOpen,
  FileQuestion,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Rakib Sensei Academy",
};

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const [
    totalCourses,
    publishedCourses,
    totalTests,
    totalQuestions,
    totalAttempts,
    recentInquiries,
    recentAttempts,
    settings,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.course.count({ where: { published: true } }),
    prisma.mockTest.count(),
    prisma.question.count(),
    prisma.testAttempt.count(),
    prisma.admissionInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.testAttempt.findMany({
      include: { mockTest: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.websiteSetting.findMany(),
  ]);

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="p-8 rounded-3xl bg-navy-950 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-japanRed-600/30 text-japanRed-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academy Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor course tuition fees, review student mock test attempts, manage inquiries, and adjust official WhatsApp admission settings.
          </p>
        </div>

        {/* Japanese Calligraphy accent */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -bottom-10 text-slate-800 font-japanese text-9xl font-extrabold opacity-40 select-none pointer-events-none"
        >
          学
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Courses
            </span>
            <div className="text-3xl font-extrabold text-navy-900">
              {publishedCourses}
            </div>
            <span className="text-[11px] text-slate-500">
              {totalCourses} total registered
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-japanRed-50 text-japanRed-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Mock Tests
            </span>
            <div className="text-3xl font-extrabold text-navy-900">
              {totalTests}
            </div>
            <span className="text-[11px] text-slate-500">
              {totalQuestions} questions in bank
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center">
            <FileQuestion className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Test Attempts
            </span>
            <div className="text-3xl font-extrabold text-emerald-600">
              {totalAttempts}
            </div>
            <span className="text-[11px] text-slate-500">Graded by server</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              WhatsApp Active
            </span>
            <div className="text-sm font-extrabold text-navy-900 truncate max-w-[140px]">
              +{settingsMap.whatsapp_number || "8801341017323"}
            </div>
            <span className="text-[11px] text-slate-500">Official Helpline</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Admission Inquiries & Recent Mock Test Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Recent Admission Inquiries
              </h3>
              <p className="text-xs text-slate-500">
                Leads submitted through the public website contact form
              </p>
            </div>
            <Link
              href="/admin/admissions"
              className="text-xs font-bold text-japanRed-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No inquiries submitted yet.
              </p>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-navy-900 block font-bold text-sm">
                      {inq.name}
                    </strong>
                    <span className="text-slate-500 font-mono">{inq.phone}</span>
                    <span className="text-slate-400 ml-2">
                      • Course: <strong>JLPT {inq.interestedCourse}</strong>
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inq.status === "NEW"
                        ? "bg-amber-100 text-amber-800"
                        : inq.status === "CONTACTED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Mock Test Submissions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Recent Mock Test Attempts
              </h3>
              <p className="text-xs text-slate-500">
                Graded attempts completed by students
              </p>
            </div>
            <Link
              href="/admin/mock-tests"
              className="text-xs font-bold text-japanRed-600 hover:underline flex items-center gap-1"
            >
              <span>Manage Tests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAttempts.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No mock test attempts recorded yet.
              </p>
            ) : (
              recentAttempts.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-navy-900 block">
                      {att.mockTest.title}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Score: <strong className="text-japanRed-600 font-bold">{att.score}</strong> / {att.totalPossible} pts
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      att.passed
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {att.passed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
