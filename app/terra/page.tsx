"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      {/* Spacer to test scroll */}
      <div className="h-screen bg-[#f5f0e8]" />
    </main>
  );
}
