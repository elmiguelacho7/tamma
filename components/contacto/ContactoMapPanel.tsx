import Image from "next/image";
import { siteImages } from "@/lib/site-images";
import { publicSurfaces, cx } from "@/components/ui/public-tokens";

const ADDRESS_TITLE = "Ubicación";
const ADDRESS_LINES = "Av. La Estancia, Caracas, Venezuela. Centro Banaven (Cubo Negro).";

/**
 * Map + address pill — CONTACTO frame (`docs/design/contacto-page.jpg`).
 * `ContactBlock` is structurally different (olas, dual-column contact+form); dedicated block.
 */
export function ContactoMapPanel() {
  return (
    <div className="flex min-h-0 flex-col gap-5 lg:gap-6">
      <div
        className={cx(
          "relative isolate aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] lg:rounded-[2rem]",
          publicSurfaces.cardElevated,
        )}
      >
        <Image
          src={siteImages.contacto.map}
          alt="Mapa de ubicación de TAMMA Group en Caracas"
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) min(560px, 45vw), 100vw"
        />
      </div>

      <div
        className={cx(
          "flex items-start gap-4 rounded-[1.25rem] bg-white p-5 sm:items-center sm:gap-5 sm:rounded-[1.5rem] sm:p-6",
          publicSurfaces.cardElevated,
        )}
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4B7C38]/12 text-[#4B7C38]"
          aria-hidden
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-7.75 7-13a7 7 0 1 0-14 0c0 5.25 7 13 7 13Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-base font-bold text-[#1b5e20]">{ADDRESS_TITLE}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{ADDRESS_LINES}</p>
        </div>
      </div>
    </div>
  );
}
