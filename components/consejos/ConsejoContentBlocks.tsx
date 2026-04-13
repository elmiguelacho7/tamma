import Image from "next/image";
import { publicSurfaces, cx } from "@/components/ui/public-tokens";
import type { ConsejoContentBlock } from "@/lib/consejos-data";

function Block({ block, isFirst }: { block: ConsejoContentBlock; isFirst?: boolean }) {
  if (block.type === "h2") {
    return (
      <h2
        className={cx(
          "scroll-mt-28 text-balance text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-[1.75rem]",
          isFirst ? "mt-0" : "mt-12 sm:mt-14",
        )}
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3
        className={cx(
          "scroll-mt-28 text-balance text-xl font-bold tracking-tight text-[#1e3a5f] sm:text-[1.375rem]",
          isFirst ? "mt-0" : "mt-9 sm:mt-10",
        )}
      >
        {block.text}
      </h3>
    );
  }
  if (block.type === "p") {
    return (
      <p
        className={cx(
          "text-pretty break-words text-[1.0625rem] leading-[1.8] text-slate-700",
          isFirst ? "mt-0" : "mt-5",
        )}
      >
        {block.text}
      </p>
    );
  }
  if (block.type === "ul") {
    return (
      <ul
        className={cx(
          "space-y-3 pl-5 text-[1.0625rem] leading-[1.8] text-slate-700",
          isFirst ? "mt-0" : "mt-6",
        )}
      >
        {block.items.map((it) => (
          <li key={it} className="list-disc marker:text-[#4B7C38]/70">
            {it}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <figure
        className={cx(
          "relative overflow-hidden rounded-2xl bg-white p-6 sm:p-7",
          publicSurfaces.cardGrid,
          isFirst ? "mt-0" : "mt-10",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#4B7C38] to-[#84CC16] opacity-70"
          aria-hidden
        />
        <blockquote className="text-pretty text-[1.125rem] font-semibold leading-relaxed text-slate-800">
          “{block.text}”
        </blockquote>
        {block.byline ? (
          <figcaption className="mt-3 text-sm font-medium text-slate-500">{block.byline}</figcaption>
        ) : null}
      </figure>
    );
  }
  if (block.type === "callout") {
    const tone = block.tone ?? "info";
    const chip =
      tone === "tip"
        ? "border-[#84CC16]/35 bg-[#84CC16]/10 text-[#3d6630]"
        : "border-[#4B7C38]/25 bg-[#4B7C38]/10 text-[#4B7C38]";

    return (
      <aside
        className={cx(
          "relative overflow-hidden rounded-2xl border bg-white p-6 sm:p-7",
          publicSurfaces.cardGrid,
          isFirst ? "mt-0" : "mt-10",
        )}
        aria-label={tone === "tip" ? "Consejo" : "Nota"}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#4B7C38] to-[#84CC16] opacity-55"
          aria-hidden
        />
        <div
          className={cx(
            "inline-flex rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em]",
            chip,
          )}
        >
          {tone === "tip" ? "Tip" : "Nota"}
        </div>
        <h3 className="mt-3 text-balance text-lg font-bold tracking-tight text-[#1e3a5f]">{block.title}</h3>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-slate-700">{block.text}</p>
      </aside>
    );
  }
  if (block.type === "image") {
    return (
      <figure className={cx("min-w-0 max-w-full", isFirst ? "mt-0" : "mt-10")}>
        <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/70">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-3 text-center text-sm font-medium text-slate-500">{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  }
  return null;
}

export function ConsejoContentBlocks({ blocks }: { blocks: readonly ConsejoContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, idx) => (
        <Block key={idx} block={block} isFirst={idx === 0} />
      ))}
    </div>
  );
}
