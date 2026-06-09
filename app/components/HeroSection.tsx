"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/khwahish-taneja-chrp-8b1374203/";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const show = !!prefersReduced || inView;

  const hidden = { y: 24, opacity: 0 } as const;
  const visible = { y: 0, opacity: 1 } as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-navy min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* ── Text column ── */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={prefersReduced ? {} : hidden}
            animate={show ? visible : hidden}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
          >
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5 leading-relaxed">
              For professionals in Canada who are qualified, capable, and tired
              of being overlooked.
            </p>
            <h1 className="font-heading text-cream text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-5">
              You&rsquo;re probably more qualified than you think.
            </h1>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-cream/80 text-xs font-semibold hover:bg-white/15 transition-colors mb-6"
            >
              <span className="text-gold">✓</span>
              CHRP — Certified Human Resources Professional
              <LinkedInIcon className="w-3.5 h-3.5 opacity-60" />
            </a>
            <p className="text-cream/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              If you&rsquo;re applying and hearing nothing back, it usually
              isn&rsquo;t your experience that&rsquo;s the problem — it&rsquo;s
              that no one ever taught you how to show it the way Canadian
              employers need to see it. I&rsquo;ve reviewed the resumes and sat
              in the hiring room. Now I help you get seen.
            </p>

            {/* CTAs — staggered in 0.4s after text */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={prefersReduced ? {} : hidden}
              animate={show ? visible : hidden}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <a
                href="#checklist"
                className="bg-gold text-white font-semibold px-7 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity text-center"
              >
                Get the free resume checklist
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream/35 text-cream font-semibold px-7 py-4 rounded-full text-sm sm:text-base hover:bg-cream/10 transition-colors text-center"
              >
                Book a free intro call
              </a>
            </motion.div>
          </motion.div>

          {/* ── Photo column — fades in 0.2s after text ── */}
          <motion.div
            className="flex-shrink-0 flex justify-center"
            initial={prefersReduced ? {} : hidden}
            animate={show ? visible : hidden}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full overflow-hidden ring-4 ring-gold/40 shadow-2xl">
              <Image
                src="/khwahish.png"
                alt="Khwahish Taneja, CHRP"
                fill
                sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 340px"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
