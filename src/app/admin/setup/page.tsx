"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { initialAdminSetup, checkAdminSetupStatus } from "@/app/actions/admin-auth";

export default function AdminSetupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alreadyExists, setAlreadyExists] = useState(false);

  useEffect(() => {
    checkAdminSetupStatus().then((res) => {
      if (res.hasAdmin) {
        setAlreadyExists(true);
      }
    });
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const res = await initialAdminSetup({ name, email, password });
    setLoading(false);

    if (res.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Setup failed");
    }
  };

  if (alreadyExists) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center bg-washi-100/60 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-washi-200 shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-navy-900">
            Admin Already Configured
          </h2>
          <p className="text-xs text-gray-500">
            An administrator account has already been registered on this system.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-bold text-xs"
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-washi-100/60 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-washi-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-20 h-20 mx-auto rounded-3xl overflow-hidden bg-white shadow-xl border-2 border-amber-300/60 mb-4">
            <Image
              src="/images/yumira-logo.jpg"
              alt="Yumira Nihongo Gakkou Logo"
              fill
              sizes="80px"
              className="object-cover object-center"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900">
            First-Time Admin Setup
          </h1>
          <p className="text-xs text-gray-500">
            Create your primary administrator account for Yumira Nihongo Gakkou.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Sensei Rakib"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@rakibsensei.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Create Password (min. 6 characters)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-japanRed-600 hover:bg-japanRed-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <span>{loading ? "Creating Admin..." : "Complete Setup & Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
