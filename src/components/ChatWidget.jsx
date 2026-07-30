"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Trash2 } from "lucide-react";

const SUGGESTIONS = [
  "Quelles sont ses compétences ?",
  "Parle-moi de son expérience",
  "Maîtrise-t-il le web scraping ?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant de Jean Gilbert. Posez-moi vos questions sur son parcours, ses compétences ou ses projets !",
};

const STORAGE_KEY = "portfolio-chat-history";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Restaure la conversation en cours (survit à une navigation dans la page).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      // stockage indisponible ou corrompu : on reste sur le message d'accueil
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // stockage plein ou indisponible : pas bloquant
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("open-chat", onOpenRequest);
    return () => window.removeEventListener("open-chat", onOpenRequest);
  }, []);

  function clearConversation() {
    setMessages([WELCOME_MESSAGE]);
  }

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== "system"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur réseau");
      }

      // Lecture du flux (streaming) token par token.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je ne parviens pas à répondre pour le moment. Vous pouvez utiliser le formulaire de contact plus bas. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-acid text-ink shadow-2xl transition-transform hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card shadow-2xl"
          >
            {/* En-tête */}
            <div className="flex items-center gap-3 border-b border-ink-border bg-ink-soft px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-acid/15 text-acid">
                <Sparkles size={16} />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-medium text-bone">
                  Assistant IA
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-bone-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulseDot" />
                  En ligne
                </p>
              </div>
              <button
                onClick={clearConversation}
                aria-label="Effacer la conversation"
                title="Effacer la conversation"
                className="rounded-full p-1.5 text-bone-faint transition-colors hover:bg-ink hover:text-acid"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-acid text-ink"
                        : "rounded-bl-sm bg-ink-soft text-bone-dim"
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-faint [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-faint [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-faint" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggestions au départ */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-ink-border px-3 py-1.5 text-left text-xs text-bone-dim transition-colors hover:border-acid hover:text-acid"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saisie */}
            <div className="border-t border-ink-border p-3">
              <div className="flex items-center gap-2 rounded-full border border-ink-border bg-ink px-3 py-1.5 focus-within:border-acid">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Écrivez votre message…"
                  className="flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone-faint"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acid text-ink transition-opacity disabled:opacity-40"
                  aria-label="Envoyer"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[10px] text-bone-faint">
                Propulsé par Llama · Groq
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
