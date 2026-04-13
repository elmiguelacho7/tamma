"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cx } from "@/components/ui/public-tokens";

/**
 * Dedicated B2B form layout — structurally copied from Figma `4GkF8vcXOfDMg7pC1Wplzu` frame `162:1364` (FORMULARIO B2B).
 * Classification: structurally different from generic form components → page-specific implementation (not a shared “generic form”).
 *
 * Typography: Figma specifies Manrope for body/checkbox copy; Plus Jakarta for page + section titles — applied via wrapper classes from the page.
 */

const inputUnderline =
  "min-h-11 w-full border-0 border-b border-solid border-[#d7d7d7] bg-transparent py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-[16px] text-[#242424] outline-none focus-visible:border-[#1b5e20]";

const labelField = "text-[16px] font-bold leading-normal text-[#0f0f0f]";

function FieldPair({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-6 sm:gap-10 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1">{left}</div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1">{right}</div>
    </div>
  );
}

function UnderlineField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <>
      <p className={labelField}>{label}</p>
      <input name={name} type={type} className={inputUnderline} autoComplete="off" />
    </>
  );
}

function CheckboxRow({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 py-0.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm border-2 border-[#1f1f1f] bg-transparent text-[#1b5e20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]"
      />
      <span className="text-pretty text-[16px] font-normal leading-snug text-[#242424]">{label}</span>
    </label>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-8 w-full min-w-0 items-center text-pretty text-[1.125rem] font-bold leading-snug text-[#242424] sm:text-xl lg:text-[24px] lg:leading-normal [font-family:var(--font-plus-jakarta),ui-sans-serif,sans-serif]"
    >
      {children}
    </div>
  );
}

function SubheadingBold({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-8 w-full min-w-0 items-center text-pretty text-[16px] font-bold leading-snug text-[#242424]">
      {children}
    </div>
  );
}

function PaddedBlock({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3 p-3 sm:p-4 lg:w-[732px]">{children}</div>
  );
}

export function FormularioB2BForm({ className }: { className?: string }) {
  return (
    <form
      className={cx(
        "relative flex w-full max-w-[1552px] min-w-0 flex-col gap-4 rounded-[24px] bg-[#f6f6f6] p-4 sm:gap-6 sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8",
        className,
      )}
      noValidate
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex min-h-0 w-full min-w-0 max-w-full flex-col justify-center pr-12 text-[1.35rem] font-bold leading-snug text-[#242424] sm:max-w-[calc(100%-3.5rem)] sm:pr-14 sm:text-[1.75rem] lg:max-w-[calc(100%-3rem)] lg:pr-10 lg:text-[32px] lg:leading-normal [font-family:var(--font-plus-jakarta),ui-sans-serif,sans-serif]">
        <h1 className="text-balance leading-snug lg:leading-normal">
          Formulario B2B – Servicios de Salud Integral
        </h1>
      </div>

      <Link
        href="/servicios"
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-[#e8e8e8] text-[#424242] transition-colors hover:bg-[#dedede] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20] sm:right-6 sm:top-6 sm:size-8"
        aria-label="Cerrar formulario"
      >
        <X className="size-4" strokeWidth={2} aria-hidden />
      </Link>

      {/* Row 1: Información de la Empresa | Persona de Contacto — gap 20px */}
      <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start">
        <PaddedBlock>
          <SectionTitle>Información de la Empresa</SectionTitle>
          <FieldPair
            left={<UnderlineField label="Nombre de la empresa" name="empresa_nombre" />}
            right={<UnderlineField label="Industria / Sector" name="empresa_industria" />}
          />
          <FieldPair
            left={<UnderlineField label="Dirección fiscal" name="empresa_direccion" />}
            right={<UnderlineField label="Ciudad" name="empresa_ciudad" />}
          />
          <FieldPair
            left={<UnderlineField label="Teléfono corporativo" name="empresa_telefono" />}
            right={<UnderlineField label="Sitio web" name="empresa_web" type="url" />}
          />
        </PaddedBlock>

        <PaddedBlock>
          <SectionTitle>Persona de Contacto</SectionTitle>
          <FieldPair
            left={<UnderlineField label="Nombre completo" name="contacto_nombre" />}
            right={<UnderlineField label="Cargo" name="contacto_cargo" />}
          />
          <FieldPair
            left={<UnderlineField label="Correo electrónico" name="contacto_email" type="email" />}
            right={<UnderlineField label="Teléfono directo" name="contacto_telefono" />}
          />
          <div className="flex w-full flex-col gap-1 lg:max-w-[calc(50%-2rem)]">
            <UnderlineField label="WhatsApp (opcional)" name="contacto_whatsapp" type="tel" />
          </div>
        </PaddedBlock>
      </div>

      {/* Row 2: left stack (Tipo servicios → … → Contacto comercial) | Detalle — gap 24px */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <PaddedBlock>
              <SectionTitle>Tipo de Servicios de Interés</SectionTitle>
              <div className="flex h-8 w-full items-center text-[16px] font-medium leading-normal text-[#242424]">
                <p>Seleccione uno o más:</p>
              </div>
              <CheckboxRow name="interes_telemedicina" label="Telemedicina (consultas virtuales)" />
              <CheckboxRow name="interes_domiciliaria" label="Atención médica domiciliaria" />
              <CheckboxRow name="interes_medicamentos" label="Compra de medicamentos" />
              <CheckboxRow name="interes_ocupacional" label="Programas de salud ocupacional" />
              <CheckboxRow name="interes_emergencias" label="Atención de emergencias" />
              <label className="flex cursor-pointer items-start gap-3 py-0.5">
                <input
                  type="checkbox"
                  name="interes_otros"
                  className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm border-2 border-[#1f1f1f] bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]"
                />
                <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-[16px] text-[#242424]">
                  <span>Otros:</span>
                  <input
                    name="interes_otros_detalle"
                    type="text"
                    className={cx(inputUnderline, "min-w-[10rem] flex-1")}
                    autoComplete="off"
                  />
                </span>
              </label>
          </PaddedBlock>

          <PaddedBlock>
            <SectionTitle>Cobertura y Alcance</SectionTitle>
            <div className="flex h-8 w-full items-center text-[16px] font-medium leading-normal text-[#242424]">
              <span className="flex flex-wrap items-end gap-2">
                Número de empleados / afiliados:
                <input
                  name="cobertura_num_empleados"
                  className={cx(inputUnderline, "inline-block w-32 sm:w-40")}
                  autoComplete="off"
                />
              </span>
            </div>
            <p className="text-[16px] font-normal leading-normal text-[#242424]">
              Ubicación de los usuarios:
            </p>
            <CheckboxRow name="ubicacion_local" label="Local" />
            <CheckboxRow name="ubicacion_nacional" label="Nacional" />
            <CheckboxRow name="ubicacion_internacional" label="Internacional" />
            <p className="text-[16px] font-normal leading-normal text-[#242424]">
              ¿Requiere cobertura 24/7?:
            </p>
            <CheckboxRow name="cobertura_24_7_si" label="Si" />
            <CheckboxRow name="cobertura_24_7_no" label="No" />
          </PaddedBlock>

          <PaddedBlock>
            <SectionTitle>Presupuesto y Contratación</SectionTitle>
            <p className="text-[16px] font-normal leading-normal text-[#242424]">
              Presupuesto estimado mensual:
            </p>
            <CheckboxRow name="presupuesto_menor_5000" label="<$5,000" />
            <CheckboxRow name="presupuesto_5000_20000" label="$5,000 – $20,000" />
            <CheckboxRow name="presupuesto_mayor_20000" label="$20,000+" />
            <div className="flex h-8 w-full items-center text-[16px] font-medium leading-normal text-[#242424]">
              <p>Tipo de contrato preferido:</p>
            </div>
            <CheckboxRow name="contrato_suscripcion" label="Suscripción mensual" />
            <CheckboxRow name="contrato_pago_uso" label="Pago por uso" />
            <CheckboxRow name="contrato_anual" label="Contrato anual" />
            <label className="flex cursor-pointer items-start gap-3 py-0.5">
              <input
                type="checkbox"
                name="contrato_otro"
                className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm border-2 border-[#1f1f1f] bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]"
              />
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-[16px] text-[#242424]">
                <span>Otro:</span>
                <input
                  name="contrato_otro_detalle"
                  type="text"
                  className={cx(inputUnderline, "min-w-[10rem] flex-1")}
                  autoComplete="off"
                />
              </span>
            </label>
          </PaddedBlock>

          <PaddedBlock>
            <SectionTitle>Información adicional</SectionTitle>
            <textarea
              name="info_adicional_1"
              rows={2}
              className={cx(inputUnderline, "min-h-[2.5rem] resize-y py-1")}
            />
            <textarea
              name="info_adicional_2"
              rows={2}
              className={cx(inputUnderline, "min-h-[2.5rem] resize-y py-1")}
            />
            <textarea
              name="info_adicional_3"
              rows={2}
              className={cx(inputUnderline, "min-h-[2.5rem] resize-y py-1")}
            />
          </PaddedBlock>

          <PaddedBlock>
            <SectionTitle>Contacto comercial</SectionTitle>
            <p className="w-full text-[16px] font-normal leading-normal text-[#242424]">
              Será contactado por uno de nuestros asesores para atender su solicitud.
            </p>
          </PaddedBlock>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <PaddedBlock>
              <SectionTitle>Detalle del Servicio Requerido</SectionTitle>

              <SubheadingBold>Telemedicina</SubheadingBold>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                <span className="inline-flex flex-wrap items-end gap-2">
                  Número estimado de usuarios:
                  <input
                    name="tm_usuarios"
                    className={cx(inputUnderline, "inline-block w-28 sm:w-36")}
                    autoComplete="off"
                  />
                </span>
              </p>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                Especialidades requeridas:
              </p>
              <CheckboxRow name="tm_esp_general" label="Medicina general" />
              <CheckboxRow name="tm_esp_pediatria" label="Pediatría" />
              <CheckboxRow name="tm_esp_psicologia" label="Psicología" />
              <CheckboxRow name="tm_esp_nutricion" label="Nutrición" />
              <label className="flex cursor-pointer items-start gap-3 py-0.5">
                <input
                  type="checkbox"
                  name="tm_esp_otros"
                  className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm border-2 border-[#1f1f1f] bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]"
                />
                <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-[16px] text-[#242424]">
                  <span>Otros:</span>
                  <input
                    name="tm_esp_otros_detalle"
                    type="text"
                    className={cx(inputUnderline, "min-w-[8rem] flex-1")}
                    autoComplete="off"
                  />
                </span>
              </label>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                Frecuencia estimada:
              </p>
              <CheckboxRow name="tm_freq_demanda" label="Bajo demanda" />
              <CheckboxRow name="tm_freq_programado" label="Programado" />
              <CheckboxRow name="tm_freq_24_7" label="24/7" />

              <SubheadingBold>Atención Médica Domiciliaria</SubheadingBold>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">Tipo de atención:</p>
              <CheckboxRow name="amd_consultas" label="Consultas médicas" />
              <CheckboxRow name="amd_enfermeria" label="Enfermería" />
              <CheckboxRow name="amd_terapias" label="Terapias (física, respiratoria, etc.)" />
              <CheckboxRow name="amd_cronicos" label="Cuidados crónicos" />
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                <span className="inline-flex flex-wrap items-end gap-2">
                  Cobertura geográfica requerida:
                  <input
                    name="amd_cobertura_geo"
                    className={cx(inputUnderline, "min-w-[12rem] flex-1")}
                    autoComplete="off"
                  />
                </span>
              </p>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                <span className="inline-flex flex-wrap items-end gap-2">
                  Volumen estimado mensual:
                  <input
                    name="amd_volumen"
                    className={cx(inputUnderline, "inline-block w-28 sm:w-36")}
                    autoComplete="off"
                  />
                </span>
              </p>

              <SubheadingBold>Venta de Medicamentos</SubheadingBold>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">Tipo de productos:</p>
              <CheckboxRow name="med_genericos" label="Medicamentos genéricos" />
              <CheckboxRow name="med_marca" label="Medicamentos de marca" />
              <CheckboxRow name="med_insumos" label="Insumos médicos" />
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                <span className="inline-flex flex-wrap items-end gap-2">
                  Volumen estimado mensual:
                  <input
                    name="med_volumen"
                    className={cx(inputUnderline, "inline-block w-28 sm:w-36")}
                    autoComplete="off"
                  />
                </span>
              </p>
              <p className="text-[16px] font-normal leading-normal text-[#242424]">
                Requiere integración logística:
              </p>
              <CheckboxRow name="med_logistica_si" label="Si" />
              <CheckboxRow name="med_logistica_no" label="No" />
          </PaddedBlock>
        </div>
      </div>

      <button
        type="submit"
        className="flex min-h-[3.25rem] w-full shrink-0 touch-manipulation items-center justify-center rounded-[96px] px-6 py-4 text-[16px] font-bold leading-normal text-[#f6f6f6] transition-opacity hover:opacity-[0.92] active:opacity-[0.86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5e20]/55"
        style={{
          backgroundImage:
            "linear-gradient(120.00000124584054deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
        }}
      >
        Enviar formulario
      </button>
    </form>
  );
}
