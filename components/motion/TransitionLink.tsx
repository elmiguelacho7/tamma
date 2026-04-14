"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Adds subtle pressed feedback during navigation. */
  pressedClassName?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

function shouldHandleClick(e: MouseEvent) {
  if (e.defaultPrevented) return false;
  if (e.button !== 0) return false;
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return false;
  return true;
}

/**
 * App Router-friendly link with:
 * - native View Transitions (when supported) for premium route changes
 * - instant pressed feedback (no spinner, no delay)
 * - preserves normal Link behavior for modified clicks / new tabs
 */
export function TransitionLink({
  href,
  children,
  className,
  pressedClassName = "opacity-80",
  onClick,
  ...rest
}: Props) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (!shouldHandleClick(e)) return;

        // Immediate tactile feedback (no layout shift).
        const el = e.currentTarget as HTMLElement;
        el.classList.add(...pressedClassName.split(" ").filter(Boolean));
        window.setTimeout(() => {
          el.classList.remove(...pressedClassName.split(" ").filter(Boolean));
        }, 140);

        // Use View Transitions when available: prevents the "hard cut" feel.
        // IMPORTANT: call `document.startViewTransition` *directly* (bound to `document`)
        // to avoid "Illegal invocation" in some browsers.
        try {
          const anyDoc = document as any;
          if (typeof anyDoc.startViewTransition === "function") {
            e.preventDefault();
            anyDoc.startViewTransition(() => {
              // Ensure React applies the route update synchronously so the View Transition
              // can capture the "new" DOM in the same task. Without this, some mobile
              // browsers can get stuck in a pending transition and appear frozen.
              flushSync(() => {
                router.push(href);
              });
            });
            return;
          }
        } catch {
          // Fall through to non-transition navigation.
        }

        // Fallback: normal programmatic navigation (fast, no extra UI).
        e.preventDefault();
        router.push(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

