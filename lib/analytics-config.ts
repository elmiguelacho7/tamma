/**
 * Analytics configuration (client-safe env reads via NEXT_PUBLIC_*).
 *
 * IMPORTANT — consent / CMP: This module only gates loading on env vars. For production
 * in regulated jurisdictions, connect Google tags to your consent platform (e.g. Consent
 * Mode v2) before launch so measurement respects user choice. NEXT_PUBLIC_ANALYTICS_ENABLED
 * is a coarse kill-switch, not a substitute for a cookie/consent banner.
 */

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id) return undefined;
  return id;
}

export function isAnalyticsAllowed(): boolean {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "false") {
    return false;
  }
  return Boolean(getGaMeasurementId());
}
