"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
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

// Figma HOME services section — node `56:2379`
const OLAS_TAMMA = "/images/home/services/olas-tamma.png";

/** Matches `gap-[32px]` on the rail — used for stride math. */
const SERVICES_RAIL_GAP_PX = 32;

/** Min movement before a pointer gesture is treated as drag (not click). */
const RAIL_DRAG_THRESHOLD_PX = 6;

/**
 * Require horizontal intent so vertical page scroll is not hijacked.
 * dx must exceed dy * ratio to start rail drag.
 */
const RAIL_DRAG_HORIZONTAL_RATIO = 0.85;

function isRailInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a[href],button,input,textarea,select,option,[role='button'],[data-no-rail-drag]",
    ),
  );
}

type ServiceCard = {
  title: string;
  description: string;
  imageSrc: string;
  iconSrc: string;
};

const cards: ServiceCard[] = [
  {
    title: "Telemedicina",
    description:
      "Accede a consultas telefónicas con orientación y soporte médico.",
    imageSrc: "/images/home/services/card-telemedicina.jpg",
    iconSrc: "/images/home/services/icons/telemedicina.png",
  },
  {
    title: "Traslados en ambulancia",
    description: "Unidades UCI y básicas con respuesta en 10-20 min.",
    imageSrc: "/images/home/services/card-ambulancia.jpg",
    iconSrc: "/images/home/services/icons/ambulancia.png",
  },
  {
    title: "Cadena de suministros de medicamentos",
    description:
      "Venta y entrega de medicamentos e insumos a nivel nacional.",
    imageSrc: "/images/home/services/card-suministros.jpg",
    iconSrc: "/images/home/services/icons/suministros.png",
  },
  {
    title: "Asistencia medica domiciliaria (AMD)",
    description:
      "Enviamos un médico y paramédico al lugar para realizar una evaluación general.",
    imageSrc: "/images/home/services/card-amd.jpg",
    iconSrc: "/images/home/services/icons/suministros.png",
  },
  {
    title: "Atención clínica",
    description:
      "A través de nuestros aliados comerciales podemos ofrecer diversos servicios a nivel nacional.",
    imageSrc: "/images/home/services/card-clinica.jpg",
    iconSrc: "/images/home/services/icons/clinica.png",
  },
] as const;

type ServicesRailPagerProps = {
  pageCount: number;
  activePage: number;
  onSelectPage: (index: number) => void;
  railId: string;
};

function ServicesRailPager({
  pageCount,
  activePage,
  onSelectPage,
  railId,
}: ServicesRailPagerProps) {
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
      className="flex w-full flex-wrap items-center justify-center gap-[7px] pt-0"
      role="tablist"
      aria-label="Páginas del carrusel de servicios"
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

function FigmaServiceCard({ card }: { card: ServiceCard }) {
  return (
    <article className="w-[min(340px,calc(100dvw-48px))] shrink-0 overflow-hidden rounded-[32px] bg-white shadow-[0px_2px_19px_0px_rgba(0,0,0,0.14)] transition-shadow duration-300 ease-out hover:shadow-[0px_8px_28px_-6px_rgba(0,0,0,0.16)] sm:w-[429px]">
      <div className="relative h-[274px] w-full overflow-hidden">
        <Image
          src={card.imageSrc}
          alt=""
          fill
          sizes="(min-width: 640px) 429px, min(340px, calc(100dvw - 48px))"
          className="object-cover"
          draggable={false}
          priority={false}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden />
      </div>

      <div className="w-full px-[16px] py-[24px]">
        <div className="flex w-full items-start gap-[12px]">
          <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[96px] border border-solid border-[#1b5e20] p-[16px]">
            <div className="relative size-[24px] overflow-hidden">
              <Image
                src={card.iconSrc}
                alt=""
                fill
                sizes="24px"
                className="object-contain"
                draggable={false}
              />
            </div>
          </div>

          <div className="flex min-h-px min-w-px flex-[1_0_0] flex-col gap-[8px]">
            <h3 className="w-full text-pretty text-[24px] font-bold leading-normal text-[#191c1b]">
              {card.title}
            </h3>
            <p className="w-full text-pretty text-[16px] font-normal leading-relaxed text-[#424242] sm:leading-normal">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

const SERVICES_RAIL_ID = "home-services-rail";

export function ServicesPreview() {
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
    const offsets = computePageOffsets(el, SERVICES_RAIL_GAP_PX, cards.length);
    pageOffsetsRef.current = offsets;
    setPageCount(offsets.length);
    const next = scrollLeftToActivePage(el.scrollLeft, offsets);
    setActivePage(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      measure();
    });
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

  const onRailKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const el = scrollRef.current;
      if (!el) return;
      const offsets = pageOffsetsRef.current;
      const i = scrollLeftToActivePage(el.scrollLeft, offsets);
      goToPage(e.key === "ArrowLeft" ? i - 1 : i + 1);
    },
    [goToPage],
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
      /* Touch: native horizontal overflow scroll + momentum (do not capture). */
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

  return (
    <section className="relative isolate w-full min-w-0 overflow-x-clip overflow-y-clip bg-[#f6f6f6]">
      {/* OLAS TAMMA background — Figma `56:2380`; decorative only, z-0 so copy/CTA stay in flow above. */}
      <div
        className="pointer-events-none absolute left-[-957px] top-[-1076px] z-0 h-[3106.2px] w-[3595.547px]"
        aria-hidden
      >
        <div className="h-full w-full rotate-[-20.52deg]">
          <div className="relative h-[2186px] w-[3020.989px]">
            <Image
              src={OLAS_TAMMA}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, min(1200px, 90vw)"
              className="object-cover max-lg:opacity-50 lg:opacity-75"
            />
          </div>
        </div>
      </div>

      <div
        className={cx(
          publicLayout.figmaContainer,
          "relative z-10 flex min-w-0 flex-col",
          publicLayout.figmaSectionPadding,
          "pt-16 sm:pt-14 lg:pt-[60px]",
          publicLayout.figmaSectionGap,
        )}
      >
        <header className="relative z-10 flex w-full min-w-0 flex-col gap-3.5 text-center leading-none sm:gap-4">
          <h2 className={cx("w-full text-[#1b5e20]", publicHome.headingSection)}>
            <span className="text-[#1b5e20]">Servicios integrales </span>
            <span className={publicHome.headingAccentGreen}>especializados</span>
          </h2>
          <p className={cx("w-full", publicHome.bodyLead)}>
            Tecnología y calidez humana unidas para ofrecerte el mejor cuidado de
            salud.
          </p>
        </header>

        {/* Figma rail `57:5873` — controlled horizontal groups + functional pager */}
        <div
          id={SERVICES_RAIL_ID}
          ref={scrollRef}
          role="region"
          aria-label="Carrusel de servicios"
          tabIndex={0}
          onScroll={onScrollRail}
          onKeyDown={onRailKeyDown}
          onPointerDown={onRailPointerDown}
          onPointerMove={onRailPointerMove}
          onPointerUp={onRailPointerUp}
          onPointerCancel={onRailPointerCancel}
          onClickCapture={onRailClickCapture}
          className={cx(
            "flex min-w-0 flex-nowrap items-stretch gap-[32px] overflow-x-auto overscroll-x-contain scroll-pl-4 scroll-pr-4 pb-3 [-webkit-overflow-scrolling:touch]",
            "no-scrollbar touch-pan-x",
            "cursor-grab",
            "pr-4 lg:pr-[60px]",
          )}
        >
          {cards.map((card) => (
            <FigmaServiceCard key={card.title} card={card} />
          ))}
        </div>

        <div className="pt-2 sm:pt-1">
          <ServicesRailPager
            pageCount={pageCount}
            activePage={activePage}
            onSelectPage={goToPage}
            railId={SERVICES_RAIL_ID}
          />
        </div>

        <div className="flex w-full items-center justify-center pt-2 sm:pt-1">
          <Link
            href="/servicios"
            className={publicHome.ctaPillPrimary}
            data-ga-event="primary_cta_click"
            data-ga-label="home_services_primary"
            style={{
              backgroundImage:
                "linear-gradient(141.0879577466402deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
            }}
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
