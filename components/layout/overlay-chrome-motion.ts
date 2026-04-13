/**
 * Shared Tailwind motion for hero/overlay header CTAs + menu trigger.
 * Does not change layout; only bg/border/transform/focus on interaction.
 */
export const OVERLAY_CHROME_MOTION =
  "transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 hover:border-white/60 hover:-translate-y-px active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
