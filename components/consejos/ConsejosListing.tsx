"use client";

/**
 * BLOG listing main — visual reference: `docs/design/blog-page.jpg`.
 * Centered split-color title, centered lead, single row: wide search + topic chips, 4-col card grid.
 * (Figma MCP unavailable; reconciled against exported frame capture in-repo.)
 */

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { publicLayout, cx } from "@/components/ui/public-tokens";
import { ConsejosArticleCard } from "@/components/consejos/ConsejosArticleCard";
import {
  consejosListingTopicsForPost,
  type ConsejoPost,
  type ConsejosListingTopicId,
} from "@/lib/consejos-data";

const TOPIC_CHIPS: { id: ConsejosListingTopicId; label: string }[] = [
  { id: "telemedicina", label: "Telemedicina" },
  { id: "farmacia", label: "Farmacia" },
  { id: "bienestar", label: "Bienestar" },
  { id: "salud", label: "Salud" },
];

function postMatchesSearch(post: ConsejoPost, q: string) {
  if (!q.trim()) return true;
  const n = q.trim().toLowerCase();
  const hay = [post.title, post.excerpt, post.listingTitle, post.listingExcerpt, post.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(n);
}

function postMatchesTopic(post: ConsejoPost, topic: ConsejosListingTopicId | null) {
  if (!topic) return true;
  return consejosListingTopicsForPost(post).includes(topic);
}

export function ConsejosListing({ posts }: { posts: readonly ConsejoPost[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<ConsejosListingTopicId | null>(null);

  const filtered = useMemo(
    () => posts.filter((p) => postMatchesTopic(p, topic) && postMatchesSearch(p, query)),
    [posts, topic, query],
  );

  return (
    <section className="w-full min-w-0 overflow-x-clip bg-white" aria-labelledby="consejos-blog-intro-heading">
      <div className={cx(publicLayout.marketingFigmaBody, publicLayout.segurosShowcaseIntroBand)}>
        <header
          className={cx(publicLayout.figmaHeadingStack, "mx-auto max-w-[56rem] items-center text-center")}
        >
          <h2
            id="consejos-blog-intro-heading"
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px] lg:leading-[normal]"
          >
            <span className="text-[#1e3a5f]">Todo sobre tu salud </span>
            <span className="text-[#84CC16]">en un solo lugar</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base font-medium leading-normal text-slate-600 sm:text-lg lg:text-[18px]">
            Explora artículos prácticos sobre prevención, asistencia y bienestar. Contenido claro para decidir con
            tranquilidad.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-center lg:gap-4">
          <label className="sr-only" htmlFor="consejos-search">
            Buscar artículo
          </label>
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              id="consejos-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca un artículo..."
              className={cx(
                "w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors",
                "placeholder:text-slate-400 focus:border-[#4B7C38]/40 focus:ring-2 focus:ring-[#4B7C38]/20",
              )}
            />
          </div>

          <div
            className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3 lg:justify-end"
            role="group"
            aria-label="Filtrar por tema"
          >
            {TOPIC_CHIPS.map((chip) => {
              const active = topic === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setTopic((t) => (t === chip.id ? null : chip.id))}
                  className={cx(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "border-[#4B7C38] bg-[#4B7C38]/10 text-[#1e3a5f]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={cx(publicLayout.marketingFigmaBody, "pb-16 pt-2 sm:pb-20 lg:pb-[60px]")} id="articulos">
        {filtered.length === 0 ? (
          <p className="text-base text-slate-600">No hay artículos que coincidan con tu búsqueda.</p>
        ) : (
          <ul className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-x-[49px] lg:gap-y-[49px]">
            {filtered.map((p) => (
              <li key={p.slug} className="flex h-full min-h-0 min-w-0">
                <ConsejosArticleCard post={p} titleHeading="h3" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
