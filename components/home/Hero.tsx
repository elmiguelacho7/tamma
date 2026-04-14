import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HeroFloatingStrip } from "@/components/home/HeroFloatingStrip";
import { manrope } from "@/lib/fonts/manrope";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

/** Figma `56:2289` primary CTA fill. */
const PRIMARY_CTA_BG =
  "linear-gradient(143.9390811546584deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)";

const HERO_SHELL_MIN_H =
  "min-h-[min(680px,88svh)] lg:min-h-[780px]";

/**
 * Figma `56:2277` hero shell 1552×780 — floating strip `56:2349` horizontal placement.
 * Strip `top`: `<sm` uses a tighter min() + shorter bottom reserve; `sm:max-lg` keeps the stacked strip inside the shell; `lg+: ~81.15%` (633/780). Framed outer `max-lg:pb-28` reserves space before the intro band.
 */
const STRIP_LEFT_FRAC = 232.5 / 1552;
const STRIP_WIDTH_FRAC = 1284 / 1552;

/**
 * HOME hero — one framed shell (Figma `56:2277`): photo + gradients clipped to `rounded-[32px]`,
 * header as the top region of the same panel, copy below — not a toolbar on a separate full-bleed bg.
 */
export function Hero() {
  return (
    <section
      className="relative isolate z-20 w-full"
      aria-labelledby="hero-heading"
    >
      <div
        className={cx(
          publicLayout.homeWideFramedOuter,
          "pt-4 sm:pt-5 lg:pt-6",
          /* Reserve space below the rounded shell on mobile before the intro band. */
          "max-lg:pb-28",
        )}
      >
        <div
          className={cx(
            "relative isolate w-full overflow-hidden rounded-[32px]",
            HERO_SHELL_MIN_H,
            "shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_28px_72px_-28px_rgba(0,0,0,0.48)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src="/images/home/hero-bg.png"
              alt=""
              fill
              priority
              fetchPriority="high"
              className="object-cover object-center"
              sizes="(min-width: 1024px) min(1500px, 100vw), 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/28 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_40%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />
          </div>

          <div
            className={cx(
              "relative z-10 flex w-full flex-col",
              HERO_SHELL_MIN_H,
            )}
          >
            <HeroHeader />

            <div
              className={cx(
                manrope.className,
                /* Figma `56:2281` y=212: below HEADER h=96 → margin-top 116px desktop */
                "mt-8 flex w-full min-w-0 max-w-[958px] flex-1 flex-col gap-8 px-5 pb-[6.75rem] sm:mt-10 sm:px-7 sm:pb-24 lg:mt-[112px] lg:gap-7 lg:px-[36px] lg:pb-28",
              )}
            >
              <div className="flex flex-col gap-3.5 sm:gap-3">
                <h1
                  id="hero-heading"
                  className="font-sans text-[clamp(1.625rem,5.2vw+0.35rem,2.25rem)] font-bold leading-[1.05] tracking-normal text-[#f6f6f6] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-[52px] lg:text-[64px]"
                >
                  <span className="block whitespace-pre-wrap">
                    Salud y bienestar{" "}
                  </span>
                  <span className="block">
                    <span className="text-[#c5e1a5]">las 24 horas</span>
                    <span className="text-[#f6f6f6]"> en toda Venezuela</span>
                  </span>
                </h1>

                <p className="max-w-[958px] text-pretty text-[clamp(0.9375rem,2.8vw+0.4rem,1.125rem)] font-medium leading-relaxed text-[#f6f6f6] drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)] sm:text-[18px] sm:leading-normal">
                  Accede a telemedicina inmediata, médicos a domicilio y tu farmacia
                  digital en un solo lugar. Cuidamos de ti y de tu familia con
                  tecnología smart y atención humana
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-1 sm:flex-row sm:gap-6 sm:pt-0">
                <Link
                  href="/contacto"
                  className={cx(publicHome.ctaPillPrimaryOnPhoto, "!w-auto")}
                  style={{ backgroundImage: PRIMARY_CTA_BG }}
                >
                  Solicitar atención médica
                </Link>
                <Link
                  href="/servicios"
                  className={cx(publicHome.ctaPillGhostOnPhoto, "!w-auto")}
                >
                  Ir a smart pharmacy
                </Link>
              </div>
            </div>
          </div>

          {/* Floating strip — Figma `56:2349` in shell `56:2277` (1552×780), proportional + exact lg height. */}
          <HeroFloatingStrip
            className={cx(
              "absolute right-auto z-30 lg:h-[129px]",
              /* Mobile: keep strip in upper-mid fold; lg+: Figma ~633/780 of 1552×780 shell. */
              "top-[min(34%,calc(100%-19rem))] sm:top-[min(40%,calc(100%-23rem))] lg:top-[81.15384615%]",
            )}
            style={{
              left: `${STRIP_LEFT_FRAC * 100}%`,
              width: `${STRIP_WIDTH_FRAC * 100}%`,
            }}
          />

          <a
            href="https://wa.me/584121903890"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[27rem] right-3 top-auto z-20 block h-12 w-12 rounded-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 active:opacity-80 max-lg:z-40 sm:bottom-36 sm:right-4 lg:bottom-auto lg:z-20 lg:right-4 lg:top-[569px]"
            aria-label="Contactar por WhatsApp"
          >
            <Image
              src="/images/home/whatsapp-float.png"
              alt=""
              width={48}
              height={48}
              className="block h-full w-full object-contain"
              unoptimized
            />
          </a>
        </div>
      </div>
    </section>
  );
}
