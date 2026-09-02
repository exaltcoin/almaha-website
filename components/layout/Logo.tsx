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
  // Intrinsic dimensions passed to next/image (for aspect ratio / srcset) —
  // the actual rendered size is controlled by the responsive height
  // classes below, not these numbers directly.
  const dims = {
    sm: 76,
    md: 92,
    lg: 140
  }[size];

  // "md" (the sticky header) renders slightly larger on small phones for
  // legibility, then steps down to its original fixed size from `sm:`
  // upward so the desktop header is pixel-identical to before.
  const heightClass = {
    sm: "h-[76px]",
    md: "h-24 sm:h-[92px]",
    lg: "h-[140px]"
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
        className={`w-auto object-contain ${heightClass}`}
      />
    </Link>
  );
}
