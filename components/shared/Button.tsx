import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ href, children, variant = "primary" }: Props) {
  const base =
    "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
  const styles =
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]"
      : "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
