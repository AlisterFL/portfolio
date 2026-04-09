export type Language = "fr" | "nl" | "en" | "de";
export type Theme = "dark" | "light";

export interface Translatable {
  fr: string;
  nl: string;
  en: string;
  de: string;
}

// EU 14 mandatory allergens
export type Allergen =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "dairy"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites"
  | "lupin"
  | "molluscs";

export interface NutritionInfo {
  calories: number;     // kcal per serving
  protein: number;      // grams
  carbs: number;        // grams
  fat: number;          // grams
}

export interface MenuItem {
  id: string;
  name: Translatable;
  description: Translatable;
  price: number;
  image: string;
  tags?: string[];           // "vegetarian", "vegan", "spicy", "new", "popular"
  allergens?: Allergen[];
  ingredients?: Translatable; // detailed ingredient list
  nutrition?: NutritionInfo;
}

export interface MenuCategory {
  id: string;
  name: Translatable;
  items: MenuItem[];
}
