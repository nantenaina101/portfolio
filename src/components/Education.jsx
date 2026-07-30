"use client";

import Reveal, { SectionLabel } from "@/components/Reveal";
import { education } from "@/data/content";

export default function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-10"
    >
      <SectionLabel index="04">Formation académique & professionnelle</SectionLabel>

      <div className="divide-y divide-ink-border border-y border-ink-border">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.06}>
            <div className="group flex flex-col gap-2 py-6 transition-colors hover:bg-ink-soft md:flex-row md:items-center md:justify-between md:px-2">
              <div className="flex items-start gap-5">
                <span className="font-mono text-sm text-bone-faint transition-colors group-hover:text-acid">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-bone md:text-2xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-bone-dim">{edu.school}</p>
                </div>
              </div>
              <div className="ml-10 flex shrink-0 items-center gap-3 font-mono text-sm text-bone-faint md:ml-0">
                <span>{edu.period}</span>
                <span className="h-1 w-1 rounded-full bg-bone-faint" />
                <span>{edu.location}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
