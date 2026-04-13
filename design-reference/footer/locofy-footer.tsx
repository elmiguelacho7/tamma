import type { NextPage } from "next";
import { type CSSProperties } from "react";
import Image from "next/image";
import Brands from "./brands";

export type FooterType = {
  className?: string;
  property1?: CSSProperties["property1"];
};

const Footer: NextPage<FooterType> = ({ className = "", property1 }) => {
  return (
    <div
      className={`w-[1600px] max-w-full flex flex-col items-start ${className}`}
    >
      <section className="self-stretch flex flex-col items-start text-left text-base text-[#010203] font-[Manrope]">
        <div className="self-stretch flex flex-col items-start">
          <div className="self-stretch flex flex-col items-start">
            <div className="self-stretch bg-[#f6f6f6] flex items-center py-[60px] px-[59px]">
              <div className="w-[1394px] flex items-start gap-12">
                <div className="w-[687px] flex flex-col items-start gap-3 text-neutro-dark">
                  <Image
                    className="w-[157.7px] relative max-h-full"
                    loading="lazy"
                    width={157.7}
                    height={64}
                    sizes="100vw"
                    alt=""
                    src="/Capa-3.svg"
                  />
                  <div className="w-[443px] flex flex-col items-start justify-center gap-6">
                    <div className="self-stretch relative font-medium">
                      Red de servicios de salud integrales con tecnología de
                      vanguardia y atención personalizada para cada paciente.
                    </div>
                    <div className="flex items-center gap-5">
                      <button className="cursor-pointer border-neutro-grey border-solid border-[1px] p-2.5 bg-[transparent] rounded-lg flex items-center">
                        <Brands property1={property1} />
                      </button>
                      <button className="cursor-pointer border-neutro-grey border-solid border-[1px] p-2.5 bg-[transparent] rounded-lg flex items-center">
                        <div className="h-[18px] w-[18px] relative overflow-hidden shrink-0">
                          <Image
                            className="absolute top-[calc(50%_-_9.1px)] left-[calc(50%_-_7.8px)] w-full h-[18px]"
                            loading="lazy"
                            width={15.6}
                            height={18}
                            sizes="100vw"
                            alt=""
                            src="/Vector3.svg"
                          />
                        </div>
                      </button>
                      <button className="cursor-pointer border-neutro-grey border-solid border-[1px] p-2.5 bg-[transparent] rounded-lg flex items-center">
                        <div className="h-[18px] w-[18px] relative overflow-hidden shrink-0">
                          <Image
                            className="absolute h-full w-full top-[0%] right-[25%] bottom-[0%] left-[25%] max-w-full overflow-hidden max-h-full"
                            loading="lazy"
                            width={9}
                            height={18}
                            sizes="100vw"
                            alt=""
                            src="/Vector4.svg"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-[168px] w-px relative border-primario-normal border-solid border-r-[1px] box-border" />
                <div className="w-[214px] flex flex-col items-start justify-center gap-3">
                  <b className="relative">Menú</b>
                  <div className="flex flex-col items-start gap-1 text-primarios-dark">
                    <div className="flex items-center justify-center pt-0 px-0 pb-1">
                      <div className="relative font-medium">Nosotros</div>
                    </div>
                    <div className="w-[72px] flex flex-col items-start pt-0 px-0 pb-1 box-border">
                      <div className="self-stretch flex items-center justify-center">
                        <div className="relative font-medium">Servicios</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center pt-0 px-0 pb-1">
                      <div className="relative font-medium">Seguros</div>
                    </div>
                    <div className="flex items-center justify-center pt-0 px-0 pb-1">
                      <div className="relative font-medium">Consejos</div>
                    </div>
                  </div>
                </div>
                <div className="h-[168px] w-px relative border-primario-normal border-solid border-r-[1px] box-border" />
                <div className="h-[182px] flex-1 relative">
                  <b className="absolute top-[0px] left-[0px] inline-block w-[215px]">
                    Contacto
                  </b>
                  <div className="absolute top-[40.2px] left-[0px] w-[239px] flex flex-col items-start gap-3.5">
                    <div className="self-stretch flex items-center gap-5">
                      <Image
                        className="cursor-pointer [border:none] p-0 bg-[transparent] h-[19px] w-[19px] relative"
                        width={19}
                        height={19}
                        sizes="100vw"
                        alt=""
                        src="/icon.svg"
                      />
                      <div className="relative font-medium">
                         +58 412-1903890
                      </div>
                    </div>
                    <div className="self-stretch flex items-center gap-5">
                      <Image
                        className="h-4 w-5 relative"
                        loading="lazy"
                        width={20}
                        height={16}
                        sizes="100vw"
                        alt=""
                        src="/icon1.svg"
                      />
                      <div className="relative font-medium">
                        info@
                        <a
                          className="text-[inherit]"
                          href="mailto:tammagroupllc@gmail.com"
                          target="_blank"
                        >
                          <span className="[text-decoration:underline]">
                            tammagroup.com
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch [background:rgba(0,_0,_0,_0.62),_#222] flex items-center justify-between py-2.5 px-6 gap-5 text-center text-[13px] text-color-brand-blanco font-['Open_Sans']">
            <div className="relative tracking-[0.06em] leading-[150%]">
              © 2026 —Todos los derechos reservados | Tamma Group – Comunicación
              Total Creado y diseñado por Empirika Group
            </div>
            <div className="flex items-center gap-2.5 text-left text-xs">
              <div className="relative">Términos y condiciones</div>
              <div className="relative text-sm">/</div>
              <div className="relative">Política de privacidad</div>
              <div className="relative text-sm">/</div>
              <div className="relative">Configuración de cookies</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
