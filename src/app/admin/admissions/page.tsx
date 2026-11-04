import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { AdmissionsManager } from "@/components/admin/AdmissionsManager";

export const metadata = {
  title: "Admission Inquiries | Admin",
};

export default async function AdminAdmissionsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const inquiries = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdmissionsManager initialInquiries={inquiries} />;
}
