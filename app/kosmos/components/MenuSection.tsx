"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuCategory, MenuItem, Language } from "../types";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  category: MenuCategory;
  language: Language;
  onItemClick: (item: MenuItem) => void;
}

export default function MenuSection({ category, language, onItemClick }: MenuSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {category.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-[var(--text-tertiary)]">
            Aucun resultat
          </p>
        ) : (
          category.items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              language={language}
              onClick={() => onItemClick(item)}
            />
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}
