import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { publicHome, cx } from "@/components/ui/public-tokens";

function CardArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cx("h-3 w-3", className)}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

/** Figma `Icon / calendar` approx. 24×24 — stroke icon, no extra asset file. */
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type BlogPreviewCardProps = {
  href: string;
  imageSrc: string;
  title: ReactNode;
  excerpt: ReactNode;
  dateIso: string;
  dateLabel: string;
  category: string;
  titleColor: string;
  excerptClassName: string;
  titleHeading?: "h2" | "h3";
};

/**
 * Single shared blog tile (Figma `56:2660`): Home `BlogPreview` and Consejos listing/detail.
 *
 * **Frozen:** do not refactor structure, image ratio, arrow, footer/meta layout, or shared spacing.
 * No card variants. If `/` vs `/consejos` visuals drift, adjust Consejos preview copy only via
 * `listingTitle` / `listingExcerpt` in `lib/consejos-data.ts`. Reopen structure only after an
 * explicit design review that proves a true layout mismatch.
 */
export function BlogPreviewCard({
  href,
  imageSrc,
  title,
  excerpt,
  dateIso,
  dateLabel,
  category,
  titleColor,
  excerptClassName,
  titleHeading: TitleTag = "h3",
}: BlogPreviewCardProps) {
  return (
    <article className="flex h-full min-h-0 w-full min-w-0 max-w-[333px] flex-col gap-3 sm:max-w-none">
      <Link
        href={href}
        className="group relative block aspect-[333/223] w-full overflow-hidden rounded-none focus-visible:outline-none"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition-opacity duration-200 group-hover:opacity-95"
          sizes="(min-width: 1024px) 333px, (min-width: 640px) 50vw, 100vw"
        />
        <div
          className={cx(
            "absolute bottom-[11px] right-[11px] flex size-11 items-center justify-center rounded-[8px] border border-solid border-[#424242] bg-white/95 text-[#424242] shadow-sm",
            publicHome.iconActionChipMicro,
          )}
          aria-hidden
        >
          <CardArrowIcon className={publicHome.iconActionGlyphMicro} />
        </div>
      </Link>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <TitleTag className={cx("text-[18px] font-bold leading-normal", titleColor)}>
          <Link
            href={href}
            className={cx(
              "line-clamp-2 block break-words hover:underline",
              publicHome.focusOutlineBrandText,
            )}
          >
            {title}
          </Link>
        </TitleTag>
        <div
          className={cx(
            "line-clamp-3 break-words text-[16px] font-normal leading-normal",
            excerptClassName,
          )}
        >
          {excerpt}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-[16px] font-normal leading-normal text-[#989a9f]">
          <div className="flex items-center gap-3">
            <CalendarIcon className="size-6 shrink-0 text-[#989a9f]" />
            <time dateTime={dateIso}>{dateLabel}</time>
          </div>
          <span className="min-w-0 text-right text-pretty sm:whitespace-nowrap">{category}</span>
        </div>
      </div>
    </article>
  );
}
