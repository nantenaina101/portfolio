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
- Docteur en physique nucléaire appliquée (Université d'Antananarivo, thèse soutenue le 22 juillet 2026), formé à l'INSTN-Madagascar. Basé à Antananarivo (Madagascar).
- Thèse : « Phénomène d'érosion et de sédimentation dans le contexte du changement climatique : cas du bassin versant de Mandraka » (direction L. V. Rakotozafy, co-direction A. F. Solonjara).
- Thèmes : télédétection, érosion et dynamique sédimentaire, changement climatique, géochronologie au ²¹⁰Pb et ¹³⁷Cs.
- Résultats : séries climatiques sur plus d'un siècle (UDEL 1900-2017, ERA5-Land 1950-2024, CHIRPS 1981-2024) ; baisse des précipitations d'environ 11 mm/an depuis 1981 (rupture en 1998) ; RUSLE spatialisée sur une sous-zone de 16,58 km² (perte en sol d'environ 30 t/ha/an, apports d'environ 3 627 t/an) ; deux carottes du réservoir datées au ²¹⁰Pb (modèle CRS) et contrôlées par le pic de ¹³⁷Cs de 1963 ; efficacité de capture du réservoir de 6 à 10 % seulement.
- Publication (2025) : « Impact of climate change at local level: the case of the Mandraka catchment, Eastern Central of Madagascar », Climate Interactions, 1(1), 2560135, premier auteur. DOI : 10.1080/29966876.2025.2560135.
- Formation : TC Fellowship de l'AIEA en modélisation hydrologique de bassin versant (CNESTEN, Rabat, sept.-nov. 2025, certificat AIEA) ; atelier « Les outils d'intelligence artificielle en géosciences » (Faculté des Sciences de Rabat, 30 oct.-1er nov. 2025, certificat de participation) ; Master et Licence en Physique et Applications (Université d'Antananarivo).
- Compétences : Sentinel-2, SRTM, CHIRPS, ERA5-Land, SoilGrids, Google Earth Engine, QGIS, ArcGIS ; RUSLE, indice de connectivité de Borselli-Cavalli ; tests de Mann-Kendall, Pettitt, Hubert, pente de Sen, transformée de Fourier ; spectrométrie gamma, modèles CF-CS, CIC, CRS ; Python (NumPy, Pandas, SciPy, Matplotlib), SQL, Git, Linux.
- Expérience complémentaire : Extracteur de données & Développeur Web chez Géomadagascar (depuis 2022, web scraping, MySQL/PostgreSQL/MongoDB) ; Développeur Web chez 269 Technology (2019-2021, CRM Dolibarr/Vtiger, API REST). Stack web : Symfony, Laravel, Spring Boot, Express.js, React, Vue.js.
- Langues : Malagasy (langue maternelle), Français (bien), Anglais (intermédiaire).
- Contact : nantenainasoa39@gmail.com / +261 32 51 720 40. ORCID 0009-0004-9879-5872.

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
