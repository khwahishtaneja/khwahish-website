"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select a star rating.");
      setState("error");
      return;
    }
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, rating, review }),
      });
      const data = await res.json();

      if (data.ok) {
        setState("success");
      } else {
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <p className="font-heading text-cream text-2xl font-bold mb-3">
          Thank you!
        </p>
        <p className="text-cream/65 text-base">
          Your review has been submitted and will appear once approved.
        </p>
      </div>
    );
  }

  const displayRating = hovered || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
            First name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Priya"
            className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
            style={{ background: "rgba(250,250,247,0.06)" }}
          />
        </div>
        <div>
          <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
            Role or situation{" "}
            <span className="text-cream/35 font-normal normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. International student"
            className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
            style={{ background: "rgba(250,250,247,0.06)" }}
          />
        </div>
      </div>

      <div>
        <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
          Rating *
        </label>
        <div className="flex gap-1" role="group" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
              className="text-3xl leading-none transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              style={{
                color:
                  star <= displayRating
                    ? "#C8963E"
                    : "rgba(250,250,247,0.2)",
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-cream/70 text-xs font-semibold uppercase tracking-wider mb-2">
          Your review *
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          rows={5}
          placeholder="Share your experience working with Khwahish…"
          className="w-full px-4 py-3 rounded-xl border border-cream/15 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold text-sm leading-relaxed resize-none"
          style={{ background: "rgba(250,250,247,0.06)" }}
        />
      </div>

      {state === "error" && (
        <p className="text-red-300 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-gold text-white font-semibold px-6 py-4 rounded-full hover:opacity-90 transition-opacity text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Submitting…" : "Submit my review"}
      </button>

      <p className="text-cream/35 text-xs text-center">
        Reviews are manually reviewed before being published.
      </p>
    </form>
  );
}
