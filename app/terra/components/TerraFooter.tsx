export default function TerraFooter() {
  return (
    <footer className="border-t border-[#f5f0e8]/10 bg-[#1a472a] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-[#f5f0e8]/60">
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Nos solutions
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            À propos
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Actualités
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Contact
          </span>
        </nav>
        <p className="text-xs text-[#f5f0e8]/40">
          12 Route des Moissons, 28000 Chartres
        </p>
        <p className="text-xs text-[#f5f0e8]/30">
          © 2026 TERRA — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
