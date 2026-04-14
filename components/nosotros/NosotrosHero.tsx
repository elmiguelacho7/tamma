import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { manrope } from "@/lib/fonts/manrope";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import { siteImages } from "@/lib/site-images";

/** Figma `71:1614` / `80:1261` — same gradient as Home hero CTA. */
const PRIMARY_CTA_BG =
  "linear-gradient(143.9390811546584deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)";

const NOSOTROS_HERO_MIN_H =
  "min-h-[480px] sm:min-h-[520px] lg:min-h-[600px]";

/**
 * Nosotros hero — same shell + header system as Home `Hero` (framed panel + `HeroHeader`),
 * Figma file `4GkF8vcXOfDMg7pC1Wplzu`, page `71:1606`, block `71:1609`.
 */
export function NosotrosHero() {
  return (
    <section
      className="relative isolate z-20 w-full"
      aria-labelledby="nosotros-hero-heading"
    >
      <div
        className={cx(
          publicLayout.homeWideFramedOuter,
          "pt-4 sm:pt-5 lg:pt-6",
        )}
      >
        <div
          className={cx(
            "relative isolate w-full overflow-hidden rounded-[32px]",
            NOSOTROS_HERO_MIN_H,
            "shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_28px_72px_-28px_rgba(0,0,0,0.48)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={siteImages.nosotros.heroMain}
              alt=""
              fill
              priority
              fetchPriority="high"
              className="object-cover object-center"
              sizes="(min-width: 1024px) min(1500px, 100vw), 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/28 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.32] via-black/10 to-black/12" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_40%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />
          </div>

          <div
            className={cx(
              "relative z-10 flex w-full flex-col",
              NOSOTROS_HERO_MIN_H,
            )}
          >
            <HeroHeader />

            <div
              className={cx(
                manrope.className,
                "flex min-h-0 w-full max-w-[988px] flex-1 flex-col justify-end gap-6 px-5 pt-6 pb-16 sm:justify-center sm:px-7 sm:pt-8 sm:pb-20 lg:px-[36px] lg:pt-10 lg:pb-24",
              )}
            >
              <div className="flex max-w-[988px] flex-col gap-3 sm:gap-3 lg:gap-[12px]">
                <h1
                  id="nosotros-hero-heading"
                  className="text-balance font-sans text-[clamp(1.625rem,5.2vw+0.35rem,2.25rem)] font-bold leading-[1.05] tracking-normal text-[#f6f6f6] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-[52px] lg:text-[64px]"
                >
                  Un sistema integral diseñado para tu tranquilidad
                </h1>
                <p className="max-w-[988px] text-pretty text-[18px] font-medium leading-relaxed text-[#f6f6f6] drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)]">
                  En Tamma Group integramos salud, tecnología y cobertura nacional
                  para ofrecerte soluciones médicas, farmacéuticas y de protección con
                  atención 24/7, pensadas para tu tranquilidad.
                </p>
              </div>
              <div>
                <Link
                  href="/contacto"
                  className={cx(
                    publicHome.ctaPillPrimaryOnPhoto,
                    "!w-full sm:!w-auto",
                  )}
                  style={{ backgroundImage: PRIMARY_CTA_BG }}
                >
                  Solicitar atención médica
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
