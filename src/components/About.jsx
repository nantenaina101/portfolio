"use client";

import Image from "next/image";
import Reveal, { SectionLabel } from "@/components/Reveal";
import { profile, stats } from "@/data/content";
import Spotlight from "@/components/Spotlight";
import Counter from "@/components/Counter";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10">
      <SectionLabel index="01">Profil de recherche</SectionLabel>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-acid/40">
              <Image
                src="/images/profile.jpg"
                alt={`${profile.name} ${profile.lastName}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-sm text-bone-dim">
              {profile.name} {profile.lastName}
              <br />
              <span className="text-bone-faint">{profile.location}</span>
            </p>
          </div>
          <h3 className="font-display text-3xl font-medium leading-tight text-bone md:text-4xl">
            Du{" "}
            <span className="italic text-gradient">satellite</span> au{" "}
            <span className="italic text-gradient">sédiment</span>
          </h3>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone-dim">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border">
            {stats.map((s) => (
              <Spotlight key={s.label} className="bg-ink-card p-6 transition-colors hover:bg-ink-soft">
                <p className="font-display text-4xl font-semibold text-gradient">
                  <Counter value={s.value} />
                </p>
                <p className="mt-2 text-sm leading-snug text-bone-faint">
                  {s.label}
                </p>
              </Spotlight>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
