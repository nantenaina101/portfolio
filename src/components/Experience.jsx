"use client";

import Reveal, { SectionLabel } from "@/components/Reveal";
import { experiences } from "@/data/content";
import { MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-10"
    >
      <SectionLabel index="05">Expérience professionnelle complémentaire</SectionLabel>

      <div className="relative border-l border-ink-border pl-8 md:pl-12">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.1}>
            <div className="relative mb-16 last:mb-0">
              {/* point timeline */}
              <span
                className={`absolute -left-[41px] top-1.5 h-3.5 w-3.5 rounded-full border-2 md:-left-[57px] ${
                  exp.current
                    ? "border-acid bg-acid animate-pulseDot"
                    : "border-ink-border bg-ink"
                }`}
              />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-sm text-acid">{exp.period}</span>
                {exp.current && (
                  <span className="rounded-full border border-acid/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-acid">
                    En poste
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-2xl font-medium text-bone md:text-3xl">
                {exp.role}
              </h3>

              <p className="mt-1 flex items-center gap-3 text-bone-dim">
                <span className="font-medium text-bone">{exp.company}</span>
                <span className="flex items-center gap-1 text-sm text-bone-faint">
                  <MapPin size={13} />
                  {exp.location}
                </span>
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {exp.tasks.map((t, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[15px] leading-relaxed text-bone-dim"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
