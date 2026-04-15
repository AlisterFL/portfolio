"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyType } from "../types";
import { quartiers } from "../data/quartiers";

export default function SearchBar() {
  const router = useRouter();
  const [type, setType] = useState<PropertyType | "">("");
  const [quartier, setQuartier] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (quartier) params.set("quartier", quartier);
    if (priceMax) params.set("priceMax", priceMax);
    router.push(`/jacquemarsimmobilier/biens?${params.toString()}`);
  };

  const types: { value: PropertyType; label: string }[] = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "immeuble", label: "Immeuble" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-full max-w-3xl">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(type === t.value ? "" : t.value)}
              className={`px-4 py-2 text-sm rounded-sm transition-all duration-200 ${
                type === t.value
                  ? "bg-[var(--jqm-gold)] text-[var(--jqm-noir)]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <select
          value={quartier}
          onChange={(e) => setQuartier(e.target.value)}
          className="flex-1 px-4 py-2 text-sm bg-white/10 text-white border border-white/20 rounded-sm appearance-none cursor-pointer [&>option]:text-[var(--jqm-noir)]"
        >
          <option value="">Tous les quartiers</option>
          {quartiers.map((q) => (
            <option key={q.id} value={q.id}>{q.name}</option>
          ))}
        </select>

        <select
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="px-4 py-2 text-sm bg-white/10 text-white border border-white/20 rounded-sm appearance-none cursor-pointer [&>option]:text-[var(--jqm-noir)]"
        >
          <option value="">Budget max</option>
          <option value="200000">200 000 EUR</option>
          <option value="300000">300 000 EUR</option>
          <option value="400000">400 000 EUR</option>
          <option value="500000">500 000 EUR</option>
          <option value="600000">600 000 EUR+</option>
        </select>

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-[var(--jqm-gold)] text-[var(--jqm-noir)] text-sm font-semibold rounded-sm hover:bg-[var(--jqm-gold)]/90 transition-all duration-200"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
