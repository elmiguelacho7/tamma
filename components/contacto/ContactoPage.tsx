import { Header } from "@/components/layout/Header";
import { publicLayout, publicSurfaces, cx } from "@/components/ui/public-tokens";
import { ContactoForm } from "@/components/contacto/ContactoForm";
import { ContactoHero } from "@/components/contacto/ContactoHero";
import { ContactoMapPanel } from "@/components/contacto/ContactoMapPanel";

/**
 * `/contacto` — Figma CONTACTO (`docs/design/contacto-page.jpg`, file `4GkF8vcXOfDMg7pC1Wplzu`).
 *
 * **Frozen:** `Header variant="contacto"` only (sticky pill bar). Do not switch to `heroOverlay` or Servicios hero shells.
 * Visual tweaks: hex/blur/border/radius/padding per Figma only — no header behavior refactor here without reopening the contract.
 */
export function ContactoPage() {
  return (
    <div className="flex min-w-0 flex-col overflow-visible bg-[#f4f6f4]">
      <Header variant="contacto" />
      <ContactoHero />

      <section
        id="formulario"
        className="relative w-full pb-16 pt-2 sm:pb-20 sm:pt-4 lg:pb-24"
        aria-labelledby="contacto-main-heading"
      >
        <div
          className="pointer-events-none absolute right-[-12%] top-0 h-80 w-80 rounded-full bg-[#4B7C38]/8 blur-3xl"
          aria-hidden
        />
        <div className={cx(publicLayout.marketingFigmaBody, "relative z-10")}>
          <h2 id="contacto-main-heading" className="sr-only">
            Formulario y ubicación
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
            <ContactoMapPanel />
            <div
              className={cx(
                "rounded-[1.5rem] bg-white p-6 sm:rounded-[1.75rem] sm:p-8 lg:rounded-[2rem] lg:p-10",
                publicSurfaces.cardElevated,
              )}
            >
              <ContactoForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
