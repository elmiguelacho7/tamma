"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduce(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduce;
}

/**
 * Lightweight public-page transition: subtle fade-in on route changes.
 * No loaders, no delays, respects prefers-reduced-motion.
 */
export function PublicRouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  const routeKey = pathname ?? "route";

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [routeKey, reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <div
      key={routeKey}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,2px,0)",
        transition: "opacity 180ms ease-out, transform 180ms ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

