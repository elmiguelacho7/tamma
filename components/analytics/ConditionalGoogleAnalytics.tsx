import {
  getGaMeasurementId,
  isAnalyticsAllowed,
} from "@/lib/analytics-config";
import { GoogleAnalytics4 } from "@/components/analytics/GoogleAnalytics4";

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
  return <GoogleAnalytics4 measurementId={gaId} />;
}
