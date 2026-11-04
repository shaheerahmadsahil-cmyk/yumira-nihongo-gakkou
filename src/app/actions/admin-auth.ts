"use server";

import prisma from "@/lib/db";
import {
  hashPassword,
  verifyPassword,
  signToken,
  setSessionCookie,
  clearSessionCookie,
  getCurrentUser,
  hasAdminAccount,
} from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const adminSetupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminLoginSchema = z.object({
  email: z.string().min(1, "Email, Username or Phone is required"),
  password: z.string().min(1, "Password is required"),
});

export async function checkAdminSetupStatus() {
  const exists = await hasAdminAccount();
  return { hasAdmin: exists };
}

export async function initialAdminSetup(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const validated = adminSetupSchema.parse(formData);

    // Security check: Only allow setup if NO admin exists
    const adminExists = await hasAdminAccount();
    if (adminExists) {
      return { success: false, error: "Admin account is already setup. Please log in." };
    }

    const passwordHash = await hashPassword(validated.password);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email.toLowerCase().trim(),
        passwordHash,
        role: "ADMIN",
      },
    });

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create admin" };
  }
}

export async function loginAdmin(formData: { email: string; password: string }) {
  try {
    const validated = adminLoginSchema.parse(formData);
    const input = validated.email.toLowerCase().trim();

    // Support finding by exact email, username, phone or generic 'admin' keyword
    let user = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        OR: [
          { email: input },
          { name: { contains: input } },
        ],
      },
    });

    if (!user && (input === "admin" || input.includes("01341017323") || input === "yumira" || input === "rakib")) {
      user = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    }

    if (!user || user.role !== "ADMIN") {
      return { success: false, error: "Invalid email/username or password" };
    }

    const isValid = await verifyPassword(validated.password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email/username or password" };
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
}

export async function logoutAdmin() {
  await clearSessionCookie();
  return { success: true };
}

export async function changePassword(formData: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await getCurrentUser();
  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) return { success: false, error: "User not found" };

  const validOld = await verifyPassword(formData.currentPassword, user.passwordHash);
  if (!validOld) {
    return { success: false, error: "Incorrect current password" };
  }

  if (formData.newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters" };
  }

  const newHash = await hashPassword(formData.newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  });

  return { success: true };
}

export async function updateCourseFee(courseId: string, baseFee: number, currency = "BDT") {
  const session = await getCurrentUser();
  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.course.update({
    where: { id: courseId },
    data: { baseFee, currency },
  });

  revalidatePath("/");
  revalidatePath("/courses");
  return { success: true };
}

export async function updateWebsiteSettings(settings: Record<string, string>) {
  const session = await getCurrentUser();
  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  for (const [key, value] of Object.entries(settings)) {
    await prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  const session = await getCurrentUser();
  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.admissionInquiry.update({
    where: { id: inquiryId },
    data: { status },
  });

  revalidatePath("/admin/admissions");
  return { success: true };
}
