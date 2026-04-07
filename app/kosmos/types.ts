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
