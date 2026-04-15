"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/jacquemarsimmobilier", label: "Accueil" },
  { href: "/jacquemarsimmobilier/biens", label: "Nos Biens" },
  { href: "/jacquemarsimmobilier/estimation", label: "Estimation" },
  { href: "/jacquemarsimmobilier/avis", label: "Avis" },
];

export default function JacquemarsNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/jacquemarsimmobilier") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/jacquemarsimmobilier#contact";
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--jqm-burgundy)]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/jacquemarsimmobilier"
            className="font-[var(--font-playfair)] text-white text-lg tracking-[0.3em] uppercase"
          >
            J A C Q U E M A R S
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-[var(--jqm-gold)]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleContactClick}
              className="px-5 py-2 text-sm tracking-wide border border-[var(--jqm-gold)] text-[var(--jqm-gold)] rounded-sm hover:bg-[var(--jqm-gold)] hover:text-[var(--jqm-noir)] transition-all duration-300"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
        onContactClick={handleContactClick}
      />
    </>
  );
}
