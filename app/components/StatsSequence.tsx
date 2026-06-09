"use client";

import { useRef, useEffect, useState } from "react";

interface StatData {
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const STATS: StatData[] = [
  {
    target: 75,
    suffix: "%",
    label: "of resumes are filtered out by software before a human reads them",
  },
  {
    target: 90,
    suffix: "%",
    label: "of employers use LinkedIn and social media when filling a vacancy",
  },
  {
    target: 7.1,
    decimals: 1,
    suffix: "%",
    label: "unemployment in Canada in 2026 — while 492,500 roles sit unfilled",
  },
  {
    prefix: "~",
    target: 6,
    suffix: " sec",
    label: "the average time a hiring manager spends on a first resume scan",
  },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatCounter({
  target,
  decimals = 0,
  active,
}: {
  target: number;
  decimals?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      const eased = easeOut(t);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, decimals]);

  return <>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}</>;
}

export default function StatsSequence() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stageStarted, setStageStarted] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const newStage = Math.min(3, Math.floor(prog * 4));

      setProgress(prog);
      setStage(newStage);
      setStageStarted((prev) => {
        if (prev[newStage]) return prev;
        const next = [...prev];
        next[newStage] = true;
        return next;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <section
        style={{ backgroundColor: "#1B2B4B", padding: "5rem 1.5rem 4rem" }}
      >
        <div
          style={{
            maxWidth: "56rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  fontWeight: 700,
                  color: "#C8963E",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {stat.prefix ?? ""}
                {stat.decimals
                  ? stat.target.toFixed(stat.decimals)
                  : stat.target}
                {stat.suffix}
              </p>
              <p
                style={{
                  color: "rgba(250,250,247,0.7)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes statsScrollBounce {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.45; }
          50%       { transform: translate(-50%, 7px); opacity: 0.8; }
        }
      `}</style>

      <div ref={outerRef} style={{ height: "400vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            backgroundColor: "#1B2B4B",
            overflow: "hidden",
          }}
        >
          {/* ── Stat panels ── */}
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2rem",
                opacity: stage === i ? 1 : 0,
                transition: "opacity 0.6s ease",
                pointerEvents: stage === i ? "auto" : "none",
              }}
            >
              {/* Big number */}
              <p
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "clamp(5.5rem, 20vw, 10rem)",
                  fontWeight: 700,
                  color: "#C8963E",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.prefix ?? ""}
                <StatCounter
                  target={stat.target}
                  decimals={stat.decimals}
                  active={stageStarted[i]}
                />
                {stat.suffix}
              </p>

              {/* Label */}
              <p
                style={{
                  color: "rgba(250,250,247,0.72)",
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  maxWidth: 500,
                  textAlign: "center",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                {stat.label}
              </p>

              {/* Stage counter — bottom right */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2.5rem",
                  right: "2rem",
                  fontSize: "0.8125rem",
                  color: "rgba(250,250,247,0.28)",
                  fontWeight: 500,
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {i + 1} of 4
              </div>
            </div>
          ))}

          {/* ── Scroll indicator — appears on last stage ── */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: stage === 3 ? 1 : 0,
              transition: "opacity 0.6s ease",
              color: "rgba(250,250,247,0.45)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              textAlign: "center",
              whiteSpace: "nowrap",
              animation:
                stage === 3
                  ? "statsScrollBounce 2s ease-in-out infinite"
                  : "none",
            }}
          >
            ↓ scroll
          </div>

          {/* ── Gold progress bar ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: "rgba(200,150,62,0.15)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, progress * 100)}%`,
                backgroundColor: "#C8963E",
                transition: "width 0.06s linear",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
