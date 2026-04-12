# Kosmos Menu — Interactive QR Code Menu

## Overview

A mobile-first interactive digital menu for Restaurant-Eetcafe Kosmos Ieper, accessible via QR code scan at `/kosmos`. The menu showcases tapas, drinks, and dishes with photos, descriptions, and prices in 4 languages.

## Context

- **Client:** Restaurant-Eetcafe Kosmos, Grote Markt 26, 8900 Ieper, Belgium
- **Concept:** Spanish & Italian tapas bar, cocktails, mocktails
- **Existing site:** https://www.kosmosieper.be/ (JouwWeb, no scrapeable menu)
- **Hours:** Tue-Sun 11:00-23:00, closed Mondays
- **Host project:** Next.js 16 portfolio site with Tailwind CSS, Framer Motion, existing i18n (FR/EN)

## Route

`/kosmos` — standalone page, no connection to the portfolio navigation or layout.

## Design Decisions

### Visual Identity
- **Background:** Dark (#0a0a0a)
- **Accent color:** Gold (#d4af37) — matches Kosmos branding
- **Cards:** Subtle elevated cards with rgba(255,255,255,0.03) background, thin border
- **Typography:** Inter (body) + Sora (headings) — inherited from project
- **Logo:** Kosmos gold logo from their site (hosted externally for prototype, to be self-hosted later)

### Layout (Mobile-First)
1. **Header:** Logo (left) + language dropdown (right)
2. **Category tabs:** Horizontal scrollable tab bar, active tab highlighted in gold with bottom border
3. **Menu items:** Vertical list of cards — each card has: photo (80x80 rounded), name, short description, price in gold
4. **Footer:** Address, hours, allergen notice

### Languages
- FR / NL / EN / DE
- Dropdown compact in header ("FR ▾")
- Separate translation system from the portfolio's LanguageContext — this page is self-contained
- All menu item names, descriptions, and category labels translated

### Menu Categories (placeholder data)
1. **Tapas** — Patatas Bravas, Gambas al Ajillo, Croquetas de Jamón, Bruschetta Avocado, Calamares Fritos, etc.
2. **Plats** — Main dishes
3. **Cocktails** — Signature cocktails, mojitos, etc.
4. **Vins** — Wine selection
5. **Softs** — Non-alcoholic drinks, mocktails
6. **Bières** — Beer selection

### Menu Item Structure
```typescript
interface MenuItem {
  id: string;
  name: { fr: string; nl: string; en: string; de: string };
  description: { fr: string; nl: string; en: string; de: string };
  price: number;
  image: string; // URL to photo
  tags?: string[]; // e.g. "vegetarian", "spicy", "gluten-free"
}

interface MenuCategory {
  id: string;
  name: { fr: string; nl: string; en: string; de: string };
  items: MenuItem[];
}
```

### Photos
- Prototype uses Unsplash images for realistic rendering
- Client will provide real photos for production
- Images displayed at 80x80px with border-radius 10px, object-fit cover

## Architecture

### File Structure
```
app/kosmos/
  page.tsx          — Main page component
  layout.tsx        — Standalone layout (no portfolio nav)
  components/
    KosmosHeader.tsx      — Logo + language dropdown
    CategoryTabs.tsx      — Horizontal scrollable tabs
    MenuItemCard.tsx      — Individual menu item card
    MenuSection.tsx       — List of items for active category
    LanguageDropdown.tsx  — FR/NL/EN/DE selector
  data/
    menu.ts               — Menu data with all translations
  types.ts                — MenuItem, MenuCategory types
```

### Key Behaviors
- **Tab switching:** Clicking a tab shows that category's items with a smooth transition (Framer Motion)
- **Language switching:** Dropdown changes all text instantly, selection persisted in localStorage
- **Responsive:** Designed for 375px mobile, scales up gracefully to tablet/desktop
- **Performance:** Static data (no API calls), images lazy-loaded, fast initial render
- **No SSR complexity:** Client component with "use client" — simple and fast for a QR scan landing

### Standalone from Portfolio
- Own layout.tsx with Kosmos-specific metadata (title: "Kosmos Ieper — Menu")
- Own color scheme (dark + gold vs portfolio's white theme)
- Own language system (4 languages vs portfolio's 2)
- No shared navigation or footer with portfolio

## Out of Scope
- Online ordering / payment
- Reservation system
- Admin panel to edit menu
- Real menu data (using placeholder until client provides)
- QR code generation (trivial to add later, just points to the URL)
- SEO optimization (accessed via QR, not search)

## Testing
- Visual testing on mobile viewport (375px)
- Tab switching works correctly
- Language switching persists and updates all content
- Images load correctly
- Footer info displays properly
