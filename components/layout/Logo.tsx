import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/**
 * Renders the official, approved Al Maha logo exactly as supplied.
 * Do not crop, recolor or redraw this asset — only its display size changes
 * across contexts (header, footer, mobile nav) via the `size` prop.
 */
export function Logo({
  locale,
  size = "md",
  className = ""
}: {
  locale: Locale;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = {
    sm: 76,
    md: 92,
    lg: 140
  }[size];

  return (
    <Link
      href={`/${locale}`}
      className={`flex shrink-0 items-center ${className}`}
      aria-label={
        locale === "en"
          ? "Al Maha National Company — Home"
          : "شركة المها الوطنية — الرئيسية"
      }
    >
      <Image
        src="/brand/logo-almaha-full.png"
        alt={
          locale === "en"
            ? "Al Maha National Company for General Trading & Contracting"
            : "شركة المها الوطنية للتجارة العامة والمقاولات"
        }
        width={dims}
        height={dims}
        priority
        className="h-auto w-auto object-contain"
        style={{ height: dims, width: "auto" }}
      />
    </Link>
  );
}
