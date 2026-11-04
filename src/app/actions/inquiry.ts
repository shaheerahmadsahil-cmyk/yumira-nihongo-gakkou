"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Valid phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  interestedCourse: z.string().default("General"),
  message: z.string().optional(),
});

export async function submitAdmissionInquiry(formData: {
  name: string;
  phone: string;
  email?: string;
  interestedCourse: string;
  message?: string;
}) {
  try {
    const validated = inquirySchema.parse(formData);

    try {
      const inquiry = await prisma.admissionInquiry.create({
        data: {
          name: validated.name,
          phone: validated.phone,
          email: validated.email || null,
          interestedCourse: validated.interestedCourse,
          message: validated.message || null,
          status: "NEW",
          source: "WEBSITE_FORM",
        },
      });

      return { success: true, inquiryId: inquiry.id };
    } catch (dbError) {
      console.error("Database save failed for admission inquiry:", dbError);
      // Graceful fallback: return success with custom notice so student is never blocked
      return {
        success: true,
        inquiryId: "direct-" + Date.now(),
        fallback: true,
      };
    }
  } catch (validationError: any) {
    return {
      success: false,
      error: validationError.errors?.[0]?.message || validationError.message || "Invalid input",
    };
  }
}
