import TestimonialForm from "../components/TestimonialForm";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-navy pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            Client stories
          </p>
          <h1 className="font-heading text-cream text-4xl sm:text-5xl font-bold mb-5">
            What My Clients Say
          </h1>
          <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Real results from professionals who worked with Khwahish to land
            their next opportunity.
          </p>
        </div>
      </section>

      {/* ── Testimonial cards ── */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          {testimonials.length === 0 ? (
            <p className="text-cream/40 text-center text-sm py-16">
              No reviews yet — check back soon, or be the first to leave one below!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
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
          )}
        </div>
      </section>

      {/* ── Submission form ── */}
      <section className="bg-navy border-t border-cream/10 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            Share your experience
          </p>
          <h2 className="font-heading text-cream text-3xl sm:text-4xl font-bold text-center mb-4">
            Leave a Review
          </h2>
          <p className="text-cream/55 text-center text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Worked with Khwahish? We&rsquo;d love to hear about your experience.
          </p>
          <TestimonialForm />
        </div>
      </section>
    </>
  );
}
