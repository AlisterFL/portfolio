"use client";

// Adapted from Magic UI — Word Rotate (https://magicui.design/docs/components/word-rotate)
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({ words, duration = 2800, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIndex(0);
    if (reduceMotion || words.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration, reduceMotion]);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className="inline-block"
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Styling lives on an inner span: background-clip:text breaks on animated elements in Chrome */}
          <span className={cn("inline-block", className)}>{words[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
