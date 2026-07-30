// Toutes les données du portfolio sont centralisées ici.
// Modifiez ce fichier pour mettre à jour votre contenu sans toucher au design.

export const profile = {
  name: "Jean Gilbert",
  lastName: "Randrianantenainasoa",
  title: "Expert en Extraction de Données & Développement Web",
  tagline:
    "Je transforme le web en données exploitables et je construis des applications claires, performantes et faciles à maintenir.",
  location: "Antananarivo, Madagascar",
  address: "II AB 22 Bis A, Andrononobe, Antananarivo",
  email: "nantenainasoa39@gmail.com",
  phone: "+261 32 51 720 40",
  github: "https://github.com/nantenaina101",
  githubLabel: "github.com/nantenaina101",
  about: [
    "Développeur et spécialiste en Web Scraping passionné, avec plus de 5 ans d'expérience en développement d'applications web et plus de 2 ans en extraction de données.",
    "Expert dans la rédaction de code clair, concis et facile à maintenir. Habitué à travailler en équipe sur des projets variés et au sein d'entreprises de tailles diverses.",
    "Capable de travailler de manière autonome, à distance ou en présentiel, selon les besoins de l'entreprise.",
  ],
};

export const stats = [
  { value: "5+", label: "ans en développement web" },
  { value: "2+", label: "ans en extraction de données" },
  { value: "10+", label: "technologies maîtrisées" },
  { value: "3", label: "langues parlées" },
];

export const experiences = [
  {
    role: "Extracteur de données & Développeur Web",
    company: "Géomadagascar",
    period: "2022 — Présent",
    location: "Antananarivo",
    current: true,
    tasks: [
      "Compréhension des exigences du projet de web scraping et identification des sources de données (sites web ou API)",
      "Développement de scripts de scraping et extraction de données",
      "Traitement et stockage des données extraites",
      "Gestion des proxies et des rotations d'IP",
      "Optimisation des performances de scraping, automatisation et planification",
      "Conception et gestion de bases de données (MySQL, PostgreSQL, MongoDB)",
      "Développement, optimisation et déploiement de sites et applications web",
      "Réalisation de tests unitaires, documentation et maintenance",
    ],
  },
  {
    role: "Développeur Web",
    company: "269 Technology",
    period: "2019 — 2021",
    location: "Antananarivo",
    current: false,
    tasks: [
      "Développement et maintenance des CRM Dolibarr et Vtiger",
      "Développement, déploiement et maintenance de sites et applications web",
      "Création de REST API et RESTful API",
      "Tests et débogage",
      "Participation aux réunions et aux revues de code",
    ],
  },
];

export const skillGroups = [
  {
    title: "Langages",
    items: ["Python", "Java", "JavaScript", "PHP"],
  },
  {
    title: "Frameworks & Librairies",
    items: [
      "Symfony",
      "Laravel",
      "CodeIgniter",
      "Spring Boot",
      "Express.js",
      "React",
      "Vue.js",
    ],
  },
  {
    title: "Bases de données",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "NoSQL"],
  },
  {
    title: "Web & Outils",
    items: ["HTML", "CSS", "WordPress", "Git", "Linux", "Windows"],
  },
];

export const education = [
  {
    degree: "Formation en Développement Web",
    school: "OpenClassrooms",
    period: "2018 — 2019",
    location: "Antananarivo",
  },
  {
    degree: "Autoformation Java & Python (projets pratiques)",
    school: "Internet",
    period: "2019",
    location: "Antananarivo",
  },
  {
    degree: "Master en Physique et Applications",
    school: "Université d'Antananarivo",
    period: "2015 — 2018",
    location: "Antananarivo",
  },
  {
    degree: "Licence en Physique et Applications",
    school: "Université d'Antananarivo",
    period: "2012 — 2015",
    location: "Antananarivo",
  },
  {
    degree: "Baccalauréat Scientifique (série D)",
    school: "Université d'Antananarivo",
    period: "2011 — 2012",
    location: "Antananarivo",
  },
];

export const languages = [
  { name: "Malagasy", level: "Natif", value: 100 },
  { name: "Français", level: "Bien", value: 80 },
  { name: "Anglais", level: "Intermédiaire", value: 55 },
];
