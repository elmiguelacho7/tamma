import Image from "next/image";
import Link from "next/link";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

type CTASectionProps = {
  /** Optional supporting line (e.g. nosotros-page dark band). */
  subtitle?: string;
  /**
   * `dramatic` adds layered grain, vignette, and a more premium on-dark CTA (nosotros).
   * Default keeps homepage treatment unchanged.
   */
  visualWeight?: "standard" | "dramatic";
  /**
   * HOME frame `115:1476`: photo card inside figma horizontal padding (not full-bleed band).
   */
  surface?: "band" | "homeCard";
  /**
   * When `surface="homeCard"`, optional background image (e.g. Nosotros `115:1469`).
   * Defaults to Home marketing photo.
   */
  cardBackgroundSrc?: string;
  /**
   * Vertical padding around the rounded card (default `figmaSectionPadding`).
   * Nosotros `71:1606`: CTA `115:1469` stacks flush with `81:1579` / `84:1331` — use `pt-0 pb-0`.
   */
  homeCardPaddingClassName?: string;
  /** Optional classes on the rounded photo card (e.g. Nosotros inset ring / depth). */
  homeCardFrameClassName?: string;
};

const noiseSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Mid-page CTA — dark photographic band + ghost button (home-full / nosotros reference).
 */
const HOME_CTA_BG = "/images/home/cta-bienestar-bg.webp";

export function CTASection({
  subtitle = "Da el siguiente paso con un equipo que integra salud, tecnología y respaldo humano.",
  visualWeight = "standard",
  surface = "band",
  cardBackgroundSrc = HOME_CTA_BG,
  homeCardPaddingClassName,
  homeCardFrameClassName,
}: CTASectionProps) {
  const dramatic = visualWeight === "dramatic";

  if (surface === "homeCard") {
    return (
      <section
        id="section-marketing-cta"
        className="w-full bg-white"
        aria-labelledby="marketing-cta-heading"
      >
        <div
          className={cx(
            publicLayout.homeWideFramedOuter,
            homeCardPaddingClassName ?? publicLayout.figmaSectionPadding,
          )}
        >
          <div
            className={cx(
              "relative min-h-[280px] overflow-hidden rounded-[32px] sm:min-h-[320px] lg:min-h-[392px]",
              homeCardFrameClassName,
            )}
          >
            <Image
              src={cardBackgroundSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1479px, 100vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px] bg-[rgba(0,0,0,0.55)]"
              aria-hidden
            />
            <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-[60px] lg:py-16">
              <h2
                id="marketing-cta-heading"
                className="max-w-[1432px] text-[24px] font-bold leading-normal text-[#f6f6f6] lg:text-[48px]"
              >
                <span className="text-[#f6f6f6]">{`¿Listo para el futuro de `}</span>
                <span className="text-[#d7d7d7]">tu bienestar?</span>
              </h2>
              <p className="mt-3 max-w-3xl text-[16px] font-medium leading-normal text-[#f6f6f6] lg:mt-[12px] lg:text-[18px]">
                {subtitle}
              </p>
              <div className="mt-8 flex justify-center lg:mt-10">
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
      </section>
    );
  }

  return (
    <section
      id="section-marketing-cta"
      className="relative overflow-hidden border-y border-slate-800/60 bg-[#1a2330]"
      aria-labelledby="marketing-cta-heading"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,35,0.97)_0%,rgba(30,45,38,0.88)_50%,rgba(20,28,24,0.92)_100%)]"
        aria-hidden
      />
      {dramatic ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(132,204,22,0.08),transparent_62%)]"
          aria-hidden
        />
      ) : null}
      <div
        className={cx(
          "absolute inset-0 mix-blend-overlay",
          dramatic ? "opacity-50" : "opacity-40",
        )}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(132,204,22,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(255,255,255,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className={cx("absolute inset-0", dramatic ? "opacity-[0.18]" : "opacity-[0.12]")}
        style={{ backgroundImage: noiseSvg }}
        aria-hidden
      />
      {dramatic ? (
        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      ) : null}
      {dramatic ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_50%_50%,transparent_40%,rgba(0,0,0,0.45)_100%)]"
          aria-hidden
        />
      ) : null}

      <div
        className={cx(
          publicLayout.sectionInner,
          dramatic
            ? "relative py-[4.5rem] sm:py-[5.25rem] lg:py-[6rem]"
            : "relative py-16 sm:py-20 lg:py-24",
        )}
      >
        <div className="mx-auto max-w-3xl px-2 text-center sm:px-4">
          <h2
            id="marketing-cta-heading"
            className={cx(
              "text-balance font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]",
              dramatic
                ? "text-3xl sm:text-[2.375rem] lg:text-[2.875rem] lg:leading-[1.1] xl:text-[3.125rem]"
                : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-[3rem]",
            )}
          >
            ¿Listo para el futuro de{" "}
            <span className="text-[#84CC16]">tu bienestar?</span>
          </h2>
          <p
            className="mt-5 text-pretty text-lg leading-relaxed text-white/85 sm:mt-6 sm:text-xl"
          >
            {subtitle}
          </p>
          <div
            className={cx(
              "flex justify-center",
              dramatic ? "mt-11 sm:mt-12" : "mt-10 sm:mt-11",
            )}
          >
            <SecondaryButton
              href="/contacto"
              variant="onDark"
              className={cx(
                "min-h-[3.25rem] min-w-[14rem] px-10 text-base transition-colors duration-200",
                dramatic
                  ? "border-white/95 bg-white/[0.06] shadow-[0_8px_36px_-6px_rgba(0,0,0,0.5)] ring-2 ring-white/25 backdrop-blur-[2px] hover:bg-white/18 hover:ring-white/35 active:bg-white/22"
                  : "border-white/90 hover:bg-white/15 active:bg-white/20",
              )}
            >
              Empezar ahora
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
