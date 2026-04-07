"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";
import TerraProducts from "./components/TerraProducts";
import TerraStats from "./components/TerraStats";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      <TerraProducts />
      <TerraStats />
      {/* Spacer */}
      <div className="h-screen bg-[#1a472a]" />
    </main>
  );
}
