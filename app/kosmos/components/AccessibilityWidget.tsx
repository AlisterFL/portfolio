"use client";

import { useState, useEffect, useCallback } from "react";
import type { Language } from "../types";

const t = {
  title: { fr: "Accessibilité", nl: "Toegankelijkheid", en: "Accessibility", de: "Barrierefreiheit" },
  textSize: { fr: "Taille du texte", nl: "Tekstgrootte", en: "Text size", de: "Textgröße" },
  contrast: { fr: "Contraste élevé", nl: "Hoog contrast", en: "High contrast", de: "Hoher Kontrast" },
  lineSpacing: { fr: "Espacement des lignes", nl: "Regelafstand", en: "Line spacing", de: "Zeilenabstand" },
  normal: { fr: "Normal", nl: "Normaal", en: "Normal", de: "Normal" },
  relaxed: { fr: "Aéré", nl: "Ruim", en: "Relaxed", de: "Locker" },
  reset: { fr: "Réinitialiser", nl: "Reset", en: "Reset", de: "Zurücksetzen" },
};

type TextSize = "small" | "normal" | "large";
type LineSpacing = "normal" | "relaxed";

interface A11yPrefs {
  textSize: TextSize;
  highContrast: boolean;
  lineSpacing: LineSpacing;
}

const STORAGE_KEY = "kosmos-a11y";
const HC_STYLE_ID = "kosmos-hc-style";

const HC_CSS = `.kosmos-high-contrast * { --tw-text-opacity: 1 !important; }
.kosmos-high-contrast img { filter: contrast(1.1); }`;

const TEXT_SIZE_MAP: Record<TextSize, string> = {
  small: "14px",
  normal: "16px",
  large: "20px",
};

const defaults: A11yPrefs = {
  textSize: "normal",
  highContrast: false,
  lineSpacing: "normal",
};

interface AccessibilityWidgetProps {
  language: Language;
}

export default function AccessibilityWidget({ language }: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("normal");

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prefs: A11yPrefs = JSON.parse(stored);
        if (prefs.textSize) setTextSize(prefs.textSize);
        if (typeof prefs.highContrast === "boolean") setHighContrast(prefs.highContrast);
        if (prefs.lineSpacing) setLineSpacing(prefs.lineSpacing);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save preferences to localStorage
  const savePrefs = useCallback((prefs: A11yPrefs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Apply text size
  useEffect(() => {
    document.documentElement.style.fontSize = TEXT_SIZE_MAP[textSize];
    savePrefs({ textSize, highContrast, lineSpacing });
  }, [textSize, highContrast, lineSpacing, savePrefs]);

  // Apply high contrast
  useEffect(() => {
    const doc = document.documentElement;
    if (highContrast) {
      doc.classList.add("kosmos-high-contrast");
      if (!document.getElementById(HC_STYLE_ID)) {
        const style = document.createElement("style");
        style.id = HC_STYLE_ID;
        style.textContent = HC_CSS;
        document.head.appendChild(style);
      }
    } else {
      doc.classList.remove("kosmos-high-contrast");
      const existing = document.getElementById(HC_STYLE_ID);
      if (existing) existing.remove();
    }
  }, [highContrast]);

  // Apply line spacing
  useEffect(() => {
    document.documentElement.style.lineHeight = lineSpacing === "relaxed" ? "1.8" : "";
  }, [lineSpacing]);

  const reset = () => {
    setTextSize(defaults.textSize);
    setHighContrast(defaults.highContrast);
    setLineSpacing(defaults.lineSpacing);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white shadow-lg transition-transform hover:scale-105"
        aria-label={t.title[language]}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4.5" r="2.5" />
          <path d="M12 7v5" />
          <path d="M8 11l4 2 4-2" />
          <path d="M10 16l2 5" />
          <path d="M14 16l-2 5" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-18 right-6 z-30 w-72 rounded-xl border border-[#1a1a1a]/10 bg-white p-5 shadow-2xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1a1a1a]">{t.title[language]}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* Text size */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-[#1a1a1a]/70">{t.textSize[language]}</p>
            <div className="flex gap-2">
              {(["small", "normal", "large"] as TextSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition-colors ${
                    textSize === size
                      ? "bg-[#c8a97e] text-white"
                      : "bg-[#1a1a1a]/5 text-[#1a1a1a] hover:bg-[#1a1a1a]/10"
                  }`}
                  style={{ fontSize: size === "small" ? "11px" : size === "large" ? "16px" : "13px" }}
                >
                  A
                </button>
              ))}
            </div>
          </div>

          {/* High contrast */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium text-[#1a1a1a]/70">{t.contrast[language]}</p>
            <button
              onClick={() => setHighContrast((v) => !v)}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                highContrast ? "bg-[#c8a97e]" : "bg-[#1a1a1a]/20"
              }`}
              role="switch"
              aria-checked={highContrast}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  highContrast ? "translate-x-4" : ""
                }`}
              />
            </button>
          </div>

          {/* Line spacing */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-[#1a1a1a]/70">{t.lineSpacing[language]}</p>
            <div className="flex gap-2">
              {(["normal", "relaxed"] as LineSpacing[]).map((spacing) => (
                <button
                  key={spacing}
                  onClick={() => setLineSpacing(spacing)}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                    lineSpacing === spacing
                      ? "bg-[#c8a97e] text-white"
                      : "bg-[#1a1a1a]/5 text-[#1a1a1a] hover:bg-[#1a1a1a]/10"
                  }`}
                >
                  {spacing === "normal" ? t.normal[language] : t.relaxed[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full rounded-lg border border-[#1a1a1a]/10 py-1.5 text-xs font-medium text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
          >
            {t.reset[language]}
          </button>
        </div>
      )}
    </>
  );
}
