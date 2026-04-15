// app/jacquemarsimmobilier/biens/[id]/page.tsx
"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import JacquemarsNav from "../../components/JacquemarsNav";
import JacquemarsFooter from "../../components/JacquemarsFooter";
import PropertyGallery from "../../components/PropertyGallery";
import AgentCard from "../../components/AgentCard";
import PropertyCard from "../../components/PropertyCard";
import { properties } from "../../data/properties";
import { agents } from "../../data/agents";
import { quartiers } from "../../data/quartiers";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  if (!property) return notFound();

  const agent = agents[property.agent];
  const quartier = quartiers.find((q) => q.id === property.quartier);
  const similar = properties
    .filter((p) => p.id !== property.id && (p.quartier === property.quartier || Math.abs(p.price - property.price) < 100000))
    .slice(0, 3);

  const formattedPrice = property.transaction === "location"
    ? `${property.price.toLocaleString("fr-FR")} EUR/mois`
    : `${property.price.toLocaleString("fr-FR")} EUR`;

  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--jqm-gris)] mb-6">
            <Link href="/jacquemarsimmobilier" className="hover:text-[var(--jqm-burgundy)] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/jacquemarsimmobilier/biens" className="hover:text-[var(--jqm-burgundy)] transition-colors">Nos biens</Link>
            <span>/</span>
            <span className="text-[var(--jqm-noir)]">{property.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} alt={property.title} />

              {/* Key info banner */}
              <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Prix</p>
                  <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--jqm-noir)]">{formattedPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Surface</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.surface} m²</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Pieces</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.rooms}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Chambres</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)]">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--jqm-gris)] uppercase">Quartier</p>
                  <p className="text-lg font-semibold text-[var(--jqm-noir)] capitalize">{property.quartier.replace(/-/g, " ")}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-4">{property.title}</h2>
                <p className="text-[var(--jqm-gris)] leading-relaxed">{property.description}</p>
              </div>

              {/* Features grid */}
              <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
                <h3 className="font-semibold text-[var(--jqm-noir)] mb-4">Caracteristiques</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-[var(--jqm-gris)]">Type:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.type}</span></div>
                  <div><span className="text-[var(--jqm-gris)]">Transaction:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.transaction}</span></div>
                  <div><span className="text-[var(--jqm-gris)]">Etat:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.condition.replace(/-/g, " ")}</span></div>
                  {property.floor !== undefined && <div><span className="text-[var(--jqm-gris)]">Etage:</span> <span className="text-[var(--jqm-noir)]">{property.floor}</span></div>}
                  {property.orientation && <div><span className="text-[var(--jqm-gris)]">Orientation:</span> <span className="text-[var(--jqm-noir)]">{property.orientation}</span></div>}
                  {property.heating && <div><span className="text-[var(--jqm-gris)]">Chauffage:</span> <span className="text-[var(--jqm-noir)]">{property.heating}</span></div>}
                  {property.dpe && <div><span className="text-[var(--jqm-gris)]">DPE:</span> <span className="text-[var(--jqm-noir)]">{property.dpe}</span></div>}
                  {property.yearBuilt && <div><span className="text-[var(--jqm-gris)]">Annee:</span> <span className="text-[var(--jqm-noir)]">{property.yearBuilt}</span></div>}
                  {property.charges !== undefined && property.charges > 0 && <div><span className="text-[var(--jqm-gris)]">Charges:</span> <span className="text-[var(--jqm-noir)]">{property.charges} EUR/mois</span></div>}
                  <div><span className="text-[var(--jqm-gris)]">Parking:</span> <span className="text-[var(--jqm-noir)]">{property.parking ? "Oui" : "Non"}</span></div>
                  {property.exterior.length > 0 && <div><span className="text-[var(--jqm-gris)]">Exterieur:</span> <span className="text-[var(--jqm-noir)] capitalize">{property.exterior.join(", ")}</span></div>}
                </div>
                {property.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--jqm-cream)]">
                    <h4 className="text-sm font-semibold text-[var(--jqm-noir)] mb-2">Points forts</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((f) => (
                        <span key={f} className="px-3 py-1 bg-[var(--jqm-cream)] text-[var(--jqm-gris)] text-xs rounded-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quartier */}
              {quartier && (
                <div>
                  <h3 className="font-semibold text-[var(--jqm-noir)] mb-2">Localisation — {quartier.name}</h3>
                  <p className="text-[var(--jqm-gris)] text-sm">{quartier.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AgentCard agent={agent} />

              {/* Visit CTA */}
              {!showVisitForm ? (
                <button
                  onClick={() => setShowVisitForm(true)}
                  className="w-full py-3 bg-[var(--jqm-burgundy)] text-white font-semibold rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors"
                >
                  Demander une visite
                </button>
              ) : visitSubmitted ? (
                <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 text-center">
                  <p className="text-[var(--jqm-burgundy)] font-semibold mb-1">Demande envoyee !</p>
                  <p className="text-[var(--jqm-gris)] text-sm">Nous vous recontacterons rapidement.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setVisitSubmitted(true); }}
                  className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6 space-y-3"
                >
                  <p className="font-semibold text-[var(--jqm-noir)] text-sm mb-2">Demander une visite</p>
                  <input type="text" placeholder="Votre nom" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <input type="tel" placeholder="Telephone" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <input type="email" placeholder="Email" required className="w-full px-3 py-2 text-sm border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
                  <button type="submit" className="w-full py-2 bg-[var(--jqm-burgundy)] text-white text-sm rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors">
                    Envoyer ma demande
                  </button>
                </form>
              )}
            </aside>
          </div>

          {/* Similar properties */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-8">Biens similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
