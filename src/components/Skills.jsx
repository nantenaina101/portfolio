"use client";

import Reveal, { SectionLabel } from "@/components/Reveal";
import { skillGroups } from "@/data/content";
import Spotlight from "@/components/Spotlight";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y border-ink-border bg-ink-soft py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionLabel index="03">Compétences scientifiques & techniques</SectionLabel>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.08}
              className={group.wide ? "md:col-span-2 lg:col-span-3" : ""}
            >
              <Spotlight className="group h-full rounded-2xl border border-ink-border bg-ink-card p-7 transition-all hover:border-acid/40">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-medium leading-snug text-bone">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-bone-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-ink-border bg-ink px-3 py-1.5 font-mono text-[13px] text-bone-dim transition-colors group-hover:border-acid/20 hover:!border-acid hover:!text-acid"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
