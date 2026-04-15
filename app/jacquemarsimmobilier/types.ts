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
