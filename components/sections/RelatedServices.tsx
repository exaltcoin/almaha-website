import { ServiceGrid } from "@/components/sections/ServiceGrid";
import type { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function RelatedServices({
  services,
  locale,
  title
}: {
  services: Service[];
  locale: Locale;
  title: string;
}) {
  if (services.length === 0) return null;
  return (
    <section className="bg-navy-50/40 py-16">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-navy">{title}</h2>
        <ServiceGrid services={services} locale={locale} />
      </div>
    </section>
  );
}
