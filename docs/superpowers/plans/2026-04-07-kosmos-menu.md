# Kosmos Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first interactive restaurant menu at `/kosmos` with tabbed categories, photos, 4-language support, and Kosmos branding (dark + gold).

**Architecture:** Standalone Next.js page under `app/kosmos/` with its own layout, language state (useState + localStorage), and static menu data. No connection to the portfolio's navigation or i18n. Framer Motion for tab transitions.

**Tech Stack:** Next.js 16, Tailwind CSS, Framer Motion, TypeScript

---

## File Structure

```
app/kosmos/
  layout.tsx              — Standalone layout with Kosmos metadata, dark bg
  page.tsx                — Main page, assembles all components
  types.ts                — MenuItem, MenuCategory, Language types
  data/
    menu.ts               — All menu categories + items with 4-language translations
  components/
    KosmosHeader.tsx      — Logo (left) + LanguageDropdown (right)
    LanguageDropdown.tsx   — Compact dropdown: "FR ▾" → FR/NL/EN/DE
    CategoryTabs.tsx      — Horizontal scrollable tab bar
    MenuItemCard.tsx      — Single item: photo + name + description + price
    MenuSection.tsx       — Renders list of MenuItemCard for active category
    KosmosFooter.tsx      — Address, hours, allergen note
```

---

### Task 1: Types and Data

**Files:**
- Create: `app/kosmos/types.ts`
- Create: `app/kosmos/data/menu.ts`

- [ ] **Step 1: Create types**

```typescript
// app/kosmos/types.ts
export type Language = "fr" | "nl" | "en" | "de";

export interface Translatable {
  fr: string;
  nl: string;
  en: string;
  de: string;
}

export interface MenuItem {
  id: string;
  name: Translatable;
  description: Translatable;
  price: number;
  image: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: Translatable;
  items: MenuItem[];
}
```

- [ ] **Step 2: Create menu data with all 6 categories**

```typescript
// app/kosmos/data/menu.ts
import { MenuCategory } from "../types";

export const menuCategories: MenuCategory[] = [
  {
    id: "tapas",
    name: { fr: "Tapas", nl: "Tapas", en: "Tapas", de: "Tapas" },
    items: [
      {
        id: "patatas-bravas",
        name: { fr: "Patatas Bravas", nl: "Patatas Bravas", en: "Patatas Bravas", de: "Patatas Bravas" },
        description: {
          fr: "Pommes de terre croustillantes, sauce brava maison, aïoli",
          nl: "Krokante aardappelen, huisgemaakte brava saus, aioli",
          en: "Crispy potatoes, homemade brava sauce, aioli",
          de: "Knusprige Kartoffeln, hausgemachte Brava-Sauce, Aioli",
        },
        price: 8.5,
        image: "https://images.unsplash.com/photo-1600335895229-6bf01954139a?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "gambas-al-ajillo",
        name: { fr: "Gambas al Ajillo", nl: "Gambas al Ajillo", en: "Garlic Shrimp", de: "Knoblauchgarnelen" },
        description: {
          fr: "Crevettes sautées à l'ail, piment, huile d'olive, pain grillé",
          nl: "Gebakken garnalen met knoflook, chili, olijfolie, geroosterd brood",
          en: "Sautéed shrimp with garlic, chili, olive oil, toasted bread",
          de: "Gebratene Garnelen mit Knoblauch, Chili, Olivenöl, geröstetem Brot",
        },
        price: 12.5,
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "croquetas-jamon",
        name: { fr: "Croquetas de Jamón", nl: "Hamkroketten", en: "Ham Croquettes", de: "Schinkenkroketten" },
        description: {
          fr: "Croquettes croustillantes au jambon ibérique, béchamel onctueuse",
          nl: "Krokante kroketten met Iberische ham, romige bechamel",
          en: "Crispy croquettes with Iberian ham, creamy béchamel",
          de: "Knusprige Kroketten mit iberischem Schinken, cremige Béchamel",
        },
        price: 9.0,
        image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "bruschetta-avocado",
        name: { fr: "Bruschetta Avocado", nl: "Bruschetta Avocado", en: "Avocado Bruschetta", de: "Avocado Bruschetta" },
        description: {
          fr: "Toast croustillant, avocat frais, tomates cerises, basilic, balsamique",
          nl: "Krokante toast, verse avocado, kerstomaten, basilicum, balsamico",
          en: "Crispy toast, fresh avocado, cherry tomatoes, basil, balsamic",
          de: "Knuspriger Toast, frische Avocado, Kirschtomaten, Basilikum, Balsamico",
        },
        price: 10.0,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "calamares-fritos",
        name: { fr: "Calamares Fritos", nl: "Gefrituurde Calamares", en: "Fried Calamari", de: "Frittierte Calamari" },
        description: {
          fr: "Anneaux de calamars croustillants, sauce tartare citronnée",
          nl: "Krokante calamaris ringen, citroentartaarsaus",
          en: "Crispy calamari rings, lemon tartare sauce",
          de: "Knusprige Calamari-Ringe, Zitronen-Tartarsauce",
        },
        price: 11.0,
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "plats",
    name: { fr: "Plats", nl: "Gerechten", en: "Mains", de: "Hauptgerichte" },
    items: [
      {
        id: "burger-kosmos",
        name: { fr: "Burger Kosmos", nl: "Kosmos Burger", en: "Kosmos Burger", de: "Kosmos Burger" },
        description: {
          fr: "Bœuf Angus, cheddar affiné, oignons caramélisés, sauce maison",
          nl: "Angus rund, gerijpte cheddar, gekaramelliseerde uien, huissaus",
          en: "Angus beef, aged cheddar, caramelized onions, house sauce",
          de: "Angus-Rind, gereifter Cheddar, karamellisierte Zwiebeln, Haussauce",
        },
        price: 18.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "risotto-truffe",
        name: { fr: "Risotto à la Truffe", nl: "Truffelrisotto", en: "Truffle Risotto", de: "Trüffelrisotto" },
        description: {
          fr: "Riz arborio crémeux, huile de truffe, parmesan, roquette",
          nl: "Romige arborio rijst, truffelolie, parmezaan, rucola",
          en: "Creamy arborio rice, truffle oil, parmesan, arugula",
          de: "Cremiger Arborio-Reis, Trüffelöl, Parmesan, Rucola",
        },
        price: 19.0,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop&crop=center",
        tags: ["vegetarian"],
      },
      {
        id: "pasta-gambas",
        name: { fr: "Pasta aux Gambas", nl: "Pasta met Garnalen", en: "Shrimp Pasta", de: "Garnelen-Pasta" },
        description: {
          fr: "Linguine, gambas grillées, tomates cerises, ail, basilic frais",
          nl: "Linguine, gegrilde garnalen, kerstomaten, knoflook, verse basilicum",
          en: "Linguine, grilled shrimp, cherry tomatoes, garlic, fresh basil",
          de: "Linguine, gegrillte Garnelen, Kirschtomaten, Knoblauch, frisches Basilikum",
        },
        price: 21.0,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "cocktails",
    name: { fr: "Cocktails", nl: "Cocktails", en: "Cocktails", de: "Cocktails" },
    items: [
      {
        id: "picon-kosmos",
        name: { fr: "Picon Kosmos", nl: "Picon Kosmos", en: "Picon Kosmos", de: "Picon Kosmos" },
        description: {
          fr: "Notre picon signature, orange amère, mousse onctueuse",
          nl: "Onze signature picon, bittere sinaasappel, romig schuim",
          en: "Our signature picon, bitter orange, creamy foam",
          de: "Unser Signature Picon, Bitterorange, cremiger Schaum",
        },
        price: 7.5,
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "mojito-classique",
        name: { fr: "Mojito Classique", nl: "Klassieke Mojito", en: "Classic Mojito", de: "Klassischer Mojito" },
        description: {
          fr: "Rhum blanc, menthe fraîche, citron vert, sucre de canne, eau pétillante",
          nl: "Witte rum, verse munt, limoen, rietsuiker, bruiswater",
          en: "White rum, fresh mint, lime, cane sugar, sparkling water",
          de: "Weißer Rum, frische Minze, Limette, Rohrzucker, Sprudelwasser",
        },
        price: 10.0,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "espresso-martini",
        name: { fr: "Espresso Martini", nl: "Espresso Martini", en: "Espresso Martini", de: "Espresso Martini" },
        description: {
          fr: "Vodka, liqueur de café, espresso frais, mousse crémeuse",
          nl: "Wodka, koffielikeur, verse espresso, romig schuim",
          en: "Vodka, coffee liqueur, fresh espresso, creamy foam",
          de: "Wodka, Kaffeelikör, frischer Espresso, cremiger Schaum",
        },
        price: 12.0,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "vins",
    name: { fr: "Vins", nl: "Wijnen", en: "Wines", de: "Weine" },
    items: [
      {
        id: "rioja-reserva",
        name: { fr: "Rioja Reserva", nl: "Rioja Reserva", en: "Rioja Reserva", de: "Rioja Reserva" },
        description: {
          fr: "Vin rouge espagnol, notes de fruits mûrs et vanille, 75cl",
          nl: "Spaanse rode wijn, tonen van rijp fruit en vanille, 75cl",
          en: "Spanish red wine, notes of ripe fruit and vanilla, 75cl",
          de: "Spanischer Rotwein, Noten von reifem Obst und Vanille, 75cl",
        },
        price: 28.0,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "prosecco",
        name: { fr: "Prosecco", nl: "Prosecco", en: "Prosecco", de: "Prosecco" },
        description: {
          fr: "Vin pétillant italien, frais et léger, coupe",
          nl: "Italiaanse mousserende wijn, fris en licht, glas",
          en: "Italian sparkling wine, fresh and light, glass",
          de: "Italienischer Schaumwein, frisch und leicht, Glas",
        },
        price: 7.0,
        image: "https://images.unsplash.com/photo-1566995541428-f2246e17f722?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "softs",
    name: { fr: "Softs", nl: "Frisdranken", en: "Soft Drinks", de: "Alkoholfreie Getränke" },
    items: [
      {
        id: "limonade-maison",
        name: { fr: "Limonade Maison", nl: "Huisgemaakte Limonade", en: "Homemade Lemonade", de: "Hausgemachte Limonade" },
        description: {
          fr: "Citron frais pressé, menthe, sucre de canne, eau pétillante",
          nl: "Vers geperste citroen, munt, rietsuiker, bruiswater",
          en: "Fresh squeezed lemon, mint, cane sugar, sparkling water",
          de: "Frisch gepresste Zitrone, Minze, Rohrzucker, Sprudelwasser",
        },
        price: 5.5,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "virgin-mojito",
        name: { fr: "Virgin Mojito", nl: "Virgin Mojito", en: "Virgin Mojito", de: "Virgin Mojito" },
        description: {
          fr: "Menthe fraîche, citron vert, sucre de canne, eau pétillante, sans alcool",
          nl: "Verse munt, limoen, rietsuiker, bruiswater, alcoholvrij",
          en: "Fresh mint, lime, cane sugar, sparkling water, non-alcoholic",
          de: "Frische Minze, Limette, Rohrzucker, Sprudelwasser, alkoholfrei",
        },
        price: 7.0,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "bieres",
    name: { fr: "Bières", nl: "Bieren", en: "Beers", de: "Biere" },
    items: [
      {
        id: "duvel",
        name: { fr: "Duvel", nl: "Duvel", en: "Duvel", de: "Duvel" },
        description: {
          fr: "Blonde belge forte, 8.5%, 33cl",
          nl: "Sterk Belgisch blond, 8.5%, 33cl",
          en: "Strong Belgian blonde, 8.5%, 33cl",
          de: "Starkes belgisches Blondes, 8.5%, 33cl",
        },
        price: 5.0,
        image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "chimay-bleue",
        name: { fr: "Chimay Bleue", nl: "Chimay Blauw", en: "Chimay Blue", de: "Chimay Blau" },
        description: {
          fr: "Trappiste brune, notes de caramel et fruits secs, 9%, 33cl",
          nl: "Bruin trappistenbier, tonen van karamel en gedroogd fruit, 9%, 33cl",
          en: "Dark trappist, notes of caramel and dried fruit, 9%, 33cl",
          de: "Dunkles Trappistenbier, Noten von Karamell und Trockenfrüchten, 9%, 33cl",
        },
        price: 5.5,
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&crop=center",
      },
      {
        id: "jupiler",
        name: { fr: "Jupiler", nl: "Jupiler", en: "Jupiler", de: "Jupiler" },
        description: {
          fr: "Pils belge classique, 5.2%, 25cl",
          nl: "Klassieke Belgische pils, 5.2%, 25cl",
          en: "Classic Belgian pilsner, 5.2%, 25cl",
          de: "Klassisches belgisches Pils, 5.2%, 25cl",
        },
        price: 3.0,
        image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop&crop=center",
      },
    ],
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add app/kosmos/types.ts app/kosmos/data/menu.ts
git commit -m "feat(kosmos): add types and menu data with 4-language translations"
```

---

### Task 2: Standalone Layout

**Files:**
- Create: `app/kosmos/layout.tsx`

- [ ] **Step 1: Create Kosmos layout**

```tsx
// app/kosmos/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosmos Ieper — Menu",
  description: "Carte du Restaurant-Eetcafé Kosmos, Grote Markt 26, Ieper. Tapas, cocktails & more.",
};

export default function KosmosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify dev server starts without errors**

Run: `npm run dev`
Expected: No errors, `/kosmos` route is available (will be a blank dark page for now).

- [ ] **Step 3: Commit**

```bash
git add app/kosmos/layout.tsx
git commit -m "feat(kosmos): add standalone layout with dark theme"
```

---

### Task 3: Header + Language Dropdown

**Files:**
- Create: `app/kosmos/components/LanguageDropdown.tsx`
- Create: `app/kosmos/components/KosmosHeader.tsx`

- [ ] **Step 1: Create LanguageDropdown**

```tsx
// app/kosmos/components/LanguageDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Language } from "../types";

const languageLabels: Record<Language, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
  de: "DE",
};

interface LanguageDropdownProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageDropdown({ language, onLanguageChange }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md border border-[#d4af37]/30 bg-[#d4af37]/15 px-3 py-1.5 text-xs font-medium text-[#d4af37] transition-colors hover:bg-[#d4af37]/25"
      >
        {languageLabels[language]}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 overflow-hidden rounded-md border border-white/10 bg-[#1a1a1a] shadow-lg">
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onLanguageChange(lang);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-xs transition-colors hover:bg-white/5 ${
                lang === language ? "text-[#d4af37]" : "text-white/70"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create KosmosHeader**

```tsx
// app/kosmos/components/KosmosHeader.tsx
"use client";

import { Language } from "../types";
import LanguageDropdown from "./LanguageDropdown";

interface KosmosHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function KosmosHeader({ language, onLanguageChange }: KosmosHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#d4af37]/20 px-5 py-4">
      <img
        src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
        alt="Kosmos Ieper"
        className="h-9"
      />
      <LanguageDropdown language={language} onLanguageChange={onLanguageChange} />
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/kosmos/components/LanguageDropdown.tsx app/kosmos/components/KosmosHeader.tsx
git commit -m "feat(kosmos): add header with logo and language dropdown"
```

---

### Task 4: Category Tabs

**Files:**
- Create: `app/kosmos/components/CategoryTabs.tsx`

- [ ] **Step 1: Create CategoryTabs**

```tsx
// app/kosmos/components/CategoryTabs.tsx
"use client";

import { useRef, useEffect } from "react";
import { MenuCategory, Language } from "../types";

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  language: Language;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange, language }: CategoryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const tab = activeRef.current;
      const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div
      ref={tabsRef}
      className="flex overflow-x-auto border-b border-white/10 px-3 scrollbar-none"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-3 text-[13px] transition-colors ${
              isActive
                ? "border-b-2 border-[#d4af37] font-semibold text-[#d4af37]"
                : "text-white/50 hover:text-white/70"
            }`}
          >
            {cat.name[language]}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/kosmos/components/CategoryTabs.tsx
git commit -m "feat(kosmos): add horizontal scrollable category tabs"
```

---

### Task 5: Menu Item Card + Menu Section

**Files:**
- Create: `app/kosmos/components/MenuItemCard.tsx`
- Create: `app/kosmos/components/MenuSection.tsx`

- [ ] **Step 1: Create MenuItemCard**

```tsx
// app/kosmos/components/MenuItemCard.tsx
"use client";

import { MenuItem, Language } from "../types";

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
}

export default function MenuItemCard({ item, language }: MenuItemCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <img
        src={item.image}
        alt={item.name[language]}
        loading="lazy"
        className="h-20 w-20 flex-shrink-0 rounded-[10px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-white">{item.name[language]}</h3>
          <span className="whitespace-nowrap text-[15px] font-bold text-[#d4af37]">
            €{item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          {item.description[language]}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create MenuSection with Framer Motion transition**

```tsx
// app/kosmos/components/MenuSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuCategory, Language } from "../types";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  category: MenuCategory;
  language: Language;
}

export default function MenuSection({ category, language }: MenuSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-3 p-4"
      >
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} language={language} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/kosmos/components/MenuItemCard.tsx app/kosmos/components/MenuSection.tsx
git commit -m "feat(kosmos): add menu item cards and animated section"
```

---

### Task 6: Footer

**Files:**
- Create: `app/kosmos/components/KosmosFooter.tsx`

- [ ] **Step 1: Create KosmosFooter**

```tsx
// app/kosmos/components/KosmosFooter.tsx
import { Language } from "../types";

const allergenNote: Record<Language, string> = {
  fr: "Allergènes ? Demandez à votre serveur",
  nl: "Allergenen? Vraag het aan uw ober",
  en: "Allergens? Ask your server",
  de: "Allergene? Fragen Sie Ihren Kellner",
};

interface KosmosFooterProps {
  language: Language;
}

export default function KosmosFooter({ language }: KosmosFooterProps) {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-4 text-center">
      <p className="text-[11px] text-white/30">
        Grote Markt 26, 8900 Ieper · Mar-Dim 11h-23h
      </p>
      <p className="mt-1 text-[11px] text-[#d4af37]/40">
        {allergenNote[language]}
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/kosmos/components/KosmosFooter.tsx
git commit -m "feat(kosmos): add footer with address and allergen note"
```

---

### Task 7: Main Page — Assemble Everything

**Files:**
- Create: `app/kosmos/page.tsx`

- [ ] **Step 1: Create main page**

```tsx
// app/kosmos/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Language } from "./types";
import { menuCategories } from "./data/menu";
import KosmosHeader from "./components/KosmosHeader";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";
import KosmosFooter from "./components/KosmosFooter";

export default function KosmosPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  const currentCategory = menuCategories.find((c) => c.id === activeCategory) ?? menuCategories[0];

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col">
      <KosmosHeader language={language} onLanguageChange={handleLanguageChange} />
      <CategoryTabs
        categories={menuCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        language={language}
      />
      <div className="flex-1">
        <MenuSection category={currentCategory} language={language} />
      </div>
      <KosmosFooter language={language} />
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:3000/kosmos`
Expected:
- Dark background with gold accents
- Kosmos logo + FR dropdown in header
- 6 category tabs (Tapas active by default)
- 5 tapas items with photos, names, descriptions, prices
- Clicking tabs switches category with animation
- Changing language updates all text
- Footer shows address and allergen note

- [ ] **Step 3: Commit**

```bash
git add app/kosmos/page.tsx
git commit -m "feat(kosmos): assemble main menu page with all components"
```

---

### Task 8: Final Polish — Build Check

**Files:** None new

- [ ] **Step 1: Run build to catch any TypeScript errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Test on mobile viewport**

Open browser DevTools, set viewport to 375px width.
Verify:
- Tabs scroll horizontally
- Cards layout correctly
- Text doesn't overflow
- Images load and display at correct size
- Language dropdown opens and closes properly

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(kosmos): polish and fix any build issues"
```
