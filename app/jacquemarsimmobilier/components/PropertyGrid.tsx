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
