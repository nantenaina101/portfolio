"use client";

const words = [
  "Web Scraping",
  "Python",
  "Data Extraction",
  "React",
  "Vue.js",
  "Laravel",
  "Symfony",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
  "REST API",
  "Automatisation",
];

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
