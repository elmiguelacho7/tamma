import Image from "next/image";
import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

const CATALOGO_BG = "/images/home/corporativo-catalogo-bg.webp";

/**
 * Figma HOME `162:1419` — CATALOGO: rounded photo band + “Soluciones de salud… para tu empresa”.
 */
export function CorporateSolutionsSection() {
  return (
    <section className="w-full bg-white" aria-labelledby="catalogo-empresa-heading">
      <div
        className={cx(
          publicLayout.homeWideFramedOuter,
          publicLayout.figmaSectionPadding,
        )}
      >
        <div className="relative flex min-h-[320px] flex-col gap-[24px] overflow-hidden rounded-[32px] p-8 sm:min-h-[360px] sm:p-10 lg:min-h-[381px] lg:p-[60px]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={CATALOGO_BG}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1479px, 100vw"
              priority={false}
            />
            <div className="absolute inset-0 rounded-[32px] bg-[rgba(0,0,0,0.55)]" />
          </div>

          <div className="relative z-[1] flex max-w-[973px] flex-col gap-[12px] text-[#f6f6f6]">
            <h2
              id="catalogo-empresa-heading"
              className={cx(publicHome.headingSection, "text-[#f6f6f6]")}
            >
              <span className="block">Soluciones de salud integrales </span>
              <span className="block text-[#d7d7d7]">para tu empresa</span>
            </h2>
            <p className="max-w-3xl text-[16px] font-medium leading-normal text-[#f6f6f6] lg:text-[18px]">
              Optimiza el bienestar de tus colaboradores con un ecosistema
              completo de telemedicina, atención domiciliaria, farmacia y
              seguros, diseñado para empresas que buscan eficiencia, cobertura y
              continuidad operativa.
            </p>
          </div>

          <div className="relative z-[1] flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[24px]">
            <Link
              href="/contacto"
              className={publicHome.ctaPillPrimaryOnPhoto}
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
              }}
            >
              Solicitar información
            </Link>
            <Link href="/empresas" className={publicHome.ctaPillGhostOnPhoto}>
              Ver más sobre empresas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
