import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { CoursesManager } from "@/components/admin/CoursesManager";
import { fallbackCourses } from "@/lib/fallback-data";

export const metadata = {
  title: "Course Management | Admin",
};

export default async function AdminCoursesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      include: { translations: true },
      orderBy: { level: "desc" },
    });
  } catch (error) {
    console.warn("Could not fetch courses from DB:", error);
  }

  if (!courses || courses.length === 0) {
    courses = fallbackCourses;
  }

  return <CoursesManager initialCourses={courses} />;
}
