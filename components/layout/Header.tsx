/**
 * Global marketing header — **variant matrix (do not collapse routes):**
 *
 * | Area | Chrome |
 * |------|--------|
 * | Home, Nosotros | `HeroHeader` (hero shell band; not this component) |
 * | Servicios, Seguros, Empresas, Consejos, 404 | `variant="heroOverlay"` |
 * | `/contacto`, `/formulario-b2b` | `variant="contacto"` |
 * | Other inner routes (if any) | `variant="default"` |
 *
 * **CONTACTO / B2B freeze (behavior):** `/contacto` and `/formulario-b2b` must keep `variant="contacto"`.
 * Sticky top bar is intentional. Do **not** migrate these routes to `heroOverlay` or Servicios-style hero shells.
 * Future edits: **micro visual tuning from Figma only** (hex, blur, border, radius, padding) — no structural or
 * sticky/positioning behavior changes unless product explicitly reopens this contract.
 *
 * Variants:
 * - `default` — full-width sticky light bar, dark logo, `onLight` nav.
 * - `heroOverlay` — **Servicios-family** only: top strip inside rounded photo hero (`rounded-t-[32px]`), light logo, `onDark` nav.
 * - `contacto` — CONTACTO / B2B Figma: floating frosted **pill** bar, viewport margins, **sticky**, light logo, `onDark` nav, glass CTA.
 */
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { HEADER_LOGO_DARK, HEADER_LOGO_LIGHT } from "@/components/layout/header-assets";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { HeaderDesktopNav } from "@/components/layout/HeaderDesktopNav";
import { OVERLAY_CHROME_MOTION } from "@/components/layout/overlay-chrome-motion";
import { cx, publicHome } from "@/components/ui/public-tokens";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export type HeaderProps = {
  variant?: "default" | "heroOverlay" | "contacto";
  /** Glass vs lime accent on overlay / contacto CTAs (mobile + desktop). */
  overlayCtaVariant?: "lime" | "outline";
};

/** Shared glass login pill on dark chrome (`HeroHeader` + `heroOverlay` + `contacto`). */
const heroOverlayCtaClassName = cx(
  publicHome.ctaPillGhostOnPhoto,
  "hidden !w-auto whitespace-nowrap sm:inline-flex",
  OVERLAY_CHROME_MOTION,
);

export function Header({
  variant = "default",
  overlayCtaVariant = "lime",
}: HeaderProps) {
  if (variant === "contacto") {
    return (
      <header
        className={cx(
          manrope.className,
          "sticky top-0 z-50 w-full shrink-0 px-4 pt-4 sm:px-6 sm:pt-5",
        )}
      >
        <div className="mx-auto w-full max-w-[1552px]">
          <div
            className={cx(
              "flex w-full min-w-0 items-center justify-between gap-3 rounded-full border border-white/15 px-4 py-2.5 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)] backdrop-blur-[14px] sm:gap-6 sm:px-6 sm:py-3 md:px-7",
              "bg-[#1e3a5f]/88",
            )}
          >
            <Link
              href="/"
              className="relative shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image
                src={HEADER_LOGO_LIGHT}
                alt="TAMMA Group"
                width={158}
                height={64}
                className="relative h-14 w-[140px] max-w-full sm:h-16 sm:w-[157.651px]"
                priority
                unoptimized
              />
            </Link>
            <HeaderDesktopNav variant="onDark" className="hidden min-w-0 flex-1 lg:flex" />
            <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
              <Link href="/contacto" className={heroOverlayCtaClassName}>
                Registrarse / iniciar sesión
              </Link>
              <MobileNavigation overlay overlayCtaVariant={overlayCtaVariant} />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === "heroOverlay") {
    return (
      <header
        className={cx(
          manrope.className,
          "relative z-30 w-full shrink-0 overflow-hidden rounded-t-[32px]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/20 backdrop-blur-[17px]" aria-hidden />
        <div
          className={cx(
            "relative flex w-full min-h-0 min-w-0 items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:justify-start lg:gap-[40px] lg:px-[36px] lg:py-[16px]",
          )}
        >
          <Link
            href="/"
            className="relative shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src={HEADER_LOGO_LIGHT}
              alt="TAMMA Group"
              width={158}
              height={64}
              className="relative h-14 w-[140px] max-w-full sm:h-16 sm:w-[157.651px]"
              priority
              unoptimized
            />
          </Link>
          <HeaderDesktopNav variant="onDark" className="hidden min-w-0 flex-1 lg:flex" />
          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/contacto" className={heroOverlayCtaClassName}>
              Registrarse / iniciar sesión
            </Link>
            <MobileNavigation overlay overlayCtaVariant={overlayCtaVariant} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cx(
        manrope.className,
        "sticky top-0 z-50 border-b border-slate-200/80 bg-white",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1552px] min-w-0 items-center justify-between gap-4 px-4 py-3.5 sm:gap-8 sm:px-6 sm:py-4 lg:gap-10 lg:px-9">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]"
        >
          <Image
            src={HEADER_LOGO_DARK}
            alt="TAMMA Group"
            width={158}
            height={64}
            className="h-14 w-[140px] max-w-full sm:h-16 sm:w-[157.651px]"
            priority
            unoptimized
          />
        </Link>
        <HeaderDesktopNav variant="onLight" className="hidden min-w-0 flex-1 lg:flex" />
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contacto"
            className="hidden rounded-[96px] border border-slate-300 bg-slate-50 px-6 py-4 text-base font-bold text-slate-800 sm:inline-flex"
          >
            Registrarse / iniciar sesión
          </Link>
          <MobileNavigation overlay={false} overlayCtaVariant={overlayCtaVariant} />
        </div>
      </div>
    </header>
  );
}
