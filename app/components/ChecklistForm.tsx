"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ChecklistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
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
      <div className="text-center space-y-5">
        <p className="font-heading text-cream text-2xl font-bold">
          It&rsquo;s on its way!
        </p>
        <p className="text-cream/75 text-base">
          Check your inbox — and here&rsquo;s your copy right now:
        </p>
        <a
          href="/checklist.pdf"
          download
          className="inline-block bg-gold text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          Download the checklist ↓
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="First name"
          className="flex-1 px-5 py-3.5 rounded-full text-navy placeholder-navy/40 bg-white focus:outline-none focus:ring-2 focus:ring-gold text-sm"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="flex-1 px-5 py-3.5 rounded-full text-navy placeholder-navy/40 bg-white focus:outline-none focus:ring-2 focus:ring-gold text-sm"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 flex-shrink-0 accent-gold"
        />
        <span className="text-cream/65 text-xs leading-relaxed">
          I agree to receive occasional emails from Khwahish Taneja. Unsubscribe anytime.
        </span>
      </label>

      {state === "error" && (
        <div className="space-y-3">
          <p className="text-red-300 text-sm text-center">{errorMsg}</p>
          <p className="text-cream/60 text-xs text-center">
            You can still{" "}
            <a href="/checklist.pdf" download className="underline text-gold hover:opacity-80">
              download the checklist directly
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-gold text-white font-semibold px-6 py-4 rounded-full hover:opacity-90 transition-opacity text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Sending…" : "Send me the checklist"}
      </button>
    </form>
  );
}
