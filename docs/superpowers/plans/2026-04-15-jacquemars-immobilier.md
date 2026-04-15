# Jacquemars Immobilier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visually stunning real estate agency website for Jacquemars Immobilier as a sub-project within the existing Next.js portfolio, demonstrating a massive upgrade over their current Jimdo site.

**Architecture:** Isolated sub-project under `/app/jacquemarsimmobilier/` with its own layout, components, data, and types. Single-page accueil with scroll sections + 4 additional routes. Client-side filtering on fake data, no backend. GSAP ScrollTrigger for scroll animations, Framer Motion for micro-interactions.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, Playfair Display + Inter + Sora fonts.

**Spec:** `docs/superpowers/specs/2026-04-15-jacquemars-immobilier-design.md`

---

## File Structure

```
app/jacquemarsimmobilier/
  layout.tsx                        — Isolated layout with metadata, fonts, CSS vars
  page.tsx                          — Accueil: composes all homepage sections
  types.ts                          — Property, Review, Agent, Filter types
  data/
    properties.ts                   — ~15 fake property listings
    reviews.ts                      — Real testimonials from scraped site
    agents.ts                       — Laurent & Remi contact info
    quartiers.ts                    — Neighborhood data
  components/
    JacquemarsNav.tsx               — Sticky nav, transparent→burgundy on scroll
    JacquemarsHero.tsx              — Fullscreen hero with parallax + search bar
    JacquemarsBiensVedette.tsx      — Featured properties grid
    JacquemarsApproche.tsx          — "Notre approche" split section
    JacquemarsQuartiers.tsx         — Neighborhood photo grid
    JacquemarsAvisCarousel.tsx      — Testimonials carousel
    JacquemarsContact.tsx           — Contact section with form
    JacquemarsFooter.tsx            — Footer
    SearchBar.tsx                   — Compact search bar (hero version)
    SearchFilters.tsx               — Full filter panel (biens page)
    PropertyCard.tsx                — Property card component
    PropertyGrid.tsx                — Filterable property grid
    PropertyGallery.tsx             — Image gallery with lightbox
    AgentCard.tsx                   — Agent contact sidebar card
    EstimationStepper.tsx           — 3-step estimation form
    ReviewCard.tsx                  — Single review card
    MobileMenu.tsx                  — Fullscreen mobile overlay menu
  biens/
    page.tsx                        — Property catalog with full filters
    [id]/
      page.tsx                      — Property detail page
  estimation/
    page.tsx                        — Estimation form page
  avis/
    page.tsx                        — Reviews page
```

---

## Task 1: Project scaffold — layout, types, and data

**Files:**
- Create: `app/jacquemarsimmobilier/layout.tsx`
- Create: `app/jacquemarsimmobilier/types.ts`
- Create: `app/jacquemarsimmobilier/data/agents.ts`
- Create: `app/jacquemarsimmobilier/data/quartiers.ts`
- Create: `app/jacquemarsimmobilier/data/properties.ts`
- Create: `app/jacquemarsimmobilier/data/reviews.ts`

- [ ] **Step 1: Create types.ts with all domain types**

```typescript
// app/jacquemarsimmobilier/types.ts

export type TransactionType = "achat" | "location";
export type PropertyType = "appartement" | "maison" | "immeuble";
export type PropertyCondition = "neuf" | "renove" | "a-renover";
export type Exterior = "balcon" | "terrasse" | "jardin";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  transaction: TransactionType;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  quartier: string;
  ville: string;
  description: string;
  features: string[];
  condition: PropertyCondition;
  exterior: Exterior[];
  parking: boolean;
  floor?: number;
  orientation?: string;
  heating?: string;
  dpe?: string;
  yearBuilt?: number;
  charges?: number;
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  agent: "laurent" | "remi";
}

export interface Review {
  id: string;
  name: string;
  text: string;
  context: string;
  rating: number;
}

export interface Agent {
  id: "laurent" | "remi";
  name: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface Quartier {
  id: string;
  name: string;
  description: string;
  image: string;
  propertyCount: number;
}

export interface FilterState {
  type: PropertyType | null;
  transaction: TransactionType | null;
  quartier: string | null;
  surfaceMin: number;
  surfaceMax: number;
  priceMin: number;
  priceMax: number;
  rooms: number | null;
  bedrooms: number | null;
  exterior: Exterior[];
  parking: "oui" | "non" | "indifferent";
  condition: PropertyCondition | "indifferent";
}

export type SortOption = "recent" | "price-asc" | "price-desc" | "surface";
```

- [ ] **Step 2: Create layout.tsx**

```tsx
// app/jacquemarsimmobilier/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "JACQUEMARS Immobilier — Achat, Vente & Location | Lille",
  description:
    "L'art de l'immobilier lillois. Achat, vente et location de bel immobilier a Lille et sa metropole. Estimation gratuite.",
};

export default function JacquemarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${sora.variable} min-h-screen`}
      style={{
        "--jqm-burgundy": "#601f27",
        "--jqm-burgundy-light": "#872b37",
        "--jqm-gold": "#c9a84c",
        "--jqm-cream": "#faf6f0",
        "--jqm-noir": "#1a1215",
        "--jqm-gris": "#6b5e62",
        "--jqm-blanc": "#fefcfa",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create data/agents.ts**

```typescript
// app/jacquemarsimmobilier/data/agents.ts
import { Agent } from "../types";

export const agents: Record<string, Agent> = {
  laurent: {
    id: "laurent",
    name: "Laurent",
    fullName: "Laurent Casetta",
    phone: "06.01.02.78.71",
    email: "laurent.casetta@jacquemarsimmobilier.fr",
  },
  remi: {
    id: "remi",
    name: "Remi",
    fullName: "Remi Rembauville",
    phone: "06.31.99.84.46",
    email: "remi.rembauville@jacquemarsimmobilier.fr",
  },
};
```

- [ ] **Step 4: Create data/quartiers.ts**

```typescript
// app/jacquemarsimmobilier/data/quartiers.ts
import { Quartier } from "../types";

export const quartiers: Quartier[] = [
  {
    id: "vieux-lille",
    name: "Vieux-Lille",
    description: "Ruelles pavees, facades flamandes et adresses de charme au coeur historique de Lille.",
    image: "https://images.unsplash.com/photo-1564352969906-8b7f46ba4b28?w=800&q=80",
    propertyCount: 4,
  },
  {
    id: "republique-beaux-arts",
    name: "Republique Beaux-Arts",
    description: "Quartier culturel et bourgeois, entre le Palais des Beaux-Arts et la place de la Republique.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    propertyCount: 3,
  },
  {
    id: "vauban",
    name: "Vauban",
    description: "Quartier etudiant et familial, verdoyant, aux portes de la Citadelle.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    propertyCount: 2,
  },
  {
    id: "wazemmes",
    name: "Wazemmes-Gambetta",
    description: "Quartier populaire et cosmopolite, celebre pour son marche et sa vie de quartier.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    propertyCount: 2,
  },
  {
    id: "hypercentre",
    name: "Hypercentre",
    description: "Au coeur de Lille, entre la Grand Place et la gare Lille Flandres.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    propertyCount: 2,
  },
  {
    id: "la-madeleine",
    name: "La Madeleine",
    description: "Commune residentielle prisee aux portes du Vieux-Lille.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    propertyCount: 1,
  },
  {
    id: "lambersart",
    name: "Lambersart",
    description: "Ville verte et familiale, entre Citadelle et bois de Boulogne.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    propertyCount: 1,
  },
];
```

- [ ] **Step 5: Create data/reviews.ts with real scraped testimonials**

```typescript
// app/jacquemarsimmobilier/data/reviews.ts
import { Review } from "../types";

export const reviews: Review[] = [
  {
    id: "1",
    name: "Frederique",
    text: "Vente dans la 1ere journee de visite sans negociation ! Laurent et Remi sont des professionnels a l'ecoute, reactifs et de bon conseil. Je recommande vivement.",
    context: "Vente — Vieux-Lille",
    rating: 5,
  },
  {
    id: "2",
    name: "Pierre-Luc",
    text: "Notre bien a ete vendu au bon prix et tres rapidement. Un accompagnement de qualite du debut a la fin. Merci a toute l'equipe.",
    context: "Vente — Republique",
    rating: 5,
  },
  {
    id: "3",
    name: "Marine",
    text: "Tout sauf l'archetype d'un agent immo. Laurent et Remi sont authentiques, a l'ecoute et vraiment investis dans votre projet. Une experience humaine avant tout.",
    context: "Achat — Vauban",
    rating: 5,
  },
  {
    id: "4",
    name: "Aurelie",
    text: "Laurent et Remi sont deux excellents agents immobiliers qui connaissent parfaitement Lille. Leur expertise du marche local et leur disponibilite font toute la difference.",
    context: "Achat — Vieux-Lille",
    rating: 5,
  },
  {
    id: "5",
    name: "Thomas",
    text: "Un grand merci pour l'accompagnement dans la vente de notre appartement. Estimation juste, photos de qualite et un acheteur trouve en moins de deux semaines.",
    context: "Vente — Hypercentre",
    rating: 5,
  },
  {
    id: "6",
    name: "Sophie",
    text: "Nous cherchions un appartement dans le Vieux-Lille depuis des mois. Grace a leur connaissance du quartier, ils nous ont trouve la perle rare en quelques jours.",
    context: "Achat — Vieux-Lille",
    rating: 5,
  },
  {
    id: "7",
    name: "Guillaume",
    text: "Professionnalisme, reactivite et bonne humeur. On sent la passion du metier. Merci pour cette belle transaction.",
    context: "Vente — Wazemmes",
    rating: 5,
  },
  {
    id: "8",
    name: "Claire",
    text: "Remi nous a accompagnes avec patience et professionnalisme pour notre premier achat. Des conseils precieux et une grande disponibilite.",
    context: "Achat — La Madeleine",
    rating: 5,
  },
  {
    id: "9",
    name: "Nicolas",
    text: "Une agence a taille humaine qui fait la difference. Pas de blabla, que du concret et de l'efficacite.",
    context: "Vente — Lambersart",
    rating: 4,
  },
  {
    id: "10",
    name: "Camille",
    text: "Merci Laurent pour ta disponibilite et ton ecoute. Tu as su comprendre nos besoins et nous proposer des biens en adequation avec notre projet de vie.",
    context: "Achat — Republique",
    rating: 5,
  },
];
```

- [ ] **Step 6: Create data/properties.ts with ~15 realistic Lille listings**

```typescript
// app/jacquemarsimmobilier/data/properties.ts
import { Property } from "../types";

export const properties: Property[] = [
  {
    id: "jqm-001",
    title: "Appartement d'exception au coeur du Vieux-Lille",
    type: "appartement",
    transaction: "achat",
    price: 485000,
    surface: 120,
    rooms: 5,
    bedrooms: 3,
    quartier: "vieux-lille",
    ville: "Lille",
    description: "Magnifique appartement traversant au 3e etage d'un immeuble flamand du XVIIIe siecle. Hauts plafonds, parquet massif, moulures d'origine. Sejour lumineux de 35m2 avec cheminee, cuisine equipee ouverte, 3 chambres dont une suite parentale. Cave voutee.",
    features: ["Parquet massif", "Moulures", "Cheminee", "Cave", "Double vitrage"],
    condition: "renove",
    exterior: ["balcon"],
    parking: false,
    floor: 3,
    orientation: "Sud-Ouest",
    heating: "Individuel gaz",
    dpe: "D",
    yearBuilt: 1780,
    charges: 250,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    isFeatured: true,
    isNew: false,
    agent: "laurent",
  },
  {
    id: "jqm-002",
    title: "Maison bourgeoise avec jardin — La Madeleine",
    type: "maison",
    transaction: "achat",
    price: 595000,
    surface: 180,
    rooms: 7,
    bedrooms: 4,
    quartier: "la-madeleine",
    ville: "La Madeleine",
    description: "Belle maison bourgeoise des annees 30 entierement renovee. Sejour double de 45m2, cuisine americaine haut de gamme, 4 chambres, bureau, buanderie. Jardin arbore de 200m2 expose plein sud. Garage double.",
    features: ["Jardin 200m2", "Garage double", "Cuisine haut de gamme", "Parquet", "Alarme"],
    condition: "renove",
    exterior: ["jardin"],
    parking: true,
    orientation: "Sud",
    heating: "Individuel gaz",
    dpe: "C",
    yearBuilt: 1932,
    charges: 0,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
    ],
    isFeatured: true,
    isNew: true,
    agent: "remi",
  },
  {
    id: "jqm-003",
    title: "T3 lumineux — Quartier Republique",
    type: "appartement",
    transaction: "achat",
    price: 245000,
    surface: 68,
    rooms: 3,
    bedrooms: 2,
    quartier: "republique-beaux-arts",
    ville: "Lille",
    description: "Bel appartement T3 au 4e etage avec ascenseur. Sejour de 25m2 tres lumineux, 2 chambres, salle de bain refaite a neuf. Proche Palais des Beaux-Arts et metro.",
    features: ["Ascenseur", "Lumineux", "Proche metro", "SDB neuve"],
    condition: "renove",
    exterior: [],
    parking: false,
    floor: 4,
    orientation: "Est",
    heating: "Collectif",
    dpe: "D",
    yearBuilt: 1965,
    charges: 180,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "laurent",
  },
  {
    id: "jqm-004",
    title: "Duplex avec terrasse — Vauban",
    type: "appartement",
    transaction: "achat",
    price: 320000,
    surface: 95,
    rooms: 4,
    bedrooms: 2,
    quartier: "vauban",
    ville: "Lille",
    description: "Superbe duplex au dernier etage avec terrasse de 20m2. Niveau bas : sejour catherdrale, cuisine ouverte. Niveau haut : 2 chambres, salle d'eau. Vue degagee sur la Citadelle. Residence calme avec gardien.",
    features: ["Terrasse 20m2", "Vue Citadelle", "Duplex", "Gardien", "Digicode"],
    condition: "renove",
    exterior: ["terrasse"],
    parking: true,
    floor: 5,
    orientation: "Nord-Ouest",
    heating: "Individuel electrique",
    dpe: "C",
    yearBuilt: 2005,
    charges: 220,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ],
    isFeatured: true,
    isNew: false,
    agent: "remi",
  },
  {
    id: "jqm-005",
    title: "Studio renove — Hypercentre Lille",
    type: "appartement",
    transaction: "location",
    price: 650,
    surface: 28,
    rooms: 1,
    bedrooms: 1,
    quartier: "hypercentre",
    ville: "Lille",
    description: "Studio entierement refait a neuf, idealement situe entre la Grand Place et la gare. Coin nuit separe, kitchenette equipee, salle d'eau avec douche italienne. Parfait investissement locatif ou premier achat.",
    features: ["Refait a neuf", "Douche italienne", "Proche gare", "Meuble"],
    condition: "neuf",
    exterior: [],
    parking: false,
    floor: 2,
    orientation: "Sud",
    heating: "Individuel electrique",
    dpe: "B",
    yearBuilt: 2020,
    charges: 50,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: true,
    agent: "laurent",
  },
  {
    id: "jqm-006",
    title: "T4 familial avec balcon — Vauban",
    type: "appartement",
    transaction: "achat",
    price: 289000,
    surface: 85,
    rooms: 4,
    bedrooms: 3,
    quartier: "vauban",
    ville: "Lille",
    description: "Appartement familial au 2e etage d'une residence securisee. Sejour avec balcon filant, cuisine separee amenagee, 3 chambres, rangements. Proche ecoles et parc de la Citadelle.",
    features: ["Balcon filant", "Residence securisee", "Proche ecoles", "Cave"],
    condition: "renove",
    exterior: ["balcon"],
    parking: true,
    floor: 2,
    orientation: "Ouest",
    heating: "Collectif gaz",
    dpe: "D",
    yearBuilt: 1975,
    charges: 200,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "remi",
  },
  {
    id: "jqm-007",
    title: "Loft atypique — Wazemmes",
    type: "appartement",
    transaction: "achat",
    price: 375000,
    surface: 130,
    rooms: 4,
    bedrooms: 2,
    quartier: "wazemmes",
    ville: "Lille",
    description: "Ancien atelier textile transforme en loft d'architecte. Volumes exceptionnels avec plafond de 4m, verriere industrielle, mezzanine. Sejour de 60m2, 2 suites, cuisine d'architecte. Cour privative.",
    features: ["Loft", "Verriere", "Mezzanine", "Cour privative", "Plafond 4m"],
    condition: "renove",
    exterior: ["terrasse"],
    parking: false,
    orientation: "Sud-Est",
    heating: "Individuel gaz",
    dpe: "D",
    yearBuilt: 1900,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ],
    isFeatured: true,
    isNew: false,
    agent: "laurent",
  },
  {
    id: "jqm-008",
    title: "T2 avec parking — Gare Lille Flandres",
    type: "appartement",
    transaction: "location",
    price: 850,
    surface: 45,
    rooms: 2,
    bedrooms: 1,
    quartier: "hypercentre",
    ville: "Lille",
    description: "Appartement T2 refait dans residence recente. Sejour lumineux, chambre separee, SDB complete. Place de parking en sous-sol incluse. A 200m de la gare.",
    features: ["Parking inclus", "Residence recente", "Proche gare", "Interphone"],
    condition: "neuf",
    exterior: [],
    parking: true,
    floor: 3,
    orientation: "Nord",
    heating: "Collectif",
    dpe: "B",
    yearBuilt: 2018,
    charges: 80,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "remi",
  },
  {
    id: "jqm-009",
    title: "Maison de ville 3 chambres — Lambersart",
    type: "maison",
    transaction: "achat",
    price: 420000,
    surface: 140,
    rooms: 6,
    bedrooms: 3,
    quartier: "lambersart",
    ville: "Lambersart",
    description: "Charmante maison de ville avec jardin clos. RDC : entree, sejour-salon, cuisine ouverte, WC. Etage : 3 chambres, salle de bain, bureau. Sous-sol amenageable. Jardin expose sud de 80m2.",
    features: ["Jardin 80m2", "Sous-sol", "Cuisine ouverte", "Proche commerces"],
    condition: "a-renover",
    exterior: ["jardin"],
    parking: true,
    orientation: "Sud",
    heating: "Individuel gaz",
    dpe: "E",
    yearBuilt: 1950,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "laurent",
  },
  {
    id: "jqm-010",
    title: "Immeuble de rapport — Wazemmes",
    type: "immeuble",
    transaction: "achat",
    price: 550000,
    surface: 250,
    rooms: 12,
    bedrooms: 6,
    quartier: "wazemmes",
    ville: "Lille",
    description: "Immeuble de rapport compose de 4 appartements (2xT2, 1xT3, 1xStudio). Entierement loue, rentabilite brute de 7.2%. Toitures et facades en bon etat. Compteurs individuels.",
    features: ["4 lots", "Rentabilite 7.2%", "Entierement loue", "Compteurs individuels"],
    condition: "renove",
    exterior: [],
    parking: false,
    heating: "Individuel",
    dpe: "D",
    yearBuilt: 1920,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "remi",
  },
  {
    id: "jqm-011",
    title: "T3 standing — Vieux-Lille",
    type: "appartement",
    transaction: "achat",
    price: 395000,
    surface: 88,
    rooms: 3,
    bedrooms: 2,
    quartier: "vieux-lille",
    ville: "Lille",
    description: "Appartement haut standing au 2e etage d'un immeuble en briques. Prestations soignees : cuisine Bulthaup, parquet chene, domotique. Sejour de 30m2, 2 chambres, dressing. Rue calme.",
    features: ["Cuisine Bulthaup", "Domotique", "Parquet chene", "Dressing", "Rue calme"],
    condition: "renove",
    exterior: [],
    parking: false,
    floor: 2,
    orientation: "Sud",
    heating: "Individuel gaz",
    dpe: "C",
    yearBuilt: 1850,
    charges: 190,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: true,
    agent: "laurent",
  },
  {
    id: "jqm-012",
    title: "T2 charme avec terrasse — Vieux-Lille",
    type: "appartement",
    transaction: "location",
    price: 950,
    surface: 52,
    rooms: 2,
    bedrooms: 1,
    quartier: "vieux-lille",
    ville: "Lille",
    description: "Charmant T2 au dernier etage avec terrasse de 12m2 et vue sur les toits. Poutres apparentes, parquet ancien. Sejour cosy, chambre avec rangements. Quartier vivant et recherche.",
    features: ["Terrasse 12m2", "Vue toits", "Poutres apparentes", "Parquet ancien"],
    condition: "renove",
    exterior: ["terrasse"],
    parking: false,
    floor: 4,
    orientation: "Ouest",
    heating: "Individuel electrique",
    dpe: "D",
    yearBuilt: 1800,
    charges: 60,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "remi",
  },
  {
    id: "jqm-013",
    title: "Grand T4 familial — Republique",
    type: "appartement",
    transaction: "achat",
    price: 310000,
    surface: 98,
    rooms: 4,
    bedrooms: 3,
    quartier: "republique-beaux-arts",
    ville: "Lille",
    description: "Bel appartement familial dans immeuble art deco. Parquet, moulures, cheminee decorative. Grand sejour, cuisine amenagee, 3 chambres, cellier. Proximite metro et commerces.",
    features: ["Art deco", "Moulures", "Cheminee", "Cellier", "Proche metro"],
    condition: "a-renover",
    exterior: ["balcon"],
    parking: false,
    floor: 1,
    orientation: "Est",
    heating: "Collectif gaz",
    dpe: "E",
    yearBuilt: 1930,
    charges: 210,
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "laurent",
  },
  {
    id: "jqm-014",
    title: "Maison contemporaine — Marcq-en-Baroeul",
    type: "maison",
    transaction: "achat",
    price: 520000,
    surface: 160,
    rooms: 6,
    bedrooms: 4,
    quartier: "la-madeleine",
    ville: "Marcq-en-Baroeul",
    description: "Maison d'architecte de 2015 aux lignes contemporaines. Grand sejour ouvert de 50m2, baies vitrees, cuisine ilot central. 4 chambres a l'etage dont suite parentale. Jardin paysager 300m2. Domotique complete.",
    features: ["Architecte", "Baies vitrees", "Ilot central", "Domotique", "Jardin 300m2"],
    condition: "neuf",
    exterior: ["jardin", "terrasse"],
    parking: true,
    orientation: "Sud-Ouest",
    heating: "Pompe a chaleur",
    dpe: "A",
    yearBuilt: 2015,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: true,
    agent: "remi",
  },
  {
    id: "jqm-015",
    title: "T3 terrasse — Republique Beaux-Arts",
    type: "appartement",
    transaction: "achat",
    price: 275000,
    surface: 72,
    rooms: 3,
    bedrooms: 2,
    quartier: "republique-beaux-arts",
    ville: "Lille",
    description: "Appartement T3 au dernier etage avec terrasse plein sud de 15m2. Refait a neuf : cuisine equipee, parquet neuf, peintures fraiches. 2 chambres, SDB avec baignoire. Vue degagee.",
    features: ["Terrasse 15m2", "Dernier etage", "Refait a neuf", "Vue degagee"],
    condition: "neuf",
    exterior: ["terrasse"],
    parking: false,
    floor: 5,
    orientation: "Sud",
    heating: "Individuel gaz",
    dpe: "C",
    yearBuilt: 1990,
    charges: 150,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: false,
    agent: "laurent",
  },
];
```

- [ ] **Step 7: Verify the app compiles**

Run: `cd /Users/alisterflandrinck/Documents/Pro/portfolio && npx next build 2>&1 | tail -20`
Expected: Build succeeds (no pages rendered yet, just data + types + layout)

- [ ] **Step 8: Commit scaffold**

```bash
git add app/jacquemarsimmobilier/
git commit -m "feat(jacquemars): scaffold project — layout, types, and data files"
```

---

## Task 2: Navigation component

**Files:**
- Create: `app/jacquemarsimmobilier/components/JacquemarsNav.tsx`
- Create: `app/jacquemarsimmobilier/components/MobileMenu.tsx`

- [ ] **Step 1: Create JacquemarsNav.tsx — sticky nav with scroll-based background transition**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/jacquemarsimmobilier", label: "Accueil" },
  { href: "/jacquemarsimmobilier/biens", label: "Nos Biens" },
  { href: "/jacquemarsimmobilier/estimation", label: "Estimation" },
  { href: "/jacquemarsimmobilier/avis", label: "Avis" },
];

export default function JacquemarsNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/jacquemarsimmobilier") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/jacquemarsimmobilier#contact";
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--jqm-burgundy)]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/jacquemarsimmobilier"
            className="font-[var(--font-playfair)] text-white text-lg tracking-[0.3em] uppercase"
          >
            J A C Q U E M A R S
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-[var(--jqm-gold)]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleContactClick}
              className="px-5 py-2 text-sm tracking-wide border border-[var(--jqm-gold)] text-[var(--jqm-gold)] rounded-sm hover:bg-[var(--jqm-gold)] hover:text-[var(--jqm-noir)] transition-all duration-300"
            >
              Contact
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
        onContactClick={handleContactClick}
      />
    </>
  );
}
```

- [ ] **Step 2: Create MobileMenu.tsx — fullscreen overlay with staggered animations**

```tsx
// app/jacquemarsimmobilier/components/MobileMenu.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  pathname: string;
  onContactClick: (e: React.MouseEvent) => void;
}

export default function MobileMenu({ open, onClose, links, pathname, onContactClick }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-[var(--jqm-burgundy)] flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white"
            aria-label="Fermer le menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`text-2xl tracking-[0.2em] uppercase transition-colors ${
                    pathname === link.href ? "text-[var(--jqm-gold)]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + links.length * 0.08, duration: 0.4 }}
            >
              <button
                onClick={(e) => { onClose(); onContactClick(e); }}
                className="text-2xl tracking-[0.2em] uppercase text-[var(--jqm-gold)] hover:text-white transition-colors"
              >
                Contact
              </button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Verify renders**

Run: `cd /Users/alisterflandrinck/Documents/Pro/portfolio && npx next dev &` then visit `/jacquemarsimmobilier` in browser.

- [ ] **Step 4: Commit**

```bash
git add app/jacquemarsimmobilier/components/JacquemarsNav.tsx app/jacquemarsimmobilier/components/MobileMenu.tsx
git commit -m "feat(jacquemars): add navigation with scroll effect and mobile menu"
```

---

## Task 3: Hero section with parallax and compact search bar

**Files:**
- Create: `app/jacquemarsimmobilier/components/JacquemarsHero.tsx`
- Create: `app/jacquemarsimmobilier/components/SearchBar.tsx`

- [ ] **Step 1: Create SearchBar.tsx — compact version for hero**

```tsx
// app/jacquemarsimmobilier/components/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyType, TransactionType } from "../types";
import { quartiers } from "../data/quartiers";

export default function SearchBar() {
  const router = useRouter();
  const [type, setType] = useState<PropertyType | "">("");
  const [quartier, setQuartier] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (quartier) params.set("quartier", quartier);
    if (priceMax) params.set("priceMax", priceMax);
    router.push(`/jacquemarsimmobilier/biens?${params.toString()}`);
  };

  const types: { value: PropertyType; label: string }[] = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "immeuble", label: "Immeuble" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-full max-w-3xl">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Type pills */}
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(type === t.value ? "" : t.value)}
              className={`px-4 py-2 text-sm rounded-sm transition-all duration-200 ${
                type === t.value
                  ? "bg-[var(--jqm-gold)] text-[var(--jqm-noir)]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Quartier select */}
        <select
          value={quartier}
          onChange={(e) => setQuartier(e.target.value)}
          className="flex-1 px-4 py-2 text-sm bg-white/10 text-white border border-white/20 rounded-sm appearance-none cursor-pointer [&>option]:text-[var(--jqm-noir)]"
        >
          <option value="">Tous les quartiers</option>
          {quartiers.map((q) => (
            <option key={q.id} value={q.id}>{q.name}</option>
          ))}
        </select>

        {/* Price max */}
        <select
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="px-4 py-2 text-sm bg-white/10 text-white border border-white/20 rounded-sm appearance-none cursor-pointer [&>option]:text-[var(--jqm-noir)]"
        >
          <option value="">Budget max</option>
          <option value="200000">200 000 EUR</option>
          <option value="300000">300 000 EUR</option>
          <option value="400000">400 000 EUR</option>
          <option value="500000">500 000 EUR</option>
          <option value="600000">600 000 EUR+</option>
        </select>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-[var(--jqm-gold)] text-[var(--jqm-noir)] text-sm font-semibold rounded-sm hover:bg-[var(--jqm-gold)]/90 transition-all duration-200"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create JacquemarsHero.tsx — fullscreen parallax hero with GSAP text reveal**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsHero.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchBar from "./SearchBar";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background image
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title reveal
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1 }
      );

      // Search bar slide up
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "L'art de l'immobilier lillois";
  const chars = title.split("");

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-0 -top-[20%] h-[120%]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564352969906-8b7f46ba4b28?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--jqm-noir)]/70 via-[var(--jqm-noir)]/50 to-[var(--jqm-noir)]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
        >
          {chars.map((char, i) => (
            <span key={i} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/70 tracking-[0.15em] uppercase mb-12">
          Achat &middot; Vente &middot; Location — Lille et sa metropole
        </p>

        <div ref={searchRef}>
          <SearchBar />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-50">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/jacquemarsimmobilier/components/JacquemarsHero.tsx app/jacquemarsimmobilier/components/SearchBar.tsx
git commit -m "feat(jacquemars): add hero section with parallax and compact search bar"
```

---

## Task 4: Homepage sections — Featured properties, Approche, Quartiers

**Files:**
- Create: `app/jacquemarsimmobilier/components/PropertyCard.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsBiensVedette.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsApproche.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsQuartiers.tsx`

- [ ] **Step 1: Create PropertyCard.tsx — gallery-style property card**

```tsx
// app/jacquemarsimmobilier/components/PropertyCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = property.transaction === "location"
    ? `${property.price.toLocaleString("fr-FR")} EUR/mois`
    : `${property.price.toLocaleString("fr-FR")} EUR`;

  return (
    <Link href={`/jacquemarsimmobilier/biens/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--jqm-noir)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && (
            <span className="px-3 py-1 text-xs tracking-wide bg-[var(--jqm-gold)] text-[var(--jqm-noir)] rounded-sm font-semibold">
              Coup de coeur
            </span>
          )}
          {property.isNew && (
            <span className="px-3 py-1 text-xs tracking-wide bg-white text-[var(--jqm-noir)] rounded-sm font-semibold">
              Nouveau
            </span>
          )}
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold mb-1">{formattedPrice}</p>
          <p className="text-sm text-white/80 mb-2 line-clamp-1">{property.title}</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>{property.surface} m²</span>
            <span>{property.rooms} pieces</span>
            {property.bedrooms > 0 && <span>{property.bedrooms} ch.</span>}
            <span className="capitalize">{property.quartier.replace(/-/g, " ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create JacquemarsBiensVedette.tsx — featured properties with scroll reveal**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsBiensVedette.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { properties } from "../data/properties";
import PropertyCard from "./PropertyCard";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsBiensVedette() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = properties.filter((p) => p.isFeatured).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--jqm-blanc)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-4 text-center">
          Nos biens d&apos;exception
        </h2>
        <p className="text-[var(--jqm-gris)] text-center mb-12 tracking-wide">
          Une selection de nos plus belles opportunites
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property) => (
            <div key={property.id} className="featured-card">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/jacquemarsimmobilier/biens"
            className="inline-flex items-center gap-2 text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors tracking-wide group"
          >
            Voir tous nos biens
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create JacquemarsApproche.tsx — split section with values**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsApproche.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Proximite",
    description: "Nous connaissons chaque rue, chaque quartier. Notre ancrage lillois est notre force.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Reactivite",
    description: "Votre temps est precieux. Nous nous engageons a vous repondre sous 24h.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Professionnalisme",
    description: "Une estimation juste, un accompagnement complet, du premier contact a la signature.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function JacquemarsApproche() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".approche-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--jqm-cream)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-8">
            Notre approche
          </h2>

          <div className="space-y-8 mb-10">
            {values.map((v) => (
              <div key={v.title} className="value-item flex gap-4">
                <div className="text-[var(--jqm-burgundy)] flex-shrink-0 mt-1">{v.icon}</div>
                <div>
                  <h3 className="font-semibold text-[var(--jqm-noir)] mb-1">{v.title}</h3>
                  <p className="text-[var(--jqm-gris)] text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-[var(--jqm-gold)] pl-6 italic text-[var(--jqm-gris)]">
            &ldquo;Plus qu&apos;une agence, nous sommes Laurent et Remi, veritables artisans du marche immobilier lillois.&rdquo;
          </blockquote>
        </div>

        {/* Image side */}
        <div className="approche-image relative aspect-[4/5] rounded-sm overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-[var(--jqm-burgundy)]/10" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create JacquemarsQuartiers.tsx — neighborhood grid with hover and filter link**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsQuartiers.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { quartiers } from "../data/quartiers";

gsap.registerPlugin(ScrollTrigger);

export default function JacquemarsQuartiers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quartier-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--jqm-blanc)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-4 text-center">
          Nos quartiers
        </h2>
        <p className="text-[var(--jqm-gris)] text-center mb-12 tracking-wide">
          Decouvrez Lille et sa metropole a travers nos quartiers de predilection
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quartiers.map((q) => (
            <Link
              key={q.id}
              href={`/jacquemarsimmobilier/biens?quartier=${q.id}`}
              className="quartier-card group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${q.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--jqm-noir)]/80 via-[var(--jqm-noir)]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{q.name}</h3>
                <p className="text-white/60 text-sm">{q.propertyCount} bien{q.propertyCount > 1 ? "s" : ""}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/jacquemarsimmobilier/components/PropertyCard.tsx app/jacquemarsimmobilier/components/JacquemarsBiensVedette.tsx app/jacquemarsimmobilier/components/JacquemarsApproche.tsx app/jacquemarsimmobilier/components/JacquemarsQuartiers.tsx
git commit -m "feat(jacquemars): add featured properties, approche, and quartiers sections"
```

---

## Task 5: Homepage sections — Avis carousel, Contact, Footer

**Files:**
- Create: `app/jacquemarsimmobilier/components/ReviewCard.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsAvisCarousel.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsContact.tsx`
- Create: `app/jacquemarsimmobilier/components/JacquemarsFooter.tsx`

- [ ] **Step 1: Create ReviewCard.tsx**

```tsx
// app/jacquemarsimmobilier/components/ReviewCard.tsx
import { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-[var(--jqm-cream)] min-w-[300px] max-w-[400px] flex-shrink-0">
      <div className="text-[var(--jqm-gold)] text-4xl font-serif leading-none mb-3">&ldquo;</div>
      <p className="text-[var(--jqm-gris)] text-sm leading-relaxed mb-4">{review.text}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-[var(--jqm-noir)] text-sm">{review.name}</p>
          <p className="text-xs text-[var(--jqm-gris)]">{review.context}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i < review.rating ? "var(--jqm-gold)" : "none"}
              stroke="var(--jqm-gold)"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create JacquemarsAvisCarousel.tsx — auto-scrolling testimonials**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsAvisCarousel.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { reviews } from "../data/reviews";
import ReviewCard from "./ReviewCard";

export default function JacquemarsAvisCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 bg-[var(--jqm-cream)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-2 text-center">
          Ce que nos clients disent
        </h2>
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--jqm-gold)" stroke="var(--jqm-gold)" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-[var(--jqm-gris)] text-sm">4.8/5 — 32 avis</span>
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--jqm-burgundy)] hover:bg-[var(--jqm-cream)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--jqm-burgundy)] hover:bg-[var(--jqm-cream)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create JacquemarsContact.tsx — contact section with form**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsContact.tsx
"use client";

import { useState } from "react";
import { agents } from "../data/agents";

export default function JacquemarsContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[var(--jqm-burgundy)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-8">
            Prenons contact
          </h2>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-sm p-8 text-center">
              <div className="text-[var(--jqm-gold)] text-5xl mb-4">&#10003;</div>
              <p className="text-white text-lg mb-2">Merci pour votre message !</p>
              <p className="text-white/60 text-sm">Nous vous recontacterons dans les plus brefs delais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <input
                type="tel"
                placeholder="Votre telephone"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <input
                type="email"
                placeholder="Votre email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--jqm-gold)] text-[var(--jqm-noir)] font-semibold rounded-sm hover:bg-[var(--jqm-gold)]/90 transition-all duration-200"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="text-white">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-8">Nos coordonnees</h3>

          <div className="space-y-6 mb-10">
            <div>
              <p className="text-white/50 text-sm mb-1">Adresse</p>
              <p>61 rue Jacquemars Gielee, 3e etage</p>
              <p>59000 Lille</p>
              <p className="text-white/50 text-sm mt-1">Sur rendez-vous uniquement</p>
            </div>

            {Object.values(agents).map((agent) => (
              <div key={agent.id}>
                <p className="font-semibold">{agent.fullName}</p>
                <p className="text-white/70 text-sm">{agent.phone}</p>
                <p className="text-white/70 text-sm">{agent.email}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/jacquemarsimmobilier/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-[var(--jqm-gold)] hover:border-[var(--jqm-gold)] transition-colors"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jacquemars_immobilier/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-[var(--jqm-gold)] hover:border-[var(--jqm-gold)] transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create JacquemarsFooter.tsx**

```tsx
// app/jacquemarsimmobilier/components/JacquemarsFooter.tsx
import Link from "next/link";

export default function JacquemarsFooter() {
  return (
    <footer className="bg-[var(--jqm-noir)] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & address */}
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-white tracking-[0.3em] text-lg mb-3">
              JACQUEMARS
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              61 rue Jacquemars Gielee<br />
              3e etage — 59000 Lille<br />
              Sur rendez-vous
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/60 text-sm font-semibold mb-3 tracking-wide uppercase">Navigation</p>
            <div className="space-y-2">
              <Link href="/jacquemarsimmobilier" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Accueil</Link>
              <Link href="/jacquemarsimmobilier/biens" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Nos Biens</Link>
              <Link href="/jacquemarsimmobilier/estimation" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Estimation</Link>
              <Link href="/jacquemarsimmobilier/avis" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Avis</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-white/60 text-sm font-semibold mb-3 tracking-wide uppercase">Suivez-nous</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/jacquemarsimmobilier/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--jqm-gold)] transition-colors text-sm">Facebook</a>
              <a href="https://www.instagram.com/jacquemars_immobilier/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[var(--jqm-gold)] transition-colors text-sm">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">&copy; 2025 JACQUEMARS Immobilier — Tous droits reserves</p>
          <p className="text-white/30 text-xs">SARL au capital de 1 000 EUR — RCS 839 430 493</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/jacquemarsimmobilier/components/ReviewCard.tsx app/jacquemarsimmobilier/components/JacquemarsAvisCarousel.tsx app/jacquemarsimmobilier/components/JacquemarsContact.tsx app/jacquemarsimmobilier/components/JacquemarsFooter.tsx
git commit -m "feat(jacquemars): add avis carousel, contact section, and footer"
```

---

## Task 6: Assemble the homepage

**Files:**
- Create: `app/jacquemarsimmobilier/page.tsx`

- [ ] **Step 1: Create page.tsx composing all homepage sections**

```tsx
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
```

- [ ] **Step 2: Verify homepage renders**

Run: `cd /Users/alisterflandrinck/Documents/Pro/portfolio && npx next dev` then visit `http://localhost:3000/jacquemarsimmobilier`
Expected: Full homepage with all sections visible, navigation, hero parallax, cards, carousel, contact form, footer.

- [ ] **Step 3: Commit**

```bash
git add app/jacquemarsimmobilier/page.tsx
git commit -m "feat(jacquemars): assemble homepage with all sections"
```

---

## Task 7: Search filters and property catalog page

**Files:**
- Create: `app/jacquemarsimmobilier/components/SearchFilters.tsx`
- Create: `app/jacquemarsimmobilier/components/PropertyGrid.tsx`
- Create: `app/jacquemarsimmobilier/biens/page.tsx`

- [ ] **Step 1: Create SearchFilters.tsx — full filter panel with all criteria**

```tsx
// app/jacquemarsimmobilier/components/SearchFilters.tsx
"use client";

import { FilterState, PropertyType, TransactionType, Exterior, PropertyCondition } from "../types";
import { quartiers } from "../data/quartiers";

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  const typeOptions: { value: PropertyType; label: string }[] = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "immeuble", label: "Immeuble" },
  ];

  const transactionOptions: { value: TransactionType; label: string }[] = [
    { value: "achat", label: "Achat" },
    { value: "location", label: "Location" },
  ];

  const toggleExterior = (ext: Exterior) => {
    const next = filters.exterior.includes(ext)
      ? filters.exterior.filter((e) => e !== ext)
      : [...filters.exterior, ext];
    update({ exterior: next });
  };

  return (
    <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 space-y-6">
      {/* Transaction */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Transaction</label>
        <div className="flex gap-2">
          {transactionOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ transaction: filters.transaction === t.value ? null : t.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.transaction === t.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Type de bien</label>
        <div className="flex gap-2">
          {typeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ type: filters.type === t.value ? null : t.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.type === t.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quartier */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Quartier</label>
        <select
          value={filters.quartier || ""}
          onChange={(e) => update({ quartier: e.target.value || null })}
          className="w-full px-4 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm bg-white text-[var(--jqm-noir)] focus:outline-none focus:border-[var(--jqm-burgundy)]"
        >
          <option value="">Tous les quartiers</option>
          {quartiers.map((q) => (
            <option key={q.id} value={q.id}>{q.name}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">
          Prix: {filters.priceMin > 0 ? `${(filters.priceMin / 1000).toFixed(0)}k` : "0"} - {filters.priceMax < 1000000 ? `${(filters.priceMax / 1000).toFixed(0)}k` : "Max"} EUR
        </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={0}
            max={600000}
            step={10000}
            value={filters.priceMin}
            onChange={(e) => update({ priceMin: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
        </div>
      </div>

      {/* Surface range */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">
          Surface: {filters.surfaceMin} - {filters.surfaceMax < 500 ? filters.surfaceMax : "Max"} m²
        </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={0}
            max={300}
            step={5}
            value={filters.surfaceMin}
            onChange={(e) => update({ surfaceMin: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
          <input
            type="range"
            min={0}
            max={500}
            step={5}
            value={filters.surfaceMax}
            onChange={(e) => update({ surfaceMax: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
        </div>
      </div>

      {/* Rooms */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Pieces</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => update({ rooms: filters.rooms === n ? null : n })}
              className={`w-10 h-10 text-sm rounded-sm transition-all ${
                filters.rooms === n
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {n === 5 ? "5+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Chambres</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => update({ bedrooms: filters.bedrooms === n ? null : n })}
              className={`w-10 h-10 text-sm rounded-sm transition-all ${
                filters.bedrooms === n
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {n === 4 ? "4+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Exterior */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Exterieur</label>
        <div className="flex gap-2">
          {(["balcon", "terrasse", "jardin"] as Exterior[]).map((ext) => (
            <button
              key={ext}
              onClick={() => toggleExterior(ext)}
              className={`px-3 py-2 text-sm rounded-sm capitalize transition-all ${
                filters.exterior.includes(ext)
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {ext}
            </button>
          ))}
        </div>
      </div>

      {/* Parking */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Parking</label>
        <div className="flex gap-2">
          {(["indifferent", "oui", "non"] as const).map((val) => (
            <button
              key={val}
              onClick={() => update({ parking: val })}
              className={`px-4 py-2 text-sm rounded-sm capitalize transition-all ${
                filters.parking === val
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {val === "indifferent" ? "Indifferent" : val === "oui" ? "Oui" : "Non"}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Etat</label>
        <div className="flex flex-wrap gap-2">
          {([
            { value: "indifferent" as const, label: "Indifferent" },
            { value: "neuf" as const, label: "Neuf" },
            { value: "renove" as const, label: "Renove" },
            { value: "a-renover" as const, label: "A renover" },
          ]).map((c) => (
            <button
              key={c.value}
              onClick={() => update({ condition: c.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.condition === c.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create PropertyGrid.tsx — filterable grid with sort and animation**

```tsx
// app/jacquemarsimmobilier/components/PropertyGrid.tsx
"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Property, FilterState, SortOption } from "../types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  filters: FilterState;
  sort: SortOption;
}

function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.transaction && p.transaction !== filters.transaction) return false;
    if (filters.quartier && p.quartier !== filters.quartier) return false;
    if (p.price < filters.priceMin) return false;
    if (filters.priceMax < 1000000 && p.price > filters.priceMax) return false;
    if (p.surface < filters.surfaceMin) return false;
    if (filters.surfaceMax < 500 && p.surface > filters.surfaceMax) return false;
    if (filters.rooms && (filters.rooms === 5 ? p.rooms < 5 : p.rooms !== filters.rooms)) return false;
    if (filters.bedrooms && (filters.bedrooms === 4 ? p.bedrooms >= 4 : p.bedrooms !== filters.bedrooms)) return false;
    if (filters.exterior.length > 0 && !filters.exterior.some((ext) => p.exterior.includes(ext))) return false;
    if (filters.parking === "oui" && !p.parking) return false;
    if (filters.parking === "non" && p.parking) return false;
    if (filters.condition !== "indifferent" && p.condition !== filters.condition) return false;
    return true;
  });
}

function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "surface":
      return sorted.sort((a, b) => b.surface - a.surface);
    case "recent":
    default:
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }
}

export default function PropertyGrid({ properties, filters, sort }: PropertyGridProps) {
  const results = useMemo(
    () => sortProperties(filterProperties(properties, filters), sort),
    [properties, filters, sort]
  );

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 opacity-20">&#127968;</div>
        <p className="text-[var(--jqm-gris)] text-lg mb-2">Aucun bien ne correspond a vos criteres</p>
        <p className="text-[var(--jqm-gris)] text-sm">Essayez d&apos;elargir votre recherche</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[var(--jqm-gris)] text-sm mb-6">
        {results.length} bien{results.length > 1 ? "s" : ""} correspond{results.length > 1 ? "ent" : ""} a votre recherche
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {results.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create biens/page.tsx — catalog page with URL-synced filters**

```tsx
// app/jacquemarsimmobilier/biens/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import SearchFilters from "../components/SearchFilters";
import PropertyGrid from "../components/PropertyGrid";
import { properties } from "../data/properties";
import { FilterState, SortOption, PropertyType } from "../types";

const defaultFilters: FilterState = {
  type: null,
  transaction: null,
  quartier: null,
  surfaceMin: 0,
  surfaceMax: 500,
  priceMin: 0,
  priceMax: 1000000,
  rooms: null,
  bedrooms: null,
  exterior: [],
  parking: "indifferent",
  condition: "indifferent",
};

function BiensContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const type = searchParams.get("type") as PropertyType | null;
    const quartier = searchParams.get("quartier");
    const priceMax = searchParams.get("priceMax");
    return {
      ...defaultFilters,
      ...(type && { type }),
      ...(quartier && { quartier }),
      ...(priceMax && { priceMax: Number(priceMax) }),
    };
  });
  const [sort, setSort] = useState<SortOption>("recent");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const activeFilterCount = [
    filters.type,
    filters.transaction,
    filters.quartier,
    filters.priceMin > 0 ? true : null,
    filters.priceMax < 1000000 ? true : null,
    filters.surfaceMin > 0 ? true : null,
    filters.surfaceMax < 500 ? true : null,
    filters.rooms,
    filters.bedrooms,
    filters.exterior.length > 0 ? true : null,
    filters.parking !== "indifferent" ? true : null,
    filters.condition !== "indifferent" ? true : null,
  ].filter(Boolean).length;

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)]">
              Nos biens
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm px-3 py-2 border border-[var(--jqm-cream)] rounded-sm bg-white text-[var(--jqm-noir)] focus:outline-none"
              >
                <option value="recent">Plus recents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
                <option value="surface">Surface</option>
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.type && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.type}
                  <button onClick={() => setFilters({ ...filters, type: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              {filters.transaction && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.transaction}
                  <button onClick={() => setFilters({ ...filters, transaction: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              {filters.quartier && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.quartier.replace(/-/g, " ")}
                  <button onClick={() => setFilters({ ...filters, quartier: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              <button
                onClick={() => setFilters(defaultFilters)}
                className="px-3 py-1 text-xs text-[var(--jqm-gris)] hover:text-[var(--jqm-burgundy)] transition-colors"
              >
                Tout effacer
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            {filtersOpen && (
              <aside className="lg:w-80 flex-shrink-0">
                <SearchFilters filters={filters} onChange={setFilters} />
              </aside>
            )}

            {/* Grid */}
            <div className="flex-1">
              <PropertyGrid properties={properties} filters={filters} sort={sort} />
            </div>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}

export default function BiensPage() {
  return (
    <Suspense>
      <BiensContent />
    </Suspense>
  );
}
```

- [ ] **Step 4: Verify catalog page**

Run: Visit `http://localhost:3000/jacquemarsimmobilier/biens` in browser
Expected: Filter panel on left, property grid on right, filters functional, sort working, URL params read.

- [ ] **Step 5: Commit**

```bash
git add app/jacquemarsimmobilier/components/SearchFilters.tsx app/jacquemarsimmobilier/components/PropertyGrid.tsx app/jacquemarsimmobilier/biens/page.tsx
git commit -m "feat(jacquemars): add property catalog with full filter system"
```

---

## Task 8: Property detail page

**Files:**
- Create: `app/jacquemarsimmobilier/components/PropertyGallery.tsx`
- Create: `app/jacquemarsimmobilier/components/AgentCard.tsx`
- Create: `app/jacquemarsimmobilier/biens/[id]/page.tsx`

- [ ] **Step 1: Create PropertyGallery.tsx — image gallery with lightbox**

```tsx
// app/jacquemarsimmobilier/components/PropertyGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyGalleryProps {
  images: string[];
  alt: string;
}

export default function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-sm cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[selected]}
            alt={`${alt} — photo ${selected + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden transition-all ${
                  i === selected ? "ring-2 ring-[var(--jqm-burgundy)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${alt} — miniature ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              onClick={() => setLightbox(false)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav arrows */}
            {selected > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}
                className="absolute left-4 text-white/60 hover:text-white"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {selected < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}
                className="absolute right-4 text-white/60 hover:text-white"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            <div className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selected]}
                alt={`${alt} — photo ${selected + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Create AgentCard.tsx**

```tsx
// app/jacquemarsimmobilier/components/AgentCard.tsx
import { Agent } from "../types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
      {/* Avatar placeholder */}
      <div className="w-16 h-16 rounded-full bg-[var(--jqm-burgundy)] flex items-center justify-center text-white text-xl font-semibold mb-4">
        {agent.name[0]}
      </div>
      <p className="font-semibold text-[var(--jqm-noir)]">{agent.fullName}</p>
      <p className="text-xs text-[var(--jqm-gris)] mb-4">Conseiller immobilier</p>
      <div className="space-y-2">
        <a
          href={`tel:${agent.phone.replace(/\./g, "")}`}
          className="flex items-center gap-2 text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors break-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {agent.email}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create biens/[id]/page.tsx — property detail page**

```tsx
// app/jacquemarsimmobilier/biens/[id]/page.tsx
"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import JacquemarsNav from "../../components/JacquemarsNav";
import JacquemarsFooter from "../../components/JacquemarsFooter";
import PropertyGallery from "../../components/PropertyGallery";
import AgentCard from "../../components/AgentCard";
import PropertyCard from "../../components/PropertyCard";
import { properties } from "../../data/properties";
import { agents } from "../../data/agents";
import { quartiers } from "../../data/quartiers";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  if (!property) return notFound();

  const agent = agents[property.agent];
  const quartier = quartiers.find((q) => q.id === property.quartier);
  const similar = properties
    .filter((p) => p.id !== property.id && (p.quartier === property.quartier || Math.abs(p.price - property.price) < 100000))
    .slice(0, 3);

  const formattedPrice = property.transaction === "location"
    ? `${property.price.toLocaleString("fr-FR")} EUR/mois`
    : `${property.price.toLocaleString("fr-FR")} EUR`;

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--jqm-gris)] mb-6">
            <Link href="/jacquemarsimmobilier" className="hover:text-[var(--jqm-burgundy)] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/jacquemarsimmobilier/biens" className="hover:text-[var(--jqm-burgundy)] transition-colors">Nos biens</Link>
            <span>/</span>
            <span className="text-[var(--jqm-noir)]">{property.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} alt={property.title} />

              {/* Key info banner */}
              <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Prix</p>
                  <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--jqm-noir)]">{formattedPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Surface</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.surface} m²</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Pieces</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.rooms}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Chambres</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Quartier</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)] capitalize">{property.quartier.replace(/-/g, " ")}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-4">{property.title}</h2>
                <p className="text-[var(--jqm-gris)] leading-relaxed">{property.description}</p>
              </div>

              {/* Features grid */}
              <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
                <h3 className="font-semibold text-[var(--jqm-noir)] mb-4">Caracteristiques</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-[var(--jqm-gris)]">Type:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.type}</span></div>
                  <div><span className="text-[var(--jqm-gris)]">Transaction:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.transaction}</span></div>
                  <div><span className="text-[var(--jqm-gris)]">Etat:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.condition.replace(/-/g, " ")}</span></div>
                  {property.floor !== undefined && <div><span className="text-[var(--jqm-gris)]">Etage:</span> <span className="text-[var(--jqm-noir)]">{property.floor}</span></div>}
                  {property.orientation && <div><span className="text-[var(--jqm-gris)]">Orientation:</span> <span className="text-[var(--jqm-noir)]">{property.orientation}</span></div>}
                  {property.heating && <div><span className="text-[var(--jqm-gris)]">Chauffage:</span> <span className="text-[var(--jqm-noir)]">{property.heating}</span></div>}
                  {property.dpe && <div><span className="text-[var(--jqm-gris)]">DPE:</span> <span className="text-[var(--jqm-noir)]">{property.dpe}</span></div>}
                  {property.yearBuilt && <div><span className="text-[var(--jqm-gris)]">Annee:</span> <span className="text-[var(--jqm-noir)]">{property.yearBuilt}</span></div>}
                  {property.charges !== undefined && property.charges > 0 && <div><span className="text-[var(--jqm-gris)]">Charges:</span> <span className="text-[var(--jqm-noir)]">{property.charges} EUR/mois</span></div>}
                  <div><span className="text-[var(--jqm-gris)]">Parking:</span> <span className="text-[var(--jqm-noir)]">{property.parking ? "Oui" : "Non"}</span></div>
                  {property.exterior.length > 0 && <div><span className="text-[var(--jqm-gris)]">Exterieur:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.exterior.join(", ")}</span></div>}
                </div>
                {property.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--jqm-cream)]">
                    <h4 className="text-sm font-semibold text-[var(--jqm-noir)] mb-2">Points forts</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((f) => (
                        <span key={f} className="px-3 py-1 bg-[var(--jqm-cream)] text-[var(--jqm-gris)] text-xs rounded-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quartier */}
              {quartier && (
                <div>
                  <h3 className="font-semibold text-[var(--jqm-noir)] mb-2">Localisation — {quartier.name}</h3>
                  <p className="text-[var(--jqm-gris)] text-sm">{quartier.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AgentCard agent={agent} />

              {/* Visit CTA */}
              {!showVisitForm ? (
                <button
                  onClick={() => setShowVisitForm(true)}
                  className="w-full py-3 bg-[var(--jqm-burgundy)] text-white font-semibold rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors"
                >
                  Demander une visite
                </button>
              ) : visitSubmitted ? (
                <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 text-center">
                  <p className="text-[var(--jqm-burgundy)] font-semibold mb-1">Demande envoyee !</p>
                  <p className="text-[var(--jqm-gris)] text-sm">Nous vous recontacterons rapidement.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setVisitSubmitted(true); }}
                  className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 space-y-3"
                >
                  <p className="font-semibold text-[var(--jqm-noir)] text-sm mb-2">Demander une visite</p>
                  <input type="text" placeholder="Votre nom" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <input type="tel" placeholder="Telephone" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <input type="email" placeholder="Email" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <button type="submit" className="w-full py-2 bg-[var(--jqm-burgundy)] text-white text-sm rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors">
                    Envoyer ma demande
                  </button>
                </form>
              )}
            </aside>
          </div>

          {/* Similar properties */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-8">Biens similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
```

- [ ] **Step 4: Verify detail page**

Run: Visit `http://localhost:3000/jacquemarsimmobilier/biens/jqm-001`
Expected: Gallery, info, features, agent card, visit form, similar properties.

- [ ] **Step 5: Commit**

```bash
git add app/jacquemarsimmobilier/components/PropertyGallery.tsx app/jacquemarsimmobilier/components/AgentCard.tsx app/jacquemarsimmobilier/biens/\[id\]/page.tsx
git commit -m "feat(jacquemars): add property detail page with gallery and agent card"
```

---

## Task 9: Estimation page with stepper form

**Files:**
- Create: `app/jacquemarsimmobilier/components/EstimationStepper.tsx`
- Create: `app/jacquemarsimmobilier/estimation/page.tsx`

- [ ] **Step 1: Create EstimationStepper.tsx — 3-step animated form**

```tsx
// app/jacquemarsimmobilier/components/EstimationStepper.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quartiers } from "../data/quartiers";

interface StepData {
  type: string;
  surface: string;
  rooms: string;
  quartier: string;
  floor: string;
  condition: string;
  name: string;
  phone: string;
  email: string;
}

export default function EstimationStepper() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>({
    type: "", surface: "", rooms: "", quartier: "", floor: "", condition: "",
    name: "", phone: "", email: "",
  });

  const update = (field: keyof StepData, value: string) => setData({ ...data, [field]: value });

  const canProceed = step === 0
    ? data.type && data.surface && data.rooms && data.quartier
    : step === 1
    ? data.name && data.email
    : true;

  const steps = ["Votre bien", "Vos coordonnees", "Confirmation"];

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              i <= step ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i <= step ? "text-[var(--jqm-noir)]" : "text-[var(--jqm-gris)]"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[var(--jqm-burgundy)]" : "bg-[var(--jqm-cream)]"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Type de bien</label>
              <div className="flex gap-2">
                {["Appartement", "Maison"].map((t) => (
                  <button key={t} onClick={() => update("type", t.toLowerCase())}
                    className={`px-5 py-2 text-sm rounded-sm transition-all ${data.type === t.toLowerCase() ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Surface (m²)</label>
              <input type="number" value={data.surface} onChange={(e) => update("surface", e.target.value)} placeholder="Ex: 75"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Nombre de pieces</label>
              <div className="flex gap-2">
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <button key={n} onClick={() => update("rooms", n)}
                    className={`w-12 h-12 text-sm rounded-sm transition-all ${data.rooms === n ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Quartier / Ville</label>
              <select value={data.quartier} onChange={(e) => update("quartier", e.target.value)}
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]">
                <option value="">Selectionnez</option>
                {quartiers.map((q) => <option key={q.id} value={q.id}>{q.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Etage</label>
                <input type="text" value={data.floor} onChange={(e) => update("floor", e.target.value)} placeholder="Ex: 3"
                  className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Etat general</label>
                <select value={data.condition} onChange={(e) => update("condition", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]">
                  <option value="">Selectionnez</option>
                  <option value="neuf">Neuf</option>
                  <option value="renove">Renove</option>
                  <option value="a-renover">A renover</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Votre nom</label>
              <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Prenom Nom"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Telephone</label>
              <input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="06 XX XX XX XX"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Email</label>
              <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.fr"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-[var(--jqm-cream)] rounded-sm p-6 mb-6">
              <h3 className="font-semibold text-[var(--jqm-noir)] mb-4">Recapitulatif</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[var(--jqm-gris)]">Type:</span> <span className="capitalize">{data.type}</span></div>
                <div><span className="text-[var(--jqm-gris)]">Surface:</span> {data.surface} m²</div>
                <div><span className="text-[var(--jqm-gris)]">Pieces:</span> {data.rooms}</div>
                <div><span className="text-[var(--jqm-gris)]">Quartier:</span> <span className="capitalize">{data.quartier.replace(/-/g, " ")}</span></div>
                {data.floor && <div><span className="text-[var(--jqm-gris)]">Etage:</span> {data.floor}</div>}
                {data.condition && <div><span className="text-[var(--jqm-gris)]">Etat:</span> <span className="capitalize">{data.condition.replace(/-/g, " ")}</span></div>}
                <div className="col-span-2 pt-2 border-t border-white/50"><span className="text-[var(--jqm-gris)]">Nom:</span> {data.name}</div>
                {data.phone && <div><span className="text-[var(--jqm-gris)]">Tel:</span> {data.phone}</div>}
                <div><span className="text-[var(--jqm-gris)]">Email:</span> {data.email}</div>
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[var(--jqm-burgundy)] text-white font-semibold rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors"
            >
              Demander mon estimation gratuite
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="text-[var(--jqm-gold)] text-6xl mb-4">&#10003;</div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-3">Merci {data.name} !</h3>
            <p className="text-[var(--jqm-gris)]">Votre demande d&apos;estimation a bien ete enregistree. Nous vous recontacterons tres rapidement.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 3 && step < 2 && (
        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2 text-sm text-[var(--jqm-gris)] hover:text-[var(--jqm-noir)] transition-colors">
              Retour
            </button>
          )}
          <button
            onClick={() => canProceed && setStep(step + 1)}
            className={`px-6 py-2 text-sm rounded-sm ml-auto transition-all ${
              canProceed
                ? "bg-[var(--jqm-burgundy)] text-white hover:bg-[var(--jqm-burgundy-light)]"
                : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] cursor-not-allowed"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="flex justify-between mt-8">
          <button onClick={() => setStep(0)} className="px-6 py-2 text-sm text-[var(--jqm-gris)] hover:text-[var(--jqm-noir)] transition-colors">
            Retour
          </button>
          <button
            onClick={() => canProceed && setStep(2)}
            className={`px-6 py-2 text-sm rounded-sm transition-all ${
              canProceed
                ? "bg-[var(--jqm-burgundy)] text-white hover:bg-[var(--jqm-burgundy-light)]"
                : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] cursor-not-allowed"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create estimation/page.tsx**

```tsx
// app/jacquemarsimmobilier/estimation/page.tsx
"use client";

import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import EstimationStepper from "../components/EstimationStepper";
import { agents } from "../data/agents";

export default function EstimationPage() {
  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-4">
              Estimation gratuite de votre bien
            </h1>
            <p className="text-[var(--jqm-gris)] max-w-xl mx-auto">
              Recevez une estimation professionnelle de votre appartement ou maison a Lille et sa metropole.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <EstimationStepper />
            </div>

            <aside className="hidden lg:block">
              <div className="bg-[var(--jqm-cream)] rounded-sm p-6 sticky top-28">
                <div className="w-20 h-20 rounded-full bg-[var(--jqm-burgundy)] flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4">
                  J
                </div>
                <blockquote className="text-center text-[var(--jqm-gris)] text-sm italic mb-6">
                  &ldquo;Notre ambition : vous rendre un service durable et de qualite.&rdquo;
                </blockquote>
                <div className="space-y-3 text-sm">
                  {Object.values(agents).map((agent) => (
                    <div key={agent.id} className="text-center">
                      <p className="font-semibold text-[var(--jqm-noir)]">{agent.fullName}</p>
                      <p className="text-[var(--jqm-burgundy)]">{agent.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
```

- [ ] **Step 3: Verify estimation page**

Run: Visit `http://localhost:3000/jacquemarsimmobilier/estimation`
Expected: 3-step form with animated transitions, progress bar, sidebar with agent info.

- [ ] **Step 4: Commit**

```bash
git add app/jacquemarsimmobilier/components/EstimationStepper.tsx app/jacquemarsimmobilier/estimation/page.tsx
git commit -m "feat(jacquemars): add estimation page with 3-step stepper form"
```

---

## Task 10: Reviews page

**Files:**
- Create: `app/jacquemarsimmobilier/avis/page.tsx`

- [ ] **Step 1: Create avis/page.tsx — masonry reviews page**

```tsx
// app/jacquemarsimmobilier/avis/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import { reviews } from "../data/reviews";

gsap.registerPlugin(ScrollTrigger);

export default function AvisPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-6">
              Ce que nos clients disent de nous
            </h1>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="font-[family-name:var(--font-sora)] text-4xl font-bold text-[var(--jqm-noir)]">{avgRating}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--jqm-gold)" stroke="var(--jqm-gold)" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--jqm-gris)] text-sm">32 avis</p>
              </div>
            </div>
          </div>

          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="review-card break-inside-avoid bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
                <div className="text-[var(--jqm-gold)] text-3xl font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-[var(--jqm-gris)] text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--jqm-noir)] text-sm">{review.name}</p>
                    <p className="text-xs text-[var(--jqm-gris)]">{review.context}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < review.rating ? "var(--jqm-gold)" : "none"} stroke="var(--jqm-gold)" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--jqm-burgundy)] text-[var(--jqm-burgundy)] rounded-sm hover:bg-[var(--jqm-burgundy)] hover:text-white transition-all duration-300"
            >
              Vous aussi, partagez votre experience
            </a>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
```

- [ ] **Step 2: Verify reviews page**

Run: Visit `http://localhost:3000/jacquemarsimmobilier/avis`
Expected: Masonry grid of review cards with stagger animation, rating summary at top.

- [ ] **Step 3: Commit**

```bash
git add app/jacquemarsimmobilier/avis/page.tsx
git commit -m "feat(jacquemars): add reviews page with masonry layout"
```

---

## Task 11: Final integration and polish

**Files:**
- Verify all pages render without errors
- Check responsive behavior
- Verify all internal links work

- [ ] **Step 1: Run dev server and verify all routes**

Run: `cd /Users/alisterflandrinck/Documents/Pro/portfolio && npx next dev`

Visit each route and verify:
- `/jacquemarsimmobilier` — Homepage with all sections
- `/jacquemarsimmobilier/biens` — Catalog with filters
- `/jacquemarsimmobilier/biens/jqm-001` — Detail page
- `/jacquemarsimmobilier/estimation` — Stepper form
- `/jacquemarsimmobilier/avis` — Reviews page

- [ ] **Step 2: Run build to check for errors**

Run: `cd /Users/alisterflandrinck/Documents/Pro/portfolio && npx next build 2>&1 | tail -30`
Expected: Build succeeds with all pages generated.

- [ ] **Step 3: Fix any build errors found**

Address TypeScript errors, missing imports, or Next.js warnings.

- [ ] **Step 4: Final commit**

```bash
git add -A app/jacquemarsimmobilier/
git commit -m "feat(jacquemars): complete Jacquemars Immobilier site — all pages and components"
```
