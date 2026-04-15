// app/jacquemarsimmobilier/page.tsx
"use client";

import JacquemarsNav from "./components/JacquemarsNav";
import JacquemarsHero from "./components/JacquemarsHero";
import JacquemarsBiensVedette from "./components/JacquemarsBiensVedette";
import JacquemarsApproche from "./components/JacquemarsApproche";
import JacquemarsQuartiers from "./components/JacquemarsQuartiers";
import JacquemarsAvisCarousel from "./components/JacquemarsAvisCarousel";
import JacquemarsContact from "./components/JacquemarsContact";
import JacquemarsFooter from "./components/JacquemarsFooter";

export default function JacquemarsPage() {
  return (
    <main>
      <JacquemarsNav />
      <JacquemarsHero />
      <JacquemarsBiensVedette />
      <JacquemarsApproche />
      <JacquemarsQuartiers />
      <JacquemarsAvisCarousel />
      <JacquemarsContact />
      <JacquemarsFooter />
    </main>
  );
}
