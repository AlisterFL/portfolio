"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";
import TerraProducts from "./components/TerraProducts";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      <TerraProducts />
      {/* Spacer */}
      <div className="h-screen bg-[#1a472a]" />
    </main>
  );
}
