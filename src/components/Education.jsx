"use client";

import Reveal, { SectionLabel } from "@/components/Reveal";
import { education } from "@/data/content";

export default function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-10"
    >
      <SectionLabel index="04">Formation</SectionLabel>

      <div className="divide-y divide-ink-border border-y border-ink-border">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.06}>
            <div
              className={`group grid grid-cols-1 gap-3 py-7 transition-colors hover:bg-ink-soft md:grid-cols-[11rem_1fr] md:gap-10 md:px-3 ${
                edu.current ? "md:py-9" : ""
              }`}
            >
              <div className="flex flex-col gap-2 font-mono text-sm">
                <span
                  className={
                    edu.current
                      ? "text-acid"
                      : "text-bone-faint transition-colors group-hover:text-acid"
                  }
                >
                  {edu.period}
                </span>
                {(edu.current || edu.badge) && (
                  <span className="w-fit rounded-full border border-acid/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-acid">
                    {edu.badge ?? "Docteur"}
                  </span>
                )}
              </div>

              <div>
                <h3
                  className={`font-display font-medium text-bone ${
                    edu.current ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {edu.degree}
                </h3>
                <p className="mt-1 text-bone-dim">{edu.school}</p>
                {edu.details && (
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-bone-faint">
                    {edu.details}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
