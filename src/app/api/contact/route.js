import { Resend } from "resend";
import { saveContactMessage } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Échappe le HTML pour éviter l'injection dans l'email de notification.
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

async function sendNotificationEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) return { sent: false, reason: "not_configured" };

  const resend = new Resend(apiKey);
  // On retire les retours à la ligne du sujet (protection contre l'injection d'en-têtes).
  const safeName = name.replace(/[\r\n]/g, " ");

  const { error } = await resend.emails.send({
    // Domaine de test Resend. Pour la production, vérifiez votre domaine
    // et utilisez par ex. "Portfolio <contact@votre-domaine.com>".
    from: "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email, // permet de répondre directement au visiteur
    subject: `Nouveau message de ${safeName} — Portfolio`,
    text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#4d7c0f">Nouveau message depuis votre portfolio</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;background:#f4f4f5;padding:16px;border-radius:8px">${escapeHtml(
          message
        )}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Erreur Resend:", error);
    return { sent: false, reason: "send_failed" };
  }
  return { sent: true };
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  // Validation
  if (name.length < 2 || name.length > 120) {
    return Response.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json({ error: "Email invalide." }, { status: 400 });
  }
  if (message.length < 5 || message.length > 5000) {
    return Response.json(
      { error: "Le message doit contenir entre 5 et 5000 caractères." },
      { status: 400 }
    );
  }

  // On tente les deux canaux de manière indépendante (best-effort) : la requête
  // n'échoue que si aucun des deux n'est configuré ou n'a fonctionné.
  const [dbResult, emailResult] = await Promise.allSettled([
    saveContactMessage({ name, email, message }),
    sendNotificationEmail({ name, email, message }),
  ]);

  const saved = dbResult.status === "fulfilled" && dbResult.value.saved;
  const sent = emailResult.status === "fulfilled" && emailResult.value.sent;

  if (dbResult.status === "rejected") {
    console.error("Erreur base de données:", dbResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Erreur email:", emailResult.reason);
  }

  if (!saved && !sent) {
    return Response.json(
      {
        error:
          "Aucun canal de réception n'est configuré ou disponible (base de données et email). Ajoutez DB_TYPE/DATABASE_URL et/ou RESEND_API_KEY/CONTACT_EMAIL dans .env.local.",
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, saved, sent });
}
