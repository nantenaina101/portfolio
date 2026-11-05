"use client";

import { keywords as words } from "@/data/content";

export default function Marquee() {
  const list = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-ink-border bg-ink-soft py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {list.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-widest text-bone-dim"
          >
            {w}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
