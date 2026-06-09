"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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

const serviceDropdownLinks = [
  { href: "/services", label: "1:1 Services" },
  { href: "/resources", label: "Digital Resources" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 ${
        scrolled || menuOpen
          ? "bg-navy shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
      style={{ transition: "background-color 0.3s, box-shadow 0.3s" }}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-cream font-bold text-lg tracking-tight hover:text-gold transition-colors"
          >
            Khwahish Taneja
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-cream/75 hover:text-cream text-sm font-medium transition-colors"
            >
              About
            </Link>

            {/* Services dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 text-cream/75 hover:text-cream text-sm font-medium transition-colors"
              >
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-navy border border-cream/15 rounded-xl shadow-2xl overflow-hidden py-2"
                >
                  {serviceDropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={closeAll}
                      className="block px-4 py-2.5 text-sm text-cream/80 hover:text-cream hover:bg-white/8 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-1.5 border-t border-cream/10" />
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-2.5 text-sm text-gold font-semibold hover:bg-white/8 transition-colors"
                  >
                    Book a Free Intro Call →
                  </a>
                </div>
              )}
            </div>

            <Link
              href="/#checklist"
              className="text-cream/75 hover:text-cream text-sm font-medium transition-colors"
            >
              Free Checklist
            </Link>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-cream/60 hover:text-cream transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Book a consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2"
            style={{ color: "#FAFAF7" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#FAFAF7"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#FAFAF7"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy border-t border-cream/20 py-5 flex flex-col gap-2">
            <Link
              href="/about"
              onClick={closeAll}
              className="text-cream/80 text-sm font-medium py-1.5"
            >
              About
            </Link>

            <div>
              <p className="text-cream/40 text-[10px] font-bold uppercase tracking-widest px-0 pt-2 pb-1">
                Services
              </p>
              {serviceDropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="block text-cream/75 text-sm font-medium py-1.5 pl-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#checklist"
              onClick={closeAll}
              className="text-cream/80 text-sm font-medium py-1.5"
            >
              Free Checklist
            </Link>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAll}
              className="inline-flex items-center gap-2 text-cream/80 text-sm font-medium py-1.5"
            >
              <LinkedInIcon className="w-4 h-4" />
              LinkedIn
            </a>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAll}
              className="bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-3"
            >
              Book a consultation
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
