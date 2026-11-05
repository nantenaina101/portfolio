"use client";

import { ArrowUpRight, BookOpen, Quote } from "lucide-react";
import Reveal, { SectionLabel } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import { research, publication } from "@/data/content";

export default function Research() {
  const [firstAuthor, ...otherAuthors] = publication.authors.split(", ");

  return (
    <section id="research" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10">
      <SectionLabel index="02">Travaux de recherche</SectionLabel>

      {/* Intro : contexte + titre de la thèse */}
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-acid">
          {research.context}
        </p>
        <h3 className="mt-4 max-w-4xl text-balance font-display text-2xl font-medium leading-snug text-bone md:text-4xl">
          « {research.thesisTitle} »
        </h3>
        <p className="mt-4 text-sm text-bone-faint">{research.supervision}</p>
      </Reveal>

      {/* Trois axes de la thèse */}
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {research.axes.map((axis, i) => (
          <Reveal key={axis.id} delay={i * 0.1} className="h-full">
            <Spotlight className="group flex h-full flex-col rounded-2xl border border-ink-border bg-ink-card p-7 transition-colors hover:border-acid/40">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-acid/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-acid">
                  {axis.tag}
                </span>
                <span className="font-mono text-xs text-bone-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="mt-6 font-display text-2xl font-medium text-bone">
                {axis.title}
              </h4>
              <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">
                {axis.body}
              </p>

              <dl className="mt-8 space-y-4 border-t border-ink-border pt-6">
                {axis.findings.map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5">
                    <dt className="font-display text-2xl font-semibold text-gradient">
                      {f.value}
                    </dt>
                    <dd className="text-sm leading-snug text-bone-dim">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      {/* Résultat principal */}
      <Reveal delay={0.1} className="mt-6">
        <div className="border-gradient relative overflow-hidden rounded-2xl bg-ink-card p-8 md:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-acid/10 blur-[90px]" />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr] md:gap-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-acid">
                {research.headline.kicker}
              </p>
              <p className="mt-3 font-display text-6xl font-semibold leading-none text-gradient md:text-7xl">
                {research.headline.metric}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-bone-dim">
                {research.headline.metricLabel}
              </p>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl">
              {research.headline.text}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Publication */}
      <Reveal delay={0.15} className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <BookOpen size={16} className="text-acid" />
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-bone-dim">
            Publication
          </h3>
        </div>

        <Spotlight className="rounded-2xl border border-ink-border bg-ink-card p-7 transition-colors hover:border-acid/40 md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr]">
            <span className="font-display text-5xl font-semibold text-bone-faint/60 md:text-6xl">
              {publication.year}
            </span>

            <div>
              <h4 className="font-display text-xl font-medium leading-snug text-bone md:text-2xl">
                {publication.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                <strong className="font-semibold text-bone">{firstAuthor}</strong>
                {otherAuthors.length > 0 && `, ${otherAuthors.join(", ")}`}
              </p>
              <p className="mt-1 text-sm italic text-bone-faint">{publication.venue}</p>

              <p className="mt-5 max-w-3xl leading-relaxed text-bone-dim">
                {publication.summary}
              </p>

              <p className="mt-5 flex max-w-3xl gap-3 text-sm italic leading-relaxed text-bone-faint">
                <Quote size={14} className="mt-1 shrink-0 text-acid" />
                {publication.role}
              </p>

              <a
                href={publication.doi}
                target="_blank"
                rel="noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-acid/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-acid transition-colors hover:bg-acid hover:text-ink"
              >
                DOI · {publication.doiLabel}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </Spotlight>
      </Reveal>
    </section>
  );
}
