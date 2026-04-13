import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * `/seguros` marketing CTA — Figma `87:1796` → `87:1808` (`Frame 1984078400`, 1552×392).
 * Same structural family as `ServiciosMarketingCTA` / frame `115:1462`: framed photo card, 55% black, split headline, ghost pill.
 * Dedicated component (not `CTASection` band) per route; copy differs only.
 */
const CTA_BG = "/images/home/cta-bienestar-bg.jpg";

type SegurosMarketingCTAProps = {
  subtitle: string;
};

export function SegurosMarketingCTA({ subtitle }: SegurosMarketingCTAProps) {
  return (
    <section
      id="section-seguros-marketing-cta"
      className="w-full bg-white"
      aria-labelledby="seguros-marketing-cta-heading"
    >
      <div
        className={cx(
          publicLayout.marketingFigmaBody,
          "py-9 sm:py-10 lg:py-[60px]",
        )}
      >
        <div className="relative mx-auto w-full min-h-0 max-w-[1552px] overflow-hidden rounded-[32px]">
          <div className="relative min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[392px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
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

            <div className="relative flex min-h-[inherit] min-w-0 flex-col items-center px-5 pb-10 pt-12 text-center sm:px-10 sm:pb-12 sm:pt-16 lg:px-[60px] lg:pb-[79px] lg:pt-[143px]">
              <div
                className={cx(
                  publicLayout.figmaHeadingStackCenter,
                  "w-full max-w-[1432px] text-[#f6f6f6]",
                )}
              >
                <h2
                  id="seguros-marketing-cta-heading"
                  className="font-bold leading-normal text-[24px] lg:text-[48px]"
                >
                  <span className="text-[#f6f6f6]">{`¿Listo para el futuro de `}</span>
                  <span className="text-[#d7d7d7]">tu bienestar?</span>
                </h2>
                <p className="max-w-[1432px] text-pretty text-[16px] font-medium leading-relaxed text-[#f6f6f6] sm:leading-normal lg:text-[18px]">
                  {subtitle}
                </p>
              </div>

              <div className="mt-9 flex w-full max-w-[1432px] justify-center sm:mt-8 lg:mt-[44px]">
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
