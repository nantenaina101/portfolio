"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const TWINKLE_COUNT = 140;
const MOTE_COUNT = 16;
const PRECIP_COUNT = 55;
const RIPPLE_DURATION = 900;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function readAcidRgb() {
  if (typeof window === "undefined") return "205,253,80";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--acid")
    .trim();
  return raw ? raw.replace(/\s+/g, ",") : "205,253,80";
}

// Fond décoratif plein écran, fixe et non interactif. Deux ambiances bien
// distinctes selon le thème :
//  - Sombre ("nuit") : étoiles qui scintillent, particules "radioactives"
//    (clin d'œil à la couleur acid du thème) qui dérivent, pluie qui tombe.
//  - Clair ("jour") : bokeh de lumière douce, pollen qui flotte, bulles
//    qui remontent doucement.
// Un clic en dehors des liens/boutons déclenche en prime une onde façon
// goutte d'eau à l'endroit cliqué.
export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  themeRef.current = resolvedTheme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let acidRgb = readAcidRgb();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Étoiles en thème sombre / bokeh de lumière en thème clair.
    const twinkles = Array.from({ length: TWINKLE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.4, 1.6),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.4, 1.2),
      vx: rand(-0.06, 0.06),
      vy: rand(-0.08, -0.02),
    }));

    // Particules "radioactives" en sombre / pollen en clair.
    const motes = Array.from({ length: MOTE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(30, 90),
      vx: rand(-0.05, 0.05),
      vy: rand(-0.15, -0.04),
      phase: rand(0, Math.PI * 2),
    }));

    // Pluie en sombre / bulles montantes en clair.
    const precip = Array.from({ length: PRECIP_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(-window.innerHeight, window.innerHeight),
      len: rand(10, 22),
      r: rand(1.5, 4),
      vy: rand(2.5, 6),
      drift: rand(-0.3, 0.3),
      opacity: rand(0.12, 0.4),
      phase: rand(0, Math.PI * 2),
    }));

    const ripples = [];

    function isInteractive(el) {
      return !!el?.closest?.(
        'a, button, input, textarea, select, [role="button"], [data-no-ripple]'
      );
    }

    function onClick(e) {
      if (isInteractive(e.target)) return;
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
    }
    window.addEventListener("click", onClick);

    let raf = null;
    let last = performance.now();
    let themeCheckAcc = 0;

    function draw(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      const isDark = themeRef.current !== "light";

      // Relit la couleur d'accent de temps en temps (change avec le thème).
      themeCheckAcc += dt;
      if (themeCheckAcc > 400) {
        themeCheckAcc = 0;
        acidRgb = readAcidRgb();
      }

      ctx.clearRect(0, 0, width, height);

      // --- Étoiles (nuit) / bokeh (jour) ---
      const twinkleAlphaMax = isDark ? 0.9 : 0.35;
      for (const s of twinkles) {
        s.phase += dt * 0.0012 * s.speed;
        const a = (Math.sin(s.phase) * 0.5 + 0.5) * twinkleAlphaMax;
        if (isDark) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244,241,234,${a})`;
          ctx.fill();
        } else {
          // Bokeh : dérive lentement, plus gros et plus doux qu'une étoile.
          s.x += s.vx * dt * 0.04;
          s.y += s.vy * dt * 0.04;
          if (s.y < -20) s.y = height + 20;
          if (s.x < -20) s.x = width + 20;
          if (s.x > width + 20) s.x = -20;
          const r = s.r * 6;
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
          grad.addColorStop(0, `rgba(255,250,230,${a * 0.6})`);
          grad.addColorStop(1, "rgba(255,250,230,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Particules radioactives (nuit) / pollen (jour) ---
      const moteAlpha = isDark ? 0.16 : 0.1;
      for (const m of motes) {
        const speedMul = isDark ? 1 : 0.5;
        m.x += m.vx * dt * 0.05 * speedMul;
        m.y += m.vy * dt * 0.05 * speedMul;
        m.phase += dt * 0.0008;
        if (m.y < -m.r) m.y = height + m.r;
        if (m.x < -m.r) m.x = width + m.r;
        if (m.x > width + m.r) m.x = -m.r;
        const pulse = 0.75 + Math.sin(m.phase) * 0.25;
        const r = isDark ? m.r * pulse : m.r * pulse * 0.45;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r);
        grad.addColorStop(0, `rgba(${acidRgb},${moteAlpha})`);
        grad.addColorStop(1, `rgba(${acidRgb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Pluie (nuit) / bulles montantes (jour) ---
      if (isDark) {
        const dropColor = "180,200,255";
        for (const d of precip) {
          d.y += d.vy * (dt * 0.06);
          d.x += d.drift;
          if (d.y > height + d.len) {
            d.y = rand(-40, -5);
            d.x = rand(0, width);
          }
          const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.len);
          grad.addColorStop(0, `rgba(${dropColor},0)`);
          grad.addColorStop(1, `rgba(${dropColor},${d.opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.drift * 3, d.y + d.len);
          ctx.stroke();
        }
      } else {
        const bubbleColor = "90,140,190";
        for (const d of precip) {
          d.y -= d.vy * (dt * 0.025);
          d.x += Math.sin(d.phase) * 0.3;
          d.phase += dt * 0.002;
          if (d.y < -d.r * 2) {
            d.y = height + rand(0, 40);
            d.x = rand(0, width);
          }
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${bubbleColor},${d.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // --- Ondes au clic (façon goutte d'eau) ---
      const rippleColor = isDark ? "180,200,255" : "90,140,190";
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const elapsed = now - r.t0;
        if (elapsed > RIPPLE_DURATION) {
          ripples.splice(i, 1);
          continue;
        }
        const p = elapsed / RIPPLE_DURATION;
        const eased = 1 - Math.pow(1 - p, 3);
        const alpha = (1 - p) * 0.5;
        const radius = 6 + eased * 70;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rippleColor},${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        const radius2 = radius - 20;
        if (radius2 > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rippleColor},${alpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function start() {
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }

    if (reduceMotion) {
      draw(performance.now()); // une seule frame statique, pas de boucle
    } else {
      start();
    }

    function onVisibility() {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!reduceMotion && raf === null) {
        start();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
