import { ServiceCard } from "@/components/sections/ServiceCard";
import type { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function ServiceGrid({
  services,
  locale,
  showIndex = false
}: {
  services: Service[];
  locale: Locale;
  showIndex?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden bg-navy-50 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard
          key={s.slug}
          service={s}
          locale={locale}
          index={showIndex ? i : undefined}
        />
      ))}
    </div>
  );
}
