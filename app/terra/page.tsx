"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";
import TerraProducts from "./components/TerraProducts";
import TerraStats from "./components/TerraStats";
import TerraTestimonials from "./components/TerraTestimonials";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      <TerraProducts />
      <TerraStats />
      <TerraTestimonials />
      {/* Spacer */}
      <div className="h-[50vh] bg-[#1a472a]" />
    </main>
  );
}
