"use client";

import { useState, useMemo } from "react";
import { Language } from "../types";

const t = {
  heading: { fr: "Réserver une table", nl: "Reserveer een tafel", en: "Book a table", de: "Tisch reservieren" },
  date: { fr: "Date", nl: "Datum", en: "Date", de: "Datum" },
  time: { fr: "Heure", nl: "Uur", en: "Time", de: "Uhrzeit" },
  guests: { fr: "Personnes", nl: "Personen", en: "Guests", de: "Personen" },
  occasion: { fr: "Occasion", nl: "Gelegenheid", en: "Occasion", de: "Anlass" },
  occasionNormal: { fr: "Standard", nl: "Standaard", en: "Standard", de: "Standard" },
  occasionBirthday: { fr: "Anniversaire", nl: "Verjaardag", en: "Birthday", de: "Geburtstag" },
  occasionBusiness: { fr: "Affaires", nl: "Zakelijk", en: "Business", de: "Geschäftlich" },
  occasionOther: { fr: "Autre", nl: "Andere", en: "Other", de: "Andere" },
  name: { fr: "Nom complet", nl: "Volledige naam", en: "Full name", de: "Vollständiger Name" },
  phone: { fr: "Téléphone", nl: "Telefoon", en: "Phone", de: "Telefon" },
  email: { fr: "Email", nl: "E-mail", en: "Email", de: "E-Mail" },
  message: { fr: "Message (optionnel)", nl: "Bericht (optioneel)", en: "Message (optional)", de: "Nachricht (optional)" },
  submit: { fr: "Réserver", nl: "Reserveren", en: "Book now", de: "Reservieren" },
  confirmTitle: { fr: "Réservation envoyée !", nl: "Reservering verzonden!", en: "Reservation sent!", de: "Reservierung gesendet!" },
  confirmText: { fr: "Nous vous contacterons pour confirmer votre réservation.", nl: "Wij nemen contact met u op om uw reservering te bevestigen.", en: "We will contact you to confirm your reservation.", de: "Wir werden Sie kontaktieren, um Ihre Reservierung zu bestätigen." },
  newReservation: { fr: "Nouvelle réservation", nl: "Nieuwe reservering", en: "New reservation", de: "Neue Reservierung" },
};

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 11; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface KosmosSiteReservationProps {
  language: Language;
}

const labelClass = "block text-xs font-medium tracking-wide uppercase text-[#1a1a1a]/50 mb-1.5";
const inputClass =
  "w-full rounded-lg border border-[#1a1a1a]/10 bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-[#d4af37]/50";

export default function KosmosSiteReservation({ language }: KosmosSiteReservationProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const today = useMemo(() => getTodayString(), []);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ date: "", time: "", guests: "2", occasion: "", name: "", phone: "", email: "", message: "" });
    setSubmitted(false);
  };

  return (
    <section id="reservation" className="bg-[#faf9f6] px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            {t.heading[language]}
          </h2>
          <div className="mx-auto h-[2px] w-16 bg-[#d4af37]" />
        </div>

        {submitted ? (
          /* Confirmation card */
          <div className="animate-[fadeIn_0.5s_ease-out] rounded-2xl border border-[#1a1a1a]/5 bg-white p-10 text-center shadow-sm">
            {/* Checkmark */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/10">
              <svg className="h-8 w-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a]">
              {t.confirmTitle[language]}
            </h3>
            <p className="mb-8 text-sm text-[#1a1a1a]/60">
              {t.confirmText[language]}
            </p>
            <button
              onClick={reset}
              className="rounded-full border border-[#d4af37] px-8 py-3 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37] hover:text-white"
            >
              {t.newReservation[language]}
            </button>
          </div>
        ) : (
          /* Reservation form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Date + Time */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t.date[language]}</label>
                <input
                  type="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={update("date")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t.time[language]}</label>
                <select required value={form.time} onChange={update("time")} className={inputClass}>
                  <option value="" disabled />
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Guests + Occasion */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t.guests[language]}</label>
                <select required value={form.guests} onChange={update("guests")} className={inputClass}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t.occasion[language]}</label>
                <select value={form.occasion} onChange={update("occasion")} className={inputClass}>
                  <option value="">{t.occasionNormal[language]}</option>
                  <option value="birthday">{t.occasionBirthday[language]}</option>
                  <option value="business">{t.occasionBusiness[language]}</option>
                  <option value="other">{t.occasionOther[language]}</option>
                </select>
              </div>
            </div>

            {/* Row 3: Name + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t.name[language]}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t.phone[language]}</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 4: Email */}
            <div>
              <label className={labelClass}>{t.email[language]}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className={inputClass}
              />
            </div>

            {/* Row 5: Message */}
            <div>
              <label className={labelClass}>{t.message[language]}</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={update("message")}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#d4af37] py-4 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#c4a030]"
            >
              {t.submit[language]}
            </button>
          </form>
        )}
      </div>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
