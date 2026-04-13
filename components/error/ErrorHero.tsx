import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * 404 hero — `docs/design/error-404-page.jpg` (Figma error frame): 1600/1552 shell, 600px desktop height,
 * photo + overlays, embedded header, left copy anchored low, outlined **404** on the right.
 *
 * **Frozen** at current composition. Future edits: fine-tuning only after Figma 100% zoom — e.g. `Hero404Graphic`
 * stroke/size, hero padding — not new layout or hero structure.
 */
function Hero404Graphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <text
        x="260"
        y="118"
        fill="none"
        stroke="#84CC16"
        strokeWidth="3"
        strokeOpacity="0.9"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="124"
        fontWeight="800"
        letterSpacing="-0.04em"
        textAnchor="middle"
      >
        404
      </text>
    </svg>
  );
}

export function ErrorHero() {
  return (
    <section className="w-full bg-white" aria-labelledby="error-hero-heading">
      <div className={publicLayout.marketingRouteHeroOuter}>
        <div
          className={cx(
            "relative isolate mx-auto w-full max-w-[1552px] overflow-hidden rounded-t-[32px] rounded-b-[2rem] sm:rounded-b-[2.75rem] lg:rounded-b-[3.25rem]",
            "min-h-[min(560px,82vh)] lg:h-[600px] lg:min-h-[600px]",
          )}
        >
          <Image
            src={siteImages.servicios.heroMain}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 1552px, 100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.5)_38%,rgba(15,23,42,0.42)_72%,rgba(15,23,42,0.2)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_78%_42%,transparent_20%,rgba(0,0,0,0.35)_85%)]"
            aria-hidden
          />

          <div className="relative z-10 flex h-full min-h-0 w-full flex-col">
            <Header variant="heroOverlay" />

            <div className="flex min-h-0 flex-1 flex-col justify-end px-4 pb-8 pt-4 sm:px-10 sm:pb-12 sm:pt-8 lg:px-[48px] lg:pb-16 lg:pt-10">
              <div
                className={cx(
                  "mx-auto grid w-full max-w-[1476px] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-end lg:gap-12 xl:gap-16",
                )}
              >
                <div className="flex min-w-0 max-w-[46rem] flex-col gap-5 sm:gap-6 lg:gap-7">
                  <h1
                    id="error-hero-heading"
                    className="text-balance font-bold leading-[1.08] tracking-[-0.02em] text-[#f6f6f6] text-[2rem] sm:text-[2.75rem] sm:leading-[1.06] lg:text-[64px] lg:leading-[normal]"
                  >
                    ¡Ups! Algo salió mal,{" "}
                    <span className="block sm:inline">página no encontrada</span>
                  </h1>
                  <p className="max-w-[40rem] text-pretty text-base font-medium leading-relaxed text-[#f6f6f6]/95 sm:text-lg lg:text-[20px] lg:leading-[1.55]">
                    La página que buscas no está disponible. Es posible que el enlace esté roto o que la página
                    haya sido eliminada.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/"
                      className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-[96px] px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-[15rem] sm:text-lg"
                      style={{
                        backgroundImage:
                          "linear-gradient(143.94deg, rgb(124, 179, 66) 13.42%, rgb(27, 94, 32) 130.46%)",
                      }}
                    >
                      Volver al inicio
                    </Link>
                  </div>
                </div>

                <div
                  className="relative flex min-h-[140px] w-full select-none items-center justify-center lg:min-h-[340px] lg:items-center lg:justify-end"
                  aria-hidden
                >
                  <div className="pointer-events-none absolute right-0 top-1/2 h-[min(100%,440px)] w-[min(100%,520px)] -translate-y-1/2 rounded-full bg-[#84CC16]/25 opacity-50 blur-[64px] lg:opacity-60" />
                  <Hero404Graphic className="relative z-[1] h-auto w-full max-w-[280px] opacity-85 sm:max-w-[360px] lg:max-w-[min(100%,540px)] lg:opacity-[0.88] xl:max-w-[600px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
