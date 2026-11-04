"use client";

import React, { useState } from "react";
import { updateCourseFee } from "@/app/actions/admin-auth";
import { BookOpen, Check, Edit2, Sparkles, DollarSign } from "lucide-react";

export function CoursesManager({ initialCourses }: { initialCourses: any[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feeInput, setFeeInput] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartEdit = (course: any) => {
    setEditingId(course.id);
    setFeeInput(course.baseFee);
  };

  const handleSaveFee = async (courseId: string) => {
    setSaving(true);
    setSuccessMsg(null);

    const res = await updateCourseFee(courseId, Number(feeInput));
    setSaving(false);

    if (res.success) {
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, baseFee: Number(feeInput) } : c))
      );
      setEditingId(null);
      setSuccessMsg("Tuition fee updated successfully! Live website updated.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      alert("Failed to update fee");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            Course Management & Live Tuition Fees
          </h1>
          <p className="text-xs text-slate-500">
            Adjust published course fees in real-time. Changes immediately reflect across all public pages and WhatsApp admission links.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Courses Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isEditing = editingId === course.id;
          const enTrans = course.translations.find((t: any) => t.locale === "en") || course.translations[0];

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-900 text-white">
                    JLPT {course.level}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {course.published ? "Published Live" : "Draft"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900">
                  {enTrans?.title || `JLPT ${course.level}`}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {enTrans?.subtitle}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <div><strong>Duration:</strong> {course.duration}</div>
                  <div><strong>Schedule:</strong> {course.schedule}</div>
                </div>
              </div>

              {/* Dynamic Fee Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  Published Tuition Fee
                </span>

                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={feeInput}
                        onChange={(e) => setFeeInput(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
                      />
                      <span className="text-xs font-bold text-slate-500">
                        {course.currency}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={saving}
                        onClick={() => handleSaveFee(course.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
                      >
                        {saving ? "Saving..." : "Save Fee"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="py-2 px-3 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-navy-900">
                        {new Intl.NumberFormat().format(course.baseFee)}
                      </span>{" "}
                      <span className="text-xs font-bold text-japanRed-600">
                        {course.currency}
                      </span>
                    </div>

                    <button
                      onClick={() => handleStartEdit(course)}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-japanRed-600 hover:border-japanRed-300 transition-colors shadow-sm"
                      title="Edit Course Fee"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
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
