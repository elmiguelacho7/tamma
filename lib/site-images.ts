/**
 * Central registry of public marketing image paths.
 * Drop final assets under /public/images/... using these filenames (or swap files in place).
 */
export const siteImages = {
  branding: {
    /** Canonical vector wordmark */
    logoSvg: "/images/branding/tamma-logo.svg",
    logo: "/images/branding/logo-tamma.png",
    logoWhite: "/images/branding/logo-tamma-white.png",
  },
  home: {
    heroMain: "/images/home/hero-main.jpg",
    serviceTelemedicina: "/images/home/service-telemedicina.jpg",
    serviceSuministros: "/images/home/service-suministros.jpg",
    serviceAmbulancia: "/images/home/service-ambulancia.jpg",
    serviceClinica: "/images/home/service-clinica.jpg",
    insuranceMain: "/images/home/insurance-main.jpg",
    corporateMain: "/images/home/corporate-main.jpg",
    contactMap: "/images/home/contact-map.jpg",
  },
  /** Figma `4GkF8vcXOfDMg7pC1Wplzu` — NOSOTROS `71:1606` (assets via MCP export). */
  nosotros: {
    heroMain: "/images/nosotros/hero-main.webp",
    aboutMain: "/images/nosotros/about-main.webp",
    misionCardBg: "/images/nosotros/mision-card-bg.webp",
    visionCardBg: "/images/nosotros/vision-card-bg.webp",
    ctaCardBg: "/images/nosotros/cta-card-bg.webp",
  },
  servicios: {
    /**
     * `/public/images/servicios/` has no raster exports yet (only `.gitkeep`).
     * Hero + row art reuse proven paths: same cards as `ServicesPreview`, hero from Nosotros export.
     * When Figma exports land under `/public/images/servicios/`, swap these URLs in place.
     */
    heroMain: "/images/nosotros/hero-main.webp",
    telemedicina: "/images/home/services/card-telemedicina.webp",
    suministros: "/images/home/services/card-suministros.webp",
    ambulancia: "/images/home/services/card-ambulancia.webp",
    amd: "/images/home/services/card-amd.webp",
    atencionClinica: "/images/home/services/card-clinica.webp",
    ecosistemaMain: "/images/home/corporativo-catalogo-bg.webp",
    trustMain: "/images/home/contact/map-bg.webp",
  },
  seguros: {
    /**
     * `/public/images/seguros/` has no raster exports yet (only `.gitkeep`).
     * Remapped to existing home/insurance art until Figma exports land under `/images/seguros/*`.
     */
    heroMain: "/images/home/hero-bg.webp",
    includedMain: "/images/home/insurance/tile-3.webp",
    coberturaVehiculos: "/images/home/insurance/tile-1.webp",
    coberturaHogar: "/images/home/insurance/tile-2.webp",
    howItWorks: "/images/home/insurance/tile-4.webp",
    trustMain: "/images/home/contact/map-bg.webp",
  },
  empresas: {
    /**
     * `/public/images/empresas/` has no raster exports yet (only `.gitkeep`).
     * Remapped to existing marketing/service art until Figma exports land under `/images/empresas/*`.
     */
    heroMain: "/images/home/corporativo-catalogo-bg.webp",
    whyMain: "/images/home/services/card-clinica.webp",
    solutionEmployeeCare: "/images/home/services/card-clinica.webp",
    solutionTelemedicina: "/images/home/services/card-telemedicina.webp",
    solutionBienestar: "/images/home/services/card-suministros.webp",
    howItWorks: "/images/home/services/card-amd.webp",
    trustMain: "/images/home/contact/map-bg.webp",
  },
  consejos: {
    /**
     * `/public/images/consejos/` has no raster exports yet (only `.gitkeep` under `articles/`).
     * Remap to existing marketing/service art until Figma exports land under `/images/consejos/*`.
     * Keys stay stable: swap file paths here when assets are dropped in place.
     */
    heroMain: "/images/nosotros/hero-main.webp",
    featuredMain: "/images/home/corporativo-catalogo-bg.webp",
    post01: "/images/home/services/card-clinica.webp",
    post02: "/images/home/services/card-telemedicina.webp",
    post03: "/images/home/services/card-suministros.webp",
    post04: "/images/home/insurance-main.jpg",
    post05: "/images/home/service-ambulancia.jpg",
    post06: "/images/home/corporativo-catalogo-bg.webp",
  },
  contacto: {
    /**
     * CONTACTO frame — `/public/images/contacto/` has no rasters yet (`.gitkeep` only).
     * Remap to shipped home contact art; swap paths when Figma exports land under `contacto/*`.
     */
    heroMain: "/images/home/contact/map-bg.webp",
    contactSupport: "/images/home/contact/map-bg.webp",
    map: "/images/home/contact/map-bg.webp",
  },
  shared: {
    contactMap: "/images/shared/contact-map.jpg",
    softPattern: "/images/shared/pattern-soft-grid.png",
  },
  /** Footer social (white glyphs on dark — see docs/design/home-full.jpg) */
  footerSocial: {
    instagram: "/images/footer/icon-instagram.svg",
    facebook: "/images/footer/icon-facebook.svg",
    tiktok: "/images/footer/icon-tiktok.svg",
  },
} as const;

export type SiteImages = typeof siteImages;
