/**
 * Testimonials architecture — ready to receive real client testimonials.
 * Intentionally renders nothing meaningful without real content so the
 * site never displays invented client quotes. Populate the `items` array
 * with genuine testimonials to activate this section.
 */
export function Testimonials({
  items,
  title
}: {
  items: { quote: string; author: string; role?: string }[];
  title: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-navy">{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <blockquote key={i} className="rounded-sm border border-navy-50 bg-navy-50/30 p-6">
              <p className="text-sm leading-relaxed text-navy-600">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-navy">
                {item.author}
                {item.role && <span className="font-normal text-navy-400"> — {item.role}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
