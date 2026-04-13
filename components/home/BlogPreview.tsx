import Link from "next/link";
import { publicHome, publicLayout, cx } from "@/components/ui/public-tokens";
import { BlogPreviewCard } from "./BlogPreviewCard";

/** HOME Sección blog — Figma `56:2660` (cuatro tarjetas 333px + copy). */
const posts = [
  {
    imageSrc: "/images/home/blog/preview-1.jpg",
    href: "/consejos",
    title: (
      <>
        <span className="block">El futuro de la consulta médica</span>
        <span className="block">digital en Venezuela</span>
      </>
    ),
    excerpt: (
      <>
        <span className="block">Descubre cómo la tecnología SMART está</span>
        <span className="block">
          rompiendo las barreras geográficas para brindar atención inmediata.
        </span>
      </>
    ),
    dateLabel: "25 Ene 2026",
    dateIso: "2026-01-25",
    category: "Telemedicina",
    titleColor: "text-[#3c3d42]",
    excerptClassName: "text-[#3c3d42]",
  },
  {
    imageSrc: "/images/home/blog/preview-2.jpg",
    href: "/consejos",
    title: <>Gestión de tratamientos crónicos a domicilio</>,
    excerpt: (
      <>
        <span className="block">Cómo nuestro sistema integral garantiza que</span>
        <span className="block">nunca te falten tus medicinas esenciales de</span>
        <span className="block">forma puntual.</span>
      </>
    ),
    dateLabel: "05 Ene 2026",
    dateIso: "2026-01-05",
    category: "Farmacia",
    titleColor: "text-[#191c1b]",
    excerptClassName: "text-[#3c3d42]",
  },
  {
    imageSrc: "/images/home/blog/preview-3.jpg",
    href: "/consejos",
    title: (
      <>
        <span className="block">Prevención: La clave de una vida</span>
        <span className="block">más larga y saludable</span>
      </>
    ),
    excerpt: (
      <>
        <span className="block">Nuestros especialistas comparten consejos</span>
        <span className="block">
          prácticos para integrar hábitos saludables en tu rutina diaria.
        </span>
      </>
    ),
    dateLabel: "15 Dic 2025",
    dateIso: "2025-12-15",
    category: "Bienestar",
    titleColor: "text-[#191c1b]",
    excerptClassName: "text-[#424939]",
  },
  {
    imageSrc: "/images/home/blog/preview-4.jpg",
    href: "/consejos",
    title: <>Salud integral para cuidarte en tu día a día</>,
    excerpt: (
      <>
        Descubre cómo el acceso oportuno a servicios médicos mejora tu bienestar
        y previene complicaciones.
      </>
    ),
    dateLabel: "10 Ago 2025",
    dateIso: "2025-08-10",
    category: "Salud",
    titleColor: "text-[#3c3d42]",
    excerptClassName: "text-[#3c3d42]",
  },
];

export function BlogPreview() {
  return (
    <section className="w-full min-w-0 overflow-x-clip bg-white" aria-labelledby="home-blog-heading">
      <div
        className={cx(
          publicLayout.figmaContainer,
          publicLayout.figmaSectionPadding,
          "flex min-w-0 flex-col gap-7 sm:gap-8 lg:gap-10",
        )}
      >
        <div className="flex min-w-0 flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div
            className={cx(
              "flex min-h-px min-w-0 flex-[1_0_0] flex-col space-y-4 max-lg:contents",
            )}
          >
            <h2
              id="home-blog-heading"
              className={cx(
                "order-1 text-[#1b5e20] lg:order-none",
                publicHome.headingSection,
              )}
            >
              <span className="text-[#1b5e20]">Actualidad y </span>
              <span className={publicHome.headingAccentGreen}>bienestar</span>
            </h2>
            <p
              className={cx(
                "order-3 leading-relaxed sm:leading-normal lg:order-none",
                publicHome.bodyLead,
              )}
            >
              Mantente informado sobre las últimas tendencias en medicina
              preventiva y tecnología SMART.
            </p>
          </div>
          <Link
            href="/consejos"
            className={cx(
              publicHome.ctaPillPrimary,
              "order-2 shrink-0 lg:order-none",
              publicHome.ctaPillPrimaryMicro,
              "!mt-0",
            )}
            style={{
              backgroundImage:
                "linear-gradient(121.42419403008813deg, rgb(124, 179, 66) 13.419%, rgb(27, 94, 32) 130.46%)",
            }}
          >
            Ver más
          </Link>
        </div>

        <ul className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[49px] lg:gap-y-0">
          {posts.map((post) => (
            <li key={post.imageSrc} className="flex h-full min-h-0 min-w-0">
              <BlogPreviewCard
                href={post.href}
                imageSrc={post.imageSrc}
                title={post.title}
                excerpt={post.excerpt}
                dateIso={post.dateIso}
                dateLabel={post.dateLabel}
                category={post.category}
                titleColor={post.titleColor}
                excerptClassName={post.excerptClassName}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
