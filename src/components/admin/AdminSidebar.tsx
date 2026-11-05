"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Languages,
  FileQuestion,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  KeyRound,
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/admin-auth";
import { SessionPayload } from "@/lib/auth";

export function AdminSidebar({ user }: { user: SessionPayload }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login or setup page, don't show admin sidebar
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return null;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  const menu = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses & Fees", icon: BookOpen },
    { href: "/admin/kanji", label: "Kanji Library", icon: Languages },
    { href: "/admin/mock-tests", label: "Mock Tests", icon: FileQuestion },
    { href: "/admin/admissions", label: "Inquiries & Leads", icon: Users },
    { href: "/admin/settings", label: "Website Settings & Stats", icon: Settings },
    { href: "/admin/change-password", label: "Security & Password", icon: KeyRound },
  ];

  return (
    <aside className="w-full md:w-64 bg-navy-950 text-slate-300 flex flex-col justify-between shrink-0 border-r border-navy-900">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-navy-900 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-amber-300/40 shrink-0">
            <Image
              src="/images/yumira-logo.jpg"
              alt="Yumira Nihongo Gakkou Logo"
              fill
              sizes="40px"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Yumira Gakkou
            </h2>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Current User Badge */}
        <div className="px-6 py-4 bg-navy-900/60 border-b border-navy-900/80">
          <span className="text-[11px] text-slate-400 block font-medium">Logged in as:</span>
          <strong className="text-xs text-white block truncate">{user.name}</strong>
          <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-japanRed-600 text-white shadow-md shadow-japanRed-600/30"
                    : "text-slate-300 hover:text-white hover:bg-navy-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-navy-900 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
