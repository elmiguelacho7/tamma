"use client";

import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import {
  publicHome,
  publicLayout,
  publicSurfaces,
  publicUi,
  cx,
} from "@/components/ui/public-tokens";

const OLAS_TAMMA = "/images/home/services/olas-tamma.png";

export type ContactBlockProps = {
  /** HOME `68:1653`: #f6f6f6, OLAS, tipografía y rejilla alineadas al frame. */
  variant?: "default" | "homeFigma";
  /**
   * Nosotros `71:1607` / `68:1653`: stack flush under testimonials `84:1331` (no extra top band).
   */
  flushStackTop?: boolean;
  /**
   * Slightly wider vertical gaps on small viewports for touch/readability (`/seguros` polish).
   */
  touchComfort?: boolean;
};

export function ContactBlock({
  variant = "default",
  flushStackTop = false,
  touchComfort = false,
}: ContactBlockProps) {
  const home = variant === "homeFigma";

  const homeFieldLabel = cx(
    publicUi.label,
    "text-[0.9375rem] font-semibold leading-snug text-[#424242] lg:text-base",
  );
  const homeFieldInput = cx(
    publicUi.inputContact,
    "min-h-[3rem] px-[1.125rem] py-3.5 leading-snug transition-[box-shadow,ring-color] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  );
  const homeFieldTextarea = cx(
    homeFieldInput,
    "min-h-[11rem] resize-y py-4 leading-relaxed",
  );
  const homeSubmitButton = cx(
    "mt-2 min-h-[3.5rem] shadow-[0_8px_28px_-14px_rgba(75,124,56,0.45)] transition-[box-shadow,transform] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  );

  return (
    <section
      id="section-contactanos"
      className={cx(
        "relative overflow-hidden",
        home
          ? cx(
              "border-0 bg-[#f6f6f6]",
              flushStackTop && "border-t border-[rgba(194,201,181,0.22)]",
            )
          : "border-t border-slate-200/80 bg-[#f8faf9]",
      )}
      aria-labelledby="contactanos-heading"
    >
      {home ? (
        <div
          className="pointer-events-none absolute left-[-957px] top-[-1076px] h-[3106.2px] w-[3595.547px]"
          aria-hidden
        >
          <div className="h-full w-full rotate-[-20.52deg]">
            <div className="relative h-[2186px] w-[3020.989px]">
              <Image
                src={OLAS_TAMMA}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, min(1200px, 90vw)"
                className="object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="pointer-events-none absolute right-[-8%] top-20 h-[24rem] w-[24rem] rounded-full bg-[#4B7C38]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-8 left-[-6%] h-64 w-64 rounded-full bg-[#84CC16]/12 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4B7C38]/18 to-transparent"
            aria-hidden
          />
        </>
      )}

      <div
        className={cx(
          "relative",
          home
            ? cx(
                publicLayout.figmaContainer,
                flushStackTop
                  ? cx(
                      "pb-[32px] lg:pb-[60px]",
                      publicLayout.contactTopSoft,
                    )
                  : publicLayout.figmaSectionPadding,
                "flex flex-col gap-10 sm:gap-12 lg:gap-14",
                touchComfort && "max-sm:gap-14",
              )
            : `${publicLayout.sectionInner} pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20`,
        )}
      >
        <div
          className={cx(
            home ? "mb-0 w-full sm:mb-0" : "mb-10 sm:mb-11 lg:mb-12",
            home && flushStackTop
              ? cx(
                  "flex max-w-[592px] flex-col max-sm:max-w-none",
                  publicLayout.figmaHeadingStack,
                  touchComfort ? "pb-6 max-sm:pb-8 lg:pb-6" : "pb-5 lg:pb-6",
                )
              : "max-w-2xl",
          )}
        >
          <h2
            id="contactanos-heading"
            className={cx(
              "font-bold",
              home
                ? cx("text-[#1b5e20]", publicHome.headingSection)
                : "text-3xl tracking-tight text-[#4B7C38] sm:text-4xl lg:text-[3rem] lg:leading-tight",
            )}
          >
            Contáctanos
          </h2>
          <p
            className={cx(
              "max-w-xl",
              home && flushStackTop ? "mt-0" : "mt-3",
              home
                ? publicHome.bodyLead
                : "text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg",
            )}
          >
            Estamos aquí para escucharte. Visítanos o envíanos un mensaje y te
            responderemos lo antes posible.
          </p>
        </div>

        <div
          className={cx(
            "grid sm:gap-10 lg:grid-cols-2",
            home
              ? cx(
                  "gap-8 pb-6 lg:gap-10 lg:pb-8 lg:items-stretch",
                  touchComfort && "max-sm:gap-12 max-sm:pb-10",
                )
              : "gap-8 pb-4 lg:gap-12 lg:items-start lg:pb-6",
          )}
        >
          <div
            className={cx(
              "flex flex-col",
              home
                ? cx(
                    "gap-3 sm:gap-4 lg:h-full lg:min-h-0",
                    touchComfort && "max-sm:gap-5",
                  )
                : "gap-4 sm:gap-5",
            )}
          >
            <figure
              className={cx(
                "relative overflow-hidden bg-slate-200",
                home
                  ? "h-[260px] w-full max-w-[592px] shrink-0 rounded-[32px] border border-solid border-[rgba(194,201,181,0.3)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] lg:h-auto lg:min-h-0 lg:flex-1"
                  : "aspect-square min-h-[240px] max-w-[22rem] rounded-[1.75rem] shadow-[0_18px_52px_-20px_rgba(15,23,42,0.16)] ring-1 ring-slate-200/70 sm:min-h-[260px] sm:max-w-none sm:rounded-[2rem] lg:min-h-0",
              )}
              {...(home
                ? { "aria-label": "Mapa de ubicación" as const }
                : { role: "img" as const, "aria-label": "Mapa de ubicación" })}
            >
              {home ? (
                <div className="h-full w-full overflow-hidden rounded-[32px] transition-transform duration-300 ease-out hover:scale-[1.01]">
                  {/* TODO: Replace iframe with Google Maps JS API if custom markers or styling is needed */}
                  <iframe
                    src="https://www.google.com/maps?q=Centro%20Banaven%20Caracas&output=embed"
                    title="Mapa — Centro Banaven, Caracas"
                    width="100%"
                    height="100%"
                    className="block h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-100/90 via-slate-100 to-slate-200/95" />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_70%_25%,rgba(255,255,255,0.18),transparent_58%)]"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                    aria-hidden
                  />
                  <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-lg ring-4 ring-white sm:h-14 sm:w-14 sm:ring-[5px]">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </>
              )}
              <figcaption className="sr-only">
                {home
                  ? "Mapa de referencia — Av. La Estancia, Caracas"
                  : "Vista de mapa — sustituir por mapa embebido"}
              </figcaption>
            </figure>

            <SurfaceCard
              padding="md"
              className={cx(
                "flex items-start gap-3 border-0 bg-white py-4 transition duration-200 ease-out sm:gap-4 sm:px-7 sm:py-5",
                home
                  ? "rounded-[32px] border border-solid border-[rgba(194,201,181,0.3)] shadow-[0px_8px_24px_-10px_rgba(0,0,0,0.1),0px_4px_8px_-6px_rgba(0,0,0,0.08)] sm:px-8 sm:py-5"
                  : "rounded-full hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-16px_rgba(15,23,42,0.13)]",
                !home && publicSurfaces.cardGrid,
              )}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4B7C38]/12 text-[#4B7C38] sm:h-11 sm:w-11"
                aria-hidden
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              <div>
                <p
                  className={cx(
                    "text-sm font-bold sm:text-base",
                    home ? "text-[#424242]" : "text-[#1e3a5f]",
                  )}
                >
                  Ubicación
                </p>
                <p
                  className={cx(
                    "mt-1 text-sm leading-relaxed sm:text-[0.9375rem]",
                    home ? "text-[#0f0f0f]" : "text-slate-600",
                  )}
                >
                  Av. La Estancia, Caracas, Venezuela. Centro Banaven (Cubo
                  Negro).
                </p>
              </div>
            </SurfaceCard>
          </div>

          <div className="relative">
            {!home ? (
              <div
                className="pointer-events-none absolute -right-4 top-1/2 z-0 h-[min(100%,28rem)] w-[min(100%,20rem)] -translate-y-1/2 rounded-[40%] bg-[#84CC16]/14 blur-3xl lg:-right-8"
                aria-hidden
              />
            ) : null}
            <SurfaceCard
              padding="none"
              className={cx(
                "relative z-10 border-0 bg-white p-6 sm:p-8 lg:p-9",
                home
                  ? "rounded-[32px] border border-solid border-[rgba(194,201,181,0.3)] p-7 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] sm:p-9 lg:p-10"
                  : cx("rounded-[1.75rem] sm:rounded-[2rem]", publicSurfaces.cardElevated),
              )}
            >
              <form
                className={cx(
                  home
                    ? cx(
                        "space-y-6 sm:space-y-7",
                        touchComfort && "max-sm:space-y-8",
                      )
                    : "space-y-5 sm:space-y-6",
                )}
                noValidate
                onSubmit={(e) => e.preventDefault()}
              >
                <div className={cx(home ? "flex flex-col gap-2" : "space-y-2")}>
                  <label
                    htmlFor="contact-name"
                    className={home ? homeFieldLabel : publicUi.label}
                  >
                    {home ? "Nombre Completo" : "Nombre completo"}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ej. Juan Pérez"
                    className={home ? homeFieldInput : publicUi.inputContact}
                  />
                </div>
                <div className={cx(home ? "flex flex-col gap-2" : "space-y-2")}>
                  <label
                    htmlFor="contact-email"
                    className={home ? homeFieldLabel : publicUi.label}
                  >
                    {home ? "Correo Electrónico" : "Correo electrónico"}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className={home ? homeFieldInput : publicUi.inputContact}
                  />
                </div>
                <div className={cx(home ? "flex flex-col gap-2" : "space-y-2")}>
                  <label
                    htmlFor="contact-subject"
                    className={home ? homeFieldLabel : publicUi.label}
                  >
                    Asunto
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    className={home ? homeFieldInput : publicUi.inputContact}
                  />
                </div>
                <div className={cx(home ? "flex flex-col gap-2" : "space-y-2")}>
                  <label
                    htmlFor="contact-message"
                    className={home ? homeFieldLabel : publicUi.label}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Escribe tu mensaje aquí…"
                    className={
                      home
                        ? homeFieldTextarea
                        : cx(
                            publicUi.inputContact,
                            "min-h-[9.5rem] resize-y py-4",
                          )
                    }
                  />
                </div>
                <PrimaryButton
                  type="button"
                  className={cx("w-full", home && homeSubmitButton)}
                >
                  Enviar mensaje
                </PrimaryButton>
              </form>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </section>
  );
}
