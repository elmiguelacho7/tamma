"use client";

import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import {
  ReviewsCarousel,
  type ReviewCarouselItem,
} from "@/components/home/ReviewsCarousel";

// Figma HOME testimonials — node `56:2486`
const testimonials: ReviewCarouselItem[] = [
  {
    name: "Leonardo G.",
    date: "March 1, 2026",
    quote:
      "“Excelente servicio, la atención por telemedicina fue rápida y muy clara. Me sentí acompañado en todo momento.”",
    users: [
      "/images/home/testimonials/users/user-a.png",
      "/images/home/testimonials/users/user-b.png",
      "/images/home/testimonials/users/user-c.png",
    ],
  },
  {
    name: "Megan L.",
    date: "February 12, 2026",
    quote:
      "“Solicité asistencia médica a domicilio y llegaron súper rápido. Muy profesionales y atentos.”",
    users: [
      "/images/home/testimonials/users/user-a.png",
      "/images/home/testimonials/users/user-b.png",
      "/images/home/testimonials/users/user-d.png",
    ],
  },
  {
    name: "David S.",
    date: "January 11, 2026",
    quote:
      "“Lo mejor es que tienen todo en un solo lugar: consultas, medicamentos y seguimiento. Muy cómodo.”",
    users: [
      "/images/home/testimonials/users/user-a.png",
      "/images/home/testimonials/users/user-b.png",
      "/images/home/testimonials/users/user-e.png",
    ],
  },
  {
    name: "David S.",
    date: "January 11, 2026",
    quote:
      "“El servicio de ambulancia fue inmediato y el equipo muy preparado. Me dieron mucha tranquilidad.”",
    users: [
      "/images/home/testimonials/users/user-b.png",
      "/images/home/testimonials/users/user-e.png",
      "/images/home/testimonials/users/user-a.png",
    ],
  },
  {
    name: "David S.",
    date: "January 11, 2026",
    quote:
      "“La entrega de medicamentos fue rápida y sin complicaciones. Se nota la organización y calidad del servicio.”",
    users: ["/images/home/testimonials/users/user-e.png"],
  },
];

export type TestimonialsSectionProps = {
  /** Reserved for non-home pages; HOME uses Figma copy only. */
  subtitle?: string;
  presentation?: "default" | "premium";
  /**
   * HOME `56:2486`: softer top when stacked under other padded sections.
   * `nosotrosFlush` / `publicFlush`: same handoff — CTA → testimonials → Figma contact (tokenized flush).
   */
  verticalSpacing?: "homeSofterTop" | "nosotrosFlush" | "publicFlush";
  /**
   * Narrow-viewport rail comfort (padding + quote rhythm). Home + `/seguros` pass this; other routes omit.
   */
  railComfort?: boolean;
};

export function TestimonialsSection({
  verticalSpacing = "homeSofterTop",
  presentation: _presentation,
  subtitle: _subtitle,
  railComfort = false,
}: TestimonialsSectionProps) {
  const isHandoffFlush =
    verticalSpacing === "nosotrosFlush" || verticalSpacing === "publicFlush";

  const sectionPadding = isHandoffFlush
    ? cx("pb-0 lg:pb-0", publicLayout.framedToBodyEnter)
    : publicLayout.figmaSectionPaddingSofterTop;

  return (
    <section
      className={cx(
        "flex w-full min-w-0 flex-col overflow-x-clip bg-white",
        sectionPadding,
        isHandoffFlush
          ? publicLayout.introToContentFlush
          : "gap-6 sm:gap-8 lg:gap-10",
      )}
    >
      <div
        className={cx(
          publicLayout.figmaContainer,
          "flex min-w-0 flex-col items-center",
        )}
      >
        <header
          className={cx(
            publicLayout.figmaHeadingStackCenter,
            !isHandoffFlush && "gap-4 sm:gap-3.5 lg:gap-[12px]",
          )}
        >
          <h2
            className={cx(
              "w-full whitespace-pre-wrap text-[#1b5e20]",
              publicHome.headingSection,
            )}
          >
            <span className="text-[#1b5e20]">{`Lo que dicen  `}</span>
            <span className={publicHome.headingAccentGreen}>
              nuestros pacientes
            </span>
          </h2>
          <p
            className={cx(
              "w-full leading-relaxed sm:leading-normal",
              publicHome.bodyLead,
            )}
          >
            Cientos de familias venezolanas confían diariamente en Tamma Group
            para su cuidado integral.
          </p>
        </header>
      </div>

      {/* Wider rail rhythm (Figma framed blocks) — more usable width than figmaContainer gutters */}
      <div className={cx(publicLayout.homeWideFramedOuter, "min-w-0 w-full")}>
        <ReviewsCarousel
          reviews={testimonials}
          gapPx={20}
          className="w-full"
          tightFooter={isHandoffFlush}
          railComfort={railComfort}
        />
      </div>
    </section>
  );
}
