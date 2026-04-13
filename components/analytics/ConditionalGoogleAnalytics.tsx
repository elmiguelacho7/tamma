import { GoogleAnalytics } from "@next/third-parties/google";
import {
  getGaMeasurementId,
  isAnalyticsAllowed,
} from "@/lib/analytics-config";

/**
 * Renders GA4 via @next/third-parties when allowed by env.
 * See `lib/analytics-config.ts` for consent/CMP notes.
 */
export function ConditionalGoogleAnalytics() {
  if (!isAnalyticsAllowed()) {
    return null;
  }
  const gaId = getGaMeasurementId();
  if (!gaId) {
    return null;
  }
  return <GoogleAnalytics gaId={gaId} />;
}
