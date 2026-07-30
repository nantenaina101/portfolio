export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// Modèle rapide et 100% gratuit sur Groq. Pour plus de qualité (au prix d'un peu
// plus de latence), remplacez par "openai/gpt-oss-120b".
const MODEL = "llama-3.1-8b-instant";

// Contexte fourni à l'assistant : il répond aux visiteurs au sujet de Jean Gilbert.
const SYSTEM_PROMPT = `Tu es l'assistant virtuel du portfolio de Jean Gilbert Randrianantenainasoa.
Tu réponds aux visiteurs de manière concise, chaleureuse et professionnelle, en français (ou dans la langue du visiteur).

À propos de Jean Gilbert :
- Expert en extraction de données (web scraping) et développeur web full-stack, basé à Antananarivo (Madagascar).
- Plus de 5 ans d'expérience en développement web, plus de 2 ans en extraction de données.
- Poste actuel : Extracteur de données & Développeur Web chez Géomadagascar (depuis 2022).
- Expérience précédente : Développeur Web chez 269 Technology (2019-2021), CRM Dolibarr/Vtiger, REST API.
- Langages : Python, Java, JavaScript, PHP.
- Frameworks : Symfony, Laravel, CodeIgniter, Spring Boot, Express.js, React, Vue.js.
- Bases de données : MySQL, PostgreSQL, MongoDB.
- Outils : Git, Linux, WordPress, gestion de proxies/rotation d'IP, automatisation.
- Formation : Master en Physique et Applications (Université d'Antananarivo), formation OpenClassrooms en développement web.
- Langues : Malagasy (natif), Français (bien), Anglais (intermédiaire).
- Contact : nantenainasoa39@gmail.com / +261 32 51 720 40.

Règles :
- Reste factuel : si une information n'est pas connue, invite le visiteur à utiliser le formulaire de contact.
- Encourage les visiteurs intéressés à contacter Jean Gilbert directement.
- Réponses courtes (2-4 phrases en général).`;

export async function POST(req) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "Clé API non configurée. Ajoutez GROQ_API_KEY dans .env.local.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("messages manquant");
    }
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // On ne garde que les champs utiles et on borne l'historique.
  const sanitized = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .slice(-12)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const upstream = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: 1024,
            stream: true,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const detail = await upstream.text().catch(() => "");
          console.error("Erreur API Groq:", upstream.status, detail);
          controller.enqueue(
            encoder.encode(
              "\n\n[Une erreur est survenue. Réessayez plus tard ou utilisez le formulaire de contact.]"
            )
          );
          controller.close();
          return;
        }

        // Le flux upstream est au format SSE ("data: {...}\n\n"). On extrait
        // uniquement le texte des tokens pour garder un flux texte brut côté client.
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ligne SSE incomplète ou de contrôle : on l'ignore
            }
          }
        }

        controller.close();
      } catch (err) {
        console.error("Erreur API chat:", err);
        controller.enqueue(
          encoder.encode(
            "\n\n[Une erreur est survenue. Réessayez plus tard ou utilisez le formulaire de contact.]"
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
