import { Divider } from "@/components/ui/Divider";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-bold leading-[1.15] text-navy sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <Divider align={centered ? "center" : "start"} className="mt-5 mb-0" />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-navy-500">{description}</p>
      )}
    </div>
  );
}
