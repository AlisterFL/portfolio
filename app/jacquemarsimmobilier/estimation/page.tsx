// app/jacquemarsimmobilier/estimation/page.tsx
"use client";

import JacquemarsNav from "../components/JacquemarsNav";
import JacquemarsFooter from "../components/JacquemarsFooter";
import EstimationStepper from "../components/EstimationStepper";
import { agents } from "../data/agents";

export default function EstimationPage() {
  return (
    <main className="bg-[var(--jqm-blanc)] min-h-screen">
      <JacquemarsNav />

      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[var(--jqm-noir)] mb-4">
              Estimation gratuite de votre bien
            </h1>
            <p className="text-[var(--jqm-gris)] max-w-xl mx-auto">
              Recevez une estimation professionnelle de votre appartement ou maison a Lille et sa metropole.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <EstimationStepper />
            </div>

            <aside className="hidden lg:block">
              <div className="bg-[var(--jqm-cream)] rounded-sm p-6 sticky top-28">
                <div className="w-20 h-20 rounded-full bg-[var(--jqm-burgundy)] flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4">
                  J
                </div>
                <blockquote className="text-center text-[var(--jqm-gris)] text-sm italic mb-6">
                  &ldquo;Notre ambition : vous rendre un service durable et de qualite.&rdquo;
                </blockquote>
                <div className="space-y-3 text-sm">
                  {Object.values(agents).map((agent) => (
                    <div key={agent.id} className="text-center">
                      <p className="font-semibold text-[var(--jqm-noir)]">{agent.fullName}</p>
                      <p className="text-[var(--jqm-burgundy)]">{agent.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <JacquemarsFooter />
    </main>
  );
}
