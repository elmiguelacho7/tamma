import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx, publicUi } from "./public-tokens";

type Variant = "solid" | "ghost" | "onDark";

type LinkMode = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonMode = {
  href?: undefined;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type SecondaryButtonProps = LinkMode | ButtonMode;

export function SecondaryButton(props: SecondaryButtonProps) {
  const variant = props.variant ?? "solid";
  const base =
    variant === "ghost"
      ? publicUi.secondaryLink
      : variant === "onDark"
        ? publicUi.secondaryButtonOnDark
        : publicUi.secondaryButton;
  const cls = cx(base, props.className);

  if ("href" in props && props.href) {
    const { href, children, className: _c, variant: _v, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className: _c,
    variant: _v,
    type = "button",
    ...rest
  } = props as ButtonMode;

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
