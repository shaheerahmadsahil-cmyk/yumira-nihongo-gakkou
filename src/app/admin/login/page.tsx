"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, KeyRound } from "lucide-react";
import { loginAdmin, checkAdminSetupStatus } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    checkAdminSetupStatus().then((res) => {
      if (!res.hasAdmin) {
        setNeedsSetup(true);
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await loginAdmin({ email, password });
    setLoading(false);

    if (res.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-washi-100/60 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-washi-200 shadow-xl space-y-6">
        {/* Brand & Title */}
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
            Yumira Admin Portal
          </h1>
          <p className="text-xs text-gray-500">
            Secure login for Yumira Nihongo Gakkou administrators.
          </p>
        </div>

        {/* First time setup alert if no admin exists */}
        {needsSetup && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>Initial Setup Required</span>
            </div>
            <p>
              No admin account exists yet. Create your first secure administrator credentials now.
            </p>
            <Link
              href="/admin/setup"
              className="inline-flex items-center gap-1 font-bold text-amber-800 underline hover:text-amber-950"
            >
              Go to First-Time Admin Setup →
            </Link>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-washi-300 bg-white focus:outline-none focus:ring-2 focus:ring-japanRed-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-navy-900 hover:bg-japanRed-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-navy-900 transition-colors"
          >
            ← Return to Academy Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
