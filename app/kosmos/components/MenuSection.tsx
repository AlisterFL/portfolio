"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuCategory, Language } from "../types";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  category: MenuCategory;
  language: Language;
}

export default function MenuSection({ category, language }: MenuSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-3 p-4"
      >
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} language={language} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
