"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduceMotion(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || revealed) return;
    const el = ref.current;
    if (!el) return;

    // Mirror the previous behavior:
    // - once: true
    // - amount: 0.1
    // - margin: "0px 0px -24px 0px"
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -24px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, revealed]);

  return (
    <div
      ref={ref}
      className={cx(className)}
      style={
        reduceMotion
          ? undefined
          : {
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translate3d(0,0,0)" : "translate3d(0,2px,0)",
              transition: "opacity 420ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 420ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              willChange: revealed ? undefined : ("opacity, transform" as const),
            }
      }
    >
      {children}
    </div>
  );
}
