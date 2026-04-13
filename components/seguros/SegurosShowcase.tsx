import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

type Row = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageSide: "left" | "right";
};

/** Figma `86:1517` / `115:1436` class media: 730×328, 32px radius — same treatment as `ServiciosShowcase` `ServiceMedia`. */
function RowMedia({ src, title }: { src: string; title: string }) {
  return (
    <div
      className={cx(
        "relative aspect-[730/328] w-full max-w-[730px] overflow-hidden rounded-[32px] border border-[#c5e1a5]/30 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1),0px_20px_25px_0px_rgba(0,0,0,0.1)]",
        "lg:max-w-none lg:shrink-0 lg:basis-[730px]",
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 730px, 100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        aria-hidden
      />
      <span className="sr-only">{title}</span>
    </div>
  );
}

const rows: readonly Row[] = [
  {
    id: "cobertura-vehiculos",
    title: "Cobertura de seguros para vehículos",
    body: "Prestamos asistencia para vehículos que presenten las siguientes situaciones: Falla de batería: Asistencia inmediata para recargar o reemplazar la batería y poner tu vehículo en funcionamiento nuevamente. Cambio de neumático: Servicio rápido para sustituir neumáticos dañados y ayudarte a continuar tu camino con seguridad. Falla eléctrica menor: Diagnóstico y solución de fallas eléctricas básicas para restablecer el funcionamiento de tu vehículo.",
    imageSrc: siteImages.seguros.coberturaVehiculos,
    imageSide: "left",
  },
  {
    id: "cobertura-hogar",
    title: "Coberturas de seguros para el hogar",
    body: "En caso de accidentes o eventualidades presentadas en el hogar, ofrecemos la siguiente asistencia que cubre plomería, electricidad y cerrajería. Plomería: Asistencia para inspeccionar y reparar fallas en tuberías o instalaciones de agua en tu hogar. Electricidad: Servicio de urgencia para restablecer el suministro eléctrico ante fallas en la instalación. Cerrajería: Atención rápida para resolver problemas con cerraduras y recuperar el acceso a tu vivienda.",
    imageSrc: siteImages.seguros.coberturaHogar,
    imageSide: "right",
  },
] as const;

/**
 * `/seguros` main content — Figma `87:1796`: intro `91:1388` / `87:1814` then rows `115:1435`, `115:1443`.
 * Structural twin of `ServiciosShowcase` (marketing body, alternating `lg:grid-cols-2`, same media frame).
 * Row copy: nodes `115:1440`–`115:1441`, `115:1447`–`115:1448` (prose blocks as in Figma, not split into bullets).
 */
export function SegurosShowcase() {
  return (
    <section className="bg-white" aria-labelledby="seguros-showcase-heading">
      <div className={publicLayout.marketingFigmaBody}>
        <header
          className={cx(
            publicLayout.segurosShowcaseIntroBand,
            "w-full text-left",
          )}
        >
          <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-[24px]">
            <h2
              id="seguros-showcase-heading"
              className="text-balance text-3xl font-bold leading-tight tracking-tight text-[#1b5e20] sm:text-4xl lg:text-[48px] lg:leading-[normal]"
            >
              Soluciones de seguros que protegen lo que más importa
            </h2>
            <p className="w-full max-w-[1480px] text-pretty text-base font-normal leading-normal text-[#0f0f0f] sm:text-lg">
              Accede a soluciones de seguros que protegen tu hogar y tu vehículo,
              brindándote respaldo, asistencia y tranquilidad ante cualquier imprevisto.
            </p>
          </div>
        </header>

        <div
          className={cx(
            "pb-20 sm:pb-24 lg:pb-28",
            "flex min-w-0 flex-col",
            publicLayout.segurosShowcaseRowStackGap,
          )}
        >
          {rows.map((row) => {
            const reversed = row.imageSide === "right";
            return (
              <article
                key={row.id}
                id={row.id}
                className={cx(
                  "grid gap-8 py-6 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16",
                  reversed && "lg:[&>*:first-child]:order-2",
                )}
              >
                <RowMedia src={row.imageSrc} title={row.title} />
                <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
                  <div className="flex flex-col gap-3 lg:gap-[12px]">
                    <h3 className="text-balance text-2xl font-bold tracking-tight text-[#1b5e20] sm:text-3xl lg:text-[32px]">
                      {row.title}
                    </h3>
                    <p className="text-base leading-normal text-[#01151a] sm:text-lg">
                      {row.body}
                    </p>
                  </div>
                  <div>
                    <PrimaryButton
                      href="/contacto"
                      className="min-h-0 rounded-[96px] border-0 !bg-transparent px-6 py-4 text-base font-bold text-[#f6f6f6] shadow-none hover:!bg-transparent hover:opacity-95 active:opacity-90"
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, rgb(124, 179, 66) 13.42%, rgb(27, 94, 32) 130.46%)",
                      }}
                    >
                      Cotizar ahora
                    </PrimaryButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
