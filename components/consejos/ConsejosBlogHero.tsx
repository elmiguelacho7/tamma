import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * BLOG listing hero — visual reference: `docs/design/blog-page.jpg` (exported Figma capture).
 * Embedded header on photo, large white H1 + lead. No primary CTA button in this frame (grid follows below).
 */
export function ConsejosBlogHero() {
  return (
    <section className="w-full bg-white" aria-label="Consejos — cabecera">
      <div className={publicLayout.marketingRouteHeroOuter}>
        <div
          className={cx(
            "relative isolate mx-auto w-full max-w-[1552px] overflow-hidden rounded-t-[32px] rounded-b-[2rem] sm:rounded-b-[2.75rem] lg:rounded-b-[3.25rem]",
            "min-h-[min(520px,78vh)] lg:h-[600px] lg:min-h-[600px]",
          )}
        >
          <Image
            src={siteImages.consejos.heroMain}
            alt=""
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="(min-width: 1024px) min(1552px, 100vw), 100vw"
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
                    id="consejos-hero-heading"
                    className="text-balance font-bold leading-[1.05] tracking-[-0.02em] text-[#f6f6f6] text-[1.875rem] sm:text-[2.5rem] lg:text-[64px] lg:leading-[normal]"
                  >
                    Salud y bienestar en cada lectura
                  </h1>
                  <p className="max-w-[988px] text-pretty text-base font-medium leading-normal text-[#f6f6f6] sm:text-lg lg:text-[18px]">
                    Explora contenidos pensados para ayudarte a decidir con claridad: prevención, asistencia y hábitos
                    que puedes sostener en el tiempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
