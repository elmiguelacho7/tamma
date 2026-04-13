import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx, publicUi } from "./public-tokens";

type LinkMode = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonMode = {
  href?: undefined;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type PrimaryButtonProps = LinkMode | ButtonMode;

export function PrimaryButton(props: PrimaryButtonProps) {
  const cls = cx(publicUi.primaryButton, props.className);

  if ("href" in props && props.href) {
    const { href, children, className: _c, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className: _c,
    type = "button",
    ...rest
  } = props as ButtonMode;

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
