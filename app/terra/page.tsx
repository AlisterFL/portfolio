"use client";

import TerraHero from "./components/TerraHero";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      {/* Spacer to test scroll */}
      <div className="h-screen bg-[#1a472a]" />
    </main>
  );
}
