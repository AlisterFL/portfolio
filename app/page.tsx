"use client";

import React from "react";
import Navigation from "@/components/pro/Navigation";
import HeroSection from "@/components/pro/HeroSection";
import Projects from "@/components/pro/Projects";
import BentoServices from "@/components/pro/BentoServices";
import Testimonials from "@/components/pro/Testimonials";
import FAQ from "@/components/pro/FAQ";
import Contact from "@/components/pro/Contact";
import Footer from "@/components/pro/Footer";

export default function Page() {
  return (
    <main className="portfolio font-sans relative bg-white min-h-screen">
      <Navigation />
      <HeroSection />
      <BentoServices />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer className="bg-[#F6F3FF]" />
    </main>
  );
}
