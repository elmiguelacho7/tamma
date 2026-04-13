import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import { publicFaqItems } from "@/lib/faq-data";
import { FAQAccordion } from "./FAQAccordion";

export function FAQSection() {
  return (
    <section className="w-full bg-[#f6f6f6]" aria-labelledby="home-faq-heading">
      <div
        className={cx(
          publicLayout.figmaContainer,
          publicLayout.figmaSectionPadding,
          "flex flex-col",
          publicLayout.figmaIntroToContentGap,
        )}
      >
        <header className={publicLayout.figmaHeadingStackCenter}>
          <h2
            id="home-faq-heading"
            className={cx("w-full", publicHome.headingSection)}
          >
            <span className="text-[#1b5e20]">Preguntas </span>
            <span className={cx("font-bold italic", publicHome.headingAccentGreen)}>
              {" "}
            </span>
            <span className={publicHome.headingAccentGreen}>frecuentes</span>
          </h2>
          <p className={cx("w-full", publicHome.bodyLead)}>
            Encuentra respuestas rápidas a las dudas más comunes sobre nuestros
            servicios, cobertura y funcionamiento.
          </p>
        </header>

        <FAQAccordion items={publicFaqItems} variant="homeFigma" />
      </div>
    </section>
  );
}
