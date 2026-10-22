import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, parentPhone, grade, subjects, preferredBatch, notes } = body;

    if (!studentName || !parentPhone) {
      return NextResponse.json(
        { success: false, error: "Student name and parent phone number are required" },
        { status: 400 }
      );
    }

    const saved = await saveInquiry({
      studentName: studentName.trim(),
      parentPhone: parentPhone.trim(),
      grade: grade || "Class 10th",
      subjects: subjects || "All Core",
      preferredBatch: preferredBatch || "Evening",
      notes: (notes || "").trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully recorded",
      inquiry: saved,
    });
  } catch (error: any) {
    console.error("Error in /api/inquiries:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry" },
      { status: 500 }
    );
  }
}
