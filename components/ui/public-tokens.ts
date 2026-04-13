/**
 * Public marketing site — layout + UI tokens (Tailwind class strings).
 * Use `cn` from `@/lib/cn` for merging conflicting utilities.
 */

import { cn } from "@/lib/cn";

export { cn };
/** @deprecated Prefer `cn` from `@/lib/cn` — alias kept for existing imports */
export const cx = cn;

/** Figma 1600 artboard body width — slightly tighter xs gutters for 360–430px phones, then Figma steps. */
const figmaMarketingPageWidth =
  "mx-auto w-full min-w-0 max-w-[1599px] px-4 sm:px-6 lg:px-[60px]";

export const publicLayout = {
  /** Full-width marketing container — wider than max-w-6xl to match Figma scale */
  sectionInner:
    "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-12",
  /**
   * Figma public page container (HOME desktop width ~1599/1600, mobile ~440).
   * Breakpoint-based: mobile values match mobile frame, lg+ matches desktop frame.
   */
  figmaContainer: figmaMarketingPageWidth,
  /**
   * Route-family marketing body under hero (e.g. `/servicios` per Figma `81:1602`).
   * Same class string as `figmaContainer` — use for horizontal alignment with testimonials/contact.
   */
  marketingFigmaBody: figmaMarketingPageWidth,
  /**
   * Home wide photo frames — hero shell, corporate catalog band, `CTASurface="homeCard"`.
   * Same max width + gutters so framed cards share one horizontal rhythm (differs from `figmaContainer`).
   */
  homeWideFramedOuter:
    "mx-auto w-full min-w-0 max-w-[1600px] px-2 sm:px-2.5 lg:px-4",
  /** Figma section paddings for blocks that are explicitly padded in frames. */
  figmaSectionPadding: "py-[32px] lg:py-[60px]",
  /**
   * Softer top / full bottom — stacked Home sections share symmetric `py`; this trims top
   * so back-to-back blocks (e.g. Corporate → Testimonials) don’t feel doubly airy.
   */
  figmaSectionPaddingSofterTop: "pt-8 pb-[32px] lg:pt-12 lg:pb-[60px]",
  /** Figma vertical rhythm between blocks inside a section (Services rail stack, etc.). */
  figmaSectionGap: "gap-6 sm:gap-8 lg:gap-10",
  /**
   * Section intro (H2 + lead) → primary content (carousel, grid, accordion).
   * Tighter desktop step than `figmaSectionGap` for a consistent Home rhythm.
   */
  figmaIntroToContentGap: "gap-6 lg:gap-10",
  /**
   * Tighter intro (H2 + lead) → rail/grid — flush public stacks (e.g. About testimonials).
   * Pair with `carouselRailToPagerFlush` / `carouselPagerBottomFlush` for full rhythm.
   */
  introToContentFlush: "gap-5 lg:gap-6",
  /** H2 → supporting line inside a section header (matches ~12px Figma steps). */
  figmaHeadingStack: "flex flex-col gap-3 lg:gap-[12px]",
  /** Centered marketing header stack (Testimonials-style). */
  figmaHeadingStackCenter:
    "flex w-full flex-col items-center gap-3 text-center lg:gap-[12px]",
  /**
   * Media + copy split (e.g. insurance block): right column flexes but caps so copy/pills
   * stay off the viewport edge inside `figmaContainer`. Pair with `shrink-0` on media.
   */
  figmaSplitContentColumn:
    "w-full min-w-0 flex-1 max-w-full lg:max-w-[840px]",
  /** Footer / dense link rows — comfortable touch targets (≥44px) */
  footerLink:
    "inline-flex min-h-11 items-center rounded-sm py-1 transition-colors duration-200",
  /**
   * Footer — dark panel + compact legal strip.
   * Visual baseline: docs/design/home-full.jpg (full-bleed dark footer on reference home).
   */
  footerSectionTitle:
    "text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-slate-400",
  footerNavItem:
    "group inline-flex min-h-11 w-full max-w-[16rem] items-center rounded-lg px-2 -mx-2 text-[0.9375rem] font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  footerShell: "mt-auto border-t border-slate-800 bg-slate-900 text-slate-300",
  footerMain: "border-b border-white/10 py-7 sm:py-8 lg:py-9",
  footerLegal: "border-t border-white/10 bg-black",
  footerNavLabel:
    "border-b border-transparent pb-px transition-colors duration-200 group-hover:border-white/30",
  footerContactMeta:
    "block text-[0.6875rem] font-semibold uppercase tracking-wider text-slate-500",
  footerContactValue:
    "mt-0.5 block text-[0.9375rem] font-semibold text-white transition-colors group-hover:text-[#84CC16]",
  footerContactRow:
    "group flex min-h-11 items-center gap-3 rounded-lg px-1.5 py-1 -mx-0.5 transition-colors duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  footerContactIcon:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#84CC16] transition-colors duration-200 group-hover:border-[#84CC16]/35 group-hover:bg-white/10",
  /** Social — outline-on-dark (reference home-full footer) */
  footerSocialButton:
    "inline-flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97]",
  sectionY: "py-20 sm:py-24 lg:py-28",
  sectionYCompact: "py-16 sm:py-20 lg:py-24",
  sectionYHero: "pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32",
  /**
   * Outer white band around framed photo heroes (Servicios, Seguros, Empresas, Consejos, article hero).
   * Tighter `px/pt` on small phones so the rounded shell keeps comfortable inset vs the viewport.
   */
  marketingRouteHeroOuter:
    "mx-auto w-full min-w-0 max-w-[1600px] px-4 pt-4 sm:px-6 sm:pt-6",
  /**
   * Route-family marketing heroes (Servicios, Empresas, Seguros): inner row over full-bleed hero.
   * Flex shell, min-heights, alignment, and content padding — keep in sync across those three components.
   */
  marketingRouteHeroInner:
    "relative z-10 flex min-h-[min(78vh,46rem)] flex-col justify-end pb-[5.75rem] pt-[4.625rem] sm:min-h-[min(72vh,48rem)] sm:justify-center sm:pb-[6.75rem] sm:pt-[4.875rem] lg:min-h-[min(68vh,50rem)] lg:pb-[7.25rem] lg:pt-[5.125rem]",
  /**
   * Two-column marketing split: prose column + 2×N card grid (cobertura / confianza blocks).
   * Pair with `sectionInner`, or with `marketingFigmaBody` / `figmaContainer` on Figma-aligned routes.
   */
  sectionTrustSplit:
    "grid gap-10 py-20 sm:gap-12 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-28",
  /**
   * `/servicios` Showcase intro — Figma `81:1602` frame `84:1449` (~60px top inset, ~24px bottom before rows).
   * Mobile steps ramp until lg matches desktop artboard.
   */
  serviciosShowcaseIntroBand: "pb-6 pt-12 sm:pt-14 lg:pt-[60px]",
  /**
   * `/servicios` Showcase alternating rows — Figma `86:1517` (~24px between row frames: 400 − 376).
   */
  serviciosShowcaseRowStackGap: "gap-6",
  /**
   * `/seguros` Showcase intro — Figma `87:1796` → `91:1388` / `87:1815` (60px top inset, ~24px bottom in 190px band).
   */
  segurosShowcaseIntroBand: "pb-6 pt-[60px]",
  /**
   * `/seguros` row stack — Figma `87:1796`: 24px between row frames (`115:1435` end → `115:1443` start).
   */
  segurosShowcaseRowStackGap: "gap-6",
  /**
   * --- Provisional reference: public testimonials → contact handoff (freeze unless Figma QA fails) ---
   * Pairing: `TestimonialsSection` flush vertical spacing + `ReviewsCarousel` `tightFooter` +
   * `ContactBlock` `variant="homeFigma"` + `flushStackTop`.
   * QA rule: if browser vs Figma passes, do not change. If it fails, adjust only ONE of:
   * `carouselPagerBottomFlush` OR `contactTopSoft` per pass (never both at once).
   * Recipe values:
   * - framedToBodyEnter = pt-6 lg:pt-12
   * - introToContentFlush = gap-5 lg:gap-6
   * - carouselRailToPagerFlush = mt-0.5 lg:mt-1
   * - carouselPagerBottomFlush = pb-10 lg:pb-12
   * - contactTopSoft = pt-8 lg:pt-10
   */
  /* --- Public carousel + section handoff (shared across Home / Nosotros / inner marketing pages) --- */
  /** Margin-top on pager row: below horizontal card rail (default). */
  carouselRailToPagerDefault: "mt-3 lg:mt-4",
  /** Tighter rail → pager — coherent cards+dots block before next section. */
  carouselRailToPagerFlush: "mt-0.5 lg:mt-1",
  /** Padding-bottom on pager row — close-out before following section (flush stacks). */
  carouselPagerBottomFlush: "pb-10 lg:pb-12",
  /** Figma contact block inner top after a white/light predecessor. */
  contactTopSoft: "pt-8 lg:pt-10",
  /** Body section top after a framed band (e.g. `homeCard` CTA → testimonials). */
  framedToBodyEnter: "pt-6 lg:pt-12",
} as const;

/**
 * Home (Figma-aligned) — typography, CTA, and focus rhythm shared across sections.
 * Does not replace layout tokens; use with `figmaContainer` / `figmaSectionPadding`.
 */
export const publicHome = {
  /** H2 scale — pair with `text-[#1b5e20]` or split accent spans. */
  headingSection: "text-[24px] font-bold leading-normal lg:text-[48px]",
  headingAccentGreen: "text-[#7cb342]",
  bodyLead: "text-[16px] font-medium leading-normal text-[#424242]",
  /** Primary pill on light background (gradient via inline `style`). */
  ctaPillPrimary:
    "inline-flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center rounded-[96px] px-6 py-4 text-center text-base font-bold leading-normal text-[#f6f6f6] transition-opacity duration-200 hover:opacity-[0.92] active:opacity-[0.86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]/55 sm:w-auto",
  /** Primary pill on photography / dark overlay (same hit target, light focus ring). */
  ctaPillPrimaryOnPhoto:
    "inline-flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center rounded-[96px] px-6 py-4 text-center text-base font-bold leading-normal text-[#f6f6f6] transition-opacity duration-200 hover:opacity-[0.92] active:opacity-[0.86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:w-auto",
  /**
   * Ghost / glass pill on photography or dark bands.
   * Used by `HeroHeader` (Home/Nosotros) and `Header` `variant="heroOverlay"`.
   */
  ctaPillGhostOnPhoto:
    "inline-flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center rounded-[96px] border border-solid border-[rgba(246,246,246,0.5)] bg-[rgba(197,225,165,0.15)] px-6 py-4 text-center text-base font-bold leading-normal text-[#f6f6f6] backdrop-blur-[17px] transition-colors duration-200 hover:bg-[rgba(197,225,165,0.24)] active:bg-[rgba(197,225,165,0.30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:w-auto",
  focusRingBrand:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]/50",
  focusRingOnDark:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75",
  /** Solid brand ring — pills/chips that switch from outline to ring (e.g. Blog “Ver más”). */
  focusRingBrandSolid:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20] focus-visible:ring-offset-2",
  /** Softer ring for horizontal scroll regions (e.g. testimonials rail). */
  focusRingBrandSoft:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20]/40 focus-visible:ring-offset-2",
  /** Outline focus at 45% — carousel prev/next on light backgrounds. */
  focusOutlineBrand45:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]/45",
  /** Inline text link on light backgrounds (blog card titles). */
  focusOutlineBrandText:
    "focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]",
  /**
   * Micro-interaction layer for primary gradient pills on light backgrounds.
   * Compose with `ctaPillPrimary` (Blog “Ver más”).
   */
  ctaPillPrimaryMicro:
    "mt-3 transition-[box-shadow,filter] duration-300 ease-out hover:shadow-[0_8px_28px_-10px_rgba(27,94,32,0.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20] focus-visible:ring-offset-2",
  /** Blog card ↗ chip shell — parent link must use `group`. */
  iconActionChipMicro:
    "transition-all duration-200 ease-out group-hover:scale-105 group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18)] group-hover:border-[#1b5e20]/35 group-active:scale-95 group-active:translate-y-0 group-focus-visible:ring-2 group-focus-visible:ring-[#1b5e20] group-focus-visible:ring-offset-2",
  /** Blog card ↗ glyph — child of `group` + chip. */
  iconActionGlyphMicro:
    "transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-active:translate-x-0 group-active:translate-y-0",
  /** Shared pager segment sizing + transition (Services / Reviews carousels). */
  pagerSegmentTransition:
    "shrink-0 rounded-[5px] transition-[width,height,background-color] duration-200",
  /** Carousel / icon circle controls on light backgrounds (pair with `focusOutlineBrand45`). */
  carouselNavButton:
    "flex size-10 touch-manipulation items-center justify-center rounded-full border border-[#1b5e20]/25 bg-white/95 text-[#1b5e20] shadow-sm transition-colors duration-200 hover:bg-white hover:border-[#1b5e20]/35 active:bg-slate-50",
} as const;

/** Shared elevation for marketing cards (home + nosotros) — one shadow/ring language. */
export const publicSurfaces = {
  cardElevated:
    "shadow-[0_18px_52px_-16px_rgba(15,23,42,0.13)] ring-1 ring-slate-200/68",
  cardGrid:
    "shadow-[0_14px_40px_-14px_rgba(15,23,42,0.11)] ring-1 ring-slate-200/65",
} as const;

export const designRef = {
  forest: "#4B7C38",
  forestHover: "#3d6630",
  lime: "#84CC16",
  navy: "#1e3a5f",
} as const;

export const publicBrand = {
  eyebrow:
    "text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#4B7C38] sm:text-sm",
  wordmark: "text-lg font-semibold tracking-tight text-slate-900",
  wordmarkTagline:
    "text-[0.6875rem] font-medium uppercase tracking-wider text-slate-500",
} as const;

export const publicUi = {
  primaryButton:
    "inline-flex min-h-[3.25rem] touch-manipulation items-center justify-center gap-2 rounded-full bg-[#4B7C38] px-8 text-base font-semibold text-white shadow-md shadow-[#4B7C38]/18 transition-colors duration-200 hover:bg-[#3d6630] active:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]",
  secondaryButton:
    "inline-flex min-h-[3.25rem] touch-manipulation items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-6 text-base font-semibold text-slate-800 shadow-sm transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]",
  secondaryButtonOnDark:
    "inline-flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center gap-2 rounded-full border-2 border-white/85 bg-transparent px-6 text-base font-semibold text-white shadow-none backdrop-blur-[2px] transition-colors duration-200 hover:bg-white/10 active:bg-white/15 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  secondaryLink:
    "inline-flex min-h-[3.25rem] touch-manipulation items-center justify-center text-base font-semibold text-slate-700 underline-offset-4 transition-colors duration-200 hover:text-[#4B7C38] hover:underline focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]",
  inlineTextCta:
    "inline-flex items-center text-base font-semibold text-[#4B7C38] underline-offset-4 transition-colors duration-200 hover:text-[#3d6630] hover:underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38]",
  surfaceCard:
    "rounded-2xl bg-white shadow-[0_6px_28px_-10px_rgba(15,23,42,0.09)] ring-1 ring-slate-200/75",
  surfaceCardInteractive:
    "rounded-2xl bg-white shadow-[0_6px_28px_-10px_rgba(15,23,42,0.09)] ring-1 ring-slate-200/75 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(15,23,42,0.12)] hover:ring-slate-200/90 active:translate-y-0",
  input:
    "w-full rounded-2xl border-0 bg-white px-5 py-3.5 text-base text-slate-900 shadow-sm ring-1 ring-slate-200/90 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B7C38]/30",
  inputContact:
    "min-h-[3.25rem] w-full rounded-2xl border-0 bg-[#f3f4f6] px-5 py-4 text-base text-slate-900 ring-1 ring-slate-200/70 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4B7C38]/35",
  headerCtaOutlineOverlay:
    "inline-flex min-h-[3.25rem] touch-manipulation items-center justify-center rounded-full border-2 border-white bg-white/12 px-6 py-2.5 text-base font-semibold text-white shadow-md shadow-black/15 backdrop-blur-sm transition-colors duration-200 hover:bg-white/22 active:bg-white/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-8 sm:py-3",
  /** Homepage overlay — lime pill per home-full.jpg */
  headerCtaLimeOverlay:
    "inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full bg-[#84CC16] px-4 py-2 text-sm font-semibold text-[#1e3a5f] shadow-sm shadow-black/12 transition-colors duration-200 hover:brightness-95 active:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-[2.75rem] sm:px-5 sm:text-[0.9375rem]",
  label: "text-base font-semibold text-slate-800",
} as const;
