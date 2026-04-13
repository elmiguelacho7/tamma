/** Main nav — aligned with design refs (home-full, servicios, contacto). */
export const publicNavLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/seguros", label: "Seguros" },
  { href: "/empresas", label: "Empresas" },
  { href: "/consejos", label: "Consejos" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Footer “quick links” — highlights, not a duplicate of the full menu. */
export const footerQuickLinks = [
  { href: "/servicios", label: "Servicios integrales" },
  { href: "/seguros", label: "Seguros y coberturas" },
  { href: "/empresas", label: "Salud corporativa" },
  { href: "/consejos", label: "Centro de consejos" },
] as const;
