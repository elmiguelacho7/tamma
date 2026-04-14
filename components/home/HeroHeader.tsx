"use client";

/**
 * HOME hero header — top *region* of the framed hero shell (Figma `67:134` inside `56:2277`):
 * frosted band shares the same outer clip as the hero; no separate floating toolbar chrome.
 * Login CTA uses `publicHome.ctaPillGhostOnPhoto` — same token as `Header` `heroOverlay`.
 * Marketing chrome routing matrix: `components/layout/Header.tsx` file comment (Home/Nosotros use this pattern, not `Header` variants).
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderDesktopNav } from "@/components/layout/HeaderDesktopNav";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { OVERLAY_CHROME_MOTION } from "@/components/layout/overlay-chrome-motion";
import { HEADER_LOGO_LIGHT } from "@/components/layout/header-assets";
import { manrope } from "@/lib/fonts/manrope";
import { publicHome, cx } from "@/components/ui/public-tokens";

const SCROLL_THRESHOLD_PX = 32;

const HERO_HEADER_BG = "/images/home/hero-header-bg.png";

export function HeroHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD_PX;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(manrope.className, "relative z-20 w-full shrink-0")}
    >
      <div className="pointer-events-auto relative w-full overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_HEADER_BG}
            alt=""
            fill
            className="object-cover object-center opacity-[0.38]"
            sizes="(min-width: 1024px) min(1552px, 100vw), 100vw"
            loading="eager"
            decoding="async"
          />
          <div
            className={cx(
              "absolute inset-0 max-lg:backdrop-blur-[8px] lg:backdrop-blur-[11px] transition-colors duration-200 ease-out",
              scrolled ? "bg-black/[0.07]" : "bg-black/[0.02]",
            )}
            aria-hidden
          />
        </div>

        <div className="relative flex min-h-[5.5rem] w-full items-center justify-between gap-4 px-5 py-[14px] sm:min-h-[5.75rem] sm:gap-5 sm:px-7 sm:py-[15px] lg:min-h-[96px] lg:gap-[40px] lg:px-[36px] lg:py-[16px]">
          <Link
            href="/"
            className="relative z-[1] shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src={HEADER_LOGO_LIGHT}
              width={158}
              height={64}
              alt="Tamma Group"
              className="h-[3.5rem] w-auto sm:h-16 lg:h-16"
              unoptimized
            />
          </Link>

          <HeaderDesktopNav className="hidden min-w-0 lg:flex" variant="onDark" />

          <div className="relative z-[1] flex shrink-0 items-center gap-2.5 sm:gap-3">
            <Link
              href="/contacto"
              className={cx(
                publicHome.ctaPillGhostOnPhoto,
                "hidden !w-auto sm:inline-flex",
                OVERLAY_CHROME_MOTION,
              )}
            >
              Registrarse / iniciar sesión
            </Link>
            <MobileNavigation overlay />
          </div>
        </div>
      </div>
    </header>
  );
}
