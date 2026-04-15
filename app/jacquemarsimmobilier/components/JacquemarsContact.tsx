// app/jacquemarsimmobilier/components/JacquemarsContact.tsx
"use client";

import { useState } from "react";
import { agents } from "../data/agents";

export default function JacquemarsContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[var(--jqm-burgundy)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-8">
            Prenons contact
          </h2>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-sm p-8 text-center">
              <div className="text-[var(--jqm-gold)] text-5xl mb-4">&#10003;</div>
              <p className="text-white text-lg mb-2">Merci pour votre message !</p>
              <p className="text-white/60 text-sm">Nous vous recontacterons dans les plus brefs delais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <input
                type="tel"
                placeholder="Votre telephone"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <input
                type="email"
                placeholder="Votre email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--jqm-gold)] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--jqm-gold)] text-[var(--jqm-noir)] font-semibold rounded-sm hover:bg-[var(--jqm-gold)]/90 transition-all duration-200"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="text-white">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-8">Nos coordonnees</h3>

          <div className="space-y-6 mb-10">
            <div>
              <p className="text-white/50 text-sm mb-1">Adresse</p>
              <p>61 rue Jacquemars Gielee, 3e etage</p>
              <p>59000 Lille</p>
              <p className="text-white/50 text-sm mt-1">Sur rendez-vous uniquement</p>
            </div>

            {Object.values(agents).map((agent) => (
              <div key={agent.id}>
                <p className="font-semibold">{agent.fullName}</p>
                <p className="text-white/70 text-sm">{agent.phone}</p>
                <p className="text-white/70 text-sm">{agent.email}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/jacquemarsimmobilier/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-[var(--jqm-gold)] hover:border-[var(--jqm-gold)] transition-colors"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jacquemars_immobilier/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-[var(--jqm-gold)] hover:border-[var(--jqm-gold)] transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
