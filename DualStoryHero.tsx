"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";

// ─── Typewriter helper ───────────────────────────────────────────────────────
function Typewriter({
  text,
  delay = 0,
  speed = 38,
  className,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "#C8963E",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "cursorBlink 0.8s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

// ─── Rejection badge ────────────────────────────────────────────────────────
function RejectionPaper({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{
        background: "rgba(250,250,247,0.06)",
        border: "1px solid rgba(250,250,247,0.12)",
        borderRadius: "10px",
        padding: "14px 18px",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.75rem",
        lineHeight: 1.6,
        color: "rgba(250,250,247,0.5)",
        maxWidth: 260,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -10,
          right: 14,
          background: "#c0392b",
          color: "#fff",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "2px 8px",
          borderRadius: "4px",
          textTransform: "uppercase",
        }}
      >
        Not selected
      </div>
      <p style={{ margin: 0, color: "rgba(250,250,247,0.35)", fontSize: "0.7rem" }}>
        Subject: Re: Application
      </p>
      <p style={{ margin: "6px 0 0", color: "rgba(250,250,247,0.55)" }}>
        "Thank you for your interest. After careful consideration, we have
        decided to move forward with other candidates…"
      </p>
    </motion.div>
  );
}

// ─── Hiring manager thought bubble ─────────────────────────────────────────
function HiringThought({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      style={{
        background: "rgba(200,150,62,0.12)",
        border: "1px solid rgba(200,150,62,0.28)",
        borderRadius: "10px",
        padding: "12px 16px",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.75rem",
        lineHeight: 1.6,
        color: "rgba(250,250,247,0.72)",
        maxWidth: 260,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -8,
          left: 16,
          background: "#C8963E",
          color: "#1B2B4B",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "2px 8px",
          borderRadius: "4px",
          textTransform: "uppercase",
        }}
      >
        Hiring Manager
      </div>
      <p style={{ margin: 0 }}>{text}</p>
    </motion.div>
  );
}

// ─── Role badge ─────────────────────────────────────────────────────────────
function RoleBadge({
  role,
  sub,
  icon,
  delay,
  align,
}: {
  role: string;
  sub: string;
  icon: string;
  delay: number;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        background: "rgba(250,250,247,0.06)",
        border: "1px solid rgba(250,250,247,0.1)",
        borderRadius: "999px",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <span style={{ fontSize: "1.25rem" }}>{icon}</span>
      <div>
        <p
          style={{
            margin: 0,
            color: "#C8963E",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {role}
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(250,250,247,0.55)",
            fontSize: "0.68rem",
          }}
        >
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Divider with "Now I help you" ─────────────────────────────────────────
function CenterBridge() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "0 8px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 1,
          flex: 1,
          minHeight: 40,
          background:
            "linear-gradient(to bottom, transparent, rgba(200,150,62,0.4))",
        }}
      />
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(200,150,62,0.15)",
          border: "1px solid rgba(200,150,62,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        ⟷
      </div>
      <div
        style={{
          width: 1,
          flex: 1,
          minHeight: 40,
          background:
            "linear-gradient(to top, transparent, rgba(200,150,62,0.4))",
        }}
      />
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function DualStoryHero() {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  // Phase timeline: 0=mount, 1=roles appear, 2=cards appear, 3=headline, 4=CTAs
  useEffect(() => {
    if (prefersReduced) { setPhase(4); return; }
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]);

  return (
    <>
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,150,62,0); }
          50% { box-shadow: 0 0 0 8px rgba(200,150,62,0.08); }
        }
      `}</style>

      <section
        id="hero"
        style={{
          background: "#1B2B4B",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.25rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow behind content */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 44%, rgba(200,150,62,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Top label ── */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -10 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#C8963E",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          I have sat on both sides of this table
        </motion.p>

        {/* ── Two-panel story ── */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 0,
            width: "100%",
            maxWidth: 820,
            marginBottom: "3rem",
          }}
        >
          {/* LEFT — Candidate side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-end",
              paddingRight: "1.5rem",
            }}
          >
            {phase >= 1 && (
              <RoleBadge
                role="The Candidate"
                sub="International student → Canada"
                icon="🎓"
                delay={0}
                align="right"
              />
            )}

            {phase >= 2 && (
              <>
                <RejectionPaper delay={0.05} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  style={{
                    padding: "12px 16px",
                    background: "rgba(250,250,247,0.04)",
                    border: "1px solid rgba(250,250,247,0.08)",
                    borderRadius: "10px",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(250,250,247,0.45)",
                    maxWidth: 240,
                    textAlign: "right",
                  }}
                >
                  <span style={{ color: "#C8963E" }}>6+ months</span> of
                  applications. No callbacks. Qualified — but invisible.
                </motion.div>
              </>
            )}
          </div>

          {/* CENTER bridge */}
          {phase >= 2 && <CenterBridge />}

          {/* RIGHT — Hiring manager side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
              paddingLeft: "1.5rem",
            }}
          >
            {phase >= 1 && (
              <RoleBadge
                role="The Hiring Manager"
                sub="CHRP · Recruited to Director level"
                icon="📋"
                delay={0.1}
                align="left"
              />
            )}

            {phase >= 2 && (
              <>
                <HiringThought
                  text="They're qualified. But this resume doesn't show it. I have 80 more to read. I have to move on."
                  delay={0.15}
                />
                <HiringThought
                  text="I genuinely wish they knew what I was looking for. I'd hire them."
                  delay={0.4}
                />
              </>
            )}
          </div>
        </div>

        {/* ── Headline — typewriter ── */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", maxWidth: 680, marginBottom: "1.5rem" }}
          >
            <h1
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
                fontWeight: 700,
                color: "#FAFAF7",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              <Typewriter
                text="I know what the hiring room sees."
                delay={0}
                speed={36}
              />
              <br />
              <span style={{ color: "#C8963E" }}>
                <Typewriter
                  text="Now I help you be seen."
                  delay={1100}
                  speed={42}
                />
              </span>
            </h1>
          </motion.div>
        )}

        {/* Sub-headline */}
        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              color: "rgba(250,250,247,0.62)",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
              textAlign: "center",
              maxWidth: 560,
              marginBottom: "2.5rem",
            }}
          >
            CHRP-certified. Active hiring manager. I&rsquo;ve reviewed
            thousands of resumes and sat in rooms deciding who gets called — and
            who doesn&rsquo;t. That&rsquo;s what I bring to your job search.
          </motion.p>
        )}

        {/* ── CTAs ── */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.875rem",
              justifyContent: "center",
            }}
          >
            <a
              href="#checklist"
              style={{
                background: "#C8963E",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "14px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                letterSpacing: "0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.88")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              Get the free resume checklist
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "1px solid rgba(250,250,247,0.3)",
                color: "#FAFAF7",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "14px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background =
                  "rgba(250,250,247,0.08)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background = "transparent")
              }
            >
              Book a free intro call
            </a>
          </motion.div>
        )}

        {/* CHRP badge */}
        {phase >= 4 && (
          <motion.a
            href="https://www.linkedin.com/in/khwahish-taneja-chrp-8b1374203/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "8px 16px",
              textDecoration: "none",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(250,250,247,0.7)",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#C8963E" }}>✓</span>
            CHRP — Certified Human Resources Professional
          </motion.a>
        )}
      </section>
    </>
  );
}
