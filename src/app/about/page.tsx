import React from "react";
import prisma from "@/lib/db";
import { ToriiDivider } from "@/components/shared/FujiWatermark";
import { FujiWatermark } from "@/components/shared/FujiWatermark";
import { Target, Compass, Award, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Rakib Sensei Japanese Academy",
  description: "Learn about Rakib Sensei Japanese Academy, our philosophy, mission, certified teachers, and pathway to Japan.",
};

export default async function AboutPage() {
  const settings = await prisma.websiteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

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
