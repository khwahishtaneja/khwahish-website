"use client";

import { useState } from "react";

const faqs = [
  {
    q: "I've already tried resume templates and generic advice. How is this different?",
    a: "I'm not a template or a generic writer. I've been in the hiring room, and I tailor everything to how Canadian employers actually evaluate you — the specific signals they look for, the way ATS filters work, and what makes a hiring manager pick up the phone.",
  },
  {
    q: "Do you guarantee I'll get a job?",
    a: "No one honest can promise that. What I can do is dramatically improve how clearly your value comes across — the part that's genuinely in our control, and the part that's been holding you back. That's a meaningful difference.",
  },
  {
    q: "I'm Canadian, not a newcomer — is this for me?",
    a: "Yes. The principles of communicating your value clearly apply to anyone who's struggling to get seen. If your applications are going unanswered, the work is the same.",
  },
  {
    q: "Is this immigration advice?",
    a: "No. I help with employment and careers, not immigration status. For immigration matters, you'll want a licensed consultant or lawyer.",
  },
  {
    q: "I can't afford much right now.",
    a: "I understand — that's exactly why I offer free resources and lower-cost products, and why giving back is built into this work. Start with the free checklist and go from there.",
  },
  {
    q: "What if my field is very technical or niche?",
    a: "The communication gap is universal. Whether you're an engineer, accountant, healthcare professional, or specialist, the core challenge is the same: translating your real expertise into the language Canadian hiring systems and managers recognise. I'll learn your field's signals alongside you.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-navy/10 rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-softgray/40 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-semibold text-navy text-sm sm:text-base pr-4 leading-snug">
              {faq.q}
            </span>
            <span className="text-gold text-xl font-light flex-shrink-0 leading-none">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-navy/75 text-sm sm:text-base leading-relaxed bg-white">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
