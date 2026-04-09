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
  crustaceans: { fr: "Crustacés", nl: "Schaaldieren", en: "Crustaceans", de: "Krebstiere" },
  eggs: { fr: "Œufs", nl: "Eieren", en: "Eggs", de: "Eier" },
  fish: { fr: "Poisson", nl: "Vis", en: "Fish", de: "Fisch" },
  peanuts: { fr: "Arachides", nl: "Pinda's", en: "Peanuts", de: "Erdnüsse" },
  soy: { fr: "Soja", nl: "Soja", en: "Soy", de: "Soja" },
  dairy: { fr: "Lait", nl: "Melk", en: "Dairy", de: "Milch" },
  nuts: { fr: "Fruits à coque", nl: "Noten", en: "Nuts", de: "Nüsse" },
  celery: { fr: "Céleri", nl: "Selderij", en: "Celery", de: "Sellerie" },
  mustard: { fr: "Moutarde", nl: "Mosterd", en: "Mustard", de: "Senf" },
  sesame: { fr: "Sésame", nl: "Sesam", en: "Sesame", de: "Sesam" },
  sulphites: { fr: "Sulfites", nl: "Sulfieten", en: "Sulphites", de: "Sulfite" },
  lupin: { fr: "Lupin", nl: "Lupine", en: "Lupin", de: "Lupine" },
  molluscs: { fr: "Mollusques", nl: "Weekdieren", en: "Molluscs", de: "Weichtiere" },
};

const allergenEmojis: Record<Allergen, string> = {
  gluten: "🌾",
  crustaceans: "🦐",
  eggs: "🥚",
  fish: "🐟",
  peanuts: "🥜",
  soy: "🫘",
  dairy: "🥛",
  nuts: "🌰",
  celery: "🥬",
  mustard: "🟡",
  sesame: "⚪",
  sulphites: "🍷",
  lupin: "🌸",
  molluscs: "🐚",
};

const sectionLabels = {
  ingredients: { fr: "Ingrédients", nl: "Ingrediënten", en: "Ingredients", de: "Zutaten" },
  allergens: { fr: "Allergènes", nl: "Allergenen", en: "Allergens", de: "Allergene" },
  nutrition: { fr: "Valeurs nutritionnelles", nl: "Voedingswaarden", en: "Nutrition facts", de: "Nährwerte" },
};

const nutritionLabels = {
  calories: { fr: "Calories", nl: "Calorieën", en: "Calories", de: "Kalorien" },
  protein: { fr: "Protéines", nl: "Eiwitten", en: "Protein", de: "Protein" },
  carbs: { fr: "Glucides", nl: "Koolhydraten", en: "Carbs", de: "Kohlenhydrate" },
  fat: { fr: "Lipides", nl: "Vetten", en: "Fat", de: "Fett" },
};

const tagStyles: Record<string, string> = {
  vegetarian: "bg-green-500/20 text-green-400 border-green-500/30",
  vegan: "bg-green-500/20 text-green-400 border-green-500/30",
  spicy: "bg-red-500/20 text-orange-400 border-red-500/30",
  popular: "bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30",
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const defaultTagStyle = "bg-white/10 text-white/60 border-white/10";

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-2xl"
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
                <h2 className="text-xl font-bold text-white">{item.name[language]}</h2>
                <span className="shrink-0 text-xl font-bold text-[#d4af37]">
                  €{item.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/60">
                {item.description[language]}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${tagStyles[tag] ?? defaultTagStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Ingredients */}
              {item.ingredients && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {sectionLabels.ingredients[language]}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.ingredients[language]}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {item.allergens && item.allergens.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {sectionLabels.allergens[language]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen) => (
                      <div
                        key={allergen}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5"
                      >
                        <span className="text-sm">{allergenEmojis[allergen]}</span>
                        <span className="text-xs text-white/70">
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
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    {sectionLabels.nutrition[language]}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(["calories", "protein", "carbs", "fat"] as const).map((key) => (
                      <div
                        key={key}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
                      >
                        <div className="text-lg font-bold text-white">
                          {item.nutrition![key]}
                          <span className="ml-0.5 text-xs font-normal text-white/40">
                            {key === "calories" ? "kcal" : "g"}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-white/40">
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
