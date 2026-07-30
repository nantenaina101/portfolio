"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { profile } from "@/data/content";

const initial = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // Le message de succès/erreur s'efface tout seul après 5 secondes.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit() {
    if (status === "loading") return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Merci de remplir tous les champs.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Échec de l'envoi.");

      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-ink-border bg-ink px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-acid";

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-card p-6 text-left md:p-8">
      <h3 className="font-display text-2xl font-medium text-bone">
        Envoyez-moi un message
      </h3>
      <p className="mt-1 text-sm text-bone-dim">
        Il arrivera directement dans ma boîte mail.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={form.name}
            onChange={update("name")}
            placeholder="Votre nom"
            className={inputClass}
            disabled={status === "loading"}
          />
          <input
            value={form.email}
            onChange={update("email")}
            type="email"
            placeholder="Votre email"
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
        <textarea
          value={form.message}
          onChange={update("message")}
          placeholder="Votre message…"
          rows={5}
          className={`${inputClass} resize-none`}
          disabled={status === "loading"}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-acid px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Envoi…
              </>
            ) : (
              <>
                <Send size={16} />
                Envoyer
              </>
            )}
          </button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-acid"
              >
                <CheckCircle2 size={16} />
                Message envoyé, merci !
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle size={16} />
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-bone-faint sm:text-left">
          Vous préférez écrire directement ?{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-acid underline-offset-2 hover:underline"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </div>
  );
}
