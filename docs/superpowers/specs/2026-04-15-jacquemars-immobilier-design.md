# Jacquemars Immobilier — Site Vitrine Design Spec

## Objectif

Creer un site vitrine visuellement impressionnant pour Jacquemars Immobilier (agence immobiliere lilloise) afin de demontrer qu'on peut faire beaucoup mieux que leur site Jimdo actuel. Le site doit etre moderne, fluide, professionnel et artistique — positionne comme une "galerie d'art immobiliere". Le fonctionnel (envoi de formulaires, backend) viendra plus tard.

## Contexte

- **Client :** Jacquemars Immobilier — SARL fondee en 2018 par Laurent Casetta et Remi Rembauville
- **Activite :** Achat, vente, location de biens immobiliers a Lille et metropole lilloise
- **Site actuel :** Jimdo, design date, palette burgundy #601f27, navigation peu ergonomique
- **Positionnement :** "Artisans du marche immobilier lillois" — professionnel + humain + passion
- **Quartiers couverts :** Vieux-Lille, Hypercentre, Republique Beaux-Arts, Vauban, Wazemmes, La Madeleine, Lambersart, Marcq-en-Baroeul

### Contacts reels

- Laurent Casetta — 06.01.02.78.71 — laurent.casetta@jacquemarsimmobilier.fr
- Remi Rembauville — 06.31.99.84.46 — remi.rembauville@jacquemarsimmobilier.fr
- Adresse : 61 rue Jacquemars Gielee, 3e etage, 59000 Lille (sur RDV)
- Facebook : facebook.com/jacquemarsimmobilier
- Instagram : instagram.com/jacquemars_immobilier

## Architecture technique

### Integration dans le portfolio

- Sous-dossier : `/app/jacquemarsimmobilier/`
- Layout isole avec metadata et fonts custom
- Composants dans `/app/jacquemarsimmobilier/components/`
- Donnees fictives dans `/app/jacquemarsimmobilier/data/`
- Aucune dependance vers les autres sous-projets (kosmos, terra)
- Langue : francais uniquement

### Stack

- Next.js 16 App Router (existant)
- Tailwind CSS (existant)
- GSAP + ScrollTrigger pour animations scroll et parallax
- Framer Motion pour micro-interactions et transitions
- TypeScript strict
- Images via Unsplash URLs

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/jacquemarsimmobilier` | Accueil — landing page one-page avec sections |
| `/jacquemarsimmobilier/biens` | Catalogue des biens — grille filtrable |
| `/jacquemarsimmobilier/biens/[id]` | Fiche detaillee d'un bien |
| `/jacquemarsimmobilier/estimation` | Formulaire d'estimation en 3 etapes |
| `/jacquemarsimmobilier/avis` | Temoignages clients |

## Navigation

- Barre fixe en haut, transparente au depart, fond burgundy sombre au scroll
- Logo "JACQUEMARS" en wordmark espace a gauche
- Liens : Accueil - Nos Biens - Estimation - Avis - Contact (CTA bouton)
- "Contact" scroll vers la section contact en bas de l'accueil
- Mobile : hamburger menu avec overlay plein ecran, animations d'entree decalees

## Barre de recherche

Presente sur l'accueil (version compacte dans le hero) et sur `/biens` (version etendue).

### Criteres de filtrage

| Critere | Type de controle | Valeurs |
|---------|-----------------|---------|
| Type de bien | Toggle pills | Appartement / Maison / Immeuble |
| Transaction | Toggle | Achat / Location |
| Localisation | Dropdown | Quartiers lillois + villes proches + rayon (5/10/20km) |
| Surface | Slider double curseur | Min/Max m2 |
| Prix | Slider double curseur | Min/Max EUR |
| Nombre de pieces | Boutons | 1, 2, 3, 4, 5+ |
| Nombre de chambres | Boutons | 1, 2, 3, 4+ |
| Exterieur | Checkboxes | Balcon / Terrasse / Jardin |
| Parking | Radio | Oui / Non / Indifferent |
| Etat | Radio | Neuf / Renove / A renover / Indifferent |

- Accueil : version compacte (Type + Localisation + Prix + "Plus de filtres")
- `/biens` : tous les filtres visibles en barre horizontale repliable
- Tags actifs sous la barre pour retirer un filtre
- Filtrage purement cote client (donnees en memoire)

## Page d'accueil — Sections

### Hero (plein ecran)

- Photo grand format de Lille en fond avec overlay gradient sombre
- Effet parallax au scroll
- Titre serif : "L'art de l'immobilier lillois"
- Sous-titre : "Achat - Vente - Location — Lille et sa metropole"
- Barre de recherche compacte centree
- Animation GSAP : texte reveal lettre par lettre, barre slide-up

### Biens a la une

- Titre : "Nos biens d'exception"
- Grille 3-4 cards coup de coeur
- Cards galerie : grande photo, hover zoom + overlay infos (prix, surface, quartier)
- CTA : "Voir tous nos biens"
- Scroll reveal anime

### Notre approche

- Split layout : texte a gauche, photo a droite
- 3 valeurs avec icones : Proximite - Reactivite - Professionnalisme
- Animation decalee au scroll
- Citation : "Plus qu'une agence, nous sommes Laurent et Remi, veritables artisans du marche immobilier lillois"

### Quartiers

- Grille photos des quartiers lillois
- Hover : nom du quartier + nombre de biens
- Click : redirige vers `/biens` avec filtre pre-rempli
- Parallax leger sur les images

### Avis clients (carousel)

- Carousel horizontal avec vrais temoignages
- Cards avec guillemets decoratifs, nom, note etoiles
- Auto-scroll lent + navigation manuelle

### Contact

- Fond burgundy sombre
- Titre : "Prenons contact"
- Formulaire : Nom, Telephone, Email, Message (non fonctionnel)
- Coordonnees Laurent & Remi + reseaux sociaux

### Footer

- Fond noir, minimaliste
- Logo + adresse + mentions legales + liens rapides + reseaux

## Page Biens (`/biens`)

- Header avec titre + compteur de resultats
- Barre de filtres horizontale repliable
- Tags de filtres actifs
- Grille responsive : 3 col desktop, 2 tablette, 1 mobile
- Cards : photo 4:3, badge "Coup de coeur"/"Nouveau", prix, surface + pieces + chambres en icones, quartier
- Hover : elevation + zoom photo
- Tri : Plus recents, Prix croissant/decroissant, Surface
- Stagger animation au scroll et au changement de filtres
- Etat vide : illustration + message

## Fiche bien (`/biens/[id]`)

- Galerie photo : image principale + thumbnails + lightbox
- Banniere infos : prix, surface, pieces, chambres, quartier
- Description du bien (texte fictif realiste)
- Grille caracteristiques : etage, orientation, chauffage, DPE, annee, charges
- Section localisation : nom quartier + description
- CTA sticky : "Demander une visite" → mini formulaire (non fonctionnel)
- Sidebar : card agent (Laurent ou Remi) avec telephone/email
- Section "Biens similaires" : 3 cards

## Page Estimation (`/estimation`)

- Hero leger fond creme : "Estimation gratuite de votre bien"
- Formulaire stepper 3 etapes :
  1. **Votre bien** : type, surface, pieces, quartier, etage, etat
  2. **Vos coordonnees** : nom, telephone, email
  3. **Confirmation** : recapitulatif + bouton (affiche message succes, n'envoie rien)
- Transition animee slide horizontal entre steps
- Barre de progression
- Sidebar desktop : photo + citation + telephones directs

## Page Avis (`/avis`)

- Titre : "Ce que nos clients disent de nous"
- Note globale : "4.8/5" avec etoiles dorees + "32 avis"
- Grille masonry de temoignages
- Cards : guillemets, texte, nom, contexte (ex: "Vente — Vieux-Lille")
- Vrais avis : Frederique, Pierre-Luc, Marine, Aurelie, etc.
- Stagger reveal au scroll
- CTA bas : "Partagez votre experience" (placeholder)

## Design System

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| burgundy | #601f27 | Couleur principale, nav, CTA |
| burgundy-light | #872b37 | Hover states |
| gold | #c9a84c | Accents, etoiles, badges |
| cream | #faf6f0 | Fond sections alternees |
| noir | #1a1215 | Texte principal, footer |
| gris-chaud | #6b5e62 | Texte secondaire |
| blanc-casse | #fefcfa | Fond principal |

### Typographie

| Usage | Font | Deja dans le projet |
|-------|------|---------------------|
| Titres | Playfair Display (serif) | Oui (Terra) |
| Corps | Inter (sans-serif) | Oui (global) |
| Chiffres/prix | Sora | Oui (disponible) |

### Animations

- GSAP ScrollTrigger : reveals au scroll, parallax images
- Framer Motion : hover cards, transitions de page, micro-interactions
- Parallax : hero, section quartiers
- Stagger : apparition des cards en cascade

### Responsive

- Mobile-first, breakpoints Tailwind standard
- Navigation hamburger sous `md`
- Grilles : 1 → 2 → 3 colonnes
- Recherche mobile : filtres en bottom sheet
- CTA sticky adapte au mobile

## Donnees fictives

- ~15 biens realistes pour Lille
- Mix : appartements, maisons, 1 immeuble
- Prix : 150k EUR — 600k EUR (coherent marche lillois)
- Quartiers reels
- Photos : URLs Unsplash batiments/interieurs
- Avis : vrais temoignages scrapes du site actuel
