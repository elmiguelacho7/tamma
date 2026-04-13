import type { Metadata } from "next";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { ConsejosBlogHero } from "@/components/consejos/ConsejosBlogHero";
import { ConsejosListing } from "@/components/consejos/ConsejosListing";
import { consejosPosts } from "@/lib/consejos-data";

export const metadata: Metadata = {
  title: "Consejos",
  description:
    "Consejos y bienestar de Tamma Group: guías prácticas sobre prevención, asistencia, salud familiar y tranquilidad para decidir con claridad.",
  openGraph: {
    title: "Consejos | Tamma Group",
    description:
      "Un hub editorial calmado y útil: prevención, asistencia y bienestar para tomar mejores decisiones.",
  },
};

/**
 * BLOG listing — visual sequence per `docs/design/blog-page.jpg`:
 * hero (embedded header) → intro + search/chips + grid → Contáctanos (`ContactBlock`).
 * No intermediate framed marketing CTA in this export.
 */
export default function ConsejosPage() {
  return (
    <div className="flex flex-col">
      <ConsejosBlogHero />
      <SectionReveal>
        <ConsejosListing posts={consejosPosts} />
      </SectionReveal>
      <SectionReveal>
        <ContactBlock variant="homeFigma" flushStackTop />
      </SectionReveal>
    </div>
  );
}
