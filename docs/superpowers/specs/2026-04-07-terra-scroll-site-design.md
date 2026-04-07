# TERRA — Site immersif scroll-driven agriculture B2B

## Résumé

Site vitrine immersif pour **TERRA**, une marque fictive B2B d'intrants agricoles (semences, pesticides, engrais). Le site utilise des animations scroll spectaculaires (sections pinned, parallax, compteurs, SVG animations) pour créer une expérience premium. Projet de démonstration intégré au portfolio existant.

## Contexte

- Projet portfolio Next.js 16 (App Router) avec Tailwind CSS et Framer Motion
- Le site TERRA vit dans `/app/terra/` — complètement isolé, comme `/app/kosmos/`
- Aucune modification au code existant du portfolio
- Nouvelle dépendance : GSAP + ScrollTrigger (installé au niveau du projet)

## Stack technique

- **Next.js 16** (App Router) — déjà en place
- **Tailwind CSS** — déjà en place
- **GSAP + ScrollTrigger** — animations scroll (pin, scrub, timelines séquencées)
- **Images Unsplash** — photos libres de droits pour le contenu visuel
- **SVG inline** — animations de tracé (stroke) pour les icônes produits

## Identité visuelle TERRA

### Palette de couleurs

| Rôle       | Couleur   | Hex       |
|------------|-----------|-----------|
| Primaire   | Vert profond | `#1a472a` |
| Secondaire | Vert moyen   | `#4a7c59` |
| Accent     | Doré terreux | `#c8a96e` |
| Fond clair | Crème        | `#f5f0e8` |
| Texte      | Brun sombre  | `#2c1810` |

### Typographie

- **Titres** : Serif (ex: Playfair Display) — évoque tradition et confiance
- **Corps** : Sans-serif (Inter, déjà installé) — lisibilité moderne
- **Accents** : Letterspacing élevé pour les sous-titres et labels

### Ton

Professionnel, rassurant, ancré dans la terre. Le slogan est *"Enracinés dans l'excellence"*.

## Architecture fichiers

```
app/terra/
├── layout.tsx          # Layout TERRA (metadata, fonts)
├── page.tsx            # Page principale (assemblage des sections)
├── globals.css         # Styles spécifiques TERRA (optionnel, sinon Tailwind)
└── components/
    ├── TerraHero.tsx
    ├── TerraMission.tsx
    ├── TerraProducts.tsx
    ├── TerraStats.tsx
    ├── TerraTestimonials.tsx
    ├── TerraContact.tsx
    └── TerraFooter.tsx
```

Tous les composants sont des Client Components (`"use client"`) car ils utilisent GSAP.

## Sections détaillées

### Section 1 — Hero

**Comportement :**
- Plein écran (100vh) avec photo de champ de blé au lever du soleil
- Au chargement : image légèrement zoomée (scale 1.1) qui dézoome lentement vers scale 1.0 (effet cinématique, durée ~2s)
- Le logo "TERRA" apparaît lettre par lettre avec un effet de révélation (clip-path ou opacity séquencée)
- Le slogan *"Enracinés dans l'excellence"* glisse depuis le bas (translateY + fade)
- Flèche animée en bas (bounce infini) invitant à scroller

**Animations scroll (en sortant) :**
- L'image se parallaxe vers le haut (translateY négatif lié au scroll)
- Un overlay vert profond `#1a472a` s'intensifie progressivement (opacity 0 → 0.8)
- Transition fluide vers le fond de la section Mission

### Section 2 — Notre Mission (pinned)

**Comportement :**
- La section se **pin** sur l'écran pendant environ 3x sa hauteur de viewport
- Fond vert profond `#1a472a` avec texture grain subtile (CSS noise ou image)

**Séquence scroll (timeline GSAP scrubbed) :**
1. **Étape 1 (0-33% du scroll)** : Le titre *"Notre Mission"* apparaît au centre. Un trait doré s'étend horizontalement sous le titre (scaleX 0→1).
2. **Étape 2 (33-66%)** : Le titre monte. Un bloc image+texte apparaît depuis la gauche — *"Depuis 1987, nous accompagnons les agriculteurs français avec des solutions adaptées à chaque terroir."* Image : mains tenant de la terre.
3. **Étape 3 (66-100%)** : Le premier bloc fade out. Un deuxième bloc apparaît depuis la droite — *"Des solutions respectueuses de la terre, pour une agriculture durable et performante."* Image : champ vert. Trois icônes (graine, feuille, soleil) apparaissent en séquence en bas.

**Transition :** Le pin se relâche, la section scroll naturellement vers le haut.

### Section 3 — Nos Produits

**Comportement :**
- Fond crème `#f5f0e8`
- Titre *"Nos Solutions"* avec le même style de trait doré

**3 catégories, chacune déclenchée par le scroll (whileInView) :**

1. **Semences & Graines**
   - Animation : SVG d'une graine qui "germe" — stroke-dashoffset animé de 100% à 0% au scroll
   - La carte produit se révèle en parallèle (fade + scale)
   - Description : *"Variétés sélectionnées pour chaque terroir. Blé, maïs, tournesol, colza."*

2. **Protection des Cultures**
   - Animation : SVG d'un bouclier/feuille dessiné au trait
   - Description : *"Herbicides, fongicides et insecticides de dernière génération."*

3. **Engrais & Nutrition**
   - Animation : Cercles/particules qui convergent pour former l'icône (GSAP stagger)
   - Description : *"Nutrition des sols sur-mesure. Azote, phosphore, potassium."*

**Chaque carte :**
- Icône SVG animée (à gauche ou au-dessus)
- Titre + description
- Bouton CTA doré *"Découvrir"*
- Effet 3D tilt au hover (perspective + rotateX/Y basé sur la position de la souris)

### Section 4 — Chiffres Clés (pinned)

**Comportement :**
- Section pinned sur fond split : moitié gauche = photo aérienne de champs (vue drone), moitié droite = fond vert profond
- Pinned pendant environ 2x la hauteur du viewport

**Séquence scroll :**
Les 4 chiffres apparaissent un par un (stagger), chacun avec :
- Un cercle doré `#c8a96e` qui s'expand en arrière-plan (scale 0→1, opacity)
- Le nombre compte de 0 à la valeur finale (compteur GSAP, courbe ease `power2.out`)
- Le label apparaît en fade

| Chiffre      | Label                       |
|--------------|-----------------------------|
| 35+          | années d'expertise          |
| 12 000       | agriculteurs partenaires    |
| 850 000 ha   | de cultures accompagnées    |
| 98%          | taux de satisfaction        |

**Transition :** Les chiffres fondent (fade out), la photo s'expand en plein écran en transition vers les témoignages.

### Section 5 — Témoignages

**Comportement :**
- Grande photo de fond (agriculteur dans son champ) en parallax lent (translateY lié au scroll, vitesse réduite)
- Overlay sombre semi-transparent pour lisibilité

**3 témoignages :**
Chaque témoignage apparaît au scroll dans une carte glass-effect :
- `background: rgba(255,255,255,0.1)` + `backdrop-filter: blur(10px)`
- Bordure fine semi-transparente
- Guillemets dorés `#c8a96e` en grand
- Les cartes glissent depuis des côtés alternés (gauche → droite → gauche)

| Nom              | Exploitation              | Région     | Témoignage |
|------------------|---------------------------|------------|------------|
| Jean-Pierre Dubois | Ferme du Grand Chêne    | Beauce     | *"TERRA nous accompagne depuis 15 ans. Leurs semences sont parfaitement adaptées à nos sols."* |
| Marie Laurent    | EARL Les Coteaux          | Bourgogne  | *"Le suivi technique fait toute la différence. Des conseils personnalisés et des résultats."* |
| Thomas Moreau    | Coopérative Val de Loire  | Touraine   | *"Un partenaire fiable. Qualité constante, livraisons toujours dans les temps."* |

### Section 6 — Contact / CTA

**Comportement :**
- Fond vert profond `#1a472a`
- Logo TERRA en grand, semi-transparent (opacity ~0.05) en arrière-plan, légèrement en parallax inversé
- Titre *"Cultivons l'avenir ensemble"* avec effet de révélation (même style que le hero)

**Formulaire :**
- 3 champs : Nom, Email, Message (textarea)
- Bouton doré *"Envoyer"* (`#c8a96e` fond, texte sombre)
- Le formulaire est purement visuel (pas de backend)

**Footer :**
- Liens fictifs : Nos solutions | À propos | Actualités | Contact
- Adresse fictive : *12 Route des Moissons, 28000 Chartres*
- Copyright : *2026 TERRA — Tous droits réservés*
- Léger effet parallax inversé au scroll final

## Animations — Résumé technique

| Section       | Type d'animation               | Outil GSAP                  |
|---------------|--------------------------------|-----------------------------|
| Hero          | Parallax + overlay fade        | ScrollTrigger (scrub)       |
| Mission       | Pin + timeline séquencée       | ScrollTrigger (pin + scrub) |
| Produits      | SVG stroke + reveal + tilt     | ScrollTrigger (toggleActions) + event listeners |
| Chiffres      | Pin + compteurs + stagger      | ScrollTrigger (pin + scrub) |
| Témoignages   | Parallax fond + slide cartes   | ScrollTrigger (scrub) + toggleActions |
| Contact       | Reveal + parallax inversé      | ScrollTrigger (scrub)       |

## Performance

- Les images utilisent `next/image` avec `priority` pour le hero et `loading="lazy"` pour le reste
- Les animations GSAP sont nettoyées dans le `useEffect` cleanup (`.kill()`)
- Les SVG sont inline (pas de requêtes réseau supplémentaires)
- `will-change: transform` appliqué uniquement sur les éléments animés actifs

## Hors scope

- Pas de backend / API pour le formulaire de contact
- Pas d'internationalisation (français uniquement)
- Pas de pages produits individuelles
- Pas de responsive mobile avancé (desktop-first, responsive basique)
- Pas de dark mode
