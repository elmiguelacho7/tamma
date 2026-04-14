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
import { HEADER_LOGO_DARK, HEADER_LOGO_LIGHT } from "@/components/layout/header-assets";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { HeaderDesktopNav } from "@/components/layout/HeaderDesktopNav";
import { OVERLAY_CHROME_MOTION } from "@/components/layout/overlay-chrome-motion";
import { manrope } from "@/lib/fonts/manrope";
import { cx, publicHome } from "@/components/ui/public-tokens";

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
          "relative z-50 w-full shrink-0 px-4 pt-4 sm:px-6 sm:pt-5",
        )}
        style={{ viewTransitionName: "public-header" } as any}
      >
        <div className="mx-auto w-full max-w-[1552px]">
          <div
            className={cx(
              "flex w-full min-w-0 items-center justify-between gap-3 rounded-full border border-white/20 px-4 py-2.5 shadow-[0_12px_40px_-12px_rgba(27,94,32,0.22)] backdrop-blur-[14px] sm:gap-6 sm:px-6 sm:py-3 md:px-7",
              "bg-[linear-gradient(135deg,rgba(197,225,165,0.42)_0%,rgba(27,94,32,0.22)_60%,rgba(197,225,165,0.32)_100%)]",
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
        style={{ viewTransitionName: "public-header" } as any}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-black/20 max-lg:backdrop-blur-md lg:backdrop-blur-[17px]"
          aria-hidden
        />
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
      style={{ viewTransitionName: "public-header" } as any}
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
            unoptimized
          />
        </Link>
        <HeaderDesktopNav variant="onLight" className="hidden min-w-0 flex-1 lg:flex" />
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contacto"
            className="hidden rounded-[96px] border border-slate-300 bg-slate-50 px-6 py-4 text-base font-bold text-slate-800 transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-slate-400 hover:bg-slate-100/90 active:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38] sm:inline-flex"
          >
            Registrarse / iniciar sesión
          </Link>
          <MobileNavigation overlay={false} overlayCtaVariant={overlayCtaVariant} />
        </div>
      </div>
    </header>
  );
}
