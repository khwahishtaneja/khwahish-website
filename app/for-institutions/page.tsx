import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Institutions — Khwahish Taneja",
  description:
    "Career readiness workshops and speaking for colleges and universities serving international students.",
};

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";
const CONTACT_EMAIL = "mailto:khwahishtaneja0105@gmail.com";

const offerings = [
  {
    title: "Career Readiness Workshops",
    desc: "Interactive sessions on the Canadian job search: resume format, ATS navigation, LinkedIn optimisation, and job search strategy. Delivered to your student cohort in person or virtually.",
  },
  {
    title: "Mock Interview Sessions",
    desc: "One-on-one or small-group mock interviews tailored to the roles your students are targeting. Real feedback from an active hiring manager.",
  },
  {
    title: "Resume Clinics",
    desc: "Drop-in or scheduled sessions where students receive direct, honest feedback on their resume — from someone who reviews resumes and decides who gets the interview.",
  },
  {
    title: "Keynote & Guest Lectures",
    desc: '"From International Student to Hired in Canada" — the inside view I wish someone had given me when I arrived, combined with what I now know from the hiring manager\'s seat.',
  },
  {
    title: "Cultural Bridge Coaching",
    desc: "Addressing the specific confidence and self-presentation gaps that students from certain cultural backgrounds often face when entering the Canadian professional context — especially around self-promotion, assertiveness, and interview style.",
  },
];

export default function ForInstitutionsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-navy pt-[68px]">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 pt-16 pb-20 sm:pb-28 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5">
            For Colleges &amp; Universities
          </p>
          <h1 className="font-heading text-cream text-4xl sm:text-5xl lg:text-[3rem] font-bold leading-tight mb-6">
            Your international students already have the skills. Let&rsquo;s
            make sure Canadian employers can see them.
          </h1>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Career readiness programming, workshops, and speaking — from a CHRP
            and active hiring manager who was once an international student
            herself.
          </p>
          <a
            href={CONTACT_EMAIL}
            className="inline-block bg-gold text-white font-semibold px-9 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* ── The Gap ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            The opportunity
          </p>
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-10 leading-tight">
            The gap is real — and it&rsquo;s fixable early.
          </h2>
          <div className="space-y-5 text-navy/70 text-base sm:text-lg leading-relaxed">
            <p>
              International students arrive in Canada with strong academic
              backgrounds and genuine ambition. But the way they were trained to
              present themselves — in interviews, on resumes, on LinkedIn —
              often doesn&rsquo;t match what Canadian employers expect.
            </p>
            <p>
              The difference isn&rsquo;t ability. It&rsquo;s framing,
              confidence, and knowing how the hiring side of the table actually
              works. That&rsquo;s exactly what I bridge.
            </p>
          </div>
        </div>
      </section>

      {/* ── What I Offer ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            Programming options
          </p>
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-4">
            What I offer
          </h2>
          <p className="text-navy/55 text-center text-base sm:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            Programs are available in-person or virtually, designed to fit your
            student population, academic calendar, and outcomes goals.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col bg-softgray rounded-xl p-6 border border-navy/8 hover:border-gold/35 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${i === 3 ? "lg:col-start-1" : ""}`}
              >
                <div className="w-8 h-0.5 bg-gold mb-4" />
                <h3 className="font-heading font-bold text-navy text-lg leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-navy/65 text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Khwahish ─────────────────────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest text-center mb-3">
            Why this is different
          </p>
          <h2 className="font-heading text-navy text-3xl sm:text-4xl font-bold text-center mb-10 leading-tight">
            Why Khwahish
          </h2>
          <div className="space-y-5 text-navy/70 text-base sm:text-lg leading-relaxed">
            <p>
              I&rsquo;m not an outside consultant who studied the international
              student experience. I lived it — arriving in Canada with no
              network, no Canadian experience, and a lot of hope. I figured out
              the code, landed a permanent role immediately after graduation, and
              progressed into a management position.
            </p>
            <p>
              I&rsquo;m now a Certified Human Resources Professional (CHRP) and
              an active hiring manager who reviews resumes and decides who gets
              the interview. I hold both sides of the experience simultaneously —
              the student&rsquo;s and the employer&rsquo;s.
            </p>
            <p className="font-semibold text-navy">
              That is an unusual and specific vantage point.
            </p>
          </div>

          {/* Credentials strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-y-2 text-center text-navy/55 text-sm font-medium bg-white rounded-2xl px-6 py-5 border border-navy/8">
            {[
              "CHRP",
              "Active Hiring Manager",
              "Former International Student",
              "Both Sides of the Table",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center">
                <span className="px-4">{item}</span>
                {i < arr.length - 1 && (
                  <span className="text-gold font-bold" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats Note ─────────────────────────────────────────────── */}
      <section className="bg-softgray py-14 border-y border-navy/8">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-navy/65 text-base sm:text-lg leading-relaxed">
            Programs are available{" "}
            <span className="font-semibold text-navy">
              in-person or virtually
            </span>
            . I work with career services teams to design sessions that fit your
            student population, academic calendar, and outcomes goals — from a
            single workshop to an ongoing partnership.
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="bg-navy py-24 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2 className="font-heading text-cream text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Let&rsquo;s discuss what would work for your students.
          </h2>
          <p className="text-cream/65 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you&rsquo;re exploring a one-time event or a recurring
            program, I&rsquo;d welcome a conversation. Reach out directly and
            we can find the right format.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT_EMAIL}
              className="inline-block bg-gold text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:opacity-90 transition-opacity"
            >
              Send an email
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-cream/35 text-cream font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:bg-cream/10 transition-colors"
            >
              Book a 15-min call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
