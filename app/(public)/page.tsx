import { BlogPreview } from "@/components/home/BlogPreview";
import { CorporateSolutionsSection } from "@/components/home/CorporateSolutionsSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { Hero } from "@/components/home/Hero";
import { HomeIntroBand } from "@/components/home/HomeIntroBand";
import { InsuranceSupportSection } from "@/components/home/InsuranceSupportSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Salud y bienestar integral en Venezuela: telemedicina, seguros, servicios clínicos y respaldo digital para ti y tu familia.",
  openGraph: {
    title: "Tamma Group",
    description:
      "Red integral de atención médica, telemedicina, seguros y alianzas farmacéuticas para estar cubierto cuando más lo necesitas.",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-w-0 flex-col overflow-x-clip">
      <div className="relative">
        <Hero />
      </div>
      <div className="mt-0">
        <HomeIntroBand />
      </div>
      <SectionReveal>
        <ServicesPreview />
      </SectionReveal>
      <SectionReveal>
        <InsuranceSupportSection />
      </SectionReveal>
      <SectionReveal>
        <CorporateSolutionsSection />
      </SectionReveal>
      <SectionReveal>
        <TestimonialsSection railComfort />
      </SectionReveal>
      <SectionReveal>
        <CTASection
          surface="homeCard"
          subtitle="Únete a Tamma Group y experimenta una nueva forma de cuidar tu salud con tecnología inteligente y atención humana de primer nivel."
        />
      </SectionReveal>
      <SectionReveal>
        <BlogPreview />
      </SectionReveal>
      <SectionReveal>
        <FAQSection />
      </SectionReveal>
      <SectionReveal>
        <ContactBlock variant="homeFigma" touchComfort />
      </SectionReveal>
    </div>
  );
}
