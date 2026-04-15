// app/jacquemarsimmobilier/components/EstimationStepper.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quartiers } from "../data/quartiers";

interface StepData {
  type: string;
  surface: string;
  rooms: string;
  quartier: string;
  floor: string;
  condition: string;
  name: string;
  phone: string;
  email: string;
}

export default function EstimationStepper() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>({
    type: "", surface: "", rooms: "", quartier: "", floor: "", condition: "",
    name: "", phone: "", email: "",
  });

  const update = (field: keyof StepData, value: string) => setData({ ...data, [field]: value });

  const canProceed = step === 0
    ? data.type && data.surface && data.rooms && data.quartier
    : step === 1
    ? data.name && data.email
    : true;

  const steps = ["Votre bien", "Vos coordonnees", "Confirmation"];

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              i <= step ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i <= step ? "text-[var(--jqm-noir)]" : "text-[var(--jqm-gris)]"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[var(--jqm-burgundy)]" : "bg-[var(--jqm-cream)]"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Type de bien</label>
              <div className="flex gap-2">
                {["Appartement", "Maison"].map((t) => (
                  <button key={t} onClick={() => update("type", t.toLowerCase())}
                    className={`px-5 py-2 text-sm rounded-sm transition-all ${data.type === t.toLowerCase() ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Surface (m²)</label>
              <input type="number" value={data.surface} onChange={(e) => update("surface", e.target.value)} placeholder="Ex: 75"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Nombre de pieces</label>
              <div className="flex gap-2">
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <button key={n} onClick={() => update("rooms", n)}
                    className={`w-12 h-12 text-sm rounded-sm transition-all ${data.rooms === n ? "bg-[var(--jqm-burgundy)] text-white" : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)]"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Quartier / Ville</label>
              <select value={data.quartier} onChange={(e) => update("quartier", e.target.value)}
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]">
                <option value="">Selectionnez</option>
                {quartiers.map((q) => <option key={q.id} value={q.id}>{q.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Etage</label>
                <input type="text" value={data.floor} onChange={(e) => update("floor", e.target.value)} placeholder="Ex: 3"
                  className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Etat general</label>
                <select value={data.condition} onChange={(e) => update("condition", e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]">
                  <option value="">Selectionnez</option>
                  <option value="neuf">Neuf</option>
                  <option value="renove">Renove</option>
                  <option value="a-renover">A renover</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Votre nom</label>
              <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Prenom Nom"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Telephone</label>
              <input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="06 XX XX XX XX"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--jqm-noir)] mb-2 block">Email</label>
              <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.fr"
                className="w-full px-4 py-3 border border-[var(--jqm-cream)] rounded-sm focus:outline-none focus:border-[var(--jqm-burgundy)]" />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-[var(--jqm-cream)] rounded-sm p-6 mb-6">
              <h3 className="font-semibold text-[var(--jqm-noir)] mb-4">Recapitulatif</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[var(--jqm-gris)]">Type:</span> <span className="capitalize">{data.type}</span></div>
                <div><span className="text-[var(--jqm-gris)]">Surface:</span> {data.surface} m²</div>
                <div><span className="text-[var(--jqm-gris)]">Pieces:</span> {data.rooms}</div>
                <div><span className="text-[var(--jqm-gris)]">Quartier:</span> <span className="capitalize">{data.quartier.replace(/-/g, " ")}</span></div>
                {data.floor && <div><span className="text-[var(--jqm-gris)]">Etage:</span> {data.floor}</div>}
                {data.condition && <div><span className="text-[var(--jqm-gris)]">Etat:</span> <span className="capitalize">{data.condition.replace(/-/g, " ")}</span></div>}
                <div className="col-span-2 pt-2 border-t border-white/50"><span className="text-[var(--jqm-gris)]">Nom:</span> {data.name}</div>
                {data.phone && <div><span className="text-[var(--jqm-gris)]">Tel:</span> {data.phone}</div>}
                <div><span className="text-[var(--jqm-gris)]">Email:</span> {data.email}</div>
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[var(--jqm-burgundy)] text-white font-semibold rounded-sm hover:bg-[var(--jqm-burgundy-light)] transition-colors"
            >
              Demander mon estimation gratuite
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="text-[var(--jqm-gold)] text-6xl mb-4">&#10003;</div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--jqm-noir)] mb-3">Merci {data.name} !</h3>
            <p className="text-[var(--jqm-gris)]">Votre demande d&apos;estimation a bien ete enregistree. Nous vous recontacterons tres rapidement.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 3 && step < 2 && (
        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2 text-sm text-[var(--jqm-gris)] hover:text-[var(--jqm-noir)] transition-colors">
              Retour
            </button>
          )}
          <button
            onClick={() => canProceed && setStep(step + 1)}
            className={`px-6 py-2 text-sm rounded-sm ml-auto transition-all ${
              canProceed
                ? "bg-[var(--jqm-burgundy)] text-white hover:bg-[var(--jqm-burgundy-light)]"
                : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] cursor-not-allowed"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="flex justify-between mt-8">
          <button onClick={() => setStep(0)} className="px-6 py-2 text-sm text-[var(--jqm-gris)] hover:text-[var(--jqm-noir)] transition-colors">
            Retour
          </button>
          <button
            onClick={() => canProceed && setStep(2)}
            className={`px-6 py-2 text-sm rounded-sm transition-all ${
              canProceed
                ? "bg-[var(--jqm-burgundy)] text-white hover:bg-[var(--jqm-burgundy-light)]"
                : "bg-[var(--jqm-cream)] text-[var(--jqm-gris)] cursor-not-allowed"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
