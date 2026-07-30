"use client";

// Wrapper qui expose la position de la souris en CSS vars (--mx, --my)
// pour dessiner un halo qui suit le curseur (voir la classe `.spotlight` dans globals.css).
export default function Spotlight({ children, className = "" }) {
  function handleMouseMove(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={handleMouseMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
