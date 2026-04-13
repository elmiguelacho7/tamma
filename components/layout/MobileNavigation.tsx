"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OVERLAY_CHROME_MOTION } from "@/components/layout/overlay-chrome-motion";
import { publicUi, cx } from "@/components/ui/public-tokens";
import { publicNavLinks } from "./nav-links";

type MobileNavigationProps = {
  overlay?: boolean;
  overlayCtaVariant?: "lime" | "outline";
};

export function MobileNavigation({
  overlay = false,
  overlayCtaVariant = "lime",
}: MobileNavigationProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cx(
          "flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full border border-solid transition-colors duration-200 lg:hidden",
          overlay
            ? cx(
                "border-white/50 bg-white/10 text-white backdrop-blur-[4px]",
                OVERLAY_CHROME_MOTION,
              )
            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]",
        )}
        aria-label="Abrir menú de navegación"
      >
        <Menu className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
      </DialogTrigger>
      <DialogContent className="gap-0 p-0" aria-describedby="mobile-nav-desc">
        <div className="border-b border-slate-100 px-6 pb-4 pt-6">
          <DialogTitle>Menú</DialogTitle>
          <p id="mobile-nav-desc" className="mt-1 text-sm text-slate-600">
            Navegación principal del sitio.
          </p>
        </div>
        <nav
          className="flex flex-1 flex-col overflow-y-auto px-3 py-4"
          aria-label="Principal móvil"
          aria-describedby="mobile-nav-desc"
        >
          <ul className="flex flex-col gap-0.5">
            {publicNavLinks.map(({ href, label }) => (
              <li key={href}>
                <DialogClose asChild>
                  <Link
                    href={href}
                    className="flex min-h-[3rem] items-center rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors duration-200 hover:bg-slate-50 active:bg-slate-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]"
                  >
                    {label}
                  </Link>
                </DialogClose>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-slate-100 px-3 pt-4">
            <DialogClose asChild>
              <Link
                href="/contacto"
                className={cx(
                  "flex w-full items-center justify-center text-center text-base font-bold transition-opacity duration-200",
                  overlay
                    ? cx(
                        "min-h-[3.25rem] rounded-full border border-white/50 bg-white/10 px-[24px] py-[16px] text-white backdrop-blur-[4px]",
                        OVERLAY_CHROME_MOTION,
                      )
                    : cx(publicUi.primaryButton, "w-full justify-center"),
                )}
              >
                Registrarse / iniciar sesión
              </Link>
            </DialogClose>
          </div>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
