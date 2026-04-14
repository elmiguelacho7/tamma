import { Footer } from "@/components/layout/Footer";
import { PublicRouteTransition } from "@/components/motion/PublicRouteTransition";

/**
 * Public shell without a global header: Home uses `HeroHeader` on the hero.
 *
 * Matrix (see `components/layout/Header.tsx` for the full contract):
 * - Home / Nosotros → `HeroHeader`
 * - Servicios, Seguros, Empresas, Consejos, 404 → `Header variant="heroOverlay"`
 * - `/contacto`, `/formulario-b2b` → `Header variant="contacto"` (sticky; **frozen** — not `heroOverlay`)
 * - Other pages → `Header variant="default"` as needed
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full min-w-0 flex-col bg-slate-50">
      <main id="public-main" className="flex w-full min-w-0 flex-1 flex-col">
        <PublicRouteTransition>{children}</PublicRouteTransition>
      </main>
      <Footer />
    </div>
  );
}
