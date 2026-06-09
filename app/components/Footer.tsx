import Link from "next/link";

const BOOKING_URL = "https://cal.com/khwahishtaneja/free-15-min-intro-call";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/khwahish-taneja-chrp-8b1374203/";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0F1B2F] py-12 pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <p className="font-heading text-cream text-lg font-bold mb-1">
              Khwahish Taneja
            </p>
            <p className="text-cream/40 text-sm leading-relaxed mb-3">
              Helping ambitious professionals land
              <br />
              the Canadian career they deserve.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/45 hover:text-cream text-xs transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              linkedin.com/in/khwahish-taneja-chrp
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-cream/55 text-sm">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <Link
              href="/services"
              className="hover:text-cream transition-colors"
            >
              Services
            </Link>
            <Link
              href="/resources"
              className="hover:text-cream transition-colors"
            >
              Resources
            </Link>
            <Link href="/about" className="hover:text-cream transition-colors">
              About
            </Link>
            <Link
              href="/testimonials"
              className="hover:text-cream transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/for-institutions"
              className="hover:text-cream transition-colors"
            >
              For Institutions
            </Link>
            <Link
              href="/#checklist"
              className="hover:text-cream transition-colors"
            >
              Free Checklist
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              Book a Consultation
            </a>
          </nav>
        </div>
        <div className="border-t border-cream/10 pt-6">
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} Khwahish Taneja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
