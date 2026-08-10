import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import type { ReactNode } from "react";

/**
 * Full-width, alternating image/content composition — the core editorial
 * building block used to break up the site's rhythm instead of repeating
 * the same boxed-card grid on every section.
 *
 * `reverse` swaps which side the image sits on using grid `order`
 * utilities (not CSS `direction`), so it stays correct regardless of the
 * document's actual LTR/RTL mode — Arabic paragraph text is never forced
 * into the wrong reading direction by this prop.
 */
export function SplitSection({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
  tone = "light"
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  tone?: "light" | "navy";
}) {
  const bg = tone === "navy" ? "bg-navy-900" : "bg-white";
  const titleColor = tone === "navy" ? "text-white" : "text-navy";
  const bodyColor = tone === "navy" ? "text-navy-200" : "text-navy-500";

  return (
    <section className={`${bg} py-20 sm:py-28`}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={reverse ? "lg:order-2" : "lg:order-1"}>
            {eyebrow && (
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
                {eyebrow}
              </span>
            )}
            <h2 className={`font-serif text-3xl font-bold leading-[1.15] sm:text-4xl ${titleColor}`}>
              {title}
            </h2>
            <Divider align="start" tone={tone === "navy" ? "light" : "gold"} className="mt-5" />
            <div className={`mt-6 flex flex-col gap-4 text-base leading-relaxed ${bodyColor}`}>
              {children}
            </div>
          </div>
          <div className={reverse ? "lg:order-1" : "lg:order-2"}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
