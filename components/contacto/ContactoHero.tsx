import { publicLayout, cx } from "@/components/ui/public-tokens";

/**
 * CONTACTO intro — canonical frame: `docs/design/contacto-page.jpg`
 * (Figma file `4GkF8vcXOfDMg7pC1Wplzu`). Light shell + soft green depth; not a full-bleed photo hero.
 */
export function ContactoHero() {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#f4f6f4]"
      aria-labelledby="contacto-hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#4B7C38]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-[#84CC16]/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#1e3a5f]/6 blur-3xl"
        aria-hidden
      />

      <div className={cx(publicLayout.marketingFigmaBody, "relative z-10 py-9 sm:py-12 lg:py-14")}>
        <div className="max-w-[48rem]">
          <h1
            id="contacto-hero-heading"
            className="text-balance text-3xl font-bold tracking-tight text-[#1b5e20] sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Contáctanos
          </h1>
          <p className="mt-3.5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
            Estamos aquí para escucharte. Visítanos o envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </div>
    </section>
  );
}
