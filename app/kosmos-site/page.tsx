"use client";

import KosmosSiteHero from "./components/KosmosSiteHero";

export default function KosmosSitePage() {
  return (
    <main>
      <KosmosSiteHero />
      {/* Content that scrolls over the hero */}
      <div className="relative z-10">
        <div className="min-h-screen bg-[#faf9f6] px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a]">
              Placeholder content
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
