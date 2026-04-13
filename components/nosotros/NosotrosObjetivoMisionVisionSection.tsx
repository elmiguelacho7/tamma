import Image from "next/image";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import { siteImages } from "@/lib/site-images";

function EkgDecoration() {
  return (
    <svg
      className="pointer-events-none absolute bottom-6 right-6 z-[1] h-20 w-44 text-[#4B7C38]/30 sm:bottom-8 sm:right-8 sm:h-24 sm:w-52"
      viewBox="0 0 160 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 28h20l6-18 8 36 10-40 8 32 12-28 10 18h82"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Objetivo + Misión + Visión — single Figma block `81:1579` (page `71:1606`, file `4GkF8vcXOfDMg7pC1Wplzu`).
 * Cards: Misión `81:1585` + img `60d6c486…`, Visión `81:1590` + img `52df429a…`.
 */
export function NosotrosObjetivoMisionVisionSection() {
  return (
    <section className="w-full bg-white">
      <div
        className={cx(
          publicLayout.figmaContainer,
          /* After framed Sobre: same soft top step as `figmaSectionPaddingSofterTop`; bottom matches `figmaSectionPadding`. */
          "pb-[32px] pt-8 lg:pb-[60px] lg:pt-12",
        )}
      >
        <div
          className={cx(
            "flex flex-col",
            publicLayout.figmaSectionGap,
          )}
        >
          <header className="flex w-full flex-col gap-6">
            <h2 className={cx("w-full text-[#1b5e20]", publicHome.headingSection)}>
              Objetivo
            </h2>
            <p className="w-full text-pretty text-[16px] font-normal leading-relaxed text-[#0f0f0f]">
              En Tamma Group trabajamos con el objetivo de transformar la forma en que
              las personas acceden y gestionan su salud, integrando tecnología,
              cobertura y calidad humana en un solo ecosistema. Buscamos ofrecer
              soluciones accesibles, confiables y continuas que garanticen bienestar,
              tranquilidad y una experiencia centrada en el usuario en todo momento.
            </p>
          </header>

          <div className="flex flex-col gap-5 pb-0 pt-0 lg:flex-row lg:gap-8">
            <article className="relative min-h-[220px] flex-1 overflow-hidden rounded-[32px] p-10 shadow-[0px_8px_24px_-12px_rgba(0,0,0,0.1),0px_4px_10px_-6px_rgba(0,0,0,0.08)] ring-1 ring-[rgba(194,201,181,0.22)] sm:min-h-[240px] sm:p-12 lg:p-12">
              <div className="absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src={siteImages.nosotros.misionCardBg}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div
                className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/92 via-white/78 to-white/96"
                aria-hidden
              />
              <EkgDecoration />
              <div className="relative z-[2] flex flex-col gap-2.5">
                <h3 className="text-[28px] font-bold leading-snug tracking-tight text-[#424242] lg:text-[32px]">
                  Misión
                </h3>
                <p className="text-[16px] font-medium leading-relaxed text-[#0f0f0f]">
                  Brindar un ecosistema de bienestar integral y accesible, impulsado
                  por la tecnología y la innovación. Integramos servicios de salud,
                  farmacia inteligente y seguros para ofrecer una experiencia fluida,
                  personalizada y confiable 24/7, con perfiles de salud seguros y
                  disponibles en la nube.
                </p>
              </div>
            </article>

            <article className="relative min-h-[220px] flex-1 overflow-hidden rounded-[32px] p-10 shadow-[0px_8px_24px_-12px_rgba(0,0,0,0.1),0px_4px_10px_-6px_rgba(0,0,0,0.08)] ring-1 ring-[rgba(194,201,181,0.22)] sm:min-h-[240px] sm:p-12 lg:p-12">
              <div className="absolute inset-0 opacity-[0.62]" aria-hidden>
                <Image
                  src={siteImages.nosotros.visionCardBg}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div
                className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white via-white/93 to-white/90"
                aria-hidden
              />
              <div className="relative z-[2] flex flex-col gap-2.5">
                <h3 className="text-[28px] font-bold leading-snug tracking-tight text-[#424242] lg:text-[32px]">
                  Visión
                </h3>
                <p className="text-[16px] font-medium leading-relaxed text-[#0f0f0f]">
                  Ser el consorcio líder en gestión integral de la salud, impulsando la
                  digitalización médica y farmacéutica para ofrecer una cobertura de
                  bienestar completa, accesible y centrada en el usuario a nivel
                  nacional.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
