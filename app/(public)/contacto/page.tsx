import type { Metadata } from "next";
import { ContactoPage } from "@/components/contacto/ContactoPage";

/**
 * CONTACTO — Figma file `4GkF8vcXOfDMg7pC1Wplzu`, canonical frame per `docs/design/contacto-page.jpg`.
 * Route order: frosted header → intro → map + address | form. Global footer from `(public)/layout`.
 */
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos: visítanos o envíanos un mensaje y te responderemos lo antes posible. TAMMA Group, Caracas.",
  openGraph: {
    title: "Contacto | TAMMA Group",
    description:
      "Estamos aquí para escucharte. Ubicación en Caracas y formulario de contacto.",
  },
};

export default function ContactoRoute() {
  return <ContactoPage />;
}
