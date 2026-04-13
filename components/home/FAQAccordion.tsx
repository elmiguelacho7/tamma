"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cx } from "@/components/ui/public-tokens";

type Item = { q: string; a: string };

type FAQAccordionProps = {
  items: readonly Item[];
  /** HOME `67:133`: filas con borde #424242 y radius 32px, sin tarjeta contenedora. */
  variant?: "default" | "homeFigma";
};

export function FAQAccordion({ items, variant = "default" }: FAQAccordionProps) {
  const figma = variant === "homeFigma";

  return (
    <Accordion
      type="single"
      collapsible
      className={cx("w-full", figma && "space-y-4 lg:space-y-6")}
    >
      {items.map((item, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={item.q}
          className={cx(
            figma
              ? "overflow-hidden border-b-0 transition-all duration-200 ease-out last:border-b-0 rounded-[24px] border border-[#d9d9d9] bg-white hover:border-[#1b5e20]/30 hover:bg-[#f9fbf7] hover:shadow-[0_4px_16px_-6px_rgba(27,94,32,0.15)] data-[state=open]:border-[#1b5e20]/50 data-[state=open]:bg-[#f4f8f2]"
              : "border-b border-slate-100 last:border-b-0",
          )}
        >
          <AccordionTrigger
            className={cx(
              figma &&
                "group gap-3 rounded-none px-5 py-4 text-left text-[15px] font-medium leading-relaxed text-[#424242] hover:bg-transparent hover:no-underline data-[state=open]:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e20] focus-visible:ring-offset-2 lg:px-6 lg:py-5 lg:text-[16px]",
            )}
            chevronClassName={figma ? "opacity-70 transition-transform duration-200 group-hover:opacity-100" : undefined}
          >
            {item.q}
          </AccordionTrigger>
          <AccordionContent
            className={cx(
              figma &&
                "transition-all duration-300 ease-out [&>div]:px-5 [&>div]:pb-4 [&>div]:pt-0 [&>div]:lg:px-6 [&>div]:lg:pb-5",
            )}
          >
            <p
              className={cx(
                "max-w-none text-sm leading-relaxed sm:text-base",
                figma ? "mt-2 pl-1 text-[#424242]" : "text-slate-600",
              )}
            >
              {item.a}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
