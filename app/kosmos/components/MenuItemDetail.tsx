"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuItem, Language, Allergen } from "../types";

interface MenuItemDetailProps {
  item: MenuItem | null;
  language: Language;
  onClose: () => void;
}

const allergenLabels: Record<Allergen, Record<Language, string>> = {
  gluten: { fr: "Gluten", nl: "Gluten", en: "Gluten", de: "Gluten" },
  crustaceans: { fr: "Crustaces", nl: "Schaaldieren", en: "Crustaceans", de: "Krebstiere" },
  eggs: { fr: "Oeufs", nl: "Eieren", en: "Eggs", de: "Eier" },
  fish: { fr: "Poisson", nl: "Vis", en: "Fish", de: "Fisch" },
  peanuts: { fr: "Arachides", nl: "Pinda's", en: "Peanuts", de: "Erdnusse" },
  soy: { fr: "Soja", nl: "Soja", en: "Soy", de: "Soja" },
  dairy: { fr: "Lait", nl: "Melk", en: "Dairy", de: "Milch" },
  nuts: { fr: "Fruits a coque", nl: "Noten", en: "Nuts", de: "Nusse" },
  celery: { fr: "Celeri", nl: "Selderij", en: "Celery", de: "Sellerie" },
  mustard: { fr: "Moutarde", nl: "Mosterd", en: "Mustard", de: "Senf" },
  sesame: { fr: "Sesame", nl: "Sesam", en: "Sesame", de: "Sesam" },
  sulphites: { fr: "Sulfites", nl: "Sulfieten", en: "Sulphites", de: "Sulfite" },
  lupin: { fr: "Lupin", nl: "Lupine", en: "Lupin", de: "Lupine" },
  molluscs: { fr: "Mollusques", nl: "Weekdieren", en: "Molluscs", de: "Weichtiere" },
};

const allergenEmojis: Record<Allergen, string> = {
  gluten: "\u{1F33E}",
  crustaceans: "\u{1F990}",
  eggs: "\u{1F95A}",
  fish: "\u{1F41F}",
  peanuts: "\u{1F95C}",
  soy: "\u{1FAD8}",
  dairy: "\u{1F95B}",
  nuts: "\u{1F330}",
  celery: "\u{1F96C}",
  mustard: "\u{1F7E1}",
  sesame: "\u26AA",
  sulphites: "\u{1F377}",
  lupin: "\u{1F338}",
  molluscs: "\u{1F41A}",
};

const sectionLabels = {
  ingredients: { fr: "Ingredients", nl: "Ingredienten", en: "Ingredients", de: "Zutaten" },
  allergens: { fr: "Allergenes", nl: "Allergenen", en: "Allergens", de: "Allergene" },
  nutrition: { fr: "Valeurs nutritionnelles", nl: "Voedingswaarden", en: "Nutrition facts", de: "Nahrwerte" },
};

const nutritionLabels = {
  calories: { fr: "Calories", nl: "Calorieen", en: "Calories", de: "Kalorien" },
  protein: { fr: "Proteines", nl: "Eiwitten", en: "Protein", de: "Protein" },
  carbs: { fr: "Glucides", nl: "Koolhydraten", en: "Carbs", de: "Kohlenhydrate" },
  fat: { fr: "Lipides", nl: "Vetten", en: "Fat", de: "Fett" },
};

const tagConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  vegetarian: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.25 2.5-3 3.5-5.5C7 13 8 10.5 12 7c-3.5 4-6 5-8.5 6.5C1 14.5 0 16 0 16" />
        <path d="M22 2L15 9" /><path d="M15 2C15 2 12 5 9 9" /><path d="M22 9C22 9 19 6 15 9" />
      </svg>
    ),
    color: "text-green-600 border-green-500/30 bg-green-500/10",
  },
  vegan: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 8-10 8-16H4c0 6 4 12 8 16Z" /><path d="M12 10v6" /><path d="M9 13h6" />
      </svg>
    ),
    color: "text-green-600 border-green-500/30 bg-green-500/10",
  },
  spicy: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" /><path d="M12 18v4" />
      </svg>
    ),
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  },
  popular: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    color: "text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent)]/10",
  },
  new: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
};

export default function MenuItemDetail({ item, language, onClose }: MenuItemDetailProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="menu-detail-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--backdrop)] backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={item.image}
              alt={item.name[language]}
              className="h-48 w-full rounded-t-2xl object-cover"
            />

            <div className="space-y-5 p-5">
              {/* Name + Price */}
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-[var(--text)]">{item.name[language]}</h2>
                <span className="shrink-0 text-xl font-bold text-[var(--accent)]">
                  &euro;{item.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description[language]}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const cfg = tagConfig[tag];
                    return (
                      <span
                        key={tag}
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${cfg ? cfg.color : "text-[var(--text-secondary)] border-[var(--border)] bg-[var(--surface)]"}`}
                      >
                        {cfg?.icon}
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Ingredients */}
              {item.ingredients && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {sectionLabels.ingredients[language]}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.ingredients[language]}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {item.allergens && item.allergens.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {sectionLabels.allergens[language]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen) => (
                      <div
                        key={allergen}
                        className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5"
                      >
                        <span className="text-sm">{allergenEmojis[allergen]}</span>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {allergenLabels[allergen][language]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition */}
              {item.nutrition && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {sectionLabels.nutrition[language]}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(["calories", "protein", "carbs", "fat"] as const).map((key) => (
                      <div
                        key={key}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center"
                      >
                        <div className="text-lg font-bold text-[var(--text)]">
                          {item.nutrition![key]}
                          <span className="ml-0.5 text-xs font-normal text-[var(--text-tertiary)]">
                            {key === "calories" ? "kcal" : "g"}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                          {nutritionLabels[key][language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
