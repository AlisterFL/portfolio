// app/jacquemarsimmobilier/components/JacquemarsFooter.tsx
import Link from "next/link";

export default function JacquemarsFooter() {
  return (
    <footer className="bg-[var(--jqm-noir)] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & address */}
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-white tracking-[0.3em] text-lg mb-3">
              JACQUEMARS
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              61 rue Jacquemars Gielee<br />
              3e etage — 59000 Lille<br />
              Sur rendez-vous
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/60 text-sm font-semibold mb-3 tracking-wide uppercase">Navigation</p>
            <div className="space-y-2">
              <Link href="/jacquemarsimmobilier" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Accueil</Link>
              <Link href="/jacquemarsimmobilier/biens" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Nos Biens</Link>
              <Link href="/jacquemarsimmobilier/estimation" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Estimation</Link>
              <Link href="/jacquemarsimmobilier/avis" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Avis</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-white/60 text-sm font-semibold mb-3 tracking-wide uppercase">Suivez-nous</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/jacquemarsimmobilier/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--jqm-gold)] transition-colors text-sm">Facebook</a>
              <a href="https://www.instagram.com/jacquemars_immobilier/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--jqm-gold)] transition-colors text-sm">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">&copy; 2025 JACQUEMARS Immobilier — Tous droits reserves</p>
          <p className="text-white/30 text-xs">SARL au capital de 1 000 EUR — RCS 839 430 493</p>
        </div>
      </div>
    </footer>
  );
}
