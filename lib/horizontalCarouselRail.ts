/**
 * Shared horizontal “controlled rail” math for Home carousels (Services, Testimonials).
 * Consumers own the scroll container, gap (px), and card count.
 */

/**
 * Group-based page offsets: each step advances by `cardsPerPage` cards (stride in px).
 * Last stop is always max scroll so the final cards are not stranded.
 */
export function computePageOffsets(
  scrollEl: HTMLElement,
  gapPx: number,
  cardCount: number,
): number[] {
  const firstCard = scrollEl.querySelector("article");
  const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
  if (!cardWidth || cardCount <= 0) return [0];

  const visible = scrollEl.clientWidth;
  const maxScroll = Math.max(0, scrollEl.scrollWidth - visible);
  if (maxScroll <= 1) return [0];

  const stride = cardWidth + gapPx;
  const cardsPerPage = Math.max(
    1,
    Math.min(cardCount, Math.floor((visible + gapPx) / stride)),
  );
  const step = cardsPerPage * stride;

  const positions: number[] = [0];
  let pos = 0;
  while (pos + step < maxScroll - 8) {
    pos += step;
    positions.push(Math.min(Math.round(pos), Math.round(maxScroll)));
  }
  const lastRounded = Math.round(maxScroll);
  if (positions[positions.length - 1] !== lastRounded) {
    positions.push(lastRounded);
  }

  const uniq = [...new Set(positions)].sort((a, b) => a - b);
  return uniq;
}

/** Active page index from scrollLeft: rightmost offset still at or before viewport (with tolerance). */
export function scrollLeftToActivePage(
  scrollLeft: number,
  offsets: readonly number[],
): number {
  if (offsets.length <= 1) return 0;
  let idx = 0;
  for (let i = 0; i < offsets.length; i++) {
    if (scrollLeft + 8 >= offsets[i]) idx = i;
  }
  return idx;
}
