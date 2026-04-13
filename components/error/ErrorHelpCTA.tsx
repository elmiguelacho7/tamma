import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { publicLayout, publicSurfaces, cx } from "@/components/ui/public-tokens";

/**
 * 404 bottom help band. **Frozen** layout; only fine-tune internal/section spacing after Figma comparison —
 * no new blocks or CTA pattern changes.
 */
export function ErrorHelpCTA() {
  return (
    <section className="bg-white pb-20 sm:pb-28 lg:pb-36" aria-labelledby="error-help-heading">
      <div className={publicLayout.marketingFigmaBody}>
        <div
          className={cx(
            "w-full rounded-[1.25rem] bg-[#f4f6f4] px-8 py-12 text-center sm:rounded-2xl sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-20 xl:py-[4.5rem]",
            publicSurfaces.cardGrid,
          )}
        >
          <h2
            id="error-help-heading"
            className="text-balance text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl lg:text-[2.125rem] xl:text-4xl"
          >
            ¿Buscabas ayuda específica?
          </h2>
          <p className="mx-auto mt-5 max-w-[44rem] text-pretty text-lg leading-relaxed text-slate-600 sm:mt-6 sm:text-xl lg:text-[1.25rem]">
            Cuéntanos qué necesitas y te orientamos hacia la sección correcta o el servicio más adecuado.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5 lg:mt-14">
            <PrimaryButton
              href="/contacto"
              className="min-h-[3.5rem] w-full justify-center px-10 text-base sm:w-auto sm:min-w-[14rem] sm:text-lg"
            >
              Escribir ahora
            </PrimaryButton>
            <Link
              href="/consejos"
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-full border border-slate-200/90 bg-white px-8 text-base font-semibold text-slate-800 shadow-sm transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B7C38] sm:w-auto sm:px-10 sm:text-lg"
            >
              Ver consejos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
