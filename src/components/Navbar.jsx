"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useActiveSection } from "@/lib/useActiveSection";
import { handleAnchorClick } from "@/lib/scroll";

const links = [
  { id: "about", label: "Profil" },
  { id: "research", label: "Recherche" },
  { id: "skills", label: "Compétences" },
  { id: "education", label: "Formation" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = ["top", ...links.map((l) => l.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-ink-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={handleAnchorClick("top")}
          className="group flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-acid animate-pulseDot" />
          <span className="font-mono text-sm tracking-tight text-bone">
            Gilbert Jean R<span className="text-acid">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id} className="relative py-1">
              <a
                href={`#${l.id}`}
                onClick={handleAnchorClick(l.id)}
                className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === l.id ? "text-acid" : "text-bone-dim hover:text-acid"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-acid"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-2 rounded-full border border-ink-border px-3 py-1.5 font-mono text-xs text-bone-faint transition-colors hover:border-acid hover:text-acid"
            aria-label="Ouvrir la palette de commandes"
          >
            <Search size={13} />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <a
            href="#contact"
            onClick={handleAnchorClick("contact")}
            className="rounded-full border border-acid/40 px-5 py-2 font-mono text-xs uppercase tracking-widest text-acid transition-all hover:bg-acid hover:text-ink"
          >
            Me contacter
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-bone"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-border bg-ink/95 px-6 md:hidden"
          >
            {links.map((l) => (
              <li key={l.id} className="border-b border-ink-border/50">
                <a
                  href={`#${l.id}`}
                  onClick={handleAnchorClick(l.id, () => setOpen(false))}
                  className={`block py-4 font-mono text-sm uppercase tracking-widest ${
                    active === l.id ? "text-acid" : "text-bone-dim hover:text-acid"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
