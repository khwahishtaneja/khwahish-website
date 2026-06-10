import Link from "next/link";
import ChecklistForm from "./components/ChecklistForm";
import DualStoryHero from "./components/DualStoryHero";
import StatsStrip from "./components/StatsStrip";
import { featuredTestimonials } from "@/data/testimonials";

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";

const gatewayCards = [
  {
    title: "1:1 Services",
    desc: "Career coaching, resume rewrites, interview prep, and strategy sessions from a CHRP and active hiring manager.",
    href: "/services",
  },
  {
    title: "Digital Resources",
    desc: "Instant-download guides, templates, and scripts built from real hiring-room insight.",
    href: "/resources",
  },
  {
    title: "For Institutions",
    desc: "Career readiness workshops and speaking for colleges and universities serving international students.",
    href: "/for-institutions",
  },
];

export default function Home() {
  return (
    <>
      {/* ── A. DUAL STORY HERO (loads instantly on page open) ─────────── */}
      <DualStoryHero />

      {/* ── B. STATS STRIP (compact one-line, counts up on scroll in) ─── */}
      <StatsStrip />

      {/* ── C. GATEWAY CARDS ─────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            Where to start
          </p>
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-3">
            How I can help you
          </h2>
          <p className="text-center text-sm italic mb-5" style={{ color: "#C8963E" }}>
            Currently accepting a limited number of 1:1 clients — availability is updated monthly.
          </p>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            Whether you need hands-on coaching, self-serve resources, or
            programming for your institution — start here.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {gatewayCards.map((card) => (
              <div
                key={card.href}
                className="flex flex-col bg-white rounded-2xl p-7 border border-navy/8 hover:border-gold/35 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-8 h-0.5 bg-gold mb-5" />
                <h3 className="font-heading font-bold text-navy text-xl mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed flex-1 mb-7">
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="block text-center bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E. DIGITAL RESOURCES ─────────────────────────────────────── */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            Instant download
          </p>
          <h2 className="font-heading text-cream text-3xl sm:text-4xl font-bold text-center mb-4">
            Digital Resources
          </h2>
          <p className="text-cream/60 text-center text-base sm:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            Guides, templates, and scripts built from real hiring-room
            experience — no call needed.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Canadian Resume Template Pack",
                price: "$19 CAD",
                desc: "An ATS-friendly, Canadian-format resume and cover letter template.",
                href: "https://khwahishtaneja.gumroad.com/l/kybftg",
              },
              {
                title: "Interview Prep Guide",
                price: "$27 CAD",
                desc: "50+ interview questions with frameworks and real insider notes from the hiring room.",
                href: "https://khwahishtaneja.gumroad.com/l/nbshf",
              },
              {
                title: "30-Day Canadian Job Search Playbook",
                price: "$27 CAD",
                desc: "A week-by-week action plan from first application to signed offer.",
                href: "https://khwahishtaneja.gumroad.com/l/pyihgc",
              },
            ].map((product) => (
              <div
                key={product.href}
                className="flex flex-col bg-navy rounded-2xl p-7 border border-cream/10 hover:border-gold/35 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-8 h-0.5 bg-gold mb-5" />
                <h3 className="font-heading font-bold text-cream text-lg mb-1 leading-snug">
                  {product.title}
                </h3>
                <p className="text-gold font-bold text-sm mb-3">{product.price}</p>
                <p className="text-cream/55 text-sm leading-relaxed flex-1 mb-7">
                  {product.desc}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Buy now →
                </a>
              </div>
            ))}
          </div>
          <p className="text-center mt-10">
            <Link
              href="/resources"
              className="text-gold text-sm font-semibold hover:underline"
            >
              See all digital resources →
            </Link>
          </p>
        </div>
      </section>

      {/* ── E2. TESTIMONIALS (hidden until a featured testimonial exists) ─ */}
      {featuredTestimonials.length > 0 && (
        <section className="bg-navy border-t border-cream/10 py-20 sm:py-28">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
              Client stories
            </p>
            <h2 className="font-heading text-cream text-3xl sm:text-4xl font-bold text-center mb-14">
              What My Clients Say
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((t) => (
                <div
                  key={`${t.name}-${t.quote.slice(0, 24)}`}
                  className="flex flex-col bg-navy rounded-2xl p-7 border border-cream/10 hover:border-gold/35 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-8 h-0.5 bg-gold mb-5" />
                  <blockquote className="text-cream/75 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-5 pt-4 border-t border-cream/10">
                    <p className="text-cream font-semibold text-sm">{t.name}</p>
                    {t.context && (
                      <p className="text-cream/45 text-xs mt-0.5">{t.context}</p>
                    )}
                  </footer>
                </div>
              ))}
            </div>
            <p className="text-center mt-10">
              <Link
                href="/testimonials"
                className="text-gold text-sm font-semibold hover:underline"
              >
                Read all reviews →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── F. FREE CHECKLIST ────────────────────────────────────────── */}
      <section id="checklist" className="bg-navy py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Start here — free.
          </p>
          <h2 className="font-heading text-cream text-3xl sm:text-4xl font-bold mb-4">
            Get the free checklist
          </h2>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
            The 12 reasons Canadian employers skip your resume — and how to fix
            each one. Enter your name and email and it&rsquo;s yours.
          </p>
          <ChecklistForm />
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 md:hidden z-40 bg-navy/96 backdrop-blur-sm border-t border-cream/15 flex gap-3 px-4 py-3">
        <a
          href="#checklist"
          className="flex-1 bg-softgray text-navy text-xs font-semibold py-3 rounded-full text-center"
        >
          Free checklist
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gold text-white text-xs font-semibold py-3 rounded-full text-center"
        >
          Book a call
        </a>
      </div>
    </>
  );
}
