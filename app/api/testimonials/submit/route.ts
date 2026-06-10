import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveSubmission, type SubmissionRecord } from "@/lib/testimonials-store";

// Submissions are persisted to Vercel Blob (private) — see lib/testimonials-store.
// No filesystem writes: serverless filesystems are read-only on Vercel (EROFS).

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { name, role, review } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!review || typeof review !== "string" || !review.trim()) {
    return NextResponse.json({ ok: false, message: "Review is required." }, { status: 400 });
  }

  const record: SubmissionRecord = {
    id: randomUUID(),
    name: String(name).trim(),
    role: role && typeof role === "string" ? String(role).trim() : "",
    review: String(review).trim(),
    approved: false,
    createdAt: new Date().toISOString(),
  };

  try {
    await saveSubmission(record);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("testimonials submit error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
