"use client";

import React, { useState } from "react";
import { updateWebsiteSettings } from "@/app/actions/admin-auth";
import { MessageCircle, Save, CheckCircle2, Phone, Mail, MapPin, Clock, BarChart3, Sparkles } from "lucide-react";

export function SettingsManager({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [formData, setFormData] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const res = await updateWebsiteSettings(formData);
    setSaving(false);

    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Failed to save settings");
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">
          Agency Settings & Homepage Stats
        </h1>
        <p className="text-xs text-slate-500">
          Manage your official admission contact numbers, office hours, and homepage achievement metrics. Updates are instantly published.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Website headers, footers and homepage statistics updated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        {/* WhatsApp Admission Section */}
        <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>Official Admission WhatsApp Number</span>
          </div>
          <p className="text-xs text-emerald-700">
            Every admission CTA on the homepage, course pages, and floating button connects directly to this number with prefilled multilingual messages.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              International WhatsApp Number (digits only, e.g. 8801341017323)
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp_number || "8801341017323"}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp_number: e.target.value })
              }
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-emerald-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Homepage Statistics & Achievement Metrics */}
        <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>হোমপেজ পরিসংখ্যান ও সাফল্য মেট্রিক্স (Achievement Statistics)</span>
          </div>
          <p className="text-xs text-indigo-800">
            হোমপেজের হিরো সেকশনে প্রদর্শিত ৪টি সাফল্যের স্ট্যাটাস কার্ড এখান থেকে সরাসরি পরিবর্তন করতে পারবেন।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Metric 1 */}
            <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-japanRed-600 uppercase tracking-wider">
                  কার্ড ১ • পাস রেট
                </span>
                <span className="text-[10px] bg-japanRed-50 text-japanRed-700 px-2 py-0.5 rounded-full font-bold">
                  Card 1
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  সংখ্যা / পারসেন্টেজ (যেমন: ৯৫%+)
                </label>
                <input
                  type="text"
                  value={formData.stat_success_rate ?? "৯৫%+"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_success_rate: e.target.value })
                  }
                  placeholder="৯৫%+"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold text-japanRed-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  বিবরণ / সাবটাইটেল
                </label>
                <input
                  type="text"
                  value={formData.stat_success_label ?? "জেএলপিটি প্রথমবারেই পাস"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_success_label: e.target.value })
                  }
                  placeholder="জেএলপিটি প্রথমবারেই পাস"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  কার্ড ২ • শিক্ষার্থী সংখ্যা
                </span>
                <span className="text-[10px] bg-navy-50 text-navy-800 px-2 py-0.5 rounded-full font-bold">
                  Card 2
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  সংখ্যা (যেমন: ১,৫০০+)
                </label>
                <input
                  type="text"
                  value={formData.stat_students ?? "১,৫০০+"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_students: e.target.value })
                  }
                  placeholder="১,৫০০+"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  বিবরণ / সাবটাইটেল
                </label>
                <input
                  type="text"
                  value={formData.stat_students_label ?? "সফল শিক্ষার্থী"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_students_label: e.target.value })
                  }
                  placeholder="সফল শিক্ষার্থী"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-japanRed-600 uppercase tracking-wider">
                  কার্ড ৩ • ভিসা সহায়তা সাকসেস
                </span>
                <span className="text-[10px] bg-japanRed-50 text-japanRed-700 px-2 py-0.5 rounded-full font-bold">
                  Card 3
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  সংখ্যা / পারসেন্টেজ (যেমন: ৯৮%)
                </label>
                <input
                  type="text"
                  value={formData.stat_visas ?? "৯৮%"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_visas: e.target.value })
                  }
                  placeholder="৯৮%"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold text-japanRed-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  বিবরণ / সাবটাইটেল
                </label>
                <input
                  type="text"
                  value={formData.stat_visas_label ?? "ভিসা সহায়তা সাকসেস"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_visas_label: e.target.value })
                  }
                  placeholder="ভিসা সহায়তা সাকসেস"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  কার্ড ৪ • অডিও ও মক টেস্ট
                </span>
                <span className="text-[10px] bg-navy-50 text-navy-800 px-2 py-0.5 rounded-full font-bold">
                  Card 4
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  সংখ্যা / পারসেন্টেজ (যেমন: ১০০%)
                </label>
                <input
                  type="text"
                  value={formData.stat_native_audio ?? "১০০%"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_native_audio: e.target.value })
                  }
                  placeholder="১০০%"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  বিবরণ / সাবটাইটেল
                </label>
                <input
                  type="text"
                  value={formData.stat_native_audio_label ?? "নেটিভ অডিও ও মক টেস্ট"}
                  onChange={(e) =>
                    setFormData({ ...formData, stat_native_audio_label: e.target.value })
                  }
                  placeholder="নেটিভ অডিও ও মক টেস্ট"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Agency Identity & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Agency Name
            </label>
            <input
              type="text"
              required
              value={formData.agency_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, agency_name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Agency Tagline
            </label>
            <input
              type="text"
              value={formData.agency_tagline || ""}
              onChange={(e) =>
                setFormData({ ...formData, agency_tagline: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Helpline Phone Number
            </label>
            <input
              type="text"
              value={formData.agency_phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, agency_phone: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={formData.agency_email || ""}
              onChange={(e) =>
                setFormData({ ...formData, agency_email: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Campus Address
            </label>
            <input
              type="text"
              value={formData.agency_address || ""}
              onChange={(e) =>
                setFormData({ ...formData, agency_address: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Weekly Office Hours
            </label>
            <input
              type="text"
              value={formData.office_hours || ""}
              onChange={(e) =>
                setFormData({ ...formData, office_hours: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-japanRed-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}