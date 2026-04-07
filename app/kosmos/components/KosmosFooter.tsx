// app/kosmos/components/KosmosFooter.tsx
import { Language } from "../types";

const allergenNote: Record<Language, string> = {
  fr: "Allergènes ? Demandez à votre serveur",
  nl: "Allergenen? Vraag het aan uw ober",
  en: "Allergens? Ask your server",
  de: "Allergene? Fragen Sie Ihren Kellner",
};

interface KosmosFooterProps {
  language: Language;
}

export default function KosmosFooter({ language }: KosmosFooterProps) {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-4 text-center">
      <p className="text-[11px] text-white/30">
        Grote Markt 26, 8900 Ieper · Mar-Dim 11h-23h
      </p>
      <p className="mt-1 text-[11px] text-[#d4af37]/40">
        {allergenNote[language]}
      </p>
    </footer>
  );
}
