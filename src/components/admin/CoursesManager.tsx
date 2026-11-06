"use client";

import React, { useState } from "react";
import { updateCourseFee } from "@/app/actions/admin-auth";
import { BookOpen, Check, Edit2, Sparkles, Clock, Calendar, DollarSign } from "lucide-react";

export function CoursesManager({ initialCourses }: { initialCourses: any[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [onlineFeeInput, setOnlineFeeInput] = useState<number>(0);
  const [offlineFeeInput, setOfflineFeeInput] = useState<number>(0);
  const [durationInput, setDurationInput] = useState<string>("");
  const [scheduleInput, setScheduleInput] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const durationPresets = [
    "৩ মাস (3 Months)",
    "৪ মাস (4 Months)",
    "৫ মাস (5 Months)",
    "৬ মাস (6 Months)",
    "৯০ দিন (90 Days)",
    "১০০ দিন (100 Days)",
    "১২০ দিন (120 Days)",
    "১৮০ দিন (180 Days)",
  ];

  const schedulePresets = [
    "3 Days / Week (Evening)",
    "3 Days / Week (Morning)",
    "4 Days / Week (Regular)",
    "Friday & Saturday (Weekend)",
    "Daily Intensive (Sunday-Thursday)",
  ];

  const handleStartEdit = (course: any) => {
    setEditingId(course.id);
    setOnlineFeeInput(course.onlineFee ?? course.baseFee ?? 8000);
    setOfflineFeeInput(course.offlineFee ?? ((course.baseFee ?? 8000) + 2000));
    setDurationInput(course.duration || "4 Months");
    setScheduleInput(course.schedule || "3 Days / Week (Evening)");
  };

  const handleSaveCourse = async (courseId: string, currency: string) => {
    setSaving(true);
    setSuccessMsg(null);

    const res = await updateCourseFee(
      courseId,
      Number(onlineFeeInput),
      currency,
      Number(onlineFeeInput),
      Number(offlineFeeInput),
      durationInput.trim() || "4 Months",
      scheduleInput.trim() || "3 Days / Week"
    );
    setSaving(false);

    if (res.success) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? {
                ...c,
                baseFee: Number(onlineFeeInput),
                onlineFee: Number(onlineFeeInput),
                offlineFee: Number(offlineFeeInput),
                duration: durationInput.trim() || "4 Months",
                schedule: scheduleInput.trim() || "3 Days / Week",
              }
            : c
        )
      );
      setEditingId(null);
      setSuccessMsg("কোর্সের মেয়াদ (দিন/মাস), সময়কাল ও ফি সফলভাবে আপডেট করা হয়েছে! লাইভ সাইটে পরিবর্তন কার্যকর হয়েছে।");
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      alert("কোর্স আপডেট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            Course Management • কোর্সের মেয়াদ ও ফি নিয়ন্ত্রণ
          </h1>
          <p className="text-xs text-slate-500">
            কোর্স কত দিনের/মাসের হবে, শিডিউল এবং অনলাইন/অফলাইন ফি এখান থেকে সরাসরি পরিবর্তন করতে পারবেন। সেভ করার সাথে সাথে মূল ওয়েবসাইটে পরিবর্তন চলে আসবে।
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isEditing = editingId === course.id;
          const trans =
            course.translations?.find((t: any) => t.locale === "bn") ||
            course.translations?.find((t: any) => t.locale === "en") ||
            course.translations?.[0];

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-900 text-white">
                    JLPT {course.level}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {course.published !== false ? "Published Live" : "Draft"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900">
                  {trans?.title || `JLPT ${course.level}`}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {trans?.subtitle}
                </p>

                {/* Duration & Schedule Badges (Current values) */}
                <div className="p-3 rounded-2xl bg-washi-50 border border-washi-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-900">
                    <Clock className="w-4 h-4 text-japanRed-600 shrink-0" />
                    <div>
                      <span className="text-[11px] text-gray-500 block">কোর্সের মেয়াদ (কত দিন/মাস):</span>
                      <strong className="text-japanRed-600 text-xs sm:text-sm">{course.duration}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-navy-900 pt-1.5 border-t border-washi-200/80">
                    <Calendar className="w-4 h-4 text-navy-700 shrink-0" />
                    <div>
                      <span className="text-[11px] text-gray-500 block">ক্লাসের শিডিউল:</span>
                      <strong className="text-gray-800 text-xs">{course.schedule}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Mode vs Display Mode */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-slate-200">
                      <span className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-japanRed-600" />
                        কোর্সের মেয়াদ ও ফি এডিট করুন
                      </span>
                    </div>

                    {/* DURATION INPUT */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        ⏱️ কোর্সের মেয়াদ / কত দিন বা মাস (Duration):
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: ৪ মাস (4 Months) বা ১২০ দিন"
                        value={durationInput}
                        onChange={(e) => setDurationInput(e.target.value)}
                        className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
                      />
                      {/* Quick suggestions */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {durationPresets.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setDurationInput(preset)}
                            className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                              durationInput === preset
                                ? "bg-japanRed-600 text-white border-japanRed-600 font-bold"
                                : "bg-white text-slate-600 border-slate-200 hover:border-japanRed-300 hover:bg-rose-50"
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SCHEDULE INPUT */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        📅 ক্লাসের শিডিউল (Schedule):
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: 3 Days / Week (Evening)"
                        value={scheduleInput}
                        onChange={(e) => setScheduleInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy-500"
                      />
                      {/* Schedule suggestions */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {schedulePresets.map((sch, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setScheduleInput(sch)}
                            className={`text-[9px] px-1.5 py-0.5 rounded-md border transition-colors ${
                              scheduleInput === sch
                                ? "bg-navy-900 text-white border-navy-900 font-bold"
                                : "bg-white text-slate-600 border-slate-200 hover:border-navy-300 hover:bg-slate-100"
                            }`}
                          >
                            {sch}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FEES INPUTS */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                      <div>
                        <label className="text-[10px] font-bold text-blue-700 block mb-1">
                          🌐 অনলাইন ফি:
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={onlineFeeInput}
                          onChange={(e) => setOnlineFeeInput(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-japanRed-700 block mb-1">
                          🏫 অফলাইন ফি:
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={offlineFeeInput}
                          onChange={(e) => setOfflineFeeInput(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        disabled={saving}
                        onClick={() => handleSaveCourse(course.id, course.currency || "BDT")}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সেভ করুন"}</span>
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="py-2 px-3 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <span className="text-[11px] uppercase font-bold text-slate-500 block">
                      কোর্স ফি ও বিবরণ
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100">
                        <span className="text-[10px] font-bold text-blue-700 uppercase block">
                          🌐 অনলাইন ফি
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-navy-900">
                          ৳{new Intl.NumberFormat().format(course.onlineFee ?? course.baseFee ?? 8000)}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-japanRed-50/70 border border-japanRed-100">
                        <span className="text-[10px] font-bold text-japanRed-700 uppercase block">
                          🏫 অফলাইন ফি
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-navy-900">
                          ৳{new Intl.NumberFormat().format(course.offlineFee ?? ((course.baseFee ?? 8000) + 2000))}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleStartEdit(course)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-japanRed-600 hover:border-japanRed-300 transition-colors text-xs font-bold shadow-xs hover:shadow-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>মেয়াদ (Duration) ও ফি এডিট করুন</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
