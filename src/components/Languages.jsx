"use client";

import { motion } from "framer-motion";
import Reveal, { SectionLabel } from "@/components/Reveal";
import { languages } from "@/data/content";

export default function Languages() {
  return (
    <section className="relative border-t border-ink-border bg-ink-soft py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionLabel index="05">Langues</SectionLabel>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {languages.map((lang, i) => (
            <Reveal key={lang.name} delay={i * 0.12}>
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-medium text-bone">
                    {lang.name}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-bone-faint">
                    {lang.level}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-border">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-acid"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
