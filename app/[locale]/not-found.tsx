import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function LocaleNotFound() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="font-serif text-6xl font-bold text-gold/40">404</p>
          <h1 className="mt-4 font-serif text-2xl font-bold text-navy">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-navy-500">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/en"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-600"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

