import { Language } from "../types";

const allergenNote: Record<Language, string> = {
  fr: "Allergenes ? Demandez a votre serveur",
  nl: "Allergenen? Vraag het aan uw ober",
  en: "Allergens? Ask your server",
  de: "Allergene? Fragen Sie Ihren Kellner",
};

interface KosmosFooterProps {
  language: Language;
}

export default function KosmosFooter({ language }: KosmosFooterProps) {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-4 text-center">
      <p className="text-[11px] text-[var(--text-tertiary)]">
        Grote Markt 26, 8900 Ieper &middot; Mar-Dim 11h-23h
      </p>
      <p className="mt-1 text-[11px] text-[var(--accent)] opacity-50">
        {allergenNote[language]}
      </p>
    </footer>
  );
}
