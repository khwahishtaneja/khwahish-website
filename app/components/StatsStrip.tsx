"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Stat {
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  {
    target: 75,
    suffix: "%",
    label: "of resumes filtered before a human reads them",
  },
  {
    target: 90,
    suffix: "%",
    label: "of employers check LinkedIn when hiring",
  },
  {
    target: 7.1,
    decimals: 1,
    suffix: "%",
    label: "unemployment — while 492K roles sit unfilled",
  },
  {
    prefix: "~",
    target: 6,
    suffix: " sec",
    label: "avg. time a hiring manager spends on your resume",
  },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({
  target,
  decimals = 0,
  active,
}: {
  target: number;
  decimals?: number;
  active: boolean;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const dur = 1000;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      setVal(parseFloat((easeOut(t) * target).toFixed(decimals)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setVal(target);
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, target, decimals]);

  return <>{decimals ? val.toFixed(decimals) : Math.floor(val)}</>;
}

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const active = !!prefersReduced || inView;

  return (
    <section
      ref={ref}
      style={{
        background: "#111d33",
        borderTop: "1px solid rgba(200,150,62,0.15)",
        borderBottom: "1px solid rgba(200,150,62,0.15)",
        padding: "2rem 1.25rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0",
        }}
        className="stats-strip-grid"
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "0.5rem 1rem",
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(250,250,247,0.08)"
                  : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "#C8963E",
                lineHeight: 1,
                margin: "0 0 0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.prefix ?? ""}
              <Counter target={stat.target} decimals={stat.decimals} active={active} />
              {stat.suffix}
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                color: "rgba(250,250,247,0.5)",
                fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: 180,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive: 2-col on small screens */}
      <style>{`
        @media (max-width: 640px) {
          .stats-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem 0 !important;
          }
          .stats-strip-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(250,250,247,0.07);
            padding-bottom: 1.25rem !important;
          }
          .stats-strip-grid > div:nth-child(3),
          .stats-strip-grid > div:nth-child(4) {
            border-bottom: none !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .stats-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem 0 !important;
          }
          .stats-strip-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-strip-grid > div:nth-child(3) {
            border-right: 1px solid rgba(250,250,247,0.08) !important;
            border-top: 1px solid rgba(250,250,247,0.08) !important;
            padding-top: 1.25rem !important;
          }
          .stats-strip-grid > div:nth-child(4) {
            border-top: 1px solid rgba(250,250,247,0.08) !important;
            padding-top: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
