"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cx } from "@/components/ui/public-tokens";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cx("border-b border-slate-100 last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    chevronClassName?: string;
  }
>(({ className, children, chevronClassName, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(
        "flex flex-1 cursor-pointer list-none items-start justify-between gap-3 rounded-xl px-4 py-4 text-left text-base font-semibold leading-snug text-slate-900 transition-colors duration-200 hover:bg-slate-50/90 data-[state=open]:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B7C38]/45 focus-visible:ring-offset-2 sm:px-5 sm:py-[1.125rem] sm:text-[1.0625rem]",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 pr-2">{children}</span>
      <ChevronDown
        className={cx(
          "mt-0.5 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ease-out",
          chevronClassName,
        )}
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cx(
      "overflow-hidden data-[state=closed]:animate-none",
      className,
    )}
    {...props}
  >
    <div className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
