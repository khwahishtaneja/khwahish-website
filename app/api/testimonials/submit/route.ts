import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const FILE_PATH = join(process.cwd(), "data", "testimonials.json");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { name, role, rating, review } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!review || typeof review !== "string" || !review.trim()) {
    return NextResponse.json({ ok: false, message: "Review is required." }, { status: 400 });
  }

  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json(
      { ok: false, message: "Rating must be between 1 and 5." },
      { status: 400 }
    );
  }

  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });

    let entries: unknown[] = [];
    try {
      entries = JSON.parse(readFileSync(FILE_PATH, "utf-8"));
    } catch {
      entries = [];
    }

    entries.push({
      id: randomUUID(),
      name: String(name).trim(),
      role: role && typeof role === "string" ? String(role).trim() : "",
      rating: ratingNum,
      review: String(review).trim(),
      approved: false,
      createdAt: new Date().toISOString(),
    });

    writeFileSync(FILE_PATH, JSON.stringify(entries, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("testimonials write error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
