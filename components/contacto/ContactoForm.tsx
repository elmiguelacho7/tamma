"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { publicUi, cx } from "@/components/ui/public-tokens";

/** Labels — CONTACTO frame (`docs/design/contacto-page.jpg`): bold dark green, not default slate. */
const fieldLabel = "text-base font-bold text-[#1b5e20]";

export function ContactoForm() {
  return (
    <form className="space-y-4 sm:space-y-6" noValidate onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label htmlFor="contacto-name" className={fieldLabel}>
          Nombre completo
        </label>
        <input
          id="contacto-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ej. Juan Pérez"
          className={publicUi.inputContact}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contacto-email" className={fieldLabel}>
          Correo electrónico
        </label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          className={publicUi.inputContact}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contacto-subject" className={fieldLabel}>
          Asunto
        </label>
        <input
          id="contacto-subject"
          name="subject"
          type="text"
          placeholder="¿En qué podemos ayudarte?"
          className={publicUi.inputContact}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contacto-message" className={fieldLabel}>
          Mensaje
        </label>
        <textarea
          id="contacto-message"
          name="message"
          rows={6}
          placeholder="Escribe tu mensaje aquí…"
          className={cx(publicUi.inputContact, "min-h-[10.5rem] resize-y py-4")}
        />
      </div>

      <PrimaryButton type="submit" className="w-full">
        Enviar mensaje
      </PrimaryButton>
    </form>
  );
}

