"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";
import { profile, stats } from "@/data/content";
import Magnetic from "@/components/Magnetic";
import TypewriterText from "@/components/TypewriterText";
import { handleAnchorClick } from "@/lib/scroll";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const NAME_SEGMENTS = [
  { text: profile.name },
  { br: true },
  { text: profile.lastName.slice(0, 7), className: "italic text-acid" },
  { text: profile.lastName.slice(7), className: "text-bone-faint" },
];

function TiltPhoto() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-ink-border bg-ink-card shadow-2xl"
    >
      <Image
        src="/images/profile.jpg"
        alt={`${profile.name} ${profile.lastName}`}
        fill
        priority
        sizes="(max-width: 768px) 90vw, 380px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
    </motion.div>
  );
}

export default function Hero() {
  const [nameDone, setNameDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* fond décoratif */}
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute inset-0 glow-acid" />
      <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] animate-float-slow rounded-full bg-acid/5 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        {/* Colonne texte */}
        <div>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-acid"
          >
            <span className="h-px w-8 bg-acid" />
            Disponible pour de nouveaux projets
          </motion.p>

          <TypewriterText
            as="h1"
            segments={NAME_SEGMENTS}
            startDelay={500}
            speed={45}
            className="font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-7xl"
            onDone={() => setNameDone(true)}
          />

          {nameDone && (
            <TypewriterText
              as="p"
              segments={[{ text: profile.title }]}
              startDelay={150}
              speed={16}
              className="mt-4 font-mono text-sm uppercase tracking-widest text-bone-dim"
              onDone={() => setSubtitleDone(true)}
            />
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate={subtitleDone ? "show" : "hidden"}
          >
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-bone-dim"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  onClick={handleAnchorClick("contact")}
                  className="group inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-transform"
                >
                  <Mail size={16} />
                  Travaillons ensemble
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3 font-mono text-sm uppercase tracking-wider text-bone transition-colors hover:border-acid hover:text-acid"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Colonne visuelle : pile de cartes + photo avec tilt 3D */}
        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
          {/* Carte "terminal" en arrière-plan, légèrement pivotée */}
          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 20 }}
            animate={{ opacity: 1, rotate: -6, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-4 top-6 hidden w-72 rounded-2xl border border-ink-border bg-ink-card/90 p-1 shadow-xl backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-bone-faint">
                scraper.py
              </span>
            </div>
            <pre className="overflow-hidden p-5 font-mono text-[12px] leading-relaxed">
              <code>
                <span className="text-bone-faint">import</span>{" "}
                <span className="text-bone">requests, json</span>
                {"\n\n"}
                <span className="text-acid">class</span>{" "}
                <span className="text-bone">Developer</span>:
                {"\n"}
                {"    "}role <span className="text-bone-faint">=</span>{" "}
                <span className="text-acid">"Full-Stack + Data"</span>
                {"\n"}
                {"    "}xp_years <span className="text-bone-faint">=</span>{" "}
                <span className="text-bone">5</span>
              </code>
            </pre>
          </motion.div>

          {/* Photo au premier plan */}
          <TiltPhoto />

          {/* Badge flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-ink-border bg-ink-card px-4 py-3 shadow-xl backdrop-blur"
          >
            <span className="font-display text-2xl font-semibold text-acid">
              {stats[0].value}
            </span>
            <span className="max-w-[7rem] text-xs leading-snug text-bone-dim">
              {stats[0].label}
            </span>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        onClick={handleAnchorClick("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bone-faint transition-colors hover:text-acid"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </a>
    </section>
  );
}
