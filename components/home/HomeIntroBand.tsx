import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

export function HomeIntroBand() {
  return (
    <section className="relative z-10 mt-0 w-full bg-white">
      {/* Flow after hero (`Hero` outer `max-lg:pb-28`); no negative margin — avoids stacking under following sections. */}
      <div
        className={cx(
          publicLayout.figmaContainer,
          "flex flex-col items-start gap-[24px] lg:flex-row lg:items-center lg:gap-[12px]",
          "pt-12 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-[60px]",
        )}
      >
        <div className="flex min-h-px min-w-px flex-[1_0_0] flex-col gap-[12px]">
          <h2 className={cx("w-full text-[#1b5e20]", publicHome.headingSection)}>
            Sistema integral diseñado para tu tranquilidad
          </h2>
          <p className={cx("w-full", publicHome.bodyLead)}>
            Venta y entrega de medicamentos para tratamientos agudos y crónicos a
            precios competitivos. Gestionamos tu salud desde la comodidad de tu
            hogar.
          </p>
        </div>

        <Link
          href="/contacto"
          className={cx(
            publicHome.ctaPillPrimary,
            "w-full shrink-0 lg:w-auto",
          )}
          style={{
            backgroundImage:
              "linear-gradient(143.9390811546584deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
          }}
        >
          Solicitar atención médica
        </Link>
      </div>
    </section>
  );
}
