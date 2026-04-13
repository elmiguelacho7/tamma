import { Footer } from "@/components/layout/Footer";
import { ErrorHelpCTA } from "@/components/error/ErrorHelpCTA";
import { ErrorHero } from "@/components/error/ErrorHero";
import { ErrorRecoverySection } from "@/components/error/ErrorRecoverySection";

/**
 * Global 404 — marketing recovery page. Renders outside `(public)/layout`, so this mirrors that shell:
 * `main#public-main` + `Footer`.
 *
 * **Frozen:** keep `ErrorHero` → `ErrorRecoverySection` → `ErrorHelpCTA` order; no broad redesign or proportional
 * refactors unless a **100% Figma** check proves mismatch. Allowed tweaks only: 404 stroke/size, hero padding,
 * recovery/help spacing — not page structure.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-full min-w-0 flex-col bg-slate-50">
      <main id="public-main" className="flex w-full min-w-0 flex-1 flex-col">
        <ErrorHero />
        <ErrorRecoverySection />
        <ErrorHelpCTA />
      </main>
      <Footer />
    </div>
  );
}
