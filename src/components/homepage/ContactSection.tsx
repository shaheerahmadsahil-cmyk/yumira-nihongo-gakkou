"use client";

import React, { useState } from "react";
import { MessageCircle, Send, CheckCircle2, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { submitAdmissionInquiry } from "@/app/actions/inquiry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ToriiDivider } from "@/components/shared/FujiWatermark";

export function ContactSection({ whatsappNumber }: { whatsappNumber?: string }) {
  const { locale, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedCourse: "N5",
    message: "",
  });

  const [batchMode, setBatchMode] = useState<"Online" | "Offline">("Online");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Personalized WhatsApp message with all student details pre-filled
  const studentWhatsAppUrl = React.useMemo(() => {
    const courseName = formData.interestedCourse.startsWith("N") ? `JLPT ${formData.interestedCourse}` : formData.interestedCourse;
    const modeName = batchMode === "Offline" ? "🏫 ক্যাম্পাস / অফলাইন ব্যাচ" : "🌐 অনলাইন ব্যাচ";
    const formattedMsg = `আসসালামু আলাইকুম। আমি ইউমিরা নিহোঙ্গো গাক্কোতে (Yumira Nihongo Gakkou) ভর্তির আবেদন করতে চাই।\n\n📋 আবেদনকারীর তথ্য:\n• নাম: ${formData.name || "শিক্ষার্থী"}\n• মোবাইল: ${formData.phone || "প্রদত্ত নেই"}${formData.email ? `\n• ইমেইল: ${formData.email}` : ""}\n• কোর্স: ${courseName}\n• মোড: ${modeName}\n• জিজ্ঞাসা/বার্তা: ${formData.message || "নতুন ব্যাচে ভর্তি হতে চাই"}\n\nঅনুগ্রহ করে ভর্তি প্রক্রিয়া ও ক্লাসের সময়সূচী নিশ্চিত করুন।`;
    const targetPhone = (whatsappNumber || "8801341017323").replace(/[^0-9]/g, "");
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMsg)}`;
  }, [formData, batchMode, whatsappNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      await submitAdmissionInquiry({
        ...formData,
        message: `[মোড: ${batchMode === "Offline" ? "Offline Campus" : "Online"}] ${formData.message}`.trim(),
      });
    } catch {}

    setSubmitting(false);
    setSubmitted(true);

    // Auto-open WhatsApp with all pre-filled details in a new tab/app
    if (typeof window !== "undefined") {
      window.open(studentWhatsAppUrl, "_blank");
    }
  };

  const directWhatsApp = buildWhatsAppUrl({
    courseLevel: (formData.interestedCourse as any) || "General",
    locale,
    whatsappNumber,
  });

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToriiDivider title="ADMISSION & INQUIRIES" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            {t.contact.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Helpline & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-washi-50 border border-washi-200 space-y-6">
              <h3 className="text-xl font-bold text-navy-900">
                {t.contact.whatsappDirect}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t.contact.whatsappHelp}
              </p>

              <div className="space-y-2.5">
                <a
                  href={directWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Chat on WhatsApp (+880 1341-017323)</span>
                </a>
              </div>

              <div className="pt-4 border-t border-washi-200/80 space-y-4 text-xs text-gray-600">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-japanRed-600 shrink-0" />
                  <span>+880 1341-017323 (Direct Helpline)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-japanRed-600 shrink-0" />
                  <span>admissions@yumira.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-japanRed-600 shrink-0 mt-0.5" />
                  <span>Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213</span>
                </div>
              </div>
            </div>

            {/* Visa & Career Advice Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 text-white shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-japanRed-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Career Pathway to Japan</span>
              </div>
              <h4 className="text-base font-bold">
                Student Visa & SSW Technical Internships
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                We provide free guidance on COE application, Japanese language school admission, and embassy interview coaching for registered students.
              </p>
            </div>
          </div>

          {/* Right Column: Online Admission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-washi-50 border border-washi-200 shadow-sm">
              <h3 className="text-xl font-bold text-navy-900 mb-6">
                {t.contact.formTitle}
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold">Inquiry Received / তথ্য সফলভাবে পাওয়া গেছে!</h4>
                  <p className="text-xs sm:text-sm text-emerald-800">
                    {t.contact.successMsg}
                  </p>

                  <div className="pt-2">
                    <a
                      href={studentWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>WhatsApp-এ সরাসরি নিশ্চিত করুন (+880 1341-017323)</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          interestedCourse: "N5",
                          message: "",
                        });
                      }}
                      className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      আরেকটি তথ্য পাঠান
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Hasan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                        {t.contact.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="019XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                      {t.contact.course} *
                    </label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) =>
                        setFormData({ ...formData, interestedCourse: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 focus:border-transparent transition-all"
                    >
                      <option value="N5">JLPT N5 (Complete Beginner)</option>
                      <option value="N4">JLPT N4 (Intermediate / SSW Visa)</option>
                      <option value="N3">JLPT N3 (Pre-Advanced / Career)</option>
                      <option value="JFT-Basic">JFT-Basic (A2) — SSW ওয়ার্কিং ভিসা স্পেশাল</option>
                      <option value="General">Study in Japan & General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                      {locale === "bn" ? "পছন্দের ব্যাচ মোড *" : "Preferred Batch Mode *"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBatchMode("Online")}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          batchMode === "Online"
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-washi-300 bg-white text-gray-700 hover:bg-washi-50"
                        }`}
                      >
                        <span>🌐 {locale === "bn" ? "অনলাইন ব্যাচ" : "Online Live"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBatchMode("Offline")}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          batchMode === "Offline"
                            ? "border-japanRed-600 bg-japanRed-50 text-japanRed-700 shadow-sm"
                            : "border-washi-300 bg-white text-gray-700 hover:bg-washi-50"
                        }`}
                      >
                        <span>🏫 {locale === "bn" ? "অফলাইন ক্যাম্পাস" : "Offline Campus"}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your questions or notes here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Submitting..." : t.contact.send}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
