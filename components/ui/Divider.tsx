/**
 * Signature Al Maha divider — a thin gold rule with a rotated diamond at
 * center, echoing the diamond mark between "AL MAHA" and "NATIONAL
 * COMPANY" in the approved logo. Used throughout the site in place of
 * generic borders/hr elements as a recurring, brand-authentic motif.
 */
export function Divider({
  align = "center",
  tone = "gold",
  className = ""
}: {
  align?: "center" | "start";
  tone?: "gold" | "light";
  className?: string;
}) {
  const lineColor = tone === "gold" ? "bg-gold/40" : "bg-white/25";
  const diamondColor = tone === "gold" ? "bg-gold" : "bg-white";

  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
      aria-hidden="true"
    >
      <span className={`h-px w-10 sm:w-14 ${lineColor}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${diamondColor}`} />
      <span className={`h-px w-10 sm:w-14 ${lineColor}`} />
    </div>
  );
}
