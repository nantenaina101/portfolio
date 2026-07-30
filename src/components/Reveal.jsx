"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-mono text-sm text-acid">{index}</span>
      <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-bone-dim">
        {children}
      </h2>
      <span className="h-px flex-1 bg-ink-border" />
    </div>
  );
}
