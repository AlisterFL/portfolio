// app/jacquemarsimmobilier/biens/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import SearchFilters from "../components/SearchFilters";
import PropertyGrid from "../components/PropertyGrid";
import { properties } from "../data/properties";
import { FilterState, SortOption, PropertyType } from "../types";

const defaultFilters: FilterState = {
  type: null,
  transaction: null,
  quartier: null,
  surfaceMin: 0,
  surfaceMax: 500,
  priceMin: 0,
  priceMax: 1000000,
  rooms: null,
  bedrooms: null,
  exterior: [],
  parking: "indifferent",
  condition: "indifferent",
};

function BiensContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const type = searchParams.get("type") as PropertyType | null;
    const quartier = searchParams.get("quartier");
    const priceMax = searchParams.get("priceMax");
    return {
      ...defaultFilters,
      ...(type && { type }),
      ...(quartier && { quartier }),
      ...(priceMax && { priceMax: Number(priceMax) }),
    };
  });
  const [sort, setSort] = useState<SortOption>("recent");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const activeFilterCount = [
    filters.type,
    filters.transaction,
    filters.quartier,
    filters.priceMin > 0 ? true : null,
    filters.priceMax < 1000000 ? true : null,
    filters.surfaceMin > 0 ? true : null,
    filters.surfaceMax < 500 ? true : null,
    filters.rooms,
    filters.bedrooms,
    filters.exterior.length > 0 ? true : null,
    filters.parking !== "indifferent" ? true : null,
    filters.condition !== "indifferent" ? true : null,
  ].filter(Boolean).length;

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)]">
              Nos biens
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm px-3 py-2 border border-[var(--jqm-cream)] rounded-sm bg-white text-[var(--jqm-noir)] focus:outline-none"
              >
                <option value="recent">Plus recents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
                <option value="surface">Surface</option>
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.type && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.type}
                  <button onClick={() => setFilters({ ...filters, type: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              {filters.transaction && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.transaction}
                  <button onClick={() => setFilters({ ...filters, transaction: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              {filters.quartier && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--jqm-burgundy)]/10 text-[var(--jqm-burgundy)] text-xs rounded-sm capitalize">
                  {filters.quartier.replace(/-/g, " ")}
                  <button onClick={() => setFilters({ ...filters, quartier: null })} className="hover:text-[var(--jqm-burgundy-light)]">&times;</button>
                </span>
              )}
              <button
                onClick={() => setFilters(defaultFilters)}
                className="px-3 py-1 text-xs text-[var(--jqm-gris)] hover:text-[var(--jqm-burgundy)] transition-colors"
              >
                Tout effacer
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            {filtersOpen && (
              <aside className="lg:w-80 flex-shrink-0">
                <SearchFilters filters={filters} onChange={setFilters} />
              </aside>
            )}

            {/* Grid */}
            <div className="flex-1">
              <PropertyGrid properties={properties} filters={filters} sort={sort} />
            </div>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}

export default function BiensPage() {
  return (
    <Suspense>
      <BiensContent />
    </Suspense>
  );
}
