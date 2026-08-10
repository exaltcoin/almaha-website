import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-900 hover:bg-gold-600 shadow-sm hover:shadow-md",
  secondary:
    "bg-navy text-white hover:bg-navy-700",
  outline:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy/5",
  ghost: "text-navy hover:bg-navy/5"
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
