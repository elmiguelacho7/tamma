"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cx } from "@/components/ui/public-tokens";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Subtle viewport fade-in for marketing sections. Respects reduced motion.
 * Wraps server-rendered section content when used as a direct child from RSC.
 */
export function SectionReveal({ children, className }: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cx(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -32px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
