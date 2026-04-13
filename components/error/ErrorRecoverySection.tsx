import Link from "next/link";
import { publicLayout, publicSurfaces, cx } from "@/components/ui/public-tokens";

/**
 * 404 recovery grid — four destination cards. **Frozen** composition; spacing/gaps/padding may be nudged only
 * after a 100% Figma pass — not grid structure or card model.
 */

const CARDS: { title: string; description: string; href: string }[] = [
  { title: "Inicio", description: "Vuelve a la portada principal del sitio.", href: "/" },
  {
    title: "Servicios",
    description: "Explora nuestras soluciones de atención y acompañamiento.",
    href: "/servicios",
  },
  {
    title: "Consejos",
    description: "Contenido útil sobre bienestar, prevención y orientación.",
    href: "/consejos",
  },
  { title: "Contacto", description: "Escríbenos y te ayudamos a dar el siguiente paso.", href: "/contacto" },
];

function RecoveryCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group flex h-full min-h-[13.5rem] touch-manipulation flex-col rounded-[1.25rem] bg-white p-7 transition duration-200 ease-out sm:min-h-[15rem] sm:rounded-2xl sm:p-8 lg:min-h-[16.5rem] lg:p-9",
        "hover:-translate-y-1 hover:shadow-[0_24px_64px_-20px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4B7C38] active:translate-y-0",
        publicSurfaces.cardGrid,
      )}
    >
      <p className="text-lg font-bold tracking-tight text-[#1e3a5f] sm:text-xl group-hover:text-[#3d6630]">
        {title}
      </p>
      <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-[1.0625rem] sm:leading-relaxed">
        {description}
      </p>
      <span className="mt-6 inline-flex text-base font-semibold text-[#4B7C38] underline-offset-4 transition-colors duration-200 group-hover:underline sm:mt-8">
        Ir ahora
      </span>
    </Link>
  );
}

export function ErrorRecoverySection() {
  return (
    <section className="bg-white" aria-labelledby="error-recovery-heading">
      <div className={cx(publicLayout.marketingFigmaBody, "py-20 sm:py-24 lg:py-32")}>
        <header className="mx-auto mb-12 max-w-[48rem] text-center sm:mb-14 lg:mb-16">
          <h2
            id="error-recovery-heading"
            className="text-balance text-[2rem] font-bold tracking-tight text-[#1e3a5f] sm:text-4xl lg:text-[40px] lg:leading-tight"
          >
            Volver con <span className="text-[#84CC16]">claridad</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-pretty text-lg leading-relaxed text-slate-600 sm:mt-6 sm:text-xl lg:text-[1.25rem] lg:leading-relaxed">
            Estas rutas suelen ayudarte a retomar lo que buscabas, sin perder tiempo.
          </p>
        </header>

        <ul className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8 xl:gap-10">
          {CARDS.map((c) => (
            <li key={c.href} className="flex min-h-0">
              <RecoveryCard {...c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
