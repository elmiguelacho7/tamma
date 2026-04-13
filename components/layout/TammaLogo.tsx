import Image from "next/image";
import { siteImages } from "@/lib/site-images";
import { cx } from "@/components/ui/public-tokens";

const variantClass = {
  /** ~140–160px wide on large screens; scales down on mobile */
  header:
    "h-auto w-[min(46vw,7.5rem)] sm:w-[8.25rem] lg:w-[9.25rem] xl:w-[10rem]",
  /** Slightly smaller for overlay bar height */
  headerOverlay:
    "h-auto w-[min(42vw,6.75rem)] sm:w-[7.5rem] lg:w-[8.75rem] xl:w-[9.5rem]",
  /** Footer: lighter than header (~120–132px) */
  footer: "h-auto w-[6.75rem] sm:w-[7.5rem] lg:w-[8.25rem]",
} as const;

type TammaLogoProps = {
  variant: keyof typeof variantClass;
  className?: string;
  priority?: boolean;
};

/**
 * Official wordmark — intrinsic size 158×64 from SVG.
 * SVG via `next/image` with `unoptimized` for crisp vector output.
 */
export function TammaLogo({ variant, className, priority }: TammaLogoProps) {
  return (
    <Image
      src={siteImages.branding.logoSvg}
      alt="TAMMA Group"
      width={158}
      height={64}
      className={cx(variantClass[variant], className)}
      priority={priority}
      unoptimized
    />
  );
}
