"use client";

import { useState, useEffect, useCallback } from "react";
import { Language } from "../types";
import KosmosSiteHeader from "../components/KosmosSiteHeader";

/* ─── Translations ─── */

const t = {
  heading: { fr: "Carte Cadeau", nl: "Cadeaubon", en: "Gift Card", de: "Geschenkkarte" },
  subtitle: {
    fr: "Offrez une expérience Kosmos",
    nl: "Geef een Kosmos ervaring cadeau",
    en: "Give a Kosmos experience",
    de: "Schenken Sie ein Kosmos-Erlebnis",
  },
  customAmount: { fr: "Autre montant", nl: "Ander bedrag", en: "Custom amount", de: "Anderer Betrag" },
  next: { fr: "Suivant", nl: "Volgende", en: "Next", de: "Weiter" },
  back: { fr: "Retour", nl: "Terug", en: "Back", de: "Zurück" },
  from: { fr: "De", nl: "Van", en: "From", de: "Von" },
  to: { fr: "Pour", nl: "Voor", en: "For", de: "Für" },
  senderLabel: { fr: "Votre nom", nl: "Uw naam", en: "Your name", de: "Ihr Name" },
  recipientLabel: { fr: "Nom du destinataire", nl: "Naam ontvanger", en: "Recipient name", de: "Name des Empfängers" },
  messageLabel: { fr: "Message personnel", nl: "Persoonlijk bericht", en: "Personal message", de: "Persönliche Nachricht" },
  emailLabel: { fr: "Votre e-mail", nl: "Uw e-mail", en: "Your email", de: "Ihre E-Mail" },
  pay: { fr: "Payer", nl: "Betaal", en: "Pay", de: "Bezahlen" },
  securePayment: {
    fr: "Paiement sécurisé par Stripe",
    nl: "Veilige betaling via Stripe",
    en: "Secure payment via Stripe",
    de: "Sichere Zahlung über Stripe",
  },
  cardTitle: { fr: "CARTE CADEAU", nl: "CADEAUBON", en: "GIFT CARD", de: "GESCHENKKARTE" },
  validity: { fr: "Valide 1 an", nl: "1 jaar geldig", en: "Valid 1 year", de: "1 Jahr gültig" },
  confirmHeading: {
    fr: "Carte cadeau envoyée !",
    nl: "Cadeaubon verzonden!",
    en: "Gift card sent!",
    de: "Geschenkkarte gesendet!",
  },
  codeSent: {
    fr: "Le code a été envoyé à",
    nl: "De code is verzonden naar",
    en: "The code has been sent to",
    de: "Der Code wurde an",
  },
  codeSentSuffix: { fr: "", nl: "", en: "", de: " gesendet" },
  buyAnother: {
    fr: "Acheter une autre carte",
    nl: "Koop nog een bon",
    en: "Buy another card",
    de: "Weitere Karte kaufen",
  },
  backToSite: {
    fr: "Retour au site",
    nl: "Terug naar site",
    en: "Back to site",
    de: "Zurück zur Seite",
  },
  preview: { fr: "Aperçu", nl: "Voorbeeld", en: "Preview", de: "Vorschau" },
} as const;

const PRESET_AMOUNTS = [25, 50, 75, 100, 150];

function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const block = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `KOSMOS-${block()}-${block()}`;
}

/* ─── Gift Card Visual ─── */

function GiftCardPreview({
  language,
  amount,
  recipientName,
  senderName,
  message,
  code,
}: {
  language: Language;
  amount: number;
  recipientName: string;
  senderName: string;
  message: string;
  code?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 text-white" style={{ aspectRatio: "16/9" }}>
        {/* Subtle gold gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#d4af37]/5" />

        <div className="relative flex h-full flex-col items-center justify-between text-center">
          {/* Logo */}
          <img
            src="https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/fnojkc/kosmos-gold-resized.png"
            alt="Kosmos"
            className="h-5 opacity-80"
          />

          {/* Card title */}
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#d4af37]">
            {t.cardTitle[language]}
          </p>

          {/* Amount */}
          <p className="font-[family-name:var(--font-playfair)] text-4xl font-light text-white">
            €{amount}
          </p>

          {/* Names */}
          <div className="space-y-0.5 text-xs text-white/60">
            {recipientName && (
              <p>
                {t.to[language]}: <span className="text-white/90">{recipientName}</span>
              </p>
            )}
            {senderName && (
              <p>
                {t.from[language]}: <span className="text-white/90">{senderName}</span>
              </p>
            )}
          </div>

          {/* Message */}
          {message && (
            <p className="max-w-[80%] truncate text-[11px] italic text-white/40">{message}</p>
          )}

          {/* Code + validity */}
          <div className="flex w-full items-end justify-between">
            <p className="font-mono text-[10px] tracking-wider text-white/30">
              {code || "KOSMOS-XXXX-XXXX"}
            </p>
            <p className="text-[9px] tracking-wider text-white/30">
              {t.validity[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function GiftCardPage() {
  const [language, setLanguage] = useState<Language>("nl");
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const saved = localStorage.getItem("kosmos-lang") as Language | null;
    if (saved && ["fr", "nl", "en", "de"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("kosmos-lang", lang);
  }

  const goNext = useCallback(() => {
    setDirection("forward");
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection("backward");
    setStep((s) => s - 1);
  }, []);

  const selectedAmount = customAmount ? parseInt(customAmount, 10) : amount;

  function handlePay() {
    if (!email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setGeneratedCode(generateCode());
      setIsProcessing(false);
      setDirection("forward");
      setStep(4);
    }, 1500);
  }

  function handleReset() {
    setStep(1);
    setAmount(50);
    setCustomAmount("");
    setSenderName("");
    setRecipientName("");
    setMessage("");
    setEmail("");
    setGeneratedCode("");
    setDirection("forward");
  }

  const canProceedStep1 = selectedAmount > 0 && !isNaN(selectedAmount);
  const canProceedStep2 = senderName.trim().length > 0 && recipientName.trim().length > 0;

  return (
    <>
      <KosmosSiteHeader language={language} onLanguageChange={handleLanguageChange} />

      <main className="min-h-screen bg-[#faf9f6] pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-6">
          {/* Step indicator */}
          {step < 4 && (
            <div className="mb-10 flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s === step
                      ? "w-8 bg-[#d4af37]"
                      : s < step
                        ? "w-4 bg-[#d4af37]/40"
                        : "w-4 bg-[#1a1a1a]/10"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step content with transitions */}
          <div
            key={step}
            className="animate-fadeSlide"
            style={{
              ["--slide-from" as string]: direction === "forward" ? "20px" : "-20px",
            }}
          >
            {/* ─── Step 1: Choose Amount ─── */}
            {step === 1 && (
              <div>
                <div className="mb-10 text-center">
                  <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[#1a1a1a] sm:text-4xl">
                    {t.heading[language]}
                  </h1>
                  <div className="mx-auto mt-3 h-px w-12 bg-[#d4af37]" />
                  <p className="mt-4 text-sm text-[#1a1a1a]/50">
                    {t.subtitle[language]}
                  </p>
                </div>

                {/* Preset amounts */}
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAmount(a);
                        setCustomAmount("");
                      }}
                      className={`rounded-xl border-2 px-4 py-6 text-center transition-all duration-200 ${
                        !customAmount && amount === a
                          ? "border-[#d4af37] bg-[#d4af37]/5 text-[#1a1a1a]"
                          : "border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/70 hover:border-[#d4af37]/40"
                      }`}
                    >
                      <span className="font-[family-name:var(--font-playfair)] text-2xl font-light">
                        €{a}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mt-6">
                  <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                    {t.customAmount[language]}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30">
                      €
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-[#1a1a1a]/10 bg-white py-3 pl-9 pr-4 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#1a1a1a]/20 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Next button */}
                <div className="mt-8">
                  <button
                    onClick={goNext}
                    disabled={!canProceedStep1}
                    className="w-full rounded-xl bg-[#d4af37] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#c4a030] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.next[language]}
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 2: Personalize ─── */}
            {step === 2 && (
              <div>
                <div className="mb-10 text-center">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[#1a1a1a]">
                    €{selectedAmount}
                  </h2>
                  <div className="mx-auto mt-3 h-px w-12 bg-[#d4af37]" />
                </div>

                <div className="space-y-5">
                  {/* Sender name */}
                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                      {t.senderLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#1a1a1a]/20 focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Recipient name */}
                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                      {t.recipientLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#1a1a1a]/20 focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                      {t.messageLabel[language]}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) setMessage(e.target.value);
                      }}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#1a1a1a]/20 focus:border-[#d4af37]"
                    />
                    <p className="mt-1 text-right text-xs text-[#1a1a1a]/30">
                      {message.length}/200
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={goBack}
                    className="flex-1 rounded-xl border border-[#1a1a1a]/10 bg-white py-3.5 text-sm font-medium text-[#1a1a1a]/60 transition-colors hover:border-[#1a1a1a]/20"
                  >
                    {t.back[language]}
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!canProceedStep2}
                    className="flex-[2] rounded-xl bg-[#d4af37] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#c4a030] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.next[language]}
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 3: Preview & Payment ─── */}
            {step === 3 && (
              <div>
                <div className="mb-8 text-center">
                  <p className="text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                    {t.preview[language]}
                  </p>
                </div>

                <GiftCardPreview
                  language={language}
                  amount={selectedAmount}
                  recipientName={recipientName}
                  senderName={senderName}
                  message={message}
                />

                {/* Email input */}
                <div className="mt-8">
                  <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#1a1a1a]/40">
                    {t.emailLabel[language]}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#1a1a1a]/10 bg-white px-4 py-3 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#1a1a1a]/20 focus:border-[#d4af37]"
                  />
                </div>

                {/* Pay button */}
                <div className="mt-6">
                  <button
                    onClick={handlePay}
                    disabled={!email || isProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-4 text-sm font-semibold text-white transition-all hover:bg-[#c4a030] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isProcessing ? (
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      `${t.pay[language]} €${selectedAmount}`
                    )}
                  </button>
                </div>

                {/* Secure payment note */}
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#1a1a1a]/30">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {t.securePayment[language]}
                </p>

                {/* Back button */}
                <div className="mt-6">
                  <button
                    onClick={goBack}
                    className="w-full rounded-xl border border-[#1a1a1a]/10 bg-white py-3 text-sm font-medium text-[#1a1a1a]/60 transition-colors hover:border-[#1a1a1a]/20"
                  >
                    {t.back[language]}
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 4: Confirmation ─── */}
            {step === 4 && (
              <div className="text-center">
                {/* Checkmark animation */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/10">
                  <svg
                    className="h-8 w-8 animate-checkDraw text-[#d4af37]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      style={{
                        strokeDasharray: 24,
                        strokeDashoffset: 24,
                        animation: "checkDraw 0.5s ease forwards 0.2s",
                      }}
                    />
                  </svg>
                </div>

                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[#1a1a1a]">
                  {t.confirmHeading[language]}
                </h2>

                <p className="mt-3 text-sm text-[#1a1a1a]/50">
                  {t.codeSent[language]} <span className="font-medium text-[#1a1a1a]">{email}</span>
                  {t.codeSentSuffix[language]}
                </p>

                {/* Generated code */}
                <div className="mx-auto mt-5 inline-block rounded-lg bg-[#1a1a1a]/5 px-6 py-3">
                  <p className="font-mono text-lg tracking-wider text-[#1a1a1a]">{generatedCode}</p>
                </div>

                {/* Gift card preview */}
                <div className="mt-8">
                  <GiftCardPreview
                    language={language}
                    amount={selectedAmount}
                    recipientName={recipientName}
                    senderName={senderName}
                    message={message}
                    code={generatedCode}
                  />
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-xl bg-[#d4af37] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c4a030]"
                  >
                    {t.buyAnother[language]}
                  </button>
                  <a
                    href="/kosmos"
                    className="flex-1 rounded-xl border border-[#1a1a1a]/10 bg-white py-3.5 text-center text-sm font-medium text-[#1a1a1a]/60 transition-colors hover:border-[#1a1a1a]/20"
                  >
                    {t.backToSite[language]}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(var(--slide-from, 20px));
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.35s ease-out both;
        }
        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
}
