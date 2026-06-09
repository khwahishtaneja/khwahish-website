"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/khwahish-taneja-chrp-8b1374203/";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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

const showcaseAnnotations = [
  {
    label: "Vague duties → Quantified achievements",
    desc: "Numbers give employers something concrete to evaluate.",
  },
  {
    label: "Missing keywords → ATS-aligned terms",
    desc: "The right words get you past the filter and onto a desk.",
  },
  {
    label: "Dense blocks → Scannable structure",
    desc: "Hiring managers spend about 6 seconds on first read.",
  },
  {
    label: "Buried value → Clear positioning",
    desc: "Your most impressive work leads, always.",
  },
  {
    label: "International framing → Canadian framing",
    desc: "Same experience, translated for this market.",
  },
];

const VP = { once: true, margin: "-80px" } as const;
const headingAnim = {
  initial: { y: 28, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: VP,
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function AboutPage() {
  const prefersReduced = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, margin: "-80px" });
  const [photoFloating, setPhotoFloating] = useState(false);

  useEffect(() => {
    if (!photoInView || prefersReduced) return;
    const t = setTimeout(() => setPhotoFloating(true), 850);
    return () => clearTimeout(t);
  }, [photoInView, prefersReduced]);

  const btnHover = prefersReduced ? {} : { scale: 1.02 };
  const btnTap = prefersReduced ? {} : { scale: 0.97 };
  const btnTrans = { duration: 0.15 };

  return (
    <>
      {/* Page header */}
      <section className="bg-navy pt-[68px]">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 pb-20 sm:pb-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <motion.div
              className="relative w-full aspect-[4/5] max-w-xs sm:max-w-sm mx-auto rounded-2xl shadow-xl"
              animate={
                photoFloating && !prefersReduced ? { y: [0, -7] } : {}
              }
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <motion.div
                ref={photoRef}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={photoInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/khwahish.png"
                  alt="Khwahish Taneja, CHRP"
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 400px"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Text */}
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                About Khwahish
              </p>
              <motion.h1
                className="font-heading text-cream text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3"
                {...headingAnim}
              >
                I&rsquo;ve sat on both sides of the hiring table.
              </motion.h1>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-cream/80 text-xs font-semibold hover:bg-white/15 transition-colors mb-6"
                whileHover={btnHover}
                whileTap={btnTap}
                transition={btnTrans}
              >
                <span className="text-gold">✓</span>
                CHRP — Certified Human Resources Professional
                <LinkedInIcon className="w-3 h-3 opacity-60" />
              </motion.a>
              <div className="space-y-4 text-cream/70 text-base leading-relaxed mb-8">
                <p>
                  I came to Canada as an international student — no network, no
                  &ldquo;Canadian experience,&rdquo; and a lot of hope. I know
                  that silence after applications. I know the wall.
                </p>
                <p>
                  While studying, I landed two jobs: one on campus, one
                  part-time off campus. I turned down other offers. The moment I
                  finished my studies, I stepped into a full-time permanent
                  role. I&rsquo;ve since progressed into a management position.
                </p>
                <p>
                  I&rsquo;m now a Certified Human Resources Professional (CHRP).
                  I review resumes and make the call on who gets the interview.
                  I know exactly what Canadian hiring managers look for — and
                  what quietly gets someone skipped, even when they&rsquo;re
                  more than capable of doing the job.
                </p>
                <p>
                  That&rsquo;s the rare part: I&rsquo;ve been the international
                  student trying to break in, <em>and</em> I&rsquo;m the HR
                  professional and manager in the room deciding. I know where
                  the gap is. Helping people like you close it is the whole
                  point.
                </p>
                <p className="text-cream/80 font-medium border-l-2 border-gold pl-4">
                  Whether you arrived in Canada recently or have been here for
                  years — if the job market hasn&rsquo;t caught up with what you
                  bring, I know how to close that gap.
                </p>
              </div>
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gold text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                whileHover={btnHover}
                whileTap={btnTap}
                transition={btnTrans}
              >
                Book a free intro call
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility Grid ─────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <motion.h2
            className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-3"
            {...headingAnim}
          >
            Guidance from inside the process — not guesswork.
          </motion.h2>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-12 max-w-xl mx-auto">
            I&rsquo;m not promising magic. I&rsquo;m offering you the inside
            view I wish I&rsquo;d had.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustIndicators.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 border border-navy/8 hover:border-gold/40 hover:shadow-md transition-all duration-200"
                initial={{ y: 22, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="w-8 h-0.5 bg-gold mb-4" />
                <h3 className="font-semibold text-navy text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-navy/55 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume Showcase ──────────────────────────────────────────── */}
      <section className="bg-softgray py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <motion.h2
            className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-3"
            {...headingAnim}
          >
            See the difference a translation makes
          </motion.h2>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-12 max-w-2xl mx-auto">
            Same person. Same experience. A completely different response from
            employers. Here&rsquo;s what changes when a resume is built the way
            Canadian hiring actually works.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-navy/10 overflow-hidden">
              <div className="px-6 py-3 bg-navy/5 border-b border-navy/8">
                <span className="text-xs font-bold uppercase tracking-widest text-navy/35">
                  Before
                </span>
              </div>
              <div className="p-6 space-y-3 font-mono text-xs text-navy/45 leading-relaxed">
                <p className="text-navy/65 font-bold text-sm font-sans not-italic">
                  Project Manager — XYZ Corp (2019–2022)
                </p>
                <p>• Responsible for managing projects and teams</p>
                <p>• Handled budgets and reported to senior management</p>
                <p>• Worked with clients to ensure satisfaction</p>
                <p>• Managed stakeholder communication</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gold/30 overflow-hidden shadow-md">
              <div className="px-6 py-3 bg-gold/10 border-b border-gold/20">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  After
                </span>
              </div>
              <div className="p-6 space-y-3 font-mono text-xs text-navy/70 leading-relaxed">
                <p className="text-navy font-bold text-sm font-sans not-italic">
                  Senior Project Manager — XYZ Corp (2019–2022)
                </p>
                <p>
                  •{" "}
                  <span className="bg-gold/15 text-navy px-1 rounded">
                    Led cross-functional team of 8
                  </span>
                  , delivering 14 projects on time — a 23% improvement over the
                  previous 2-year average
                </p>
                <p>
                  •{" "}
                  <span className="bg-gold/15 text-navy px-1 rounded">
                    Managed $2.4M annual project budget
                  </span>{" "}
                  with zero cost overruns for 3 consecutive fiscal years
                </p>
                <p>
                  •{" "}
                  <span className="bg-gold/15 text-navy px-1 rounded">
                    Increased client retention by 31%
                  </span>{" "}
                  through structured stakeholder reviews and proactive risk
                  management
                </p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {showcaseAnnotations.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-xl px-4 py-4 border border-navy/8"
              >
                <p className="text-navy text-xs font-semibold mb-1">
                  {a.label}
                </p>
                <p className="text-navy/45 text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-navy/55 text-xs text-center mt-2">
            <span className="font-semibold">Illustrative example</span> —
            built to demonstrate the principles, not taken from a real client.
            Client resumes are always kept strictly confidential.
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="bg-navy py-24 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <motion.h2
            className="font-heading text-cream text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            {...headingAnim}
          >
            Ready to get seen?
          </motion.h2>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Start with a free 15-minute intro call — no commitment, just a
            conversation about where you are and what&rsquo;s possible.
          </p>
          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-white font-semibold px-9 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
            whileHover={btnHover}
            whileTap={btnTap}
            transition={btnTrans}
          >
            Book a free intro call
          </motion.a>
        </div>
      </section>
    </>
  );
}
