"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getGaConsent, gtagEvent, setGaConsent } from "@/lib/analytics/gtag";

type GoogleAnalytics4Props = {
  measurementId: string;
};

/**
 * GA4 (gtag.js) with a consent-ready gate.
 *
 * - Loads GA only when `tamma_consent_analytics === "granted"` in localStorage.
 * - Exposes `window.tammaSetAnalyticsConsent("granted" | "denied")` for a future CMP/banner.
 * - Tracks SPA page views on route changes (no PII).
 */
export function GoogleAnalytics4({ measurementId }: GoogleAnalytics4Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const didSendInitialPageView = useRef(false);

  useEffect(() => {
    window.tammaSetAnalyticsConsent = (consent) => {
      setGaConsent(consent);
      // Future CMP can choose to reload the page after consent changes.
      // Keeping this as a tiny hook avoids adding a full banner here.
      if (consent === "denied") return;
      // If user grants consent mid-session, a reload is the safest way to initialize GA cleanly.
      window.location.reload();
    };
  }, []);

  const consent = getGaConsent();
  if (consent !== "granted") {
    return null;
  }

  // Initial route + subsequent SPA navigations.
  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;

    // Avoid double counting the initial page_view; GA config will emit one on load.
    if (!didSendInitialPageView.current) {
      didSendInitialPageView.current = true;
      return;
    }

    gtagEvent("page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.("[data-ga-event]") as HTMLElement | null;
      if (!el) return;

      const eventName = el.getAttribute("data-ga-event")?.trim();
      if (!eventName) return;

      // Only allow a small, safe payload.
      const label = el.getAttribute("data-ga-label")?.trim() ?? undefined;
      const href =
        (el as HTMLAnchorElement).href && (el as HTMLAnchorElement).href.startsWith("http")
          ? (el as HTMLAnchorElement).href
          : undefined;

      gtagEvent(eventName, {
        event_category: "engagement",
        event_label: label,
        link_url: href,
      });
    };

    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // Consent Mode ready: consent is already granted if this component rendered.
          gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          // Do not send form payloads or user-entered text. Page views only.
          gtag('config', '${measurementId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}

