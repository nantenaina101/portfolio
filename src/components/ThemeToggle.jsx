"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Évite le décalage d'hydratation : on n'anime le curseur qu'après le montage.
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Changer de thème"
      className="relative flex h-8 w-16 shrink-0 items-center rounded-full border border-ink-border bg-ink-soft px-1 transition-colors hover:border-acid/50"
    >
      <Sun size={13} className="absolute left-1.5 text-bone-faint" />
      <Moon size={13} className="absolute right-1.5 text-bone-faint" />
      {mounted && (
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-acid text-ink shadow-md"
          style={{ marginLeft: isDark ? "calc(100% - 1.5rem)" : "0" }}
        >
          {isDark ? <Moon size={13} /> : <Sun size={13} />}
        </motion.span>
      )}
    </button>
  );
}
