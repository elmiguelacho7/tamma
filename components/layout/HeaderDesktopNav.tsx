"use client";

import { usePathname } from "next/navigation";
import { publicNavLinks } from "./nav-links";
import { cx } from "@/components/ui/public-tokens";
import { TransitionLink } from "@/components/motion/TransitionLink";

type HeaderDesktopNavProps = {
  className?: string;
  /** Hero / overlay: white links, 2px pill underline at `bottom: -4px` (Figma). */
  variant?: "onDark" | "onLight";
};

/**
 * HOME hero header (`56:2276`): `pl-[41px] py-[13px]`, row `gap-[60px]`, 16px.
 * Active: `text-white` + 2px `rounded-full` bar at `bottom: -4px`; bar animates via opacity + scale-x (no layout shift).
 */
export function HeaderDesktopNav({
  className,
  variant = "onDark",
}: HeaderDesktopNavProps) {
  const pathname = usePathname();
  const dark = variant === "onDark";

  return (
    <nav
      className={cx(
        "flex min-h-0 min-w-0 flex-1 items-center justify-center rounded-lg py-[13px] pl-[41px]",
        className,
      )}
      aria-label="Principal"
    >
      <ul className="flex shrink-0 items-start gap-[60px]">
        {publicNavLinks.map(({ href, label }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <TransitionLink
                href={href}
                className={cx(
                  "relative inline-flex items-center justify-center text-base leading-normal whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  dark
                    ? cx(
                        "font-bold text-white hover:text-white/80 focus-visible:outline-white",
                        active && "text-white",
                      )
                    : cx(
                        "font-bold text-[#0f172a] hover:text-[#0E3272] focus-visible:outline-[#4B7C38]",
                        active && "text-[#0f172a]",
                      ),
                )}
                pressedClassName="opacity-85"
              >
                {label}
                <span
                  className={cx(
                    "pointer-events-none absolute bottom-[-4px] left-0 right-0 h-[2px] w-full origin-center rounded-full",
                    "transition-[opacity,transform] duration-[220ms] ease-out will-change-transform transform-gpu",
                    active ? "scale-x-100 opacity-100" : "scale-x-75 opacity-0",
                    dark ? "bg-white" : "bg-[#4B7C38]",
                  )}
                  aria-hidden
                />
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
