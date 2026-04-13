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
            "flex min-w-0 flex-nowrap overflow-x-auto overscroll-x-contain scroll-pl-4 scroll-pr-4 outline-none [-webkit-overflow-scrolling:touch]",
            tightFooter ? "pb-0" : "pb-3",
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
                "sm:w-[330px]",
              )}
              style={{
                backgroundImage:
                  "linear-gradient(139.77331271433974deg, rgb(255, 216, 247) 11.555%, rgb(255, 255, 255) 16.678%, rgb(255, 255, 255) 73.719%, rgb(214, 231, 255) 134.39%)",
              }}
            >
              <div className="flex w-full items-center gap-[14.4px]">
                <div className="relative size-[36px] shrink-0 overflow-hidden rounded-[36px]">
                  <div
                    className="absolute inset-0 rounded-[36px] bg-[#811ea1]"
                    aria-hidden
                  />
                  {t.users[0] ? (
                    <Image
                      src={t.users[0]}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                      draggable={false}
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className="flex min-h-px min-w-px flex-[1_0_0] flex-col gap-[7.2px] not-italic">
                  <p className="w-full text-[14.4px] font-semibold leading-[18px] text-[#1a1a1a]">
                    {t.name}
                  </p>
                  <p className="w-full text-[10.8px] font-normal leading-[13.5px] text-[rgba(0,0,0,0.5)]">
                    {t.date}
                  </p>
                </div>
              </div>

              <div className="relative mt-[14.4px] h-[21.6px] w-[122.4px]">
                <Image
                  src="/images/home/testimonials/rating.png"
                  alt=""
                  fill
                  sizes="122px"
                  className="object-contain"
                  draggable={false}
                  unoptimized
                />
              </div>

              <p className="mt-[14.4px] w-full text-pretty text-[14.4px] font-normal leading-[18px] text-[#1a1a1a] not-italic">
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
              )
            : publicLayout.carouselRailToPagerDefault,
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
