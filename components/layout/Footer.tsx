/**
 * Footer — Figma node `182:1458` (file `4GkF8vcXOfDMg7pC1Wplzu`): exact layout, spacing, and type.
 * Runtime assets: `public/images/footer/*` and `public/images/branding/logo-wordmark.svg`.
 */
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { manrope } from "@/lib/fonts/manrope";
import { cx } from "@/components/ui/public-tokens";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/** Figma: NEUTRO/BLANCO */
const FOOTER_PANEL = "bg-[#f6f6f6]";
/** Figma: PRIMARIO/NORMAL — divider line art */
const FOOTER_DIVIDER = "bg-[#7CB342]";
/** Figma: NEUTRO/GREY — social button border */
const BORDER_GREY = "#424242";

const footerMenuLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/seguros", label: "Seguros" },
  { href: "/consejos", label: "Consejos" },
] as const;

function ColumnDivider() {
  return (
    <div
      className={cx(
        "hidden h-[167px] w-px shrink-0 self-center lg:block",
        FOOTER_DIVIDER,
      )}
      aria-hidden
    />
  );
}

function ColumnHeading({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="whitespace-nowrap text-base font-bold leading-normal text-[#010203]"
    >
      {children}
    </h2>
  );
}

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex justify-center pb-1 text-base font-medium leading-normal whitespace-nowrap text-[#01151a] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272] lg:justify-start"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto w-full min-w-0 overflow-x-clip border-t border-black/10 text-[#010203]">
      {/* Full-bleed panel bg; constrained row inside */}
      <div className={cx("w-full border-b border-black/[0.06]", FOOTER_PANEL)}>
        <div
          className={cx(
            manrope.className,
            "mx-auto w-full max-w-[1394px] min-w-0 px-4 py-8 sm:px-10 sm:py-10 lg:px-[59px] lg:py-[60px]",
          )}
        >
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Col 1: w-[687px] — logo gap-[12px] to block; block w-[443px] gap-[24px] */}
            <section
              className="flex w-full min-w-0 shrink-0 flex-col items-start gap-3 lg:w-[687px]"
              aria-label="Marca y redes sociales"
            >
              <Image
                src="/images/branding/footer-logo.webp"
                alt="Tamma Group"
                width={158}
                height={64}
                className="h-[64px] w-[157.651px] max-w-full"
                unoptimized
              />
              <div className="flex w-full max-w-[443px] flex-col gap-6">
                <p
                  className="w-full min-w-full text-base font-medium leading-normal text-[#0f0f0f]"
                >
                  Red de servicios de salud integrales con tecnología de vanguardia y
                  atención personalizada para cada paciente.
                </p>
                <ul className="flex flex-wrap items-center gap-5">
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      className="inline-flex items-center justify-center rounded-[8px] border border-solid p-[10px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272]"
                      style={{ borderColor: BORDER_GREY }}
                      aria-label="Instagram — Tamma Group"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        src="/images/footer/icon-instagram.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] object-contain object-center"
                        unoptimized
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/"
                      className="inline-flex items-center justify-center rounded-[8px] border border-solid p-[10px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272]"
                      style={{ borderColor: BORDER_GREY }}
                      aria-label="TikTok — Tamma Group"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        src="/images/footer/Tiktok.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] object-contain object-center"
                        unoptimized
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      className="inline-flex items-center justify-center rounded-[8px] border border-solid p-[10px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272]"
                      style={{ borderColor: BORDER_GREY }}
                      aria-label="Facebook — Tamma Group"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        src="/images/footer/icon-facebook.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] object-contain object-center"
                        unoptimized
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <div className="border-t border-black/10 pt-6 lg:hidden" aria-hidden />
            <ColumnDivider />

            {/* Col 2: w-[214px] gap-[12px] title to list; list gap-[4px] */}
            <nav
              aria-label="Menú del pie de página"
              className="flex w-full shrink-0 flex-col gap-3 border-t border-black/10 pt-6 lg:w-[214px] lg:border-t-0 lg:pt-0"
            >
              <ColumnHeading id="footer-menu-heading">Menú</ColumnHeading>
              <ul className="flex flex-col gap-1">
                {footerMenuLinks.map(({ href, label }) => (
                  <li key={href}>
                    <FooterNavLink href={href}>{label}</FooterNavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-black/10 pt-6 lg:hidden" aria-hidden />
            <ColumnDivider />

            {/* Col 3: flex-1; heading + block top-[40.18px] w-[239px] gap-[14px] rows gap-[20px] */}
            <section
              className="relative w-full min-w-0 shrink border-t border-black/10 pt-6 lg:flex-1 lg:border-t-0 lg:pt-0"
              aria-labelledby="footer-contact-heading"
            >
              <ColumnHeading id="footer-contact-heading">Contacto</ColumnHeading>
              <ul className="mt-[21px] flex w-full max-w-[239px] flex-col gap-[14px]">
                <li>
                  <a
                    href="tel:+584121903890"
                    className="flex w-full items-center gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272]"
                  >
                    <Image
                      src="/images/footer/icon-phone.svg"
                      alt=""
                      width={19}
                      height={19}
                      className="size-[19px] shrink-0 object-contain"
                      unoptimized
                    />
                    <span className="min-w-0 text-pretty text-base font-medium leading-normal text-[#010203] sm:whitespace-nowrap">
                      +58 412-1903890
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@tammagroup.com"
                    className="flex w-full items-center gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3272]"
                  >
                    <Image
                      src="/images/footer/icon-email.svg"
                      alt=""
                      width={20}
                      height={16}
                      className="h-4 w-5 shrink-0 object-contain"
                      unoptimized
                    />
                    <span className="break-all text-base font-medium leading-normal text-[#010203] sm:break-normal sm:whitespace-nowrap">
                      <span>info@</span>
                      <span className="underline decoration-solid underline-offset-2">
                        tammagroup.com
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Full-bleed legal bar; inner row aligned to main content width */}
      <div
        className="w-full shrink-0 border-t border-white/[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), linear-gradient(90deg, rgb(34, 34, 34) 0%, rgb(34, 34, 34) 100%)",
        }}
      >
        <div
          className={cx(
            openSans.className,
            "mx-auto flex w-full max-w-[1394px] min-w-0 flex-col items-stretch gap-4 px-4 py-4 text-white max-sm:gap-5 max-sm:py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-10 sm:py-[10px] lg:px-[59px]",
          )}
        >
          <p
            className="whitespace-normal text-center text-[12px] leading-[1.65] tracking-[0.05em] text-pretty sm:text-left sm:text-[13px] sm:leading-[1.5] sm:tracking-[0.78px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            © {new Date().getFullYear()} —Todos los derechos reservados | Tamma Group –
            Comunicación Total Creado y diseñado por Empirika Group
          </p>
          <nav
            aria-label="Información legal"
            className="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-2 text-white sm:justify-end"
          >
            <Link
              href="/terminos"
              className="text-xs leading-normal transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Términos y condiciones
            </Link>
            <span className="text-sm leading-normal opacity-80" aria-hidden>
              /
            </span>
            <Link
              href="/privacidad"
              className="text-xs leading-normal transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Política de privacidad
            </Link>
            <span className="text-sm leading-normal opacity-80" aria-hidden>
              /
            </span>
            <Link
              href="/cookies"
              className="text-xs leading-normal transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Configuración de cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
