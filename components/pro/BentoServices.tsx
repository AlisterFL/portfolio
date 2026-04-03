"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const GlobeCdn = dynamic(
  () => import("@/components/ui/cobe-globe-cdn").then((m) => m.GlobeCdn),
  { ssr: false }
);

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const BentoServices = () => {
  const { translations: t } = useLanguage();
  return (
    <section className="relative bg-[#FCFDFE] py-24 md:py-32" id="expertise">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] max-w-2xl">
            {t.services.title}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* ─── Card 1: Design — Large (2 cols) ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <GlowCard

              customSize
              className="!aspect-auto w-full h-full"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="max-w-sm">
                  <h3 className="text-xl md:text-2xl font-medium text-[#0A0A0A] mb-3">
                    {t.services.design.title}
                  </h3>
                  <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed">
                    Interfaces uniques pensées pour votre marque. Chaque pixel
                    est soigné pour créer une expérience mémorable qui vous
                    distingue de la concurrence.
                  </p>
                </div>
                {/* Visual: mini UI mockup */}
                <div className="relative w-full md:w-[280px] shrink-0">
                  <div className="bg-[#FCFDFE] rounded-2xl shadow-sm border border-black/[0.04] p-4">
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                      <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                      <div className="ml-2 flex-1 h-3 bg-[#F0F0F2] rounded-full" />
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-20 bg-gradient-to-br from-[#533AFC]/10 to-[#533AFC]/5 rounded-xl" />
                      <div className="flex gap-2">
                        <div className="flex-1 h-12 bg-[#F5F5F7] rounded-lg" />
                        <div className="flex-1 h-12 bg-[#F5F5F7] rounded-lg" />
                      </div>
                      <div className="h-3 w-3/4 bg-[#0A0A0A]/5 rounded-full" />
                      <div className="h-3 w-1/2 bg-[#0A0A0A]/5 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-xl shadow-md border border-black/[0.04] px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#533AFC]/10 flex items-center justify-center">
                        <Palette size={12} className="text-[#533AFC]" />
                      </div>
                      <div>
                        <div className="text-[9px] font-normal text-[#0A0A0A]">
                          Design validé
                        </div>
                        <div className="text-[8px] text-[#0A0A0A]/40">
                          Figma → Code
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 2: SEO ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard
              customSize
              className="!aspect-auto w-full h-full !overflow-hidden"
            >
              <div className="relative z-10 group/seo">
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">
                  {t.services.seo.title}
                </h3>
                <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed mb-8">
                  Apparaissez en tête de Google.
                </p>

                {/* Animated rising graph */}
                <div className="relative h-[140px] flex items-end gap-[6px]">
                  {[28, 35, 25, 42, 38, 55, 50, 68, 72, 85, 80, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex-1 rounded-t-md transition-all duration-300 group-hover/seo:scale-y-110 origin-bottom"
                      style={{
                        background:
                          i >= 9
                            ? "linear-gradient(to top, #533AFC, #7C5CFC)"
                            : `rgba(83, 58, 252, ${0.06 + i * 0.02})`,
                        transitionDelay: `${i * 20}ms`,
                      }}
                    />
                  ))}
                  {/* Animated trend line */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute top-2 right-0 flex items-center gap-1"
                  >
                    <Search size={10} className="text-[#533AFC]" />
                    <span className="text-[10px] font-medium text-[#533AFC]">
                      +340%
                    </span>
                  </motion.div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 3: Sécurité ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlowCard

              customSize
              className="!aspect-auto w-full h-full"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">
                  {t.services.security.title}
                </h3>
                <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed mb-8">
                  Votre site et les données de vos utilisateurs sont protégés.
                </p>
                <div className="space-y-3">
                  {[
                    "Certificat SSL",
                    "Hébergement sécurisé",
                    "Conformité RGPD",
                    "Protection des données",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="flex items-center gap-2.5 bg-[#FCFDFE] rounded-lg px-3 py-2 border border-black/[0.04]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#533AFC]/10 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#533AFC]" />
                      </div>
                      <span className="text-[12px] font-normal text-[#0A0A0A]/70">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 4: Performance ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlowCard
              customSize
              className="!aspect-auto w-full h-full"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">
                  {t.services.performance.title}
                </h3>
                <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed mb-6">
                  Un site rapide convertit plus. Le vôtre sera optimisé.
                </p>

                {/* Score + label row */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(83,58,252,0.08)" strokeWidth="5" />
                      <motion.circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke="#533AFC"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 34}
                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                        whileInView={{ strokeDashoffset: 2 * Math.PI * 34 * 0.02 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-medium text-[#533AFC]">
                      98
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#0A0A0A]">Score Google</div>
                    <div className="text-[11px] text-[#0A0A0A]/40">Performance, SEO, accessibilité</div>
                  </div>
                </div>

                {/* Metrics list */}
                <div className="space-y-2.5">
                  {[
                    { label: "Temps de chargement", value: "< 1s" },
                    { label: "Optimisation mobile", value: "100%" },
                    { label: "Score SEO technique", value: "98/100" },
                  ].map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[12px] text-[#0A0A0A]/40">{m.label}</span>
                      <span className="text-[12px] font-medium text-[#533AFC]">{m.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 5: Responsive & Mobile ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <GlowCard
              customSize
              className="!aspect-auto w-full h-full"
            >
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">
                  {t.services.responsive.title}
                </h3>
                <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed">
                  Votre site s&apos;adapte automatiquement à chaque appareil — desktop, tablette, mobile — pour une expérience fluide partout.
                </p>

                {/* Safari + iPhone superposés */}
                <div className="relative h-[140px] sm:h-[170px] md:h-[195px] xl:h-[220px] 2xl:h-[250px] mt-4 -mx-2 -mb-4 md:-mx-4 md:-mb-6">
                  {/* Safari (desktop) */}
                  <div className="absolute top-0 left-0 w-[90%] drop-shadow-md">
                    <Safari url="votresite.com" mode="simple">
                      <div className="w-full h-full bg-white p-[6%]">
                        {/* Nav */}
                        <div className="flex items-center justify-between mb-[8%]">
                          <div className="w-[15%] h-[6px] rounded-full bg-[#533AFC]/15" />
                          <div className="flex gap-[4%]">
                            <div className="w-[10%] h-[4px] rounded-full bg-[#0A0A0A]/6" />
                            <div className="w-[10%] h-[4px] rounded-full bg-[#0A0A0A]/6" />
                            <div className="w-[10%] h-[4px] rounded-full bg-[#0A0A0A]/6" />
                          </div>
                          <div className="w-[12%] h-[8px] rounded-full bg-[#533AFC]" />
                        </div>
                        {/* Hero */}
                        <div className="flex gap-[4%] mb-[6%]">
                          <div className="w-[45%]">
                            <div className="w-[80%] h-[5px] rounded-full bg-[#0A0A0A]/10 mb-[6%]" />
                            <div className="w-[60%] h-[4px] rounded-full bg-[#0A0A0A]/5 mb-[4%]" />
                            <div className="w-[50%] h-[4px] rounded-full bg-[#0A0A0A]/5 mb-[8%]" />
                            <div className="w-[30%] h-[8px] rounded-full bg-[#533AFC]" />
                          </div>
                          <div className="w-[50%] h-0 pb-[28%] rounded-lg bg-[#533AFC]/[0.04]" />
                        </div>
                        {/* Cards row */}
                        <div className="flex gap-[3%]">
                          <div className="flex-1 h-0 pb-[22%] rounded-md bg-[#F5F5F7]" />
                          <div className="flex-1 h-0 pb-[22%] rounded-md bg-[#533AFC]/[0.03]" />
                          <div className="flex-1 h-0 pb-[22%] rounded-md bg-[#F5F5F7]" />
                        </div>
                      </div>
                    </Safari>
                  </div>

                  {/* iPhone — par-dessus Safari */}
                  <div className="absolute top-[calc(4%+10px)] right-[2%] w-[25%] sm:w-[27%] z-10 drop-shadow-xl">
                    <Iphone>
                      <div className="w-full h-full bg-white flex flex-col">
                        {/* iOS Status Bar */}
                        <div className="flex items-center justify-between px-[7%] pt-[4%] pb-[2%]">
                          <span className="text-[5px] font-semibold text-[#0A0A0A]">9:41</span>
                          <div className="flex items-center gap-[3px]">
                            {/* Signal bars */}
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <rect x="0" y="4" width="1.5" height="2" rx="0.3" fill="#0A0A0A"/>
                              <rect x="2.5" y="3" width="1.5" height="3" rx="0.3" fill="#0A0A0A"/>
                              <rect x="5" y="1.5" width="1.5" height="4.5" rx="0.3" fill="#0A0A0A"/>
                              <rect x="7.5" y="0" width="1.5" height="6" rx="0.3" fill="#0A0A0A"/>
                            </svg>
                            {/* WiFi */}
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M4 5.5a0.5 0.5 0 1 0 0-1 0.5 0.5 0 0 0 0 1z" fill="#0A0A0A"/>
                              <path d="M2.3 3.8a2.4 2.4 0 0 1 3.4 0" stroke="#0A0A0A" strokeWidth="0.6" strokeLinecap="round"/>
                              <path d="M0.8 2.2a4.5 4.5 0 0 1 6.4 0" stroke="#0A0A0A" strokeWidth="0.6" strokeLinecap="round"/>
                            </svg>
                            {/* Battery */}
                            <div className="flex items-center">
                              <div className="w-[10px] h-[5px] rounded-[1px] border border-[#0A0A0A]/40 flex items-center p-[0.5px]">
                                <div className="w-[70%] h-full rounded-[0.5px] bg-[#0A0A0A]" />
                              </div>
                              <div className="w-[1px] h-[2px] bg-[#0A0A0A]/40 rounded-r-full" />
                            </div>
                          </div>
                        </div>

                        {/* Site content */}
                        <div className="flex-1 px-[8%] pt-[4%]">
                          {/* Mobile nav */}
                          <div className="flex items-center justify-between mb-[8%]">
                            <div className="w-[25%] h-[4px] rounded-full bg-[#533AFC]/15" />
                            <div className="w-[6%] h-[6%] rounded bg-[#0A0A0A]/8" />
                          </div>
                          {/* Title */}
                          <div className="w-[70%] h-[5px] rounded-full bg-[#0A0A0A]/10 mb-[4%]" />
                          <div className="w-[90%] h-[3px] rounded-full bg-[#0A0A0A]/5 mb-[3%]" />
                          <div className="w-[60%] h-[3px] rounded-full bg-[#0A0A0A]/5 mb-[6%]" />
                          <div className="w-[35%] h-[7px] rounded-full bg-[#533AFC] mb-[8%]" />
                          {/* Image placeholder */}
                          <div className="w-full h-0 pb-[50%] rounded-lg bg-[#533AFC]/[0.04] mb-[6%]" />
                          {/* Cards stacked */}
                          <div className="space-y-[4%]">
                            <div className="w-full h-0 pb-[18%] rounded-md bg-[#F5F5F7]" />
                            <div className="w-full h-0 pb-[18%] rounded-md bg-[#533AFC]/[0.03]" />
                          </div>
                        </div>

                        {/* iOS Home indicator */}
                        <div className="flex justify-center pb-[3%] pt-[2%]">
                          <div className="w-[35%] h-[3px] rounded-full bg-[#0A0A0A]/20" />
                        </div>
                      </div>
                    </Iphone>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 6: Contenu dynamique — Large (2 cols) ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2"
          >
            <GlowCard
              customSize
              className="!aspect-auto w-full h-full !overflow-hidden"
            >
              <div className="relative z-10 flex flex-row items-start gap-8">
                <div className="relative z-10 max-w-sm shrink-0">
                  <h3 className="text-xl md:text-2xl font-medium text-[#0A0A0A] mb-3">
                    {t.services.content.title}
                  </h3>
                  <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed">
                    Gérez votre contenu facilement. Blog, actualités, projets —
                    tout est modifiable sans toucher au code.
                  </p>
                </div>
                {/* Globe — oversized, clipped by card */}
                <div className="absolute right-[-60px] top-[-40px] bottom-[-40px] w-[380px] pointer-events-auto">
                  <GlobeCdn className="w-full" speed={0.002} />
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* ─── Card 7: CTA — bottom right ─── */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlowCard
              customSize
              className="!aspect-auto w-full h-full"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">
                    {t.services.ctaTitle}
                  </h3>
                  <p className="text-[#0A0A0A]/50 text-[15px] leading-relaxed">
                    {t.services.ctaDescription}
                  </p>
                </div>
                <a href="#contact" className="mt-6 bg-[#533AFC] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#4129d4] transition-all text-[13px] font-normal shadow-lg shadow-[#533AFC]/20 w-fit group">
                  {t.services.ctaButton}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.5}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </a>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
