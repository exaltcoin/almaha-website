import { whatsappLink } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  return (
    <a
      href={whatsappLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "en" ? "Chat with us on WhatsApp" : "تواصل معنا عبر واتساب"}
      className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-105"
      style={{
        insetInlineEnd: "max(1.5rem, env(safe-area-inset-right, 1.5rem))",
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))"
      }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.35.66 4.55 1.8 6.43L4 29l7.77-1.75A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3Zm0 21.8c-1.98 0-3.83-.55-5.42-1.5l-.39-.23-4.6 1.04 1.07-4.48-.25-.4a9.63 9.63 0 0 1-1.5-5.23c0-5.36 4.37-9.72 9.73-9.72 5.36 0 9.72 4.36 9.72 9.72 0 5.36-4.36 9.8-9.72 9.8Zm5.36-7.3c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.19-.56-.34Z" />
      </svg>
    </a>
  );
}
