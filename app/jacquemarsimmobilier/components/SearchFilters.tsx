// app/jacquemarsimmobilier/components/SearchFilters.tsx
"use client";

import { FilterState, PropertyType, TransactionType, Exterior, PropertyCondition } from "../types";
import { quartiers } from "../data/quartiers";

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  const typeOptions: { value: PropertyType; label: string }[] = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "immeuble", label: "Immeuble" },
  ];

  const transactionOptions: { value: TransactionType; label: string }[] = [
    { value: "achat", label: "Achat" },
    { value: "location", label: "Location" },
  ];

  const toggleExterior = (ext: Exterior) => {
    const next = filters.exterior.includes(ext)
      ? filters.exterior.filter((e) => e !== ext)
      : [...filters.exterior, ext];
    update({ exterior: next });
  };

  return (
    <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 space-y-6">
      {/* Transaction */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Transaction</label>
        <div className="flex gap-2">
          {transactionOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ transaction: filters.transaction === t.value ? null : t.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.transaction === t.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Type de bien</label>
        <div className="flex gap-2">
          {typeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ type: filters.type === t.value ? null : t.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.type === t.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quartier */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Quartier</label>
        <select
          value={filters.quartier || ""}
          onChange={(e) => update({ quartier: e.target.value || null })}
          className="w-full px-4 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm bg-white text-[var(--jqm-noir)] focus:outline-none focus:border-[var(--jqm-burgundy)]"
        >
          <option value="">Tous les quartiers</option>
          {quartiers.map((q) => (
            <option key={q.id} value={q.id}>{q.name}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">
          Prix: {filters.priceMin > 0 ? `${(filters.priceMin / 1000).toFixed(0)}k` : "0"} - {filters.priceMax < 1000000 ? `${(filters.priceMax / 1000).toFixed(0)}k` : "Max"} EUR
        </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={0}
            max={600000}
            step={10000}
            value={filters.priceMin}
            onChange={(e) => update({ priceMin: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
        </div>
      </div>

      {/* Surface range */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">
          Surface: {filters.surfaceMin} - {filters.surfaceMax < 500 ? filters.surfaceMax : "Max"} m²
        </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={0}
            max={300}
            step={5}
            value={filters.surfaceMin}
            onChange={(e) => update({ surfaceMin: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
          <input
            type="range"
            min={0}
            max={500}
            step={5}
            value={filters.surfaceMax}
            onChange={(e) => update({ surfaceMax: Number(e.target.value) })}
            className="flex-1 accent-[var(--jqm-burgundy)]"
          />
        </div>
      </div>

      {/* Rooms */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Pieces</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => update({ rooms: filters.rooms === n ? null : n })}
              className={`w-10 h-10 text-sm rounded-sm transition-all ${
                filters.rooms === n
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {n === 5 ? "5+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Chambres</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => update({ bedrooms: filters.bedrooms === n ? null : n })}
              className={`w-10 h-10 text-sm rounded-sm transition-all ${
                filters.bedrooms === n
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {n === 4 ? "4+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Exterior */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Exterieur</label>
        <div className="flex gap-2">
          {(["balcon", "terrasse", "jardin"] as Exterior[]).map((ext) => (
            <button
              key={ext}
              onClick={() => toggleExterior(ext)}
              className={`px-3 py-2 text-sm rounded-sm capitalize transition-all ${
                filters.exterior.includes(ext)
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {ext}
            </button>
          ))}
        </div>
      </div>

      {/* Parking */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Parking</label>
        <div className="flex gap-2">
          {(["indifferent", "oui", "non"] as const).map((val) => (
            <button
              key={val}
              onClick={() => update({ parking: val })}
              className={`px-4 py-2 text-sm rounded-sm capitalize transition-all ${
                filters.parking === val
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {val === "indifferent" ? "Indifferent" : val === "oui" ? "Oui" : "Non"}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="text-xs font-semibold text-[var(--jqm-gris)] uppercase tracking-wide mb-2 block">Etat</label>
        <div className="flex flex-wrap gap-2">
          {([
            { value: "indifferent" as const, label: "Indifferent" },
            { value: "neuf" as const, label: "Neuf" },
            { value: "renove" as const, label: "Renove" },
            { value: "a-renover" as const, label: "A renover" },
          ]).map((c) => (
            <button
              key={c.value}
              onClick={() => update({ condition: c.value })}
              className={`px-4 py-2 text-sm rounded-sm transition-all ${
                filters.condition === c.value
                  ? "bg-[var(--jqm-burgundy)] text-white"
                  : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] hover:bg-[var(--jqm-burgundy)]/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
