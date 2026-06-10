// ── Testimonial submissions store (Vercel Blob) ─────────────────────────────
// Pending testimonial submissions are persisted to Vercel Blob — NOT the
// filesystem (serverless filesystems are read-only on Vercel, which throws
// EROFS). Each submission is written as its own private JSON object under the
// `testimonials/submissions/` prefix, so there is no read-modify-write step.
//
// Auth: @vercel/blob resolves credentials automatically via OIDC. When the
// store is connected to the project, Vercel injects the OIDC token (request
// context / VERCEL_OIDC_TOKEN) and exposes BLOB_STORE_ID — no
// BLOB_READ_WRITE_TOKEN is required in production. For local development you
// must provide credentials (e.g. `vercel env pull`, or set BLOB_READ_WRITE_TOKEN
// in .env.local); without them put()/list() throw "No blob credentials found".
//
// Published testimonials shown on the site live in `data/testimonials.ts` (a
// curated, manually-approved source). This Blob store is the private inbox of
// raw submissions awaiting review.

import { put, list } from "@vercel/blob";

export const SUBMISSIONS_PREFIX = "testimonials/submissions/";

export interface SubmissionRecord {
  id: string;
  name: string;
  /** Role or situation, e.g. "International student" — maps to `context` when published. */
  role: string;
  review: string;
  approved: boolean;
  createdAt: string;
}

export interface SubmissionListItem {
  pathname: string;
  uploadedAt: Date;
  size: number;
  /** Authenticated download URL for the private object (used by review tooling). */
  downloadUrl: string;
}

/**
 * Persist one submission as a private Blob object under SUBMISSIONS_PREFIX.
 * The pathname includes the creation time and id so it is unique (no overwrite)
 * and naturally sorts by time.
 */
export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  const pathname = `${SUBMISSIONS_PREFIX}${record.createdAt}-${record.id}.json`;
  await put(pathname, JSON.stringify(record, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

/**
 * List pending submissions (most recent first) via the Blob API. Returns
 * metadata only; the objects are private, so reading their JSON content
 * requires an authenticated/presigned request (review them in the Vercel Blob
 * dashboard, or build a protected admin route that presigns each downloadUrl).
 */
export async function listSubmissions(): Promise<SubmissionListItem[]> {
  const { blobs } = await list({ prefix: SUBMISSIONS_PREFIX });
  return blobs
    .map((b) => ({
      pathname: b.pathname,
      uploadedAt: b.uploadedAt,
      size: b.size,
      downloadUrl: b.downloadUrl,
    }))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}
