import Image from "next/image";
import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";

const insuranceFeaturePill =
  "w-full rounded-[96px] border border-solid border-[#1b5e20] bg-[rgba(197,225,165,0.25)] px-[24px] py-3.5 backdrop-blur-[17px] transition-shadow duration-200 hover:shadow-[0_4px_24px_-10px_rgba(27,94,32,0.14)]";

// Figma HOME insurance/services support section — node `56:2601`
const tiles = [
  { src: "/images/home/insurance/tile-1.jpg", className: "col-1 row-1 ml-0 mt-0" },
  { src: "/images/home/insurance/tile-2.jpg", className: "col-1 row-1 ml-0 mt-[215px]" },
  { src: "/images/home/insurance/tile-3.jpg", className: "col-1 row-1 ml-[223px] mt-[250px]" },
  { src: "/images/home/insurance/tile-4.jpg", className: "col-1 row-1 ml-[223px] mt-[35px]" },
] as const;

const features = [
  {
    title: "Plomería",
    text: "Reparamos filtraciones, roturas y fallas en tuberías con atención rápida y profesional.",
    icon: "/images/home/insurance/icons/plomeria.png",
  },
  {
    title: "Cerrajería",
    text: "Apertura y reparación de cerraduras ante pérdida, daño o bloqueo de acceso.",
    icon: "/images/home/insurance/icons/cerrajeria.png",
  },
  {
    title: "Electricidad",
    text: "Solucionamos fallas eléctricas en el hogar con atención rápida y segura.",
    icon: "/images/home/insurance/icons/electricidad.png",
  },
  {
    title: "Asistencia vial",
    text: "Asistencia inmediata en carretera ante fallas como batería, neumáticos o problemas eléctricos menores.",
    icon: "/images/home/insurance/icons/asistencia-vial.png",
  },
] as const;

export function InsuranceSupportSection() {
  return (
    // Mobile HOME `116:1908`: tinted background; desktop `56:2601`: white.
    <section className="w-full bg-[rgba(197,225,165,0.1)] lg:bg-white">
      <div
        className={cx(
          publicLayout.figmaContainer,
          publicLayout.figmaSectionPadding,
          // Mobile: stacked; Desktop: two-column collage + content (horizontal breathing vs Figma-tight gap-0).
          "flex flex-col items-start gap-[32px] lg:flex-row lg:justify-between lg:gap-[48px] xl:gap-[60px]",
        )}
      >
        {/* Left tile collage — exact offsets from Figma */}
        <div className="hidden shrink-0 inline-grid grid-cols-[max-content] grid-rows-[max-content] leading-[0] lg:inline-grid">
          {tiles.map((t) => (
            <div
              key={t.src}
              className={cx(
                "relative flex h-[203px] w-[211px] flex-col items-start justify-center overflow-hidden rounded-[32px]",
                t.className,
              )}
            >
              <Image
                src={t.src}
                alt=""
                fill
                sizes="211px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden />
            </div>
          ))}
        </div>

        {/* Right content block — capped width so pills align with Home lateral rhythm */}
        <div
          className={cx(
            publicLayout.figmaSplitContentColumn,
            "flex flex-col items-start gap-10 lg:gap-12",
          )}
        >
          <div className="flex w-full flex-col items-start gap-8 lg:gap-10">
            <div className="flex w-full flex-col items-start gap-4 lg:gap-5">
              <h2
                className={cx(
                  "w-full whitespace-pre-wrap text-[#1b5e20]",
                  publicHome.headingSection,
                )}
              >
                <span className="text-[#1b5e20]">{`Tranquilidad total con nuestras `}</span>
                <br />
                <span className="text-[#7cb342]">pólizas de seguros</span>
              </h2>
              <p className={cx("w-full", publicHome.bodyLead)}>
                Más que salud, protegemos tu entorno. Nuestro plan integral de
                seguros incluye servicios de plomería, electricidad, cerrajería y
                asistencia vial para que nada te quite la calma.
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-7 lg:flex-row lg:justify-between lg:gap-10 xl:gap-12">
              <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-7 lg:gap-8">
                {[features[0], features[1]].map((f) => (
                  <div
                    key={f.title}
                    className={insuranceFeaturePill}
                  >
                    <div className="flex items-center justify-center gap-[12px]">
                      <div className="relative size-[32px] shrink-0">
                        <Image
                          src={f.icon}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <p className="text-pretty text-[24px] font-bold leading-normal text-[#424242]">
                        {f.title}
                      </p>
                    </div>
                    <p className="mt-3.5 text-center text-[14px] font-normal leading-normal text-[#424242] lg:mt-4">
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-7 lg:gap-8">
                {[features[2], features[3]].map((f) => (
                  <div
                    key={f.title}
                    className={insuranceFeaturePill}
                  >
                    <div className="flex items-center justify-center gap-[12px]">
                      <div className="relative size-[32px] shrink-0">
                        <Image
                          src={f.icon}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <p className="text-pretty text-[24px] font-bold leading-normal text-[#424242]">
                        {f.title}
                      </p>
                    </div>
                    <p className="mt-3.5 text-center text-[14px] font-normal leading-normal text-[#424242] lg:mt-4">
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/seguros"
            className={cx(
              publicHome.ctaPillPrimary,
              "w-full shrink-0 lg:w-[230px]",
            )}
            style={{
              backgroundImage:
                "linear-gradient(142.20078751608156deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
            }}
          >
            Conocer más
          </Link>
        </div>
      </div>
    </section>
  );
}
