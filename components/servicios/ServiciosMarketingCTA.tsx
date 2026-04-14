import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * `/servicios` marketing CTA — Figma `4GkF8vcXOfDMg7pC1Wplzu` frame `115:1462` (inside `81:1602`).
 *
 * Classification (apply before wiring shared components):
 * - **Exact reuse** — same frame geometry, layers, and content model as an existing component.
 * - **Reuse with variant** — same composition; only tokens/density/copy differ.
 * - **Structurally different** — framing, layering, or layout model differs → dedicated implementation (this file).
 *
 * `CTASection` `surface="band"` is a full-bleed gradient strip + lime accent + `SecondaryButton`;
 * this frame is a **framed 1552×392 photo card**, **photo + 55% black**, **split headline colors**,
 * **Figma-anchored vertical rhythm** (text block from ~143px, button from ~265px), and **ghost pill** (`ctaPillGhostOnPhoto`).
 * Forcing the shared band was a composition mismatch, not a density tweak.
 */
const CTA_BG = "/images/home/cta-bienestar-bg.webp";

type ServiciosMarketingCTAProps = {
  subtitle: string;
};

export function ServiciosMarketingCTA({ subtitle }: ServiciosMarketingCTAProps) {
  return (
    <section
      id="section-marketing-cta"
      className="w-full bg-white"
      aria-labelledby="servicios-marketing-cta-heading"
    >
      <div className={cx(publicLayout.marketingFigmaBody, publicLayout.figmaSectionPadding)}>
        <div className="relative mx-auto w-full min-h-0 max-w-[1552px] overflow-hidden rounded-[32px]">
          <div className="relative min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[392px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
              {/* Figma export positions the raster with % height/top — `next/image` `fill` cannot match that box model. */}
              <img
                src={CTA_BG}
                alt=""
                className="absolute left-0 top-[-59.48%] h-[263.95%] w-full max-w-none object-cover"
                aria-hidden
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px] bg-[rgba(0,0,0,0.55)]"
              aria-hidden
            />

            <div className="relative flex min-h-[inherit] flex-col items-center px-6 pb-10 pt-14 text-center sm:px-10 sm:pb-12 sm:pt-16 lg:px-[60px] lg:pb-[79px] lg:pt-[143px]">
              <div
                className={cx(
                  publicLayout.figmaHeadingStackCenter,
                  "w-full max-w-[1432px] text-[#f6f6f6]",
                )}
              >
                <h2
                  id="servicios-marketing-cta-heading"
                  className="font-bold leading-normal text-[24px] lg:text-[48px]"
                >
                  <span className="text-[#f6f6f6]">{`¿Listo para el futuro de `}</span>
                  <span className="text-[#d7d7d7]">tu bienestar?</span>
                </h2>
                <p className="max-w-[1432px] text-[16px] font-medium leading-normal text-[#f6f6f6] lg:text-[18px]">
                  {subtitle}
                </p>
              </div>

              <div className="mt-8 flex w-full max-w-[1432px] justify-center lg:mt-[44px]">
                <Link
                  href="/contacto"
                  className={cx(publicHome.ctaPillGhostOnPhoto, "!w-auto")}
                >
                  Empezar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
