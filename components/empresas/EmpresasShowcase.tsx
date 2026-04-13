import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

type Row = {
  id: string;
  title: string;
  description: string;
  bullets: readonly string[];
  imageSrc: string;
};

const rows: readonly Row[] = [
  {
    id: "atencion",
    title: "Atención médica coordinada",
    description:
      "Acceso estructurado a soporte clínico con comunicación clara para colaboradores y equipo interno.",
    bullets: [
      "Derivación y continuidad",
      "Orientación y seguimiento",
      "Tiempos y pasos visibles",
      "Respaldo operativo",
    ],
    imageSrc: siteImages.empresas.solutionEmployeeCare,
  },
  {
    id: "telemedicina",
    title: "Telemedicina para colaboradores",
    description:
      "Consultas remotas y acompañamiento para reducir fricción, ausentismo y dudas en el día a día.",
    bullets: [
      "Evaluación y orientación",
      "Canales ágiles",
      "Seguimiento del caso",
      "Escalable por equipo",
    ],
    imageSrc: siteImages.empresas.solutionTelemedicina,
  },
  {
    id: "bienestar",
    title: "Bienestar y acompañamiento operativo",
    description:
      "Un modelo que prioriza continuidad y calma: claridad en la activación y apoyo cuando importa.",
    bullets: [
      "Soporte para RRHH",
      "Modelo ajustable",
      "Comunicación consistente",
      "Coordinación de servicios",
    ],
    imageSrc: siteImages.empresas.solutionBienestar,
  },
] as const;

/** Same media frame recipe as `ServiciosShowcase` / `SegurosShowcase` (Figma `86:1517` class proportions). */
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

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2.5 text-sm font-normal leading-relaxed text-[#01151a] sm:text-[0.9375rem]">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#84CC16]/20 text-[#4B7C38]"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
              <path
                d="M20 6 9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * `/empresas` showcase — **Structurally** aligned with `ServiciosShowcase` / `SegurosShowcase`:
 * `marketingFigmaBody`, intro band (shared token `serviciosShowcaseIntroBand`), alternating `lg:grid-cols-2` rows.
 *
 * Classification: **Reuse with variant** (same row model; corporate copy + assets).
 *
 * Legacy blocks **not** carried as separate sections here (Why grid, How-it-works steps, Trust split): their messaging
 * is partially folded into the intro lead. If Figma `EMPRESAS` shows those as distinct frames, reintroduce as
 * dedicated sections after a 100% zoom audit.
 */
export function EmpresasShowcase() {
  return (
    <section className="bg-white" aria-labelledby="empresas-showcase-heading">
      <div className={publicLayout.marketingFigmaBody}>
        <header
          className={cx(
            publicLayout.serviciosShowcaseIntroBand,
            "w-full text-center",
          )}
        >
          <div className="mx-auto flex w-full flex-col items-center gap-6">
            <h2
              id="empresas-showcase-heading"
              className="text-balance w-full text-3xl font-bold tracking-tight text-[#1b5e20] sm:text-4xl lg:text-[48px] lg:leading-normal"
            >
              Soluciones corporativas{" "}
              <span className="text-[#7cb342]">con estructura</span>
            </h2>
            <p className="w-full max-w-[988px] text-pretty text-base font-normal leading-normal text-[#0f0f0f] sm:text-lg">
              Programas diseñados para equipos: claridad de activación, continuidad y
              acompañamiento que reduce incertidumbre. Pensado para organizaciones: soporte
              ordenado y un aliado operativo, no solo un proveedor.
            </p>
          </div>
        </header>

        <div
          className={cx(
            "pb-20 sm:pb-24 lg:pb-28",
            "flex min-w-0 flex-col",
            publicLayout.serviciosShowcaseRowStackGap,
          )}
          id="soluciones"
        >
          {rows.map((row, idx) => {
            const reversed = idx % 2 === 1;
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
                      {row.description}
                    </p>
                  </div>
                  <BulletList items={row.bullets} />
                  <div>
                    <PrimaryButton
                      href="/formulario-b2b"
                      className="min-h-0 rounded-[96px] border-0 !bg-transparent px-6 py-4 text-base font-bold text-[#f6f6f6] shadow-none hover:!bg-transparent hover:opacity-95 active:opacity-90"
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, rgb(124, 179, 66) 13.42%, rgb(27, 94, 32) 130.46%)",
                      }}
                    >
                      Solicitar propuesta
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
