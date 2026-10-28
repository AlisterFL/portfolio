"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const Footer = ({ className = "" }: { className?: string }) => {
  const { translations: t } = useLanguage();

  return (
    <footer className={className}>
      <div className="container mx-auto px-6 md:px-12 py-6 border-t border-[#0A0A0A]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#0A0A0A]/50">
        <p>© {new Date().getFullYear()} Alister Flandrinck</p>
        <nav className="flex items-center gap-5">
          <Link href="/mentions-legales" className="hover:text-[#533AFC] transition-colors">
            {t.footer.legal}
          </Link>
          <Link href="/confidentialite" className="hover:text-[#533AFC] transition-colors">
            {t.footer.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
