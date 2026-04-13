import type { CSSProperties } from "react";
import { cx } from "@/components/ui/public-tokens";

/** Runtime paths — lowercase, no spaces (must match `public/images/home/icons/`). */
const ICON_24H = "/images/home/icons/strip-icon-24h.png";
const ICON_LOCATION = "/images/home/icons/strip-icon-location.png";
const ICON_SMARTWATCH = "/images/home/icons/strip-icon-smartwatch.png";

/**
 * HOME hero strip — Figma `56:2349`–`56:2365`: outer frame 1284×129, corner radius 32 (end columns),
 * backdrop blur 17px, fill rgba(246,246,246,0.4); three columns, icon above copy, 12px cell padding.
 */
const cellClass = cx(
  "flex w-full flex-col items-center gap-3 px-3 py-3 text-center sm:px-4 sm:py-3.5 lg:px-4 lg:py-4",
  "rounded-[24px] border-[#c5e1a5] border-[0.5px] border-solid bg-[rgba(246,246,246,0.38)] backdrop-blur-[16px] shadow-[0_2px_16px_rgba(62,69,69,0.11)]",
  "lg:min-w-0 lg:flex-1 lg:basis-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
);

const textStackClass = "flex w-full flex-col gap-1";

const iconBoxClass = "relative h-11 w-11 shrink-0 sm:h-12 sm:w-12";

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
        "flex w-full flex-col gap-2.5",
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
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-base font-medium leading-normal text-[#0f0f0f]">
            Atención 24/7
          </p>
          <p className="text-pretty text-sm font-normal leading-normal text-[#424242]">
            Telemedicina y médicos en casa cuando más los necesites.
          </p>
        </div>
      </div>

      <div className={cellClass}>
        <div className={iconBoxClass}>
          <img
            src={ICON_LOCATION}
            alt=""
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-base font-medium leading-normal text-[#0f0f0f]">
            Alcance Nacional
          </p>
          <p className="text-pretty text-sm font-normal leading-normal text-[#424242]">
            Medicinas y servicios clínicos en cualquier rincón del país.
          </p>
        </div>
      </div>

      <div className={cellClass}>
        <div className={iconBoxClass}>
          <img
            src={ICON_SMARTWATCH}
            alt=""
            className="block h-full w-full object-contain"
          />
        </div>
        <div className={textStackClass}>
          <p className="text-base font-medium leading-normal text-[#0f0f0f]">
            Tecnología SMART
          </p>
          <p className="text-pretty text-sm font-normal leading-normal text-[#424242]">
            Tu perfil de salud siempre seguro y disponible en la nube.
          </p>
        </div>
      </div>
    </div>
  );
}
