"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

// Anime le préfixe numérique d'une valeur type "5+", "10+", "3" en count-up
// quand l'élément entre dans le viewport, puis réaffiche le suffixe tel quel.
export default function Counter({ value, duration = 1.4 }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(target === null ? value : 0);

  useEffect(() => {
    if (!isInView || target === null) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
