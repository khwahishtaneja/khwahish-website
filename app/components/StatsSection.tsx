"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    label: "of resumes are filtered out by software before a human reads them",
  },
  {
    target: 90,
    suffix: "%",
    label: "of employers use LinkedIn when filling a vacancy",
  },
  {
    target: 7.1,
    decimals: 1,
    suffix: "%",
    label: "unemployment in Canada in 2026, alongside 492,500 unfilled roles",
  },
  {
    prefix: "~",
    target: 6,
    suffix: " sec",
    label: "the average time a hiring manager spends on a first resume pass",
  },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(stat.target);
      return;
    }

    const duration = 1800;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOut(t);
      setCount(parseFloat((eased * stat.target).toFixed(stat.decimals ?? 0)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(stat.target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, stat.target, stat.decimals]);

  const displayValue = stat.decimals
    ? count.toFixed(stat.decimals)
    : Math.floor(count).toString();

  return (
    <div className="flex flex-col items-center text-center px-4 py-8">
      <p
        className="text-5xl sm:text-6xl font-bold mb-3 leading-none"
        style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "#C8963E" }}
      >
        {stat.prefix ?? ""}
        {displayValue}
        {stat.suffix}
      </p>
      <p
        className="text-sm sm:text-base leading-relaxed max-w-[200px]"
        style={{ color: "rgba(250,250,247,0.7)" }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "#1B2B4B" }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <motion.h2
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center font-bold mb-4"
          style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            color: "#FAFAF7",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            lineHeight: 1.25,
          }}
        >
          The numbers don&rsquo;t lie.
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="text-center text-sm sm:text-base mb-14 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "rgba(250,250,247,0.55)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          This is the Canadian job market in 2026 — and why how you present
          yourself has never mattered more.
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x"
          style={{ borderColor: "rgba(250,250,247,0.1)" }}
        >
          {STATS.map((stat, i) => (
            <div key={i} style={{ borderColor: "rgba(250,250,247,0.1)" }}>
              <StatCard stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
