export type GaEventParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Lightweight hook for a future CMP/cookie banner. */
    tammaSetAnalyticsConsent?: (consent: "granted" | "denied") => void;
  }
}

const CONSENT_STORAGE_KEY = "tamma_consent_analytics";

export function getGaConsent(): "granted" | "denied" {
  if (typeof window === "undefined") return "denied";
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return raw === "granted" ? "granted" : "denied";
}

export function setGaConsent(consent: "granted" | "denied") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
}

export function gtagEvent(eventName: string, params?: GaEventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

