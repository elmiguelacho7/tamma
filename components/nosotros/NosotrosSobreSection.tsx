import Image from "next/image";
import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import { siteImages } from "@/lib/site-images";

const SERVICIOS_CTA_BG =
  "linear-gradient(120.00000124584054deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)";

/**
 * Sobre nosotros — Figma file `4GkF8vcXOfDMg7pC1Wplzu`, page `71:1606`, block `81:1575`.
 */
export function NosotrosSobreSection() {
  return (
    <section className="w-full bg-white">
      <div
        className={cx(
          /* Same framed-band shell as Home `CorporateSolutionsSection` / CTA `homeCard`. */
          publicLayout.homeWideFramedOuter,
          /* Match `figmaSectionPadding` top — same cadence as framed Home bands after a major block. */
          "pb-0 pt-[32px] lg:pb-0 lg:pt-[60px]",
        )}
      >
        <div className="relative min-h-[24rem] overflow-hidden rounded-[32px] shadow-[0px_12px_32px_-16px_rgba(15,23,42,0.12)] ring-1 ring-[rgba(194,201,181,0.28)] sm:min-h-[26rem] lg:min-h-[400px]">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={siteImages.nosotros.aboutMain}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 1479px, 100vw"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-white lg:from-[0.992%] lg:via-[38%] lg:to-white"
            aria-hidden
          />
          <div
            className="relative z-10 flex min-h-[24rem] flex-col justify-center p-8 sm:p-10 lg:min-h-[400px] lg:items-end lg:p-[60px]"
          >
            <div className="flex w-full max-w-[687px] flex-col gap-6">
              <h2 className={cx("text-balance", publicHome.headingSection)}>
                <span className="text-[#1b5e20]">Sobre</span>
                <span className="text-[#0f0f0f]"> </span>
                <span className="text-[#7cb342]">nosotros</span>
              </h2>
              <div className="flex flex-col gap-5 text-pretty text-[16px] font-normal leading-relaxed text-[#0f0f0f]">
                <p>
                  En Tamma Group somos una red integral de servicios de salud con
                  cobertura nacional. Integramos telemedicina, atención domiciliaria,
                  farmacia y servicios clínicos. Todo en una sola experiencia
                  accesible, rápida y confiable.
                </p>
                <p>
                  Nuestro enfoque combina tecnología, innovación y cercanía humana.
                  Ofrecemos atención 24/7 con soluciones digitales y almacenamiento
                  en la nube. Trabajamos para mejorar el bienestar con una experiencia
                  simple, segura y continua.
                </p>
              </div>
              <div className="pt-1">
                <Link
                  href="/servicios"
                  className={cx(
                    publicHome.ctaPillPrimary,
                    "transition-opacity duration-200 hover:opacity-[0.94] active:opacity-[0.88]",
                    "!w-full sm:!w-auto",
                  )}
                  style={{ backgroundImage: SERVICIOS_CTA_BG }}
                >
                  Ver nuestros servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
