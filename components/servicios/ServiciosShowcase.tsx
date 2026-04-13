import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { siteImages } from "@/lib/site-images";
import { publicLayout, cx } from "@/components/ui/public-tokens";

type Service = {
  id: string;
  title: string;
  description: string;
  bullets: readonly string[];
  imageSrc: string;
};

const services: readonly Service[] = [
  {
    id: "telemedicina",
    title: "Telemedicina",
    description:
      "Orientación médica remota con un flujo claro: evaluación, indicaciones y seguimiento en un solo punto de contacto.",
    bullets: [
      "Consultas y seguimiento",
      "Indicaciones médicas claras",
      "Canales de respuesta ágiles",
      "Acompañamiento continuo",
    ],
    imageSrc: siteImages.servicios.telemedicina,
  },
  {
    id: "suministros",
    title: "Cadena de suministros de medicamentos",
    description:
      "Logística de farmacia con respaldo y trazabilidad para que puedas acceder a lo que necesitas sin fricción innecesaria.",
    bullets: [
      "Alianzas de farmacia",
      "Coordinación de despacho",
      "Soporte de disponibilidad",
      "Gestión de reposición",
    ],
    imageSrc: siteImages.servicios.suministros,
  },
  {
    id: "traslados",
    title: "Traslados en ambulancia",
    description:
      "Coordinación EMS para traslados oportunos, con procesos definidos y acompañamiento en cada paso del servicio.",
    bullets: [
      "Activación prioritaria",
      "Coordinación y seguimiento",
      "Atención prehospitalaria",
      "Cobertura según caso",
    ],
    imageSrc: siteImages.servicios.ambulancia,
  },
  {
    id: "amd",
    title: "Asistencia médica domiciliaria (AMD)",
    description:
      "Atención en casa para casos que lo permiten, con planificación, coordinación y continuidad clínica.",
    bullets: [
      "Valoración domiciliaria",
      "Planes de cuidado",
      "Seguimiento del caso",
      "Coordinación de insumos",
    ],
    imageSrc: siteImages.servicios.amd,
  },
  {
    id: "clinica",
    title: "Atención clínica",
    description:
      "Red de atención presencial con criterios claros de derivación y soporte para que avances con confianza.",
    bullets: [
      "Red asistencial",
      "Derivaciones y agenda",
      "Seguimiento y continuidad",
      "Respaldo operativo",
    ],
    imageSrc: siteImages.servicios.atencionClinica,
  },
] as const;

/** Figma `86:1517`: 730×328 media frame, 32px radius, light border + shadow. */
function ServiceMedia({ src, title }: { src: string; title: string }) {
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

export function ServiciosShowcase() {
  return (
    <section className="bg-white" aria-labelledby="servicios-heading">
      <div className={publicLayout.marketingFigmaBody}>
        <header
          className={cx(
            publicLayout.serviciosShowcaseIntroBand,
            "w-full text-center",
          )}
        >
          <div className="mx-auto flex w-full flex-col items-center gap-6">
            <h2
              id="servicios-heading"
              className="text-balance w-full text-3xl font-bold tracking-tight text-[#1b5e20] sm:text-4xl lg:text-[48px] lg:leading-normal"
            >
              Nuestros servicios{" "}
              <span className="text-[#7cb342]">de atención</span>
            </h2>
            <p className="w-full text-pretty text-base font-normal leading-normal text-[#0f0f0f] sm:text-lg">
              Accede a una red de servicios que integran salud, farmacia y
              suministro medico, pensados para brindarte atención eficiente y sin
              complicaciones.
            </p>
          </div>
        </header>

        <div
          className={cx(
            "pb-20 sm:pb-24 lg:pb-28",
            "flex min-w-0 flex-col",
            publicLayout.serviciosShowcaseRowStackGap,
          )}
          id="servicios"
        >
          {services.map((service, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className={cx(
                  "grid gap-8 py-6 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16",
                  reversed && "lg:[&>*:first-child]:order-2",
                )}
              >
                <ServiceMedia src={service.imageSrc} title={service.title} />

                <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
                  <div className="flex flex-col gap-3 lg:gap-[12px]">
                    <h3 className="text-balance text-2xl font-bold tracking-tight text-[#1b5e20] sm:text-3xl lg:text-[32px]">
                      {service.title}
                    </h3>
                    <p className="text-base leading-normal text-[#01151a] sm:text-lg">
                      {service.description}
                    </p>
                  </div>
                  <BulletList items={service.bullets} />
                  <div>
                    <PrimaryButton
                      href="/formulario-b2b"
                      className="min-h-0 rounded-[96px] border-0 !bg-transparent px-6 py-4 text-base font-bold text-[#f6f6f6] shadow-none hover:!bg-transparent hover:opacity-95 active:opacity-90"
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, rgb(124, 179, 66) 13.42%, rgb(27, 94, 32) 130.46%)",
                      }}
                    >
                      Solicitar servicio
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

