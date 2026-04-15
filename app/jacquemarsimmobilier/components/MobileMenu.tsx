"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  pathname: string;
  onContactClick: (e: React.MouseEvent) => void;
}

export default function MobileMenu({ open, onClose, links, pathname, onContactClick }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-[var(--jqm-burgundy)] flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white"
            aria-label="Fermer le menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`text-2xl tracking-[0.2em] uppercase transition-colors ${
                    pathname === link.href ? "text-[var(--jqm-gold)]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + links.length * 0.08, duration: 0.4 }}
            >
              <button
                onClick={(e) => { onClose(); onContactClick(e); }}
                className="text-2xl tracking-[0.2em] uppercase text-[var(--jqm-gold)] hover:text-white transition-colors"
              >
                Contact
              </button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
