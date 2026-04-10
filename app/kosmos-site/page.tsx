"use client";

import KosmosSiteHero from "./components/KosmosSiteHero";
import KosmosSiteAbout from "./components/KosmosSiteAbout";
import KosmosSiteGallery from "./components/KosmosSiteGallery";
import KosmosSiteMenu from "./components/KosmosSiteMenu";
import KosmosSiteContact from "./components/KosmosSiteContact";

export default function KosmosSitePage() {
  return (
    <main>
      <KosmosSiteHero />
      <div className="relative z-10">
        <KosmosSiteAbout />
        <KosmosSiteGallery />
        <KosmosSiteMenu />
        <KosmosSiteContact />
      </div>
    </main>
  );
}
