import type { Metadata } from "next";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { SegurosHero } from "@/components/seguros/SegurosHero";
import { SegurosMarketingCTA } from "@/components/seguros/SegurosMarketingCTA";
import { SegurosShowcase } from "@/components/seguros/SegurosShowcase";

export const metadata: Metadata = {
  title: "Seguros",
  description:
    "Cobertura de seguros de Tamma Group: protección con claridad, confianza y acompañamiento humano para tu día a día.",
  openGraph: {
    title: "Seguros | Tamma Group",
    description:
      "Conoce nuestras coberturas de seguros: activación clara, soporte continuo y un sistema diseñado para tu tranquilidad.",
  },
};

/**
 * Figma `4GkF8vcXOfDMg7pC1Wplzu` — frame `87:1796` (SEGUROS):
 * hero (`87:1799`) → intro + showcase rows (`91:1388`, `115:1435`, `115:1443`) → CTA (`87:1808`) → testimonials (`95:1432`) → contact (`87:1797`).
 * Layout footer (`87:1798`) is global in `(public)/layout`.
 */
export default function SegurosPage() {
  return (
    <div className="flex flex-col">
      <SegurosHero />
      <SectionReveal>
        <SegurosShowcase />
      </SectionReveal>
      <SectionReveal>
        <SegurosMarketingCTA subtitle="Solicita tu cotización y obtén una ruta clara de cobertura y soporte cuando lo necesites." />
      </SectionReveal>
      <SectionReveal>
        <TestimonialsSection
          presentation="premium"
          verticalSpacing="publicFlush"
          subtitle="Cientos de familias venezolanas confían diariamente en Tamma Group para su cuidado integral."
          railComfort
        />
      </SectionReveal>
      <SectionReveal>
        <ContactBlock variant="homeFigma" flushStackTop touchComfort />
      </SectionReveal>
    </div>
  );
}
