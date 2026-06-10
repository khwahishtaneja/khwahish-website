import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

// Pending testimonial submissions are persisted to Vercel Blob (private store)
// when BLOB_READ_WRITE_TOKEN is available — i.e. in production on Vercel, where
// the token is injected automatically once a Blob store is connected. Each
// submission is written as its own JSON object under `testimonials/submissions/`
// so there are no read-modify-write races; review them in the Vercel Blob
// dashboard and paste approved ones into `data/testimonials.ts`.
//
// Locally (no token), submissions fall back to `data/testimonials.json` so the
// form still works in `next dev` without any setup. NOTE: this local file is an
// inbox only — the published testimonials live in `data/testimonials.ts`.

interface SubmissionRecord {
  id: string;
  name: string;
  role: string;
  review: string;
  approved: boolean;
  createdAt: string;
}

function saveToLocalFile(record: SubmissionRecord) {
  const filePath = join(process.cwd(), "data", "testimonials.json");
  mkdirSync(join(process.cwd(), "data"), { recursive: true });

  let entries: unknown[] = [];
  try {
    entries = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    entries = [];
  }

  entries.push(record);
  writeFileSync(filePath, JSON.stringify(entries, null, 2), "utf-8");
}

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
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      await put(
        `testimonials/submissions/${record.id}.json`,
        JSON.stringify(record, null, 2),
        {
          access: "private",
          contentType: "application/json",
          addRandomSuffix: false,
        }
      );
    } else {
      saveToLocalFile(record);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("testimonials submit error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
