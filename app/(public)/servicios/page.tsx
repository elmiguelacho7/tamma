import type { Metadata } from "next";
import { ServiciosMarketingCTA } from "@/components/servicios/ServiciosMarketingCTA";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { ServiciosHero } from "@/components/servicios/ServiciosHero";
import { ServiciosShowcase } from "@/components/servicios/ServiciosShowcase";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios integrales de Tamma Group: telemedicina, atención clínica, farmacia y soporte operativo con procesos claros y acompañamiento humano.",
  openGraph: {
    title: "Servicios | Tamma Group",
    description:
      "Conoce nuestros servicios de atención: red integrada, respuesta ágil y soporte continuo para tu tranquilidad.",
  },
};

/**
 * Figma `4GkF8vcXOfDMg7pC1Wplzu` — frame `81:1602` (SERVICIOS):
 * hero+header → showcase intro+rows → CTA framed card (`115:1462`) → testimonials → contact (+ layout footer).
 */
export default function ServiciosPage() {
  return (
    <div className="flex flex-col">
      <ServiciosHero />
      <SectionReveal>
        <ServiciosShowcase />
      </SectionReveal>
      <SectionReveal>
        <ServiciosMarketingCTA subtitle="Agenda una evaluación y accede a una red conectada que prioriza claridad, respuesta y acompañamiento." />
      </SectionReveal>
      <SectionReveal>
        <TestimonialsSection
          presentation="premium"
          verticalSpacing="publicFlush"
          subtitle="Claridad, rapidez y acompañamiento: historias de quienes confían en nuestra red para resolver con tranquilidad."
        />
      </SectionReveal>
      <SectionReveal>
        <ContactBlock variant="homeFigma" flushStackTop />
      </SectionReveal>
    </div>
  );
}
