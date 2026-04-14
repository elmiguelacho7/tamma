import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { publicLayout, cx } from "@/components/ui/public-tokens";
import { ConsejosArticleCard } from "@/components/consejos/ConsejosArticleCard";
import { ConsejoContentBlocks } from "@/components/consejos/ConsejoContentBlocks";
import { consejosPosts, type ConsejoPost } from "@/lib/consejos-data";

function formatDateLong(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-VE", { year: "numeric", month: "long", day: "2-digit" });
}

/**
 * Build up to 6 related posts for sidebar (2) + secondary row (4). Visual reference: `docs/design/blog-detail-page.jpg`.
 */
function relatedPool(currentSlug: string, related: readonly ConsejoPost[]): ConsejoPost[] {
  const seen = new Set<string>();
  const out: ConsejoPost[] = [];
  for (const p of related) {
    if (p.slug === currentSlug) continue;
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  }
  for (const p of consejosPosts) {
    if (out.length >= 6) break;
    if (p.slug === currentSlug) continue;
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  }
  return out;
}

/**
 * BLOG-INTERNA — visual reference: `docs/design/blog-detail-page.jpg` (exported Figma capture).
 * Hero: embedded header + cover + H1 + lead only (no back link, no metadata in hero).
 * Body: 2-col — main article + right sidebar “Lecturas relacionadas” (stacked cards).
 * Below: horizontal row of four cards. No mid-page CTA block in this frame.
 */
export function ConsejoArticle({ post, related }: { post: ConsejoPost; related: readonly ConsejoPost[] }) {
  const lead = post.subtitle ?? post.excerpt;
  const pool = relatedPool(post.slug, related);
  const sidebarPosts = pool.slice(0, 2);
  const rowPosts = pool.slice(2, 6);
  const showSidebar = sidebarPosts.length > 0;

  return (
    <>
      <section className="w-full bg-white" aria-labelledby="consejo-hero-title">
        <div
          className={cx(
            publicLayout.homeWideFramedOuter,
            "pt-4 sm:pt-6",
          )}
        >
          <div
            className={cx(
              "relative isolate w-full overflow-hidden rounded-t-[32px] rounded-b-[2rem] sm:rounded-b-[2.75rem] lg:rounded-b-[3.25rem]",
              "min-h-[min(520px,78vh)] lg:h-[600px] lg:min-h-[600px]",
            )}
          >
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              priority
              fetchPriority="high"
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.85)_0%,rgba(30,58,95,0.45)_42%,rgba(15,23,42,0.35)_100%)]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25"
              aria-hidden
            />

            <div className="relative z-10 flex h-full min-h-0 w-full flex-col">
              <Header variant="heroOverlay" />

              <div className="flex min-h-0 flex-1 flex-col justify-center px-4 pb-8 pt-2 sm:px-8 sm:pb-12 sm:pt-0 lg:px-[38px] lg:pb-14">
                <div
                  className={cx(
                    "mx-auto flex w-full max-w-[1476px] flex-col items-start gap-3.5 sm:gap-4 lg:gap-6",
                    "translate-y-4 lg:translate-y-[82px]",
                  )}
                >
                  <h1
                    id="consejo-hero-title"
                    className="break-words text-balance font-bold leading-[1.05] tracking-[-0.02em] text-[#f6f6f6] text-[1.875rem] sm:text-[2.5rem] lg:text-[64px] lg:leading-[normal]"
                  >
                    {post.title}
                  </h1>
                  {lead ? (
                    <p className="max-w-[988px] text-pretty text-base font-medium leading-relaxed text-[#f6f6f6] sm:text-lg lg:text-[18px] lg:leading-normal">
                      {lead}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-w-0 bg-white">
        <SectionReveal>
          <div
            className={cx(publicLayout.marketingFigmaBody, "py-12 sm:py-14 lg:py-16")}
            aria-label="Artículo"
          >
            <div
              className={cx(
                "grid items-start gap-10 lg:gap-12",
                showSidebar ? "lg:grid-cols-12" : "lg:grid-cols-1",
              )}
            >
              <div className={cx(showSidebar ? "lg:col-span-8" : "lg:col-span-1", "min-w-0 max-w-[42rem]")}>
                <div className="mb-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600 sm:text-base">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0 text-[#4B7C38]" aria-hidden />
                    <time dateTime={post.date}>{formatDateLong(post.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4 shrink-0 text-[#4B7C38]" aria-hidden />
                    <span className="font-medium text-slate-700">{post.category}</span>
                  </span>
                </div>
                <ConsejoContentBlocks blocks={post.content} />
              </div>

              {showSidebar ? (
                <aside className="min-w-0 lg:col-span-4" aria-labelledby="consejo-sidebar-related-heading">
                  <div className={cx(publicLayout.figmaHeadingStack)}>
                    <h2
                      id="consejo-sidebar-related-heading"
                      className="text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-[1.75rem]"
                    >
                      Lecturas relacionadas
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      Visita los siguientes artículos
                    </p>
                  </div>
                  <ul className="mt-6 flex flex-col gap-6">
                    {sidebarPosts.map((p) => (
                      <li key={p.slug} className="min-w-0">
                        <ConsejosArticleCard post={p} titleHeading="h3" />
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}
            </div>

            {rowPosts.length > 0 ? (
              <ul
                className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:mt-20 lg:grid-cols-4 lg:gap-x-[49px] lg:gap-y-[49px]"
                aria-label="Más artículos relacionados"
              >
                {rowPosts.map((p) => (
                  <li key={p.slug} className="flex h-full min-h-0 min-w-0">
                    <ConsejosArticleCard post={p} titleHeading="h3" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </SectionReveal>
      </div>
    </>
  );
}
