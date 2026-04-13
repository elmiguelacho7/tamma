import type { Metadata } from "next";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { EmpresasHero } from "@/components/empresas/EmpresasHero";
import { EmpresasMarketingCTA } from "@/components/empresas/EmpresasMarketingCTA";
import { EmpresasShowcase } from "@/components/empresas/EmpresasShowcase";

export const metadata: Metadata = {
  title: "Empresas",
  description:
    "Soluciones corporativas de Tamma Group: salud, telemedicina y acompañamiento operativo para cuidar a tu equipo con claridad y continuidad.",
  openGraph: {
    title: "Empresas | Tamma Group",
    description:
      "Programas corporativos con estructura: soporte para RRHH y operaciones, continuidad de atención y respuesta organizada para tu equipo.",
  },
};

/**
 * Inner marketing route — same composition discipline as `/servicios` and `/seguros`:
 * hero → showcase → framed marketing CTA → testimonials (`publicFlush`) → contact (`homeFigma` + `flushStackTop`).
 *
 * Figma file `4GkF8vcXOfDMg7pC1Wplzu`: canonical **EMPRESAS** artboard was not listed in the exported `get_metadata`
 * snapshot used for planning; confirm frame IDs and any extra sections (e.g. “cómo funciona”, trust split) at 100% zoom
 * before changing this stack.
 */
export default function EmpresasPage() {
  return (
    <div className="flex flex-col">
      <EmpresasHero />
      <SectionReveal>
        <EmpresasShowcase />
      </SectionReveal>
      <SectionReveal>
        <EmpresasMarketingCTA subtitle="¿Listo para cuidar mejor a tu equipo? Coordinemos un modelo claro y escalable para tu organización." />
      </SectionReveal>
      <SectionReveal>
        <TestimonialsSection
          presentation="premium"
          verticalSpacing="publicFlush"
          subtitle="Organizaciones que valoran continuidad, claridad operativa y tiempos de respuesta para su equipo."
        />
      </SectionReveal>
      <SectionReveal>
        <ContactBlock variant="homeFigma" flushStackTop />
      </SectionReveal>
    </div>
  );
}
