import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { ConsejoArticle } from "@/components/consejos/ConsejoArticle";
import { consejosPosts, type ConsejoPost } from "@/lib/consejos-data";

function getPost(slug: string): ConsejoPost | undefined {
  return consejosPosts.find((p) => p.slug === slug);
}

function getRelated(post: ConsejoPost): readonly ConsejoPost[] {
  const fromExplicit = (post.relatedSlugs ?? [])
    .map((s) => consejosPosts.find((p) => p.slug === s))
    .filter(Boolean) as ConsejoPost[];

  const dedup = new Map<string, ConsejoPost>();
  for (const p of fromExplicit) dedup.set(p.slug, p);

  if (dedup.size < 3) {
    for (const p of consejosPosts) {
      if (p.slug === post.slug) continue;
      if (p.category !== post.category) continue;
      if (!dedup.has(p.slug)) dedup.set(p.slug, p);
      if (dedup.size >= 3) break;
    }
  }

  if (dedup.size < 2) {
    for (const p of consejosPosts) {
      if (p.slug === post.slug) continue;
      if (!dedup.has(p.slug)) dedup.set(p.slug, p);
      if (dedup.size >= 3) break;
    }
  }

  return Array.from(dedup.values()).slice(0, 3);
}

export function generateStaticParams() {
  return consejosPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = `${post.title} | Consejos`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

/**
 * Figma **BLOG-INTERNA** `68:2110`: article stack is fully composed in `ConsejoArticle` (hero embeds header).
 * `ContactBlock` matches other inner routes’ footer-adjacent support band.
 */
export default async function ConsejoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(post);

  return (
    <div className="flex flex-col">
      <ConsejoArticle post={post} related={related} />
      <SectionReveal>
        <ContactBlock variant="homeFigma" flushStackTop />
      </SectionReveal>
    </div>
  );
}
