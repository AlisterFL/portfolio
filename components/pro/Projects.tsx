"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AccentText } from "@/components/ui/accent-text";
import { Safari } from "@/components/ui/safari";

const projects = [
  {
    key: "g3j" as const,
    name: "G3J Immobilier",
    url: "https://g3j.fr/",
    logo: "/images/logo/g3jImmo.webp",
    screenshots: [
      "/images/portfolio/G3JImmo/HomePage.png",
      "/images/portfolio/G3JImmo/AdsPage.png",
      "/images/portfolio/G3JImmo/AdPage.png",
    ],
  },
  {
    key: "plant" as const,
    name: "Plant Protect",
    url: "https://plantprotect.be/",
    logo: "/images/logo/plantprotect.png",
    screenshots: [
      "/images/portfolio/PlantProtect/HomePage.png",
      "/images/portfolio/PlantProtect/ProjectPage.png",
      "/images/portfolio/PlantProtect/MembersPage.png",
    ],
  },
  {
    key: "noe" as const,
    name: "Noé Immobilier",
    url: "https://noe-immobilier.fr/",
    logo: "/images/logo/NoeImmobilier.webp",
    screenshots: [
      "/images/portfolio/NoeImmo/HomePage.png",
      "/images/portfolio/NoeImmo/ToSellPage.png",
      "/images/portfolio/NoeImmo/ToProposePage.png",
    ],
  },
];

type Project = (typeof projects)[number];

const ProjectCard = ({
  project,
  index,
  progress,
  targetScale,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  targetScale: number;
}) => {
  const { translations: t } = useLanguage();
  const [page, setPage] = useState(0);
  // Each card shrinks slightly as the following ones slide over it
  const scale = useTransform(progress, [index / projects.length, 1], [1, targetScale]);
  const pages = t.projects.pages[project.key];

  // Pages rotate on their own while the card is on screen; mouse hover pauses
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { amount: 0.4 });
  const [hovered, setHovered] = useState(false);
  const rotating = inView && !hovered;

  return (
    <div
      id={`projet-${project.key}`}
      className="md:sticky mb-6 md:mb-[18vh] last:mb-0 scroll-mt-24"
      style={{ top: `${104 + index * 28}px` }}
    >
      <motion.article
        ref={cardRef}
        style={{ scale }}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        className="origin-top rounded-3xl border border-[#0A0A0A]/[0.07] bg-white p-5 md:p-8 lg:p-10 shadow-[0_30px_80px_-30px_rgba(83,58,252,0.25)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-[13px] font-semibold text-[#533AFC]">0{index + 1}</span>
              <span className="h-px w-8 bg-[#533AFC]/30" />
              <Image src={project.logo} alt="" width={120} height={40} className="h-7 w-auto object-contain object-left" />
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#0A0A0A] mb-4">
              {project.name}
            </h3>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#0A0A0A]/65 mb-6">
              {t.projects.clients[project.key]}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {t.projects.tags[project.key].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#0A0A0A]/[0.08] bg-[#FCFCFD] px-3 py-1 text-[12px] font-medium text-[#0A0A0A]/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Page switcher */}
            <div className="flex flex-wrap gap-1.5 mb-8 p-1 rounded-full bg-[#0A0A0A]/[0.04] w-fit">
              {pages.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setPage(i)}
                  aria-pressed={page === i}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    page === i ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#0A0A0A]/55 hover:text-[#0A0A0A]"
                  }`}
                >
                  {label}
                  {/* Countdown to the next page — its animationend drives the rotation */}
                  {page === i && (
                    <span
                      aria-hidden
                      onAnimationEnd={() => setPage((p) => (p + 1) % pages.length)}
                      className="page-progress absolute inset-x-3.5 bottom-[3px] h-[2px] origin-left rounded-full bg-[#533AFC]/60"
                      style={{ animationPlayState: rotating ? "running" : "paused" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-fit bg-[#0A0A0A] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#533AFC] transition-colors text-[14px] font-medium"
            >
              {t.projects.visit}
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
          </div>

          {/* Browser — shown first on mobile */}
          <div className="lg:col-span-3 order-first lg:order-none">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#F6F3FF] via-[#FCFCFD] to-[#FDF2F8] p-3 md:p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="drop-shadow-[0_20px_40px_rgba(10,10,10,0.12)]"
                >
                  <Safari
                    url={project.url.replace("https://", "").replace(/\/$/, "")}
                    imageSrc={project.screenshots[page]}
                    mode="simple"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const Projects = () => {
  const { translations: t } = useLanguage();
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="projets" className="relative bg-white py-20 md:py-28 scroll-mt-16">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A]">
            <AccentText text={t.projects.title} />
          </h2>
          <p className="text-[#0A0A0A]/60 text-[15px] max-w-xs">{t.projects.subtitle}</p>
        </motion.div>

        <div ref={stackRef} className="relative max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.key}
              project={project}
              index={i}
              progress={scrollYProgress}
              targetScale={1 - (projects.length - 1 - i) * 0.04}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
