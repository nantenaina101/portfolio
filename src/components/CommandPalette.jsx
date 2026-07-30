"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  MessageCircle,
  Mail,
  Github,
  User,
  Briefcase,
  Wrench,
  GraduationCap,
  Send,
} from "lucide-react";
import { profile } from "@/data/content";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const commands = useMemo(
    () => [
      {
        id: "about",
        label: "Aller à Profil",
        icon: User,
        run: () => scrollTo("#about"),
      },
      {
        id: "experience",
        label: "Aller à Expérience",
        icon: Briefcase,
        run: () => scrollTo("#experience"),
      },
      {
        id: "skills",
        label: "Aller à Compétences",
        icon: Wrench,
        run: () => scrollTo("#skills"),
      },
      {
        id: "education",
        label: "Aller à Formation",
        icon: GraduationCap,
        run: () => scrollTo("#education"),
      },
      {
        id: "contact",
        label: "Aller à Contact",
        icon: Send,
        run: () => scrollTo("#contact"),
      },
      {
        id: "theme",
        label: theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre",
        icon: theme === "dark" ? Sun : Moon,
        run: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      {
        id: "chat",
        label: "Ouvrir l'assistant IA",
        icon: MessageCircle,
        run: () => window.dispatchEvent(new CustomEvent("open-chat")),
      },
      {
        id: "email",
        label: `Copier l'email (${profile.email})`,
        icon: Mail,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "github",
        label: "Ouvrir GitHub",
        icon: Github,
        run: () => window.open(profile.github, "_blank", "noreferrer"),
      },
    ],
    [theme, setTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  function scrollTo(hash) {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function runCommand(cmd) {
    cmd.run();
    close();
  }

  useEffect(() => {
    function onKeyDown(e) {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape" && open) {
        close();
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function onInputKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      runCommand(filtered[activeIndex]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-ink-border bg-ink-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-ink-border px-4 py-3">
              <Search size={16} className="text-bone-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Rechercher une action…"
                className="flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone-faint"
              />
              <kbd className="rounded border border-ink-border px-1.5 py-0.5 font-mono text-[10px] text-bone-faint">
                Esc
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-bone-faint">
                  Aucun résultat.
                </p>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === activeIndex
                        ? "bg-acid/10 text-acid"
                        : "text-bone-dim hover:bg-ink-soft"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1">{cmd.label}</span>
                    {i === activeIndex && <ArrowRight size={14} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
