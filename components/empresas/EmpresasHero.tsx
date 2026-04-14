import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * `/empresas` hero — same route-family shell as `ServiciosHero` / `SegurosHero` (1552×600 lg, HEADER embedded).
 *
 * Classification: **Reuse with variant** (shared geometry + header variant; copy from prior Empresas marketing).
 *
 * Note: Canonical `EMPRESAS` artboard was not present in the repo’s Figma `get_metadata` export snapshot
 * (only HOME, NOSOTROS, SERVICIOS, SEGUROS, BLOG, CONTACTO, …). Structure follows the validated inner-route
 * pattern; confirm H1/subtitle/CTA labels against Figma when the frame is available at 100% zoom.
 */
export function EmpresasHero() {
  return (
    <section className="w-full bg-white" aria-label="Empresas — cabecera">
      <div
        className={cx(
          publicLayout.homeWideFramedOuter,
          "pt-4 sm:pt-6",
        )}
      >
        <div
          className={cx(
            "relative isolate w-full overflow-hidden rounded-t-[32px] rounded-b-[2rem] sm:rounded-b-[2.75rem] lg:rounded-b-[3.25rem]",
            "min-h-[min(520px,78vh)] lg:h-[600px] lg:min-h-[600px]",
          )}
        >
          <Image
            src={siteImages.empresas.heroMain}
            alt=""
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.85)_0%,rgba(30,58,95,0.45)_42%,rgba(15,23,42,0.35)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25"
            aria-hidden
          />
          <div className="relative z-10 flex h-full min-h-0 w-full flex-col">
            <Header variant="heroOverlay" />

            <div className="flex min-h-0 flex-1 flex-col justify-center px-4 pb-8 pt-2 sm:px-8 sm:pb-12 sm:pt-0 lg:px-[38px] lg:pb-14">
              <div
                className={cx(
                  "mx-auto flex w-full max-w-[1476px] flex-col items-start gap-5 sm:gap-6",
                  "translate-y-4 lg:translate-y-[82px]",
                )}
              >
                <div className="flex flex-col gap-2.5 text-[#f6f6f6] sm:gap-3 lg:gap-[12px]">
                  <h1
                    id="empresas-hero-heading"
                    className="flex flex-col gap-0 text-balance font-bold leading-[1.05] tracking-[-0.02em] text-[#f6f6f6] text-[1.875rem] sm:text-[2.5rem] lg:gap-0 lg:text-[64px] lg:leading-[normal]"
                  >
                    <span className="block leading-[1.05] lg:leading-normal">
                      Soluciones integrales
                    </span>
                    <span className="block leading-[1.05] lg:leading-normal">
                      para empresas que cuidan a su gente
                    </span>
                  </h1>
                  <p className="max-w-[988px] text-pretty text-base font-medium leading-normal text-[#f6f6f6] sm:text-lg lg:text-[18px]">
                    Apoyamos a RRHH y operaciones con una red coordinada: atención,
                    telemedicina, soporte y continuidad para equipos que necesitan claridad y
                    respuesta.
                  </p>
                </div>
                <Link
                  href="/formulario-b2b"
                  className="inline-flex w-full items-center justify-center rounded-[96px] px-6 py-4 text-base font-bold text-[#f6f6f6] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-[12rem]"
                  style={{
                    backgroundImage:
                      "linear-gradient(143.94deg, rgb(124, 179, 66) 13.42%, rgb(27, 94, 32) 130.46%)",
                  }}
                >
                  Solicitar propuesta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
