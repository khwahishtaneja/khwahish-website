"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const HEADLINE_WORDS = [
  "You're", "probably", "more", "qualified", "than", "you", "think.",
];

const TRUST_ITEMS = [
  "CHRP",
  "Active Hiring Manager",
  "Career Mentor",
  "Both Sides of the Table",
];

const RESUME_LINES = [
  { left: 20, top: 88, width: 168 },
  { left: 20, top: 98, width: 143 },
  { left: 20, top: 108, width: 158 },
  { left: 20, top: 142, width: 152 },
  { left: 20, top: 152, width: 128 },
  { left: 20, top: 162, width: 163 },
  { left: 20, top: 172, width: 138 },
  { left: 20, top: 208, width: 148 },
];

export default function HeroAnimation() {
  const prefersReduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("heroAnimPlayed")) {
      setDone(true);
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("heroAnimPlayed", "1");
    }
  }, []);

  if (prefersReduced || done) return null;

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: 100,
        backgroundColor: "#1B2B4B",
        pointerEvents: "none",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.9, duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={() => setDone(true)}
    >
      {/* Phase 1: Radial spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(255,255,255,0.25) 0%, transparent 58%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Main content column */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.75rem",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Phase 2+3+4+5: Resume card area */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Phase 4: Stamp — descends and retreats without landing */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "60%",
              transform: "translateX(-50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#BC5A3C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "white",
              fontWeight: "bold",
              zIndex: 10,
            }}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: [-90, -6, -90], opacity: [0, 1, 0] }}
            transition={{
              delay: 2.2,
              duration: 0.4,
              times: [0, 0.65, 1],
              ease: ["easeOut", "easeIn"],
            }}
          >
            ✕
          </motion.div>

          {/* Phase 5: 3D flip container */}
          <div style={{ perspective: 1200 }}>
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                position: "relative",
                width: 220,
                height: 280,
              }}
              animate={{ rotateY: 180 }}
              transition={{ delay: 2.6, duration: 0.7, ease: "easeInOut" }}
            >
              {/* Front face — resume */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                {/* Name line */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 20,
                    width: 138,
                    height: 7,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 2,
                  }}
                />
                {/* Contact lines */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 36,
                    width: 93,
                    height: 3,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 120,
                    top: 36,
                    width: 72,
                    height: 3,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 1,
                  }}
                />
                {/* Gold divider */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 50,
                    right: 20,
                    height: 1.5,
                    backgroundColor: "#C8963E",
                    opacity: 0.85,
                  }}
                />
                {/* Section header 1 */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 64,
                    width: 76,
                    height: 5,
                    backgroundColor: "rgba(255,255,255,0.65)",
                    borderRadius: 1,
                  }}
                />
                {/* Section header 2 */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 124,
                    width: 63,
                    height: 5,
                    backgroundColor: "rgba(255,255,255,0.65)",
                    borderRadius: 1,
                  }}
                />
                {/* Section header 3 */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 190,
                    width: 56,
                    height: 5,
                    backgroundColor: "rgba(255,255,255,0.65)",
                    borderRadius: 1,
                  }}
                />
                {/* Phase 3: Staggered bullet lines */}
                {RESUME_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    transition={{ delay: 1.6 + i * 0.1, duration: 0.2 }}
                    style={{
                      position: "absolute",
                      left: line.left,
                      top: line.top,
                      width: line.width,
                      height: 3,
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>

              {/* Back face — hiring manager view */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: "#FEF9F2",
                  borderRadius: 6,
                  border: "2px solid #C8963E",
                }}
                initial={{ boxShadow: "none" }}
                animate={{ boxShadow: "0 0 28px rgba(200,150,62,0.38)" }}
                transition={{ delay: 3.25, duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Phase 6: Headline word by word */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.45rem",
            maxWidth: 540,
            textAlign: "center",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.4rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#FAFAF7",
                lineHeight: 1.25,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 3.3 + i * 0.08,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Phase 7: Trust bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem 1.25rem",
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.span
              key={i}
              style={{
                color: "rgba(250,250,247,0.72)",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
              initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 4.0 + i * 0.15, duration: 0.4, ease: "easeOut" }}
            >
              {item}
              {i < TRUST_ITEMS.length - 1 && (
                <span style={{ color: "#C8963E", marginLeft: "1.25rem" }}>·</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Phase 8: CTA buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <motion.div
            style={{
              backgroundColor: "#C8963E",
              color: "white",
              fontWeight: 600,
              padding: "0.875rem 1.625rem",
              borderRadius: 9999,
              fontSize: "0.875rem",
              cursor: "default",
            }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.4, ease: "easeOut" }}
          >
            Get the free resume checklist
          </motion.div>
          <motion.div
            style={{
              border: "1px solid rgba(250,250,247,0.35)",
              color: "#FAFAF7",
              fontWeight: 600,
              padding: "0.875rem 1.625rem",
              borderRadius: 9999,
              fontSize: "0.875rem",
              cursor: "default",
            }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4.62, duration: 0.4, ease: "easeOut" }}
          >
            Book a free intro call
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
