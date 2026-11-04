"use client";

import React, { useState } from "react";
import { updateWebsiteSettings } from "@/app/actions/admin-auth";
import { MessageCircle, Save, CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";

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
          Agency Settings & Official WhatsApp
        </h1>
        <p className="text-xs text-slate-500">
          Manage your official admission contact numbers, office hours, and branding. Updates are instantly published.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Website headers, footers and WhatsApp links updated.</span>
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
