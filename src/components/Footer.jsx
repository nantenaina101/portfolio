"use client";

import { profile } from "@/data/content";
import { ArrowUp } from "lucide-react";
import { handleAnchorClick } from "@/lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink-border bg-ink py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10">
        <p className="font-mono text-xs text-bone-faint">
          © {year} {profile.name} {profile.lastName}
        </p>
        <a
          href="#top"
          onClick={handleAnchorClick("top")}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-acid"
        >
          Retour en haut
          <ArrowUp
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
