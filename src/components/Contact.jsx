"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";
import ContactForm from "@/components/ContactForm";
import Magnetic from "@/components/Magnetic";
import Spotlight from "@/components/Spotlight";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: profile.location,
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-acid/5 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-acid"
        >
          Construisons quelque chose
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-bone md:text-7xl"
        >
          Une idée, un projet&nbsp;? <span className="italic text-acid">Parlons-en</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 inline-block"
        >
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-acid px-8 py-4 font-mono text-sm font-medium tracking-wider text-ink"
            >
              {profile.email}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </motion.div>

        {/* Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <ContactForm />
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border md:grid-cols-4">
          {contacts.map((c) => {
            const Icon = c.icon;
            const inner = (
              <Spotlight className="flex h-full flex-col items-center gap-3 bg-ink-card p-6 text-center transition-colors hover:bg-ink-soft">
                <Icon size={20} className="text-acid" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone-faint">
                    {c.label}
                  </p>
                  <p className="mt-1 break-all text-sm text-bone-dim">{c.value}</p>
                </div>
              </Spotlight>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
