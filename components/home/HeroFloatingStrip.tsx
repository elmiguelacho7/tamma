import type { CSSProperties } from "react";
import { cx } from "@/components/ui/public-tokens";

/** Runtime paths — lowercase, no spaces (must match `public/images/home/icons/`). */
const ICON_24H = "/images/home/icons/strip-icon-24h.webp";
const ICON_LOCATION = "/images/home/icons/strip-icon-location.webp";
const ICON_SMARTWATCH = "/images/home/icons/strip-icon-smartwatch.webp";

/**
 * HOME hero strip — Figma `56:2349`–`56:2365`: outer frame 1284×129, corner radius 32 (end columns),
 * backdrop blur 17px, fill rgba(246,246,246,0.4); three columns, icon above copy, 12px cell padding.
 */
const cellClass = cx(
  "flex w-full min-w-0 flex-col items-center gap-0.5 px-1.5 py-0.5 text-center sm:gap-3 sm:px-4 sm:py-3.5 lg:gap-3 lg:px-4 lg:py-4",
  "rounded-[24px] border-[#c5e1a5] border-[0.5px] border-solid bg-[rgba(246,246,246,0.38)] backdrop-blur-[16px] shadow-[0_2px_16px_rgba(62,69,69,0.11)]",
  "lg:min-w-0 lg:flex-1 lg:basis-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
);

const textStackClass = "flex w-full flex-col gap-0.5 sm:gap-1";

const iconBoxClass = "relative h-7 w-7 shrink-0 sm:h-12 sm:w-12";

export function HeroFloatingStrip({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cx(
        "flex w-full min-w-0 max-w-full flex-col gap-0.5 sm:gap-2.5",
        "lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x-[0.5px] lg:divide-[#c5e1a5] lg:overflow-hidden lg:rounded-[32px] lg:border-[0.5px] lg:border-[#c5e1a5] lg:bg-[rgba(246,246,246,0.4)] lg:py-0 lg:shadow-[0_2px_19px_rgba(62,69,69,0.12)] lg:backdrop-blur-[17px]",
        className,
      )}
      style={style}
    >
      <div className={cellClass}>
        <div className={iconBoxClass}>
          <img
            src={ICON_24H}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-xs font-medium leading-tight text-[#0f0f0f] sm:text-base sm:leading-normal lg:text-base">
            Atención 24/7
          </p>
          <p className="text-pretty text-[11px] font-normal leading-snug text-[#424242] sm:text-sm sm:leading-normal lg:text-sm">
            Telemedicina y médicos en casa cuando más los necesites.
          </p>
        </div>
      </div>

      <div className={cellClass}>
        <div className={iconBoxClass}>
          <img
            src={ICON_LOCATION}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-xs font-medium leading-tight text-[#0f0f0f] sm:text-base sm:leading-normal lg:text-base">
            Alcance Nacional
          </p>
          <p className="text-pretty text-[11px] font-normal leading-snug text-[#424242] sm:text-sm sm:leading-normal lg:text-sm">
            Medicinas y servicios clínicos en cualquier rincón del país.
          </p>
        </div>
      </div>

      <div className={cellClass}>
        <div className={iconBoxClass}>
          <img
            src={ICON_SMARTWATCH}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-xs font-medium leading-tight text-[#0f0f0f] sm:text-base sm:leading-normal lg:text-base">
            Tecnología SMART
          </p>
          <p className="text-pretty text-[11px] font-normal leading-snug text-[#424242] sm:text-sm sm:leading-normal lg:text-sm">
            Tu perfil de salud siempre seguro y disponible en la nube.
          </p>
        </div>
      </div>
    </div>
  );
}
