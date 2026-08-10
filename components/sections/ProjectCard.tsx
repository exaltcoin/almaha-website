import Image from "next/image";

export function ProjectCard({
  title,
  category,
  location,
  image
}: {
  title: string;
  category: string;
  location: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-sm border border-navy-50 bg-white shadow-card transition-shadow hover:shadow-elevated">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute start-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300 backdrop-blur-sm">
          {category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-base font-bold text-navy">{title}</h3>
        <p className="mt-1.5 text-sm text-navy-400">{location}</p>
      </div>
    </div>
  );
}
