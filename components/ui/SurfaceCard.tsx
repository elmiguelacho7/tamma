import type { HTMLAttributes, ReactNode } from "react";
import { cx, publicUi } from "./public-tokens";

const paddingMap = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-6 sm:p-8",
} as const;

type SurfaceCardProps = {
  children: ReactNode;
  padding?: keyof typeof paddingMap;
  interactive?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function SurfaceCard({
  children,
  padding = "md",
  interactive = false,
  className,
  ...rest
}: SurfaceCardProps) {
  return (
    <div
      className={cx(
        interactive ? publicUi.surfaceCardInteractive : publicUi.surfaceCard,
        paddingMap[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
