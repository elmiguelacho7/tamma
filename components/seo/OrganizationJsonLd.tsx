import { getSiteUrl } from "@/lib/site";

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tamma Group",
  description:
    "Red de servicios de salud integrales con telemedicina y cobertura en Venezuela.",
  url: getSiteUrl().origin,
  logo: `${getSiteUrl().origin}/icon.svg`,
  sameAs: [] as string[],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+58-412-1903890",
    contactType: "customer service",
    areaServed: "VE",
    availableLanguage: ["Spanish"],
  },
} as const;

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }}
    />
  );
}
