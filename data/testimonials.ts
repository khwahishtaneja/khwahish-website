// ── Testimonials data source ────────────────────────────────────────────────
// Single source of truth for published testimonials shown on the homepage and
// the /testimonials page. Leave this array EMPTY until real client testimonials
// are ready — never add fabricated or placeholder quotes.
//
// To publish a testimonial, add an entry below. Set `featured: true` to also
// surface it in the homepage testimonials section (which stays hidden entirely
// while no featured testimonials exist).

export interface Testimonial {
  /** Client's name (or first name + initial). */
  name: string;
  /** Short context line, e.g. "International student" or "Internationally-trained engineer". */
  context: string;
  /** The testimonial quote itself, without surrounding quotation marks. */
  quote: string;
  /** When true, this testimonial also appears in the homepage section. */
  featured: boolean;
}

export const testimonials: Testimonial[] = [];

/** Testimonials surfaced on the homepage (featured only). */
export const featuredTestimonials = testimonials.filter((t) => t.featured);
