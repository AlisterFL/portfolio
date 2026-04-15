// app/jacquemarsimmobilier/components/PropertyCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = property.transaction === "location"
    ? `${property.price.toLocaleString("fr-FR")} EUR/mois`
    : `${property.price.toLocaleString("fr-FR")} EUR`;

  return (
    <Link href={`/jacquemarsimmobilier/biens/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--jqm-noir)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && (
            <span className="px-3 py-1 text-xs tracking-wide bg-[var(--jqm-gold)] text-[var(--jqm-noir)] rounded-sm font-semibold">
              Coup de coeur
            </span>
          )}
          {property.isNew && (
            <span className="px-3 py-1 text-xs tracking-wide bg-white text-[var(--jqm-noir)] rounded-sm font-semibold">
              Nouveau
            </span>
          )}
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold mb-1">{formattedPrice}</p>
          <p className="text-sm text-white/80 mb-2 line-clamp-1">{property.title}</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>{property.surface} m²</span>
            <span>{property.rooms} pieces</span>
            {property.bedrooms > 0 && <span>{property.bedrooms} ch.</span>}
            <span className="capitalize">{property.quartier.replace(/-/g, " ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
