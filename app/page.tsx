"use client";

import React from "react";
import Navigation from "@/components/pro/Navigation";
import HeroSection from "@/components/pro/HeroSection";
import BentoServices from "@/components/pro/BentoServices";
import TrustedBy from "@/components/pro/TrustedBy";
import Testimonials from "@/components/pro/Testimonials";
import FAQ from "@/components/pro/FAQ";
import Contact from "@/components/pro/Contact";

export default function Page() {
  return (
    <main className="relative bg-white min-h-screen">
      <Navigation />
      <HeroSection />
      <BentoServices />
      <TrustedBy />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
