import React from "react";
import prisma from "@/lib/db";
import { ToriiDivider } from "@/components/shared/FujiWatermark";
import { FujiWatermark } from "@/components/shared/FujiWatermark";
import { Target, Compass, Award, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export const metadata = {
  title: "About Us | Yumira Nihongo Gakkou",
  description: "Learn about Rakib Sensei Japanese Academy, our philosophy, mission, certified teachers, and pathway to Japan.",
};

export default async function AboutPage() {
  let settingsMap: Record<string, string> = {};
  try {
    const settings = await prisma.websiteSetting.findMany();
    settings.forEach((curr) => { settingsMap[curr.key] = curr.value; });
  } catch {}

  const agencyName = settingsMap.agency_name || "Yumira Nihongo Gakkou";

  return (
    <div className="py-16 md:py-24 bg-white relative">
      <FujiWatermark className="top-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ToriiDivider title="ACADEMY STORY" />

        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-japanRed-600 bg-japanRed-50 px-3 py-1 rounded-full border border-japanRed-100">
            About Our Academy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            {agencyName}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {settingsMap.agency_tagline || "Your Gateway to Japan — JLPT Preparation, Visa & Study Consultancy"}
          </p>
        </div>

        {/* Narrative Section */}
        <div className="prose prose-lg mx-auto text-gray-700 space-y-6 leading-relaxed bg-washi-50 p-8 sm:p-12 rounded-3xl border border-washi-200 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-navy-900">
            Dedicated to Linguistic Mastery & Authentic Cultural Understanding
          </h2>
          <p>
            Founded by passionate educators with long-standing academic and professional experience in Japan, <strong>{agencyName}</strong> was established to bridge the gap between aspirational youth and rewarding career opportunities in Japan.
          </p>
          <p>
            We go beyond mechanical rote memorization. Our interactive pedagogy integrates Minna no Nihongo methodologies, speech-level pitch accent training, modern audio-visual labs, and simulated exam conditions that enable students to excel in both JLPT and NAT-TEST examinations.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white border border-washi-200 shadow-sm hover:border-japanRed-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-japanRed-100 text-japanRed-600 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 mb-2">Our Mission</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Equip every student with certified linguistic ability and comprehensive visa application readiness for universities and reputable employers in Japan.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-washi-200 shadow-sm hover:border-navy-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 mb-2">Our Vision</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              To be the most trustworthy, student-centric Japanese language institute in Bangladesh, renowned for integrity, high pass rates, and genuine student welfare.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-washi-200 shadow-sm hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 mb-2">Authentic Guidance</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Transparent consultancy with zero hidden costs, helping students obtain Certificate of Eligibility (COE) and pass embassy visa interviews.
            </p>
          </div>
        </div>

        {/* Founder & Lead Sensei Profile */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white border-2 border-japanRed-500/30 shadow-xl mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                Leadership & Chief Instructor
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Muhammad Abdur Razzak
              </h2>
              <p className="text-xs sm:text-sm text-japanRed-300 font-medium">
                Founder, Director & Lead Japanese Language Sensei • ইউমিরা নিহোঙ্গো গাক্কো
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                জাপানি ভাষা শিক্ষা, JLPT/NAT-TEST প্রস্তুতি এবং স্টুডেন্ট ও SSW ওয়ার্কিং ভিসায় জাপানে ক্যারিয়ার গড়ার জন্য সরাসরি মেন্টরশিপ ও দিকনির্দেশনা প্রদান করেন। প্রতিটি শিক্ষার্থীর স্বপ্ন পূরণে ব্যক্তিগত কাউন্সেলিং নিশ্চিত করাই আমাদের লক্ষ্য।
              </p>
              <div className="pt-2">
                <a
                  href="https://www.facebook.com/muhammad.abdur.razzak.583568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <FacebookIcon className="w-4 h-4 fill-white" />
                  <span>Connect on Facebook (Muhammad Abdur Razzak)</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center space-y-3 w-full max-w-xs">
                <div className="w-16 h-16 rounded-full bg-japanRed-600/20 border-2 border-japanRed-500 text-japanRed-400 flex items-center justify-center mx-auto text-xl font-black">
                  AR
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Muhammad Abdur Razzak</h3>
                  <span className="text-[11px] text-gray-400 block">Lead Sensei</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-gray-300 space-y-1 text-left">
                  <div>✓ JLPT N5, N4, N3 Mentorship</div>
                  <div>✓ Japan Visa Documentation</div>
                  <div>✓ Direct 1-on-1 Consultation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold shadow-lg shadow-japanRed-600/30 transition-all"
          >
            Explore Academy Courses (N5, N4, N3)
          </Link>
        </div>
      </div>
    </div>
  );
}
