"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";
import TerraProducts from "./components/TerraProducts";
import TerraStats from "./components/TerraStats";
import TerraTestimonials from "./components/TerraTestimonials";
import TerraContact from "./components/TerraContact";
import TerraFooter from "./components/TerraFooter";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      <TerraProducts />
      <TerraStats />
      <TerraTestimonials />
      <TerraContact />
      <TerraFooter />
    </main>
  );
}
