# TERRA Scroll-Driven Agriculture Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an immersive scroll-driven B2B agriculture site (TERRA brand) at `/app/terra/` with GSAP ScrollTrigger animations, fully isolated from the existing portfolio.

**Architecture:** Single Next.js page at `/terra` composed of 7 client components (Hero, Mission, Products, Stats, Testimonials, Contact, Footer). Each component manages its own GSAP ScrollTrigger animations via `useEffect` + `useRef`. All files live inside `app/terra/` — no modifications to existing code.

**Tech Stack:** Next.js 16 (App Router), GSAP + ScrollTrigger, Tailwind CSS, Unsplash images, inline SVGs.

---

### Task 1: Install GSAP and create project structure

**Files:**
- Modify: `package.json` (add gsap dependency)
- Create: `app/terra/layout.tsx`
- Create: `app/terra/page.tsx` (empty shell)

- [ ] **Step 1: Install GSAP**

Run:
```bash
npm install gsap
```

- [ ] **Step 2: Create the TERRA layout**

Create `app/terra/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "TERRA — Semences & Solutions Agricoles",
  description:
    "Enracinés dans l'excellence. Semences, protection des cultures et nutrition des sols depuis 1987.",
};

export default function TerraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} min-h-screen bg-[#f5f0e8] text-[#2c1810]`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create the shell page**

Create `app/terra/page.tsx`:

```tsx
"use client";

export default function TerraPage() {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a472a]">
          TERRA
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verify it works**

Run:
```bash
npm run dev
```

Open `http://localhost:3000/terra` — should see "TERRA" centered on a cream background.

- [ ] **Step 5: Commit**

```bash
git add app/terra/ package.json package-lock.json
git commit -m "feat(terra): scaffold project structure with GSAP dependency"
```

---

### Task 2: TerraHero component

**Files:**
- Create: `app/terra/components/TerraHero.tsx`
- Modify: `app/terra/page.tsx`

- [ ] **Step 1: Create TerraHero component**

Create `app/terra/components/TerraHero.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerraHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const slogan = sloganRef.current;
    const arrow = arrowRef.current;
    if (!section || !image || !overlay || !logo || !slogan || !arrow) return;

    // Intro animation (on load, not scroll-based)
    const introTl = gsap.timeline();

    // Image dezoom
    introTl.fromTo(
      image,
      { scale: 1.15 },
      { scale: 1, duration: 2.5, ease: "power2.out" }
    );

    // Logo reveal letter by letter
    const letters = logo.querySelectorAll("span");
    introTl.fromTo(
      letters,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
      "-=1.8"
    );

    // Slogan slide up
    introTl.fromTo(
      slogan,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Arrow fade in
    introTl.fromTo(
      arrow,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3"
    );

    // Scroll-based animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax image up
    scrollTl.to(image, { yPercent: -30, ease: "none" }, 0);

    // Overlay intensify
    scrollTl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 0.8, ease: "none" },
      0
    );

    // Fade out content
    scrollTl.to(
      [logo, slogan, arrow],
      { opacity: 0, y: -30, ease: "none" },
      0
    );

    return () => {
      introTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const logoText = "TERRA";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Green overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#1a472a] opacity-0"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
        <h1
          ref={logoRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-7xl font-bold tracking-tight md:text-9xl"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          {logoText.split("").map((letter, i) => (
            <span key={i} className="inline-block">
              {letter}
            </span>
          ))}
        </h1>
        <p
          ref={sloganRef}
          className="text-lg tracking-[0.3em] uppercase md:text-xl"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
        >
          Enracinés dans l&apos;excellence
        </p>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-[0.2em] uppercase">Découvrir</span>
          <svg
            className="h-6 w-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire up the page**

Replace `app/terra/page.tsx` with:

```tsx
"use client";

import TerraHero from "./components/TerraHero";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      {/* Spacer to test scroll */}
      <div className="h-screen bg-[#1a472a]" />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/terra`:
- Image should dezoom on load
- "TERRA" should appear letter by letter
- Slogan should slide up
- Scrolling should parallax the image and fade in the green overlay

- [ ] **Step 4: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add hero section with intro and scroll animations"
```

---

### Task 3: TerraMission component (pinned section)

**Files:**
- Create: `app/terra/components/TerraMission.tsx`
- Modify: `app/terra/page.tsx`

- [ ] **Step 1: Create TerraMission component**

Create `app/terra/components/TerraMission.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Notre Mission",
    text: "",
    image: "",
    align: "center" as const,
  },
  {
    title: "",
    text: "Depuis 1987, nous accompagnons les agriculteurs français avec des solutions adaptées à chaque terroir. Notre expertise se transmet de génération en génération.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    align: "left" as const,
  },
  {
    title: "",
    text: "Des solutions respectueuses de la terre, pour une agriculture durable et performante. Chaque produit est testé et validé sur le terrain.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    align: "right" as const,
  },
];

export default function TerraMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const icons = iconsRef.current;
    if (!section || !title || !line || !step1 || !step2 || !icons) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    });

    // Phase 1: Title + golden line (0% - 25%)
    tl.fromTo(
      title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
    tl.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3 },
      "-=0.1"
    );

    // Phase 2: Step 1 appears from left (25% - 50%)
    tl.fromTo(
      title,
      { y: 0 },
      { y: -60, opacity: 0.3, fontSize: "1.5rem", duration: 0.3 }
    );
    tl.fromTo(
      step1,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    );

    // Phase 3: Step 1 fades, step 2 from right (50% - 75%)
    tl.to(step1, { opacity: 0, x: 100, duration: 0.3 }, "+=0.1");
    tl.fromTo(
      step2,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    );

    // Phase 4: Icons appear (75% - 100%)
    const iconEls = icons.querySelectorAll(".mission-icon");
    tl.fromTo(
      iconEls,
      { opacity: 0, y: 30, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-[#1a472a]"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')",
      }}
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] opacity-0 md:text-6xl"
        >
          Notre Mission
        </h2>
        <div
          ref={lineRef}
          className="mb-12 h-[2px] w-24 origin-center scale-x-0 bg-[#c8a96e]"
        />

        {/* Step 1 */}
        <div
          ref={step1Ref}
          className="absolute flex w-full max-w-4xl items-center gap-10 px-6 opacity-0"
        >
          <div className="flex-1">
            <img
              src={steps[1].image}
              alt="Mains tenant de la terre"
              className="h-64 w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1 text-[#f5f0e8]">
            <p className="text-lg leading-relaxed md:text-xl">{steps[1].text}</p>
          </div>
        </div>

        {/* Step 2 */}
        <div
          ref={step2Ref}
          className="absolute flex w-full max-w-4xl items-center gap-10 px-6 opacity-0"
        >
          <div className="flex-1 text-[#f5f0e8]">
            <p className="text-lg leading-relaxed md:text-xl">{steps[2].text}</p>
          </div>
          <div className="flex-1">
            <img
              src={steps[2].image}
              alt="Champ vert"
              className="h-64 w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Icons */}
        <div
          ref={iconsRef}
          className="absolute bottom-20 flex gap-12"
        >
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 22c0-8-6-10-6-16a6 6 0 0 1 12 0c0 6-6 8-6 16Z" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Semences</span>
          </div>
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L12 14l4-4 3-3" />
              <path d="M14 6l3-3 3 3-3 3" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Protection</span>
          </div>
          <div className="mission-icon flex flex-col items-center gap-2 text-[#c8a96e] opacity-0">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span className="text-sm text-[#f5f0e8]/70">Nutrition</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/terra/page.tsx`:

```tsx
"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      {/* Spacer to test scroll */}
      <div className="h-screen bg-[#f5f0e8]" />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/terra`:
- After scrolling past the hero, the mission section should pin
- Title + golden line appear first
- Then image+text from left, then from right
- Finally 3 icons pop in
- Section unpins after the full sequence

- [ ] **Step 4: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add pinned mission section with scroll timeline"
```

---

### Task 4: TerraProducts component

**Files:**
- Create: `app/terra/components/TerraProducts.tsx`
- Modify: `app/terra/page.tsx`

- [ ] **Step 1: Create TerraProducts component**

Create `app/terra/components/TerraProducts.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "semences",
    title: "Semences & Graines",
    description:
      "Variétés sélectionnées pour chaque terroir. Blé, maïs, tournesol, colza — des semences certifiées pour des rendements optimaux.",
    cta: "Découvrir nos semences",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          className="svg-draw"
          d="M50 90 C50 90 50 60 50 50 C50 40 40 30 30 25 C35 35 40 45 50 50 C50 50 50 60 50 90Z"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <path
          className="svg-draw"
          d="M50 90 C50 90 50 60 50 50 C50 40 60 30 70 25 C65 35 60 45 50 50"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <circle className="svg-draw" cx="50" cy="85" r="4" stroke="#c8a96e" strokeWidth={2} />
      </svg>
    ),
  },
  {
    id: "protection",
    title: "Protection des Cultures",
    description:
      "Herbicides, fongicides et insecticides de dernière génération. Des solutions efficaces et responsables pour protéger vos cultures.",
    cta: "Explorer nos solutions",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          className="svg-draw"
          d="M50 15 L65 35 L65 65 C65 80 50 90 50 90 C50 90 35 80 35 65 L35 35 Z"
          stroke="#4a7c59"
          strokeWidth={2}
        />
        <path
          className="svg-draw"
          d="M50 40 L50 70 M40 55 L60 55"
          stroke="#c8a96e"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    id: "engrais",
    title: "Engrais & Nutrition",
    description:
      "Nutrition des sols sur-mesure. Azote, phosphore, potassium — des formules adaptées à chaque phase de croissance.",
    cta: "Voir nos engrais",
    svg: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle className="svg-draw" cx="50" cy="50" r="8" stroke="#c8a96e" strokeWidth={2} />
        <circle className="svg-draw" cx="30" cy="35" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="70" cy="35" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="30" cy="65" r="5" stroke="#4a7c59" strokeWidth={2} />
        <circle className="svg-draw" cx="70" cy="65" r="5" stroke="#4a7c59" strokeWidth={2} />
        <line className="svg-draw" x1="50" y1="42" x2="35" y2="38" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="42" x2="65" y2="38" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="58" x2="35" y2="62" stroke="#4a7c59" strokeWidth={1.5} />
        <line className="svg-draw" x1="50" y1="58" x2="65" y2="62" stroke="#4a7c59" strokeWidth={1.5} />
      </svg>
    ),
  },
];

export default function TerraProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      // SVG stroke animation
      const paths = card.querySelectorAll<SVGElement>(".svg-draw");
      paths.forEach((path) => {
        if (path instanceof SVGGeometryElement) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          onEnter: () => triggers.push(tl.scrollTrigger!),
        },
      });

      // Card reveal
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      // SVG draw
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    });

    // 3D tilt hover effect
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const listeners: Array<{ card: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const move = (e: MouseEvent) => handleMouseMove(e, card);
      const leave = () => handleMouseLeave(card);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      listeners.push({ card, move, leave });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      listeners.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section title */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1a472a] md:text-6xl">
            Nos Solutions
          </h2>
          <div className="mx-auto h-[2px] w-24 bg-[#c8a96e]" />
        </div>

        {/* Product cards */}
        <div className="flex flex-col gap-20">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="flex items-center gap-12 opacity-0"
              style={{ perspective: "1000px" }}
            >
              {/* SVG icon */}
              <div
                className={`h-40 w-40 flex-shrink-0 ${
                  i % 2 === 1 ? "order-2" : ""
                }`}
              >
                {product.svg}
              </div>

              {/* Text content */}
              <div className={i % 2 === 1 ? "order-1" : ""}>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a472a]">
                  {product.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-[#2c1810]/80">
                  {product.description}
                </p>
                <button className="rounded-full bg-[#c8a96e] px-6 py-3 text-sm font-semibold tracking-wide text-[#2c1810] transition-all hover:bg-[#b8964e] hover:shadow-lg">
                  {product.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/terra/page.tsx`:

```tsx
"use client";

import TerraHero from "./components/TerraHero";
import TerraMission from "./components/TerraMission";
import TerraProducts from "./components/TerraProducts";

export default function TerraPage() {
  return (
    <main>
      <TerraHero />
      <TerraMission />
      <TerraProducts />
      {/* Spacer */}
      <div className="h-screen bg-[#1a472a]" />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/terra`:
- Products section on cream background
- Each card fades in + scales up on scroll
- SVG icons draw themselves (stroke animation)
- Cards tilt on mouse hover (3D effect)
- Alternating layout (icon left/right)

- [ ] **Step 4: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add products section with SVG draw and 3D tilt"
```

---

### Task 5: TerraStats component (pinned counters)

**Files:**
- Create: `app/terra/components/TerraStats.tsx`
- Modify: `app/terra/page.tsx`

- [ ] **Step 1: Create TerraStats component**

Create `app/terra/components/TerraStats.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 35, suffix: "+", label: "années d'expertise" },
  { value: 12000, suffix: "", label: "agriculteurs partenaires", format: true },
  { value: 850000, suffix: " ha", label: "de cultures accompagnées", format: true },
  { value: 98, suffix: "%", label: "taux de satisfaction" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

export default function TerraStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      },
    });

    stats.forEach((stat, i) => {
      const statEl = statsRef.current[i];
      const numberEl = numberRefs.current[i];
      const circleEl = circleRefs.current[i];
      if (!statEl || !numberEl || !circleEl) return;

      const offset = i * 0.2;

      // Circle expand
      tl.fromTo(
        circleEl,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" },
        offset
      );

      // Stat container fade in
      tl.fromTo(
        statEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15 },
        offset + 0.05
      );

      // Counter animation
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: stat.value,
          duration: 0.25,
          ease: "power2.out",
          onUpdate: () => {
            const rounded = Math.round(counter.val);
            numberEl.textContent =
              (stat.format ? formatNumber(rounded) : String(rounded)) +
              stat.suffix;
          },
        },
        offset + 0.05
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div
          className="w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="w-1/2 bg-[#1a472a]" />
      </div>

      {/* Overlay on image side */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-[#1a472a]/30" />

      {/* Stats grid */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-2 gap-x-24 gap-y-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="relative flex flex-col items-center text-center opacity-0"
            >
              {/* Background circle */}
              <div
                ref={(el) => { circleRefs.current[i] = el; }}
                className="absolute -z-10 h-32 w-32 rounded-full bg-[#c8a96e]/20 opacity-0"
              />
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] md:text-6xl"
              >
                0
              </span>
              <span className="mt-2 text-sm tracking-[0.15em] uppercase text-[#f5f0e8]/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/terra/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/terra`:
- Split background (aerial photo left, green right)
- Section pins and stats appear one by one
- Numbers count up from 0 to final values
- Golden circles expand behind each stat
- Section unpins after all 4 stats are shown

- [ ] **Step 4: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add pinned stats section with animated counters"
```

---

### Task 6: TerraTestimonials component

**Files:**
- Create: `app/terra/components/TerraTestimonials.tsx`
- Modify: `app/terra/page.tsx`

- [ ] **Step 1: Create TerraTestimonials component**

Create `app/terra/components/TerraTestimonials.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "TERRA nous accompagne depuis 15 ans. Leurs semences sont parfaitement adaptées à nos sols calcaires.",
    name: "Jean-Pierre Dubois",
    farm: "Ferme du Grand Chêne",
    region: "Beauce",
    direction: "left" as const,
  },
  {
    quote:
      "Le suivi technique fait toute la différence. Des conseils personnalisés et des résultats concrets sur nos rendements.",
    name: "Marie Laurent",
    farm: "EARL Les Coteaux",
    region: "Bourgogne",
    direction: "right" as const,
  },
  {
    quote:
      "Un partenaire fiable. Qualité constante, livraisons toujours dans les temps, et une équipe disponible.",
    name: "Thomas Moreau",
    farm: "Coopérative Val de Loire",
    region: "Touraine",
    direction: "left" as const,
  },
];

export default function TerraTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    // Parallax background
    gsap.to(bg, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cards slide in
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const direction = testimonials[i].direction;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: direction === "left" ? -120 : 120,
          rotateY: direction === "left" ? -15 : 15,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-32"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] h-[140%] will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a472a]/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#f5f0e8] md:text-6xl">
          Ils nous font confiance
        </h2>
        <div className="mx-auto mb-20 h-[2px] w-24 bg-[#c8a96e]" />

        <div className="flex flex-col gap-12">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="rounded-xl border border-white/10 bg-white/10 p-8 opacity-0 shadow-2xl backdrop-blur-md"
              style={{ perspective: "800px" }}
            >
              {/* Quote mark */}
              <span className="font-[family-name:var(--font-playfair)] text-5xl leading-none text-[#c8a96e]">
                &ldquo;
              </span>
              <p className="mb-6 text-lg leading-relaxed text-[#f5f0e8]">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#c8a96e]/30" />
                <div>
                  <p className="font-semibold text-[#f5f0e8]">{t.name}</p>
                  <p className="text-sm text-[#f5f0e8]/60">
                    {t.farm} — {t.region}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/terra/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/terra`:
- Background photo in parallax (moves slower than scroll)
- Dark green overlay for readability
- Cards slide in from alternating sides with slight 3D rotation
- Glass-effect cards with backdrop blur
- Golden quote marks

- [ ] **Step 4: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add testimonials with parallax and glass cards"
```

---

### Task 7: TerraContact and TerraFooter components

**Files:**
- Create: `app/terra/components/TerraContact.tsx`
- Create: `app/terra/components/TerraFooter.tsx`
- Modify: `app/terra/page.tsx` (final assembly)

- [ ] **Step 1: Create TerraContact component**

Create `app/terra/components/TerraContact.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerraContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const logo = logoRef.current;
    if (!section || !title || !form || !logo) return;

    // Title reveal
    const letters = title.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    // Form slide up
    gsap.fromTo(
      form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
      }
    );

    // Background logo parallax
    gsap.to(logo, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const titleText = "Cultivons l'avenir ensemble";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1a472a] px-6 py-32"
    >
      {/* Background logo */}
      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <span className="select-none font-[family-name:var(--font-playfair)] text-[20rem] font-bold text-[#f5f0e8]/[0.03]">
          T
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <h2
          ref={titleRef}
          className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#f5f0e8] md:text-5xl"
        >
          {titleText.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div className="mx-auto mb-12 h-[2px] w-24 bg-[#c8a96e]" />

        <form
          ref={formRef}
          className="flex flex-col gap-4 opacity-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Votre nom"
            className="rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <textarea
            placeholder="Votre message"
            rows={4}
            className="resize-none rounded-lg border border-[#f5f0e8]/20 bg-[#f5f0e8]/10 px-5 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 outline-none transition-colors focus:border-[#c8a96e]/50"
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#c8a96e] px-8 py-3 font-semibold text-[#2c1810] transition-all hover:bg-[#b8964e] hover:shadow-lg hover:shadow-[#c8a96e]/20"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create TerraFooter component**

Create `app/terra/components/TerraFooter.tsx`:

```tsx
export default function TerraFooter() {
  return (
    <footer className="border-t border-[#f5f0e8]/10 bg-[#1a472a] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-[#f5f0e8]/60">
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Nos solutions
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            À propos
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Actualités
          </span>
          <span className="cursor-pointer transition-colors hover:text-[#c8a96e]">
            Contact
          </span>
        </nav>
        <p className="text-xs text-[#f5f0e8]/40">
          12 Route des Moissons, 28000 Chartres
        </p>
        <p className="text-xs text-[#f5f0e8]/30">
          © 2026 TERRA — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Assemble the final page**

Update `app/terra/page.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:3000/terra` and scroll through the entire site:
- Hero → Mission (pinned) → Products → Stats (pinned) → Testimonials → Contact → Footer
- All animations flow smoothly
- Title in Contact reveals letter by letter
- Form slides up
- Background "T" parallaxes
- Footer renders with links and address

- [ ] **Step 5: Commit**

```bash
git add app/terra/
git commit -m "feat(terra): add contact section, footer, and assemble full page"
```

---

### Task 8: Final polish and build verification

**Files:**
- Potentially: `app/terra/components/*.tsx` (minor fixes only)

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Fix any TypeScript or lint errors that appear.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors. Fix any issues.

- [ ] **Step 3: Full scroll-through verification**

Run `npm run dev`, open `http://localhost:3000/terra`, scroll through the entire page and verify:
1. Hero: image dezoom, letter-by-letter reveal, parallax on scroll
2. Mission: section pins, 3-step sequence plays, icons pop in, unpins
3. Products: cards fade in with SVG stroke draw, 3D tilt on hover
4. Stats: section pins, counters animate 0→value, golden circles expand
5. Testimonials: parallax background, glass cards slide from alternating sides
6. Contact: letter reveal, form slide up, background logo parallax
7. Footer: links and address display correctly

- [ ] **Step 4: Verify portfolio is unaffected**

Open `http://localhost:3000` — the main portfolio page should be completely unchanged.
Open `http://localhost:3000/kosmos` — the Kosmos page should be completely unchanged.

- [ ] **Step 5: Final commit**

```bash
git add app/terra/
git commit -m "feat(terra): polish and finalize scroll-driven agriculture site"
```
