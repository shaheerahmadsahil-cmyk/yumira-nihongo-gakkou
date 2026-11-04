"use client";

import React, { useState } from "react";
import { updateInquiryStatus } from "@/app/actions/admin-auth";
import { MessageCircle, Phone, Mail, Clock, Check, Filter } from "lucide-react";

export function AdmissionsManager({ initialInquiries }: { initialInquiries: any[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [filterCourse, setFilterCourse] = useState("ALL");

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateInquiryStatus(id, newStatus);
    if (res.success) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
  };

  const filtered = inquiries.filter((inq) => {
    if (filterCourse === "ALL") return true;
    return inq.interestedCourse === filterCourse;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">
            Admission Inquiries & Leads
          </h1>
          <p className="text-xs text-slate-500">
            Manage inquiries submitted by prospective students. Track status and initiate direct WhatsApp contact.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
          >
            <option value="ALL">All Courses</option>
            <option value="N5">JLPT N5</option>
            <option value="N4">JLPT N4</option>
            <option value="N3">JLPT N3</option>
            <option value="General">General / Visa</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No admission inquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Student Info</th>
                  <th className="py-4 px-6">Interested Level</th>
                  <th className="py-4 px-6">Message / Notes</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inq) => {
                  const cleanedPhone = inq.phone.replace(/[^0-9]/g, "");
                  const studentWhatsApp = `https://wa.me/${cleanedPhone.startsWith("88") ? cleanedPhone : "88" + cleanedPhone}`;

                  return (
                    <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 space-y-1">
                        <strong className="text-navy-900 font-bold text-sm block">
                          {inq.name}
                        </strong>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{inq.phone}</span>
                        </div>
                        {inq.email && (
                          <div className="flex items-center gap-2 text-slate-400">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-navy-900 text-white">
                          JLPT {inq.interestedCourse}
                        </span>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="line-clamp-2 text-slate-700">
                          {inq.message || "— No additional message —"}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${
                            inq.status === "NEW"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : inq.status === "CONTACTED"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : inq.status === "ENROLLED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-600 border-slate-300"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ENROLLED">ENROLLED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      <td className="py-4 px-6">
                        <a
                          href={studentWhatsApp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
