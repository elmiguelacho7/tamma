import { BlogPreviewCard } from "@/components/home/BlogPreviewCard";
import type { ConsejoPost } from "@/lib/consejos-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-VE", { year: "numeric", month: "short", day: "2-digit" });
}

/**
 * Consejos listing/detail — renders the same component as HOME blog tiles (`BlogPreviewCard`).
 * Only bindings differ (slug, cover, copy, dates).
 */
export function ConsejosArticleCard({
  post,
  titleHeading = "h3",
}: {
  post: ConsejoPost;
  titleHeading?: "h2" | "h3";
}) {
  return (
    <BlogPreviewCard
      href={`/consejos/${post.slug}`}
      imageSrc={post.coverSrc}
      title={post.listingTitle ?? post.title}
      excerpt={post.listingExcerpt ?? post.excerpt}
      dateIso={post.date}
      dateLabel={formatDate(post.date)}
      category={post.category}
      titleColor="text-[#191c1b]"
      excerptClassName="text-[#3c3d42]"
      titleHeading={titleHeading}
    />
  );
}
