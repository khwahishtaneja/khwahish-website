import type { Metadata } from "next";
import FAQAccordion from "../components/FAQAccordion";

export const metadata: Metadata = {
  title: "1:1 Services — Khwahish Taneja",
  description:
    "Career coaching, resume rewrites, interview prep, and strategy sessions from a CHRP and active hiring manager.",
};

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";

const services = [
  {
    title: "Resume Review & Score",
    price: "$59 CAD",
    outcome:
      "Know exactly why your resume isn't landing — and how to fix it.",
    bullets: [
      "Full written review with a scored assessment",
      "Specific, actionable feedback on every section",
      "Priority changes ranked by impact",
    ],
    stripeUrl: "https://buy.stripe.com/4gM28r9KC9k07kd1DhaR200",
  },
  {
    title: "Done-for-You Resume",
    price: "$249 CAD",
    outcome:
      "A professionally rewritten resume tailored to your target roles.",
    bullets: [
      "ATS-optimised rewrite for Canadian employers",
      "Matching cover letter included",
      "Two rounds of revisions",
    ],
    stripeUrl: "https://buy.stripe.com/7sY7sLf4W9k01ZTa9NaR204",
  },
  {
    title: "LinkedIn Profile Makeover",
    price: "$129 CAD",
    outcome: "Get found by recruiters and show up as the obvious hire.",
    bullets: [
      "Headline, summary, and experience rewrite",
      "Keyword optimisation for Canadian recruiters",
      "Profile strength review",
    ],
    stripeUrl: "https://buy.stripe.com/7sY00jf4W67O0VPfu7aR202",
  },
  {
    title: "Mock Interview",
    price: "$119 CAD",
    outcome:
      "Walk into your next interview confident and fully prepared.",
    bullets: [
      "60-minute session tailored to your target role",
      "Based on a real job description you provide",
      "Written feedback and improvement notes",
    ],
    stripeUrl: "https://buy.stripe.com/aFa8wP9KCbs89sl3LpaR201",
  },
  {
    title: "Career Strategy Session",
    price: "$179 CAD",
    outcome:
      "A clear direction and a written plan from an active hiring professional.",
    bullets: [
      "90-minute 1:1 career deep-dive",
      "Analysis from a CHRP and active hiring manager",
      "Written report with my recommendations",
    ],
    stripeUrl: "https://buy.stripe.com/3cI6oHcWO3ZGfQJ0zdaR203",
  },
];

const bundleIncludes = [
  "Done-for-You Resume + Cover Letter ($249)",
  "LinkedIn Profile Makeover ($129)",
  "Career Strategy Session ($179)",
  "Mock Interview ($119)",
];

const problemCards = [
  "You've applied to dozens — maybe hundreds — of jobs, and heard back from almost none.",
  'You keep being told you need "Canadian experience," but no one will give you the first chance to earn it.',
  "You're working a job far below your qualifications, just to keep things moving.",
  "Your resume feels invisible, and no one will tell you what's actually wrong with it.",
  "Interviews make you freeze — you know you can do the work, but you can't seem to prove it in the room.",
  "You've quietly started to wonder if moving here was a mistake. (It wasn't.)",
];

const transformations = [
  {
    before: "Sending applications into silence",
    after: "A resume that gets past the filters and onto a desk",
  },
  {
    before: "Guessing what's wrong with your resume",
    after: "Clear, confident language for your accomplishments",
  },
  {
    before: "Dreading every interview",
    after: "Answers that prove what you already know you can do",
  },
  {
    before: "Applying to everything, randomly",
    after: "A focused strategy aimed at the right roles",
  },
  {
    before: "Feeling alone in the process",
    after: "A guide who's seen both sides — in your corner",
  },
];

const trustIndicators = [
  {
    title: "CHRP Certified",
    desc: "Certified Human Resources Professional — a nationally recognised credential held by Canada's HR leaders.",
  },
  {
    title: "Active hiring manager",
    desc: "I review resumes and make the call on who gets the interview. Right now, actively.",
  },
  {
    title: "Hundreds of resumes reviewed",
    desc: "I know exactly what gets read versus quietly moved to the decline pile.",
  },
  {
    title: "Real hiring decisions",
    desc: "I've seen precisely who gets chosen, and the specific reasons — every time.",
  },
  {
    title: "I was the international student",
    desc: "I didn't study the newcomer experience. I lived it, in Canada — and figured out the code.",
  },
  {
    title: "Both sides of the table",
    desc: "From overlooked international student to CHRP and hiring manager. That's the rare vantage point I bring.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy pt-[68px] pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 pt-16 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            1:1 Services
          </p>
          <h1 className="font-heading text-cream text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Ways I can help you get seen
          </h1>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Every service starts with a free 15-minute intro call — so we can
            find the right fit before you commit to anything.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 border border-cream/35 text-cream font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-cream/10 transition-colors"
          >
            Book a free intro call first
          </a>
        </div>
      </section>

      {/* ── The Problem ─────────────────────────────────────────────── */}
      <section id="problem" className="bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            You are not alone
          </p>
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-5">
            Does this sound familiar?
          </h2>
          <p className="text-navy/60 text-base sm:text-lg text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            If even a few of these describe your last several months,
            you&rsquo;re in exactly the right place — and none of it means what
            you&rsquo;ve been afraid it means.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {problemCards.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-softgray rounded-xl p-5 border border-navy/5 hover:-translate-y-0.5 transition-transform duration-200"
              >
                <span className="text-gold text-base mt-0.5 flex-shrink-0 font-bold">
                  —
                </span>
                <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-navy font-semibold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed border-t border-navy/10 pt-10">
            Here&rsquo;s what I need you to hear: this is not a verdict on your
            ability. It&rsquo;s a gap in information — and gaps can be closed.
          </p>
        </div>
      </section>

      {/* ── Hidden Gap ──────────────────────────────────────────────── */}
      <section className="bg-navy py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="w-14 h-px bg-gold mx-auto mb-9" />
          <blockquote className="font-heading text-cream text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            It&rsquo;s almost never about your ability.
          </blockquote>
          <p className="font-heading text-gold text-2xl sm:text-3xl lg:text-4xl font-bold mt-5 leading-snug">
            It&rsquo;s about translation.
          </p>
          <div className="w-14 h-px bg-gold mx-auto mt-9 mb-10" />
          <div className="space-y-5 text-cream/70 text-base sm:text-lg leading-relaxed text-left max-w-2xl mx-auto">
            <p>
              After reviewing hundreds of resumes and sitting in the hiring
              room, I kept seeing the same heartbreaking pattern: deeply capable
              people — engineers, accountants, managers, specialists — getting
              passed over. Not because they couldn&rsquo;t do the job. Because
              their resume, their LinkedIn, and their interview answers
              didn&rsquo;t communicate their value in a language Canadian
              employers recognise.
            </p>
            <p className="font-semibold text-cream">
              That&rsquo;s the gap. Closing it is the entire point of my work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Transformation ──────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-14">
            What changes when someone finally shows you how
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="bg-softgray rounded-t-xl px-6 py-4 border border-navy/10 border-b-0">
                <p className="text-navy/45 text-xs font-bold uppercase tracking-widest">
                  Where you might be now
                </p>
              </div>
              <div className="border border-navy/10 rounded-b-xl overflow-hidden">
                {transformations.map((t, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 items-start px-6 py-4 ${i < transformations.length - 1 ? "border-b border-navy/8" : ""}`}
                  >
                    <span className="text-navy/25 mt-0.5 flex-shrink-0 font-bold">
                      ✕
                    </span>
                    <p className="text-navy/60 text-sm sm:text-base leading-relaxed">
                      {t.before}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-navy rounded-t-xl px-6 py-4 border-b-0">
                <p className="text-gold text-xs font-bold uppercase tracking-widest">
                  Where we&rsquo;re headed
                </p>
              </div>
              <div className="border border-navy/10 rounded-b-xl overflow-hidden">
                {transformations.map((t, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 items-start px-6 py-4 ${i < transformations.length - 1 ? "border-b border-navy/8" : ""}`}
                  >
                    <span className="text-gold mt-0.5 flex-shrink-0 font-bold">
                      ✓
                    </span>
                    <p className="text-navy/80 text-sm sm:text-base leading-relaxed font-medium">
                      {t.after}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────── */}
      <section id="services" className="bg-softgray py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-3">
            Choose your service
          </h2>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-16 max-w-2xl mx-auto">
            Buy directly or book a free 15-min intro call first.
          </p>

          {/* Get Seen */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-heading text-navy text-xl font-bold whitespace-nowrap">
                Get Seen Services
              </h3>
              <div className="flex-1 h-px bg-navy/10" />
            </div>
            <p className="text-navy/50 text-sm mb-7">
              Career strategy, coaching, and interview prep from a CHRP and
              active hiring manager.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[services[3], services[4]].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-white rounded-xl p-6 border border-navy/8 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-heading font-bold text-navy text-lg leading-snug">
                      {s.title}
                    </h4>
                    <span className="flex-shrink-0 text-gold font-bold text-sm whitespace-nowrap">
                      {s.price}
                    </span>
                  </div>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">
                    {s.outcome}
                  </p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-navy/65 text-sm"
                      >
                        <span className="text-gold mt-0.5 flex-shrink-0 text-xs">
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="text-navy/45 text-xs text-center mb-3">
                    Ready to start? Buy directly, or book a free 15-min call
                    first.
                  </p>
                  <a
                    href={s.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity mb-2"
                  >
                    Buy now
                  </a>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-navy/25 text-navy/65 text-xs font-medium px-5 py-2.5 rounded-full hover:border-navy/50 hover:text-navy/85 transition-colors"
                  >
                    Book a free intro call
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Resume & LinkedIn */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-heading text-navy text-xl font-bold whitespace-nowrap">
                Resume &amp; LinkedIn
              </h3>
              <div className="flex-1 h-px bg-navy/10" />
            </div>
            <p className="text-navy/50 text-sm mb-7">
              Documents and profiles built to get you shortlisted — by ATS
              systems and hiring managers alike.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[services[0], services[1], services[2]].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-white rounded-xl p-6 border border-navy/8 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-heading font-bold text-navy text-lg leading-snug">
                      {s.title}
                    </h4>
                    <span className="flex-shrink-0 text-gold font-bold text-sm whitespace-nowrap">
                      {s.price}
                    </span>
                  </div>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">
                    {s.outcome}
                  </p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-navy/65 text-sm"
                      >
                        <span className="text-gold mt-0.5 flex-shrink-0 text-xs">
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="text-navy/45 text-xs text-center mb-3">
                    Ready to start? Buy directly, or book a free 15-min call
                    first.
                  </p>
                  <a
                    href={s.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity mb-2"
                  >
                    Buy now
                  </a>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-navy/25 text-navy/65 text-xs font-medium px-5 py-2.5 rounded-full hover:border-navy/50 hover:text-navy/85 transition-colors"
                  >
                    Book a free intro call
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle */}
          <div className="relative bg-navy rounded-2xl p-8 sm:p-10 border border-gold/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <span className="inline-flex items-center bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
              Best value
            </span>
            <div className="grid sm:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="font-heading text-cream text-2xl sm:text-3xl font-bold mb-2">
                  The &ldquo;Land the Job&rdquo; Bundle
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed mb-5">
                  Everything you need to get seen, get interviewed, and get
                  hired — in one package.
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-gold text-3xl font-bold">
                      $499 CAD
                    </span>
                    <span className="text-cream/35 text-sm line-through">
                      $676
                    </span>
                  </div>
                  <p className="text-gold/70 text-xs mt-1">You save $177</p>
                </div>
                <p className="text-cream/45 text-xs mb-3">
                  Ready to start? Buy directly, or book a free 15-min call
                  first.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://buy.stripe.com/eVq4gz5umeEkfQJ81FaR205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gold text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity text-center"
                  >
                    Buy now
                  </a>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-cream/30 text-cream/70 font-medium px-6 py-3.5 rounded-full text-xs hover:border-cream/55 hover:text-cream/90 transition-colors text-center"
                  >
                    Book a free intro call
                  </a>
                </div>
              </div>
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                  What&rsquo;s included
                </p>
                <ul className="space-y-3">
                  {bundleIncludes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-cream/75 text-sm"
                    >
                      <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-12">
            Questions you might have
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* ── Credibility Grid ─────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-3">
            Guidance from inside the process — not guesswork.
          </h2>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-12 max-w-xl mx-auto">
            I&rsquo;m not promising magic. I&rsquo;m offering you the inside
            view I wish I&rsquo;d had.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustIndicators.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-navy/8 hover:border-gold/40 hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-0.5 bg-gold mb-4" />
                <h3 className="font-semibold text-navy text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-navy/55 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="bg-navy py-24 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-cream text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            You don&rsquo;t have to figure this out alone.
          </h2>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&rsquo;s translate everything you already are into something
            employers can finally see. The next step is smaller than the weight
            you&rsquo;ve been carrying.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-white font-semibold px-9 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
          >
            Book a free intro call
          </a>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 md:hidden z-40 bg-navy/96 backdrop-blur-sm border-t border-cream/15 flex gap-3 px-4 py-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gold text-white text-xs font-semibold py-3 rounded-full text-center"
        >
          Book a free intro call
        </a>
      </div>
    </>
  );
}
