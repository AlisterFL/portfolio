"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { WordRotate } from "@/components/ui/word-rotate";
import { ThreeDMarquee, type MarqueeImage } from "@/components/ui/3d-marquee";
import { useLanguage } from "@/context/LanguageContext";

type Site = { label: string; href?: string };

const sites = {
  g3j: { label: "G3J Immobilier", href: "#projet-g3j" },
  plant: { label: "Plant Protect", href: "#projet-plant" },
  noe: { label: "Noé Immobilier", href: "#projet-noe" },
  kosmos: { label: "Kosmos", href: "/kosmos" },
  // No public link yet — the tile stays a plain, non-clickable preview
  chantier: { label: "ChantierClair" },
} satisfies Record<string, Site>;

const shot = (site: Site, src: string, page: string): MarqueeImage => ({
  src,
  alt: `${site.label} — ${page}`,
  ...site,
});

const g3j = {
  home: shot(sites.g3j, "/images/portfolio/G3JImmo/HomePage.png", "accueil"),
  ads: shot(sites.g3j, "/images/portfolio/G3JImmo/AdsPage.png", "annonces"),
  ad: shot(sites.g3j, "/images/portfolio/G3JImmo/AdPage.png", "annonce"),
};
const plant = {
  home: shot(sites.plant, "/images/portfolio/PlantProtect/HomePage.png", "accueil"),
  projects: shot(sites.plant, "/images/portfolio/PlantProtect/ProjectPage.png", "projets"),
  members: shot(sites.plant, "/images/portfolio/PlantProtect/MembersPage.png", "membres"),
};
const noe = {
  home: shot(sites.noe, "/images/portfolio/NoeImmo/HomePage.png", "accueil"),
  sell: shot(sites.noe, "/images/portfolio/NoeImmo/ToSellPage.png", "vendre"),
  propose: shot(sites.noe, "/images/portfolio/NoeImmo/ToProposePage.png", "proposer un bien"),
};
const kosmos = {
  home: shot(sites.kosmos, "/images/portfolio/Kosmos/HomePage.jpg", "accueil"),
  photos: shot(sites.kosmos, "/images/portfolio/Kosmos/PhotosPage.jpg", "galerie"),
  booking: shot(sites.kosmos, "/images/portfolio/Kosmos/ReservationPage.jpg", "réservation"),
  gift: shot(sites.kosmos, "/images/portfolio/Kosmos/GiftCardPage.jpg", "carte cadeau"),
};
const chantier = {
  home: shot(sites.chantier, "/images/portfolio/ChantierClair/HomePage.webp", "accueil"),
  demo: shot(sites.chantier, "/images/portfolio/ChantierClair/DemoPage.webp", "démo"),
  pricing: shot(sites.chantier, "/images/portfolio/ChantierClair/PricingPage.webp", "tarifs"),
};

// 4 columns × 5 tiles, top to bottom. Each column shows every project once, and no two columns repeat
// (16 unique screenshots for 20 slots — the 4 repeats sit in the farthest column)
const marqueeImages: MarqueeImage[] = [
  [g3j.home, chantier.home, noe.home, kosmos.home, plant.home],
  [kosmos.photos, plant.projects, g3j.ads, chantier.demo, noe.sell],
  [noe.propose, kosmos.booking, chantier.pricing, plant.members, g3j.ad],
  [kosmos.gift, noe.home, plant.home, g3j.home, chantier.home],
].flat();

const HeroSection = () => {
  const { translations: t } = useLanguage();

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-white flex items-center">
      {/* ─── 3D wall of real projects ─── */}
      <div className="hero-wall absolute inset-0 lg:left-[30%]">
        <ThreeDMarquee
          images={marqueeImages}
          className="h-full w-full"
          gridClassName="top-[760px] right-[35%]"
        />
      </div>

      {/* Readability fades */}
      <div className="absolute inset-0 pointer-events-none bg-white/80 lg:bg-transparent" />
      <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none hidden lg:block bg-gradient-to-r from-white from-45% via-white/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-white to-transparent" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#533AFC]/[0.10] blur-[120px] pointer-events-none hero-blob" />

      {/* ─── Headline ─── */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-32 pb-24 lg:py-0 pointer-events-none">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left pointer-events-auto">
          <p className="hero-reveal inline-flex items-center gap-2 rounded-full border border-[#0A0A0A]/[0.08] bg-white/80 backdrop-blur px-4 py-1.5 text-[12px] md:text-[13px] font-medium text-[#0A0A0A]/70 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#533AFC]" />
            {t.hero.eyebrow}
          </p>

          <h1
            className="hero-reveal font-display font-semibold text-[2.75rem] leading-[1] sm:text-6xl md:text-7xl xl:text-[5.5rem] tracking-[-0.045em] text-[#0A0A0A] mb-7"
            style={{ animationDelay: "50ms" }}
          >
            {t.hero.title1}
            <br />
            {t.hero.title2}
            <br />
            <WordRotate
              words={t.hero.titleHighlights}
              className="font-serif italic font-normal text-[1.12em] leading-[1] tracking-[-0.01em] px-[0.08em] bg-gradient-to-r from-[#533AFC] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent"
            />
          </h1>

          <p
            className="hero-reveal text-[#0A0A0A]/65 text-[17px] md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10"
            style={{ animationDelay: "100ms" }}
          >
            {t.hero.description}
          </p>

          <div
            className="hero-reveal flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            style={{ animationDelay: "150ms" }}
          >
            <a
              href="#contact"
              className="group bg-[#0A0A0A] text-white px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 hover:bg-[#533AFC] transition-colors text-[15px] font-medium shadow-[0_8px_30px_-8px_rgba(10,10,10,0.45)]"
            >
              {t.hero.cta}
              <ArrowUpRight size={18} strokeWidth={2} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="#projets"
              className="px-7 py-3.5 rounded-full flex items-center justify-center gap-2 text-[15px] font-medium text-[#0A0A0A]/70 border border-[#0A0A0A]/[0.1] hover:border-[#0A0A0A]/25 hover:text-[#0A0A0A] bg-white/80 backdrop-blur transition-all"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
