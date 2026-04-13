import type { Metadata } from "next";
import { CTASection } from "@/components/home/CTASection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NosotrosHero } from "@/components/nosotros/NosotrosHero";
import { NosotrosObjetivoMisionVisionSection } from "@/components/nosotros/NosotrosObjetivoMisionVisionSection";
import { NosotrosSobreSection } from "@/components/nosotros/NosotrosSobreSection";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Misión, visión y objetivo de Tamma Group: salud integral, tecnología y acompañamiento humano para personas y organizaciones en Venezuela.",
  openGraph: {
    title: "Nosotros | Tamma Group",
    description:
      "Conoce quiénes somos, hacia dónde vamos y cómo trabajamos cada día por tu tranquilidad.",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <main className="flex min-w-0 flex-col">
        <NosotrosHero />
        <SectionReveal>
          <NosotrosSobreSection />
        </SectionReveal>
        <SectionReveal>
          <NosotrosObjetivoMisionVisionSection />
        </SectionReveal>
        <SectionReveal>
          <CTASection
            surface="homeCard"
            cardBackgroundSrc={siteImages.nosotros.ctaCardBg}
            homeCardPaddingClassName="pt-0 pb-0"
            homeCardFrameClassName="shadow-[0_12px_40px_-18px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-white/15"
            subtitle="Únete a Tamma Group y experimenta una nueva forma de cuidar tu salud con tecnología inteligente y atención humana de primer nivel."
          />
        </SectionReveal>
        <SectionReveal>
          <TestimonialsSection verticalSpacing="nosotrosFlush" />
        </SectionReveal>
        <SectionReveal>
          <ContactBlock variant="homeFigma" flushStackTop />
        </SectionReveal>
      </main>
    </>
  );
}
