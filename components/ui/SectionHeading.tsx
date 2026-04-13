import type { ReactNode } from "react";
import { publicBrand } from "./public-tokens";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-9 flex flex-col gap-4 sm:mb-10 ${isCenter ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"} ${className}`}
    >
      <div
        className={`max-w-3xl space-y-3 ${isCenter ? "mx-auto" : ""}`}
      >
        {eyebrow ? <p className={publicBrand.eyebrow}>{eyebrow}</p> : null}
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
