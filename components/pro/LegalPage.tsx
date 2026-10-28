import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/pro/Footer";
import { legal } from "@/lib/legal";

// Shared shell for /mentions-legales and /confidentialite (French only — the legally binding version)
export const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="portfolio font-sans min-h-screen bg-white text-[#0A0A0A]">
    <header className="border-b border-[#0A0A0A]/[0.05]">
      <div className="container mx-auto px-6 md:px-12 py-4 md:py-5 flex items-center justify-between">
        <Link href="/" className="select-none flex flex-col leading-[0.85]">
          <span className="text-[11px] md:text-[13px] font-[900] tracking-[0.15em] uppercase">Alister</span>
          <span className="text-[11px] md:text-[13px] font-[900] tracking-[0.15em] uppercase">Flandrinck</span>
        </Link>
        <Link
          href="/"
          className="group flex items-center gap-2 text-[13px] font-medium text-[#0A0A0A]/60 hover:text-[#533AFC] transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour au site
        </Link>
      </div>
    </header>

    <article className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-3">{title}</h1>
        <p className="text-[14px] text-[#0A0A0A]/50 mb-12 md:mb-16">Dernière mise à jour&nbsp;: {legal.updatedAt}</p>
        <div className="space-y-12 text-[15px] leading-relaxed text-[#0A0A0A]/70 [&_a]:text-[#533AFC] [&_a:hover]:underline [&_strong]:font-medium [&_strong]:text-[#0A0A0A]">
          {children}
        </div>
      </div>
    </article>

    <Footer />
  </div>
);

export const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#0A0A0A] mb-4">{title}</h2>
    {children}
  </section>
);

export const LegalList = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2 pl-5 list-disc marker:text-[#533AFC]/50">{children}</ul>
);

// Label / value rows for identity blocks (editor, host)
export const LegalInfo = ({ rows }: { rows: [string, string][] }) => (
  <dl className="rounded-2xl border border-[#0A0A0A]/[0.07] bg-[#FCFCFD] divide-y divide-[#0A0A0A]/[0.06]">
    {rows.map(([label, value]) => (
      <div key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3">
        <dt className="text-[13px] text-[#0A0A0A]/50">{label}</dt>
        <dd className="sm:col-span-2 text-[#0A0A0A]">
          <LegalValue value={value} />
        </dd>
      </div>
    ))}
  </dl>
);

// Values still in brackets are unfilled placeholders from lib/legal.ts — highlight them so they can't ship unnoticed
export const LegalValue = ({ value }: { value: string }) =>
  value.startsWith("[") ? (
    <mark className="rounded bg-amber-100 px-1 text-amber-900">{value}</mark>
  ) : (
    <>{value}</>
  );
