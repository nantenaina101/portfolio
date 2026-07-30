# Portfolio — Jean Gilbert Randrianantenainasoa

Portfolio personnel moderne construit avec **Next.js 14 (App Router)**, **Tailwind CSS** et **Framer Motion**.

✨ **Fonctionnalités :**
- 🎨 Design éditorial-tech modernisé : photo intégrée, cartes à halo suivant le curseur (spotlight), boutons magnétiques, tilt 3D, barre de progression de scroll
- ⌘K **Palette de commandes** (`Ctrl/Cmd + K`) pour naviguer, changer de thème, ouvrir le chat ou copier l'email
- 🌗 **Thème clair / sombre** avec bascule animée (préférence mémorisée)
- 🤖 **Chat IA** (propulsé par Llama via **Groq**, gratuit) qui répond aux visiteurs
- 📬 **Formulaire de contact** : email (Resend) **et/ou** persistance en base de données (**MySQL ou PostgreSQL**, au choix)

---

## 🚀 Démarrage rapide (étape par étape)

### Prérequis

- **Node.js 18.17 ou supérieur** ([télécharger ici](https://nodejs.org))

Vérifiez : `node --version`

### Étape 1 — Ouvrir le projet

```bash
cd portfolio-jg
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Configurer les clés (chat IA + formulaire)

Copiez le fichier d'exemple :

```bash
cp .env.local.example .env.local
```

Puis ouvrez `.env.local` et remplissez les valeurs (voir la section **Configuration** ci-dessous).

> 💡 Le site **fonctionne sans ces clés** : seuls le chat IA et l'envoi du formulaire seront désactivés (le reste s'affiche normalement, avec un lien email de secours).

### Étape 4 — Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez **http://localhost:3000**. 🎉

### Étape 5 — Version de production

```bash
npm run build
npm start
```

---

## 🔑 Configuration des clés (`.env.local`)

### 1. Chat IA — clé Groq (gratuite)

```env
GROQ_API_KEY=gsk_xxxxxxxx
```

- Créez une clé sur **https://console.groq.com/keys** (gratuit, aucune carte bancaire).
- Le modèle utilisé est **Llama 3.1 8B Instant** (très rapide, quota gratuit généreux).
  Pour plus de qualité (au prix d'un peu plus de latence), remplacez `MODEL` par
  `openai/gpt-oss-120b` dans `src/app/api/chat/route.js`.
- Le contexte de l'assistant (votre bio) se modifie dans le même fichier (`SYSTEM_PROMPT`).

### 2. Formulaire de contact — base de données (optionnel, MySQL **ou** PostgreSQL)

```env
DB_TYPE=postgres
DATABASE_URL=postgres://user:password@host:5432/nom_de_la_base
```

- `DB_TYPE` accepte `mysql` ou `postgres` — un seul moteur à la fois.
- `DATABASE_URL` est l'URL de connexion standard de votre base.
- La table `contact_messages` (id, name, email, message, created_at) est **créée automatiquement**
  au premier message reçu — voir `src/lib/db.js` (et `sql/mysql.sql` / `sql/postgres.sql` si vous
  préférez la créer vous-même).
- Options gratuites pour héberger une base : **Neon** ou **Supabase** (PostgreSQL), **Aiven** ou
  **FreeSQLDatabase** (MySQL), ou une instance locale.
- Si `DB_TYPE`/`DATABASE_URL` ne sont pas définis, ce canal est simplement ignoré (le formulaire
  continue de fonctionner via l'email ci-dessous).

### 3. Formulaire de contact — email (Resend, optionnel)

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=nantenainasoa39@gmail.com
```

- Créez un compte gratuit sur **https://resend.com** (100 emails/jour offerts).
- Récupérez votre clé API dans le dashboard.
- `CONTACT_EMAIL` = l'adresse qui **reçoit** les messages des visiteurs.
- Par défaut, les emails partent du domaine de test `onboarding@resend.dev`.
  Pour la production, vérifiez votre propre domaine sur Resend puis changez
  le champ `from` dans `src/app/api/contact/route.js`.

> Le formulaire de contact n'échoue que si **aucun** des deux canaux (base de données, email)
> n'est configuré ou disponible. Vous pouvez donc activer l'un, l'autre, ou les deux.

---

## ✏️ Personnaliser le contenu

Tout le contenu (nom, expériences, compétences, formations, langues, coordonnées)
est centralisé dans **un seul fichier** :

```
src/data/content.js
```

### Photo

La photo de profil est `public/images/profile.jpg` (utilisée dans le Hero et la section
À propos). Remplacez ce fichier par la vôtre (format portrait recommandé).

### Couleurs & thèmes

Les couleurs des deux thèmes sont définies dans `src/app/globals.css`
(blocs `:root` pour le clair et `.dark` pour le sombre), au format RGB.
La couleur d'accent est `--acid`. Le thème par défaut se règle dans
`src/components/ThemeProvider.jsx` (`defaultTheme`).

---

## 📁 Structure du projet

```
portfolio-jg/
├── src/
│   ├── app/
│   │   ├── layout.js            → polices, metadata, ThemeProvider
│   │   ├── page.js              → assemblage des sections
│   │   ├── globals.css          → styles + variables des 2 thèmes
│   │   └── api/
│   │       ├── chat/route.js    → 🤖 endpoint chat IA (Groq)
│   │       └── contact/route.js → 📬 endpoint contact (BDD + email)
│   ├── components/
│   │   ├── Navbar.jsx · Hero.jsx · Marquee.jsx · About.jsx
│   │   ├── Experience.jsx · Skills.jsx · Education.jsx
│   │   ├── Languages.jsx · Contact.jsx · Footer.jsx · Reveal.jsx
│   │   ├── ThemeProvider.jsx · ThemeToggle.jsx  → 🌗 thème clair/sombre
│   │   ├── ChatWidget.jsx       → 🤖 widget de chat flottant
│   │   ├── ContactForm.jsx      → 📬 formulaire de contact
│   │   ├── CommandPalette.jsx   → ⌘K palette de commandes
│   │   ├── ScrollProgress.jsx   → barre de progression de scroll
│   │   ├── Magnetic.jsx         → boutons "magnétiques"
│   │   ├── Spotlight.jsx        → halo suivant le curseur
│   │   └── Counter.jsx          → nombres animés (count-up)
│   ├── lib/db.js                → 🗄️ abstraction MySQL / PostgreSQL
│   └── data/content.js          → ⭐ TOUT votre contenu
├── sql/mysql.sql, sql/postgres.sql → schéma de référence
├── .env.local.example
├── tailwind.config.js
└── package.json
```

---

## ☁️ Déploiement gratuit (Vercel)

1. Poussez le projet sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Import Project** → sélectionnez le dépôt.
3. **Important :** dans *Settings → Environment Variables*, ajoutez
   `GROQ_API_KEY`, et selon vos besoins `DB_TYPE`/`DATABASE_URL` et/ou
   `RESEND_API_KEY`/`CONTACT_EMAIL`.
4. **Deploy.** En ligne en ~1 minute.

---

## 🛠️ Stack technique

| Outil          | Rôle                              |
| -------------- | ---------------------------------- |
| Next.js 14     | Framework React (App Router)       |
| Tailwind CSS   | Styles utilitaires                 |
| Framer Motion  | Animations & interactions          |
| next-themes    | Gestion clair / sombre             |
| Groq (Llama)   | Chat IA (API compatible OpenAI)    |
| mysql2 / pg    | Persistance du formulaire (au choix)|
| Resend         | Envoi d'emails                     |
| Lucide React   | Icônes                             |
