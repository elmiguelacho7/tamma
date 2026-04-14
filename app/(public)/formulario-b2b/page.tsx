import type { Metadata } from "next";
import { FormularioB2BForm } from "@/components/formulario-b2b/FormularioB2BForm";
import { Header } from "@/components/layout/Header";
import { manrope } from "@/lib/fonts/manrope";
import { publicLayout, cx } from "@/components/ui/public-tokens";

export const metadata: Metadata = {
  title: "Formulario B2B",
  description:
    "Solicitud de servicios B2B Tamma Group: datos de empresa, contacto, intereses y alcance para una propuesta alineada a tu operación.",
  openGraph: {
    title: "Formulario B2B | Tamma Group",
    description:
      "Completa el formulario para servicios de salud integral orientados a empresas y organizaciones.",
  },
};

/**
 * Figma `4GkF8vcXOfDMg7pC1Wplzu` — frame `162:1364` (FORMULARIO B2B).
 *
 * **Frozen:** same top chrome as `/contacto` — `Header variant="contacto"` only (sticky). Not `heroOverlay`, not a Servicios-style hero page.
 */
export default function FormularioB2BPage() {
  return (
    <div className="flex min-w-0 flex-col overflow-visible bg-[#f0f0f0]">
      <Header variant="contacto" />
      <div className={cx(publicLayout.marketingFigmaBody, "flex flex-1 flex-col py-8 lg:py-10")}>
        <FormularioB2BForm className={manrope.className} />
      </div>
    </div>
  );
}
