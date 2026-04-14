"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  computePageOffsets,
  scrollLeftToActivePage,
} from "@/lib/horizontalCarouselRail";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

export type ReviewCarouselItem = {
  name: string;
  date: string;
  quote: string;
  /** Avatar image paths (first is shown; matches Figma single-avatar treatment). */
  users: readonly string[];
};

type ReviewsCarouselProps = {
  reviews: readonly ReviewCarouselItem[];
  /** Gap between cards in px (Figma row uses 20px between 330px cards). */
  gapPx?: number;
  className?: string;
  /**
   * Tighter rail + pager spacing for a flush next section (e.g. Nosotros → Contact).
   * Default spacing unchanged for Home.
   */
  tightFooter?: boolean;
  /**
   * Slightly roomier cards + quote line-height on narrow viewports (Home + `/seguros`).
   * Default false — other marketing routes omit.
   */
  railComfort?: boolean;
};

/** Min movement before a pointer gesture is treated as drag (not click). */
const RAIL_DRAG_THRESHOLD_PX = 6;
const RAIL_DRAG_HORIZONTAL_RATIO = 0.85;

function isRailInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a[href],button,input,textarea,select,option,[role='button'],[data-no-rail-drag]",
    ),
  );
}

type ReviewsRailPagerProps = {
  pageCount: number;
  activePage: number;
  onSelectPage: (index: number) => void;
  railId: string;
};

function ReviewsRailPager({
  pageCount,
  activePage,
  onSelectPage,
  railId,
}: ReviewsRailPagerProps) {
  if (pageCount <= 1) {
    return (
      <div className="flex w-full items-center justify-center gap-[7px]">
        <div
          className="h-[10px] w-[44px] rounded-[5px] bg-[#1b5e20]"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-wrap items-center justify-center gap-[7px]"
      role="tablist"
      aria-label="Páginas del carrusel de opiniones"
    >
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activePage}
          aria-controls={railId}
          aria-label={`Página ${i + 1} de ${pageCount}`}
          onClick={() => onSelectPage(i)}
          className={cx(
            publicHome.pagerSegmentTransition,
            publicHome.focusRingBrand,
            i === activePage
              ? "h-[10px] w-[44px] bg-[#1b5e20]"
              : "size-[10px] bg-[#7cb342] hover:bg-[#6da836]",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel({
  reviews,
  gapPx = 20,
  className,
  tightFooter = false,
  railComfort = false,
}: ReviewsCarouselProps) {
  const navId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageOffsetsRef = useRef<number[]>([0]);
  const rafScrollRef = useRef<number>(0);
  const suppressRailClickRef = useRef(false);
  const dragSessionRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    dragging: boolean;
  } | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const offsets = computePageOffsets(el, gapPx, reviews.length);
    pageOffsetsRef.current = offsets;
    setPageCount(offsets.length);
    const next = scrollLeftToActivePage(el.scrollLeft, offsets);
    setActivePage(next);
  }, [gapPx, reviews.length]);

  useLayoutEffect(() => {
    measure();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useEffect(() => {
    return () => {
      if (rafScrollRef.current) {
        cancelAnimationFrame(rafScrollRef.current);
        rafScrollRef.current = 0;
      }
    };
  }, []);

  const onScrollRail = useCallback(() => {
    if (rafScrollRef.current) return;
    rafScrollRef.current = requestAnimationFrame(() => {
      rafScrollRef.current = 0;
      const el = scrollRef.current;
      if (!el) return;
      const offsets = pageOffsetsRef.current;
      const next = scrollLeftToActivePage(el.scrollLeft, offsets);
      setActivePage((p) => (p !== next ? next : p));
    });
  }, []);

  const goToPage = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const offsets = pageOffsetsRef.current;
    if (!offsets.length) return;
    const i = Math.max(0, Math.min(index, offsets.length - 1));
    const left = offsets[i] ?? 0;
    el.scrollTo({ left, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const i = scrollLeftToActivePage(el.scrollLeft, pageOffsetsRef.current);
    goToPage(i - 1);
  }, [goToPage]);

  const goNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const i = scrollLeftToActivePage(el.scrollLeft, pageOffsetsRef.current);
    goToPage(i + 1);
  }, [goToPage]);

  const onRailKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      if (e.key === "ArrowLeft") goPrev();
      else goNext();
    },
    [goPrev, goNext],
  );

  const endRailPointerGesture = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const session = dragSessionRef.current;
      const el = scrollRef.current;
      if (!session || session.pointerId !== e.pointerId) return;

      if (
        el &&
        typeof el.hasPointerCapture === "function" &&
        el.hasPointerCapture(e.pointerId)
      ) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }

      const dragged = session.dragging;
      dragSessionRef.current = null;

      if (el) {
        el.style.cursor = "";
        el.style.removeProperty("user-select");
      }
      document.body.style.removeProperty("user-select");

      if (dragged) {
        suppressRailClickRef.current = true;
      }
    },
    [],
  );

  const onRailPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      if (isRailInteractiveTarget(e.target)) return;

      const el = scrollRef.current;
      if (!el) return;

      dragSessionRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startScrollLeft: el.scrollLeft,
        dragging: false,
      };

      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        dragSessionRef.current = null;
      }
    },
    [],
  );

  const onRailPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const session = dragSessionRef.current;
    const el = scrollRef.current;
    if (!session || !el || session.pointerId !== e.pointerId) return;

    const dx = e.clientX - session.startX;
    const dy = e.clientY - session.startY;

    if (!session.dragging) {
      if (
        Math.abs(dx) < RAIL_DRAG_THRESHOLD_PX &&
        Math.abs(dy) < RAIL_DRAG_THRESHOLD_PX
      ) {
        return;
      }
      if (Math.abs(dx) < Math.abs(dy) * RAIL_DRAG_HORIZONTAL_RATIO) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        dragSessionRef.current = null;
        return;
      }
      session.dragging = true;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      document.body.style.userSelect = "none";
    }

    e.preventDefault();
    el.scrollLeft = session.startScrollLeft - dx;
  }, []);

  const onRailPointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      endRailPointerGesture(e);
    },
    [endRailPointerGesture],
  );

  const onRailPointerCancel = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      endRailPointerGesture(e);
    },
    [endRailPointerGesture],
  );

  const onRailClickCapture = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!suppressRailClickRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      suppressRailClickRef.current = false;
    },
    [],
  );

  if (!reviews.length) return null;

  return (
    <div className={cx("w-full min-w-0", className)}>
      <div className="relative">
        <div
          id={navId}
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Opiniones de pacientes"
          onScroll={onScrollRail}
          onKeyDown={onRailKeyDown}
          onPointerDown={onRailPointerDown}
          onPointerMove={onRailPointerMove}
          onPointerUp={onRailPointerUp}
          onPointerCancel={onRailPointerCancel}
          onClickCapture={onRailClickCapture}
          className={cx(
            "flex min-w-0 flex-nowrap overflow-x-auto overscroll-x-contain outline-none [-webkit-overflow-scrolling:touch]",
            railComfort
              ? "scroll-pl-3 scroll-pr-5 sm:scroll-pl-4 sm:scroll-pr-4"
              : "scroll-pl-4 scroll-pr-4",
            tightFooter
              ? railComfort
                ? "pb-2"
                : "pb-0"
              : railComfort
                ? "pb-4 sm:pb-3"
                : "pb-3",
            "no-scrollbar touch-pan-x cursor-grab",
            publicHome.focusRingBrandSoft,
          )}
          style={{ gap: gapPx }}
        >
          {reviews.map((t, index) => (
            <article
              key={`${t.name}-${t.date}-${index}`}
              data-review-card={index}
              className={cx(
                "w-[min(330px,calc(100dvw-40px))] shrink-0 rounded-[14.4px] border-[0.45px] border-solid border-[#3c3d42] p-[21.6px] transition-shadow duration-200 hover:shadow-[0_12px_32px_-14px_rgba(15,23,42,0.14)]",
                railComfort &&
                  "max-sm:w-[min(292px,calc(100dvw-52px))] max-sm:px-4 max-sm:py-5 sm:px-[21.6px] sm:py-[21.6px]",
                "sm:w-[330px]",
              )}
              style={{
                backgroundImage:
                  "linear-gradient(139.77331271433974deg, rgb(255, 216, 247) 11.555%, rgb(255, 255, 255) 16.678%, rgb(255, 255, 255) 73.719%, rgb(214, 231, 255) 134.39%)",
              }}
            >
              <div
                className={cx(
                  "flex w-full min-w-0 items-center gap-[14.4px]",
                  railComfort && "max-sm:gap-2.5",
                )}
              >
                <div
                  className={cx(
                    "relative shrink-0 overflow-hidden bg-[#811ea1]",
                    railComfort
                      ? "size-8 rounded-full sm:size-[36px] sm:rounded-[36px]"
                      : "size-[36px] rounded-[36px]",
                  )}
                >
                  <div
                    className={cx(
                      "absolute inset-0 bg-[#811ea1]",
                      railComfort
                        ? "rounded-full sm:rounded-[36px]"
                        : "rounded-[36px]",
                    )}
                    aria-hidden
                  />
                  {t.users[0] ? (
                    <Image
                      src={t.users[0]}
                      alt=""
                      fill
                      sizes={railComfort ? "(max-width:639px) 32px, 36px" : "36px"}
                      className="object-cover"
                      draggable={false}
                      unoptimized
                    />
                  ) : null}
                </div>
                <div
                  className={cx(
                    "flex min-h-px min-w-px flex-[1_0_0] flex-col not-italic",
                    railComfort ? "max-sm:gap-0.5 sm:gap-[7.2px]" : "gap-[7.2px]",
                  )}
                >
                  <p
                    className={cx(
                      "w-full font-semibold text-[#1a1a1a]",
                      railComfort
                        ? "max-sm:text-[13px] max-sm:leading-tight sm:text-[14.4px] sm:leading-[18px]"
                        : "text-[14.4px] leading-[18px]",
                    )}
                  >
                    {t.name}
                  </p>
                  <p
                    className={cx(
                      "w-full font-normal text-[rgba(0,0,0,0.5)]",
                      railComfort
                        ? "max-sm:text-[10px] max-sm:leading-3 sm:text-[10.8px] sm:leading-[13.5px]"
                        : "text-[10.8px] leading-[13.5px]",
                    )}
                  >
                    {t.date}
                  </p>
                </div>
              </div>

              <div
                className={cx(
                  "relative w-[122.4px]",
                  railComfort
                    ? "mt-2 h-[18px] sm:mt-[14.4px] sm:h-[21.6px]"
                    : "mt-[14.4px] h-[21.6px]",
                )}
              >
                <Image
                  src="/images/home/testimonials/rating.webp"
                  alt=""
                  fill
                  sizes="122px"
                  className="object-contain"
                  draggable={false}
                  unoptimized
                />
              </div>

              <p
                className={cx(
                  "w-full min-w-0 text-pretty font-normal text-[#1a1a1a] not-italic",
                  railComfort
                    ? "mt-3 max-sm:mt-3 max-sm:text-[13.5px] max-sm:leading-snug sm:mt-[14.4px] sm:text-[14.4px] sm:leading-[18px]"
                    : "mt-[14.4px] text-[14.4px] leading-[18px]",
                )}
              >
                {t.quote}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div
        className={cx(
          "w-full shrink-0",
          tightFooter
            ? cx(
                publicLayout.carouselRailToPagerFlush,
                publicLayout.carouselPagerBottomFlush,
                railComfort && "max-sm:!pb-8",
              )
            : cx(
                publicLayout.carouselRailToPagerDefault,
                railComfort && "max-sm:mt-1",
              ),
        )}
      >
        <ReviewsRailPager
          pageCount={pageCount}
          activePage={activePage}
          onSelectPage={goToPage}
          railId={navId}
        />
      </div>
    </div>
  );
}
