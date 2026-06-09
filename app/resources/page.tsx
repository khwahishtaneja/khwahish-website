import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Resources — Khwahish Taneja",
  description:
    "Instant-download guides, templates, and scripts built from real hiring-room experience.",
};

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";

const digitalProducts = [
  {
    title: "Canadian Resume Template Pack",
    price: "$19 CAD",
    desc: "An ATS-friendly, Canadian-format resume and cover letter template.",
    url: "https://khwahishtaneja.gumroad.com/l/kybftg",
  },
  {
    title: "First Job in Canada Resume Template",
    price: "$19 CAD",
    desc: "Two templates for candidates with no or limited Canadian experience.",
    url: "https://khwahishtaneja.gumroad.com/l/xexcnt",
  },
  {
    title: "The Canadian Interview Prep Guide",
    price: "$27 CAD",
    desc: "50+ interview questions with frameworks and real insider notes.",
    url: "https://khwahishtaneja.gumroad.com/l/nbshf",
  },
  {
    title: "The 30-Day Canadian Job Search Playbook",
    price: "$27 CAD",
    desc: "A week-by-week action plan from first application to signed offer.",
    url: "https://khwahishtaneja.gumroad.com/l/pyihgc",
  },
  {
    title: "The Canadian Salary Negotiation Script Pack",
    price: "$22 CAD",
    desc: "8 copy-paste scripts from the hiring manager on the receiving end.",
    url: "https://khwahishtaneja.gumroad.com/l/irzsxr",
  },
  {
    title: "The Canadian LinkedIn Profile Optimization Guide",
    price: "$19 CAD",
    desc: "Section-by-section guide to getting found by Canadian recruiters.",
    url: "https://khwahishtaneja.gumroad.com/l/kuoilwh",
  },
  {
    title: "The Canadian Networking Script Pack",
    price: "$15 CAD",
    desc: "12 word-for-word scripts for every networking scenario you freeze on.",
    url: "https://khwahishtaneja.gumroad.com/l/qgzfhs",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy pt-[68px] pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 pt-16 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Digital Resources
          </p>
          <h1 className="font-heading text-cream text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Resources you can use right now
          </h1>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Instant-download guides, templates, and scripts — built from real
            hiring-room experience. No call needed.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {digitalProducts.map((p, i) => (
              <div
                key={i}
                className="flex flex-col bg-white rounded-xl p-6 border border-navy/8 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-8 h-0.5 bg-gold mb-4" />
                <h3 className="font-heading font-bold text-navy text-lg leading-snug mb-1">
                  {p.title}
                </h3>
                <p className="text-gold font-bold text-sm mb-3">{p.price}</p>
                <p className="text-navy/60 text-sm leading-relaxed flex-1 mb-6">
                  {p.desc}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gold text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Buy now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="bg-navy py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Need more support?
          </p>
          <h2 className="font-heading text-cream text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            Ready for hands-on help?
          </h2>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
            The resources are a great starting point — but if you want a CHRP
            and active hiring manager in your corner directly, my 1:1 services
            take you all the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-block bg-gold text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
            >
              See 1:1 Services
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-cream/35 text-cream font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:bg-cream/10 transition-colors"
            >
              Book a free intro call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
