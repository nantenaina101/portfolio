// Toutes les données du portfolio sont centralisées ici.
// Source : CV « MOPGA 2027 – télédétection » (novembre 2026).
// Modifiez ce fichier pour mettre à jour votre contenu sans toucher au design.

export const profile = {
  name: "Jean Gilbert",
  lastName: "Randrianantenainasoa",
  title: "Docteur en Physique Nucléaire Appliquée",
  // Domaines affichés sous le titre (hero)
  domains: [
    "Télédétection",
    "Érosion & sédimentation",
    "Changement climatique",
    "Géochronologie ²¹⁰Pb / ¹³⁷Cs",
  ],
  tagline:
    "Je reconstruis l'érosion d'un bassin versant à partir de satellites, de séries climatiques séculaires et de chronologies isotopiques — et j'écris le code qui rend ces données exploitables.",
  badge: "Thèse soutenue le 22 juillet 2026",
  location: "Antananarivo, Madagascar",
  address: "II AB 22 Bis A, Andrononobe, Antananarivo",
  email: "nantenainasoa39@gmail.com",
  phone: "+261 32 51 720 40",
  github: "https://github.com/nantenaina101",
  githubLabel: "github.com/nantenaina101",
  orcid: "https://orcid.org/0009-0004-9879-5872",
  orcidLabel: "0009-0004-9879-5872",
  about: [
    "Docteur en physique nucléaire appliquée (Université d'Antananarivo), formé à l'INSTN-Madagascar. Mes travaux portent sur l'érosion, la dynamique sédimentaire et le changement climatique à l'échelle d'un bassin versant, à partir de produits de télédétection et de réanalyses (CHIRPS, ERA5-Land, Sentinel-2, SRTM).",
    "J'ai analysé plus d'un siècle de séries de température et de précipitations, cartographié l'érosion du bassin de Mandraka (Hautes Terres malgaches), puis daté des carottes de son réservoir par spectrométrie gamma.",
    "Je souhaite à présent approfondir la télédétection de la surface terrestre et la descente d'échelle climatique, afin de reconstruire l'érosion par satellite, de la valider sur mes chronologies isotopiques et de la projeter sous climat futur.",
  ],
};

export const stats = [
  { value: "100+", label: "ans de séries climatiques analysées (1900–2024)" },
  { value: "9/10", label: "du sédiment entrant traverse le réservoir sans s'y déposer" },
  { value: "1", label: "article publié en 2025, premier auteur" },
  { value: "5+", label: "ans en développement web & extraction de données" },
];

// Mots défilants (marquee)
export const keywords = [
  "Télédétection",
  "Érosion RUSLE",
  "Sentinel-2",
  "CHIRPS",
  "ERA5-Land",
  "Géochronologie",
  "²¹⁰Pb / ¹³⁷Cs",
  "Spectrométrie gamma",
  "Mann-Kendall",
  "Google Earth Engine",
  "QGIS",
  "Python",
];

export const research = {
  context: "Thèse — INSTN-Madagascar",
  thesisTitle:
    "Phénomène d'érosion et de sédimentation dans le contexte du changement climatique : cas du bassin versant de Mandraka",
  supervision: "Direction : L. V. Rakotozafy (HDR) · co-direction : A. F. Solonjara",
  // Résultat principal, mis en avant
  headline: {
    kicker: "Résultat principal",
    metric: "6–10 %",
    metricLabel: "d'efficacité de capture sédimentaire du réservoir",
    text: "213 à 354 t/an déposées pour 3 627 t/an estimées en entrée : plus de neuf dixièmes des apports traversent la retenue.",
  },
  // Les trois axes de la thèse
  axes: [
    {
      id: "climat",
      title: "Changement climatique local",
      tag: "Séries climatiques",
      body: "Séries UDEL (1900–2017), ERA5-Land (1950–2024) et CHIRPS (1981–2024) analysées par les tests de Mann-Kendall, Pettitt et Hubert et par transformée de Fourier.",
      findings: [
        { value: "≈ 11 mm/an", label: "de baisse des précipitations depuis 1981" },
        { value: "1998", label: "année de rupture détectée" },
        { value: "3–10 ans", label: "cycles compatibles avec l'ENSO et l'IOD" },
      ],
    },
    {
      id: "erosion",
      title: "Érosion par télédétection",
      tag: "RUSLE · Connectivité",
      body: "RUSLE spatialisée (CHIRPS, SoilGrids, MNT SRTM, Sentinel-2) et connectivité hydro-sédimentaire (Borselli-Cavalli) sur une sous-zone de 16,58 km².",
      findings: [
        { value: "≈ 30 t/ha/an", label: "de perte en sol moyenne" },
        { value: "3 627 t/an", label: "d'apports estimés vers le réservoir" },
      ],
    },
    {
      id: "geochrono",
      title: "Géochronologie",
      tag: "²¹⁰Pb · ¹³⁷Cs",
      body: "Deux carottes du réservoir datées par ²¹⁰Pb en excès (modèle CRS) et contrôlées par le pic de ¹³⁷Cs de 1963. Mesures par spectrométrie gamma à l'INSTN, de la préparation des échantillons à la propagation des incertitudes.",
      findings: [
        { value: "2", label: "carottes sédimentaires datées" },
        { value: "1963", label: "pic de ¹³⁷Cs utilisé comme repère" },
      ],
    },
  ],
};

export const publication = {
  year: "2025",
  title:
    "Impact of climate change at local level: the case of the Mandraka catchment, Eastern Central of Madagascar",
  authors:
    "Randrianantenainasoa J.G., Rakotozafy L.V., Solonjara A.F., Rasolonirina M., Randrianantenaina F.R., Tsaravola R.S., Rabesiranana N.",
  venue: "Climate Interactions, 1(1), 2560135 (accès libre)",
  doi: "https://doi.org/10.1080/29966876.2025.2560135",
  doiLabel: "10.1080/29966876.2025.2560135",
  summary:
    "Tendances, ruptures et cycles de la température et des précipitations à Mandraka, mis en relation avec le réchauffement global, les modes ENSO et IOD de l'océan Indien et l'évolution de l'usage des terres.",
  role: "Premier auteur et auteur correspondant : conception de l'étude, méthodologie, collecte des données, analyses statistiques, rédaction.",
};

export const skillGroups = [
  {
    title: "Télédétection & SIG",
    items: [
      "Sentinel-2",
      "SRTM",
      "CHIRPS",
      "ERA5-Land",
      "UDEL",
      "SoilGrids",
      "Google Earth Engine",
      "QGIS",
      "ArcGIS",
    ],
  },
  {
    title: "Érosion & sédiments",
    items: ["RUSLE", "Indice de connectivité (Borselli-Cavalli)", "Ratio de livraison sédimentaire"],
  },
  {
    title: "Climat & changement climatique",
    items: [
      "Mann-Kendall",
      "Pente de Sen",
      "Pettitt",
      "Hubert",
      "Transformée de Fourier",
    ],
  },
  {
    title: "Radiochimie & géochronologie",
    items: [
      "Spectrométrie gamma",
      "²¹⁰Pb / ¹³⁷Cs",
      "Modèles CF-CS · CIC · CRS",
      "Propagation d'incertitudes",
      "Carottage (Beeker)",
    ],
  },
  {
    title: "Hydrologie",
    items: ["Modélisation hydrologique de bassin versant (Rabat, 2025)"],
  },
  {
    title: "Programmation & données",
    items: [
      "Python",
      "NumPy",
      "Pandas",
      "SciPy",
      "Matplotlib",
      "R",
      "SQL",
      "NoSQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Git",
      "Docker",
      "Linux",
      "Windows",
    ],
  },
  {
    title: "Extraction de données",
    wide: true,
    items: [
      "Web scraping",
      "Scrapy (Python)",
      "BeautifulSoup (Python)",
      "Requests (Python)",
      "Selenium (Python)",
      "Playwright (Python)",
      "Jsoup (Java)",
      "HtmlUnit (Java)",
      "Selenium (Java)",
      "Appels d'API REST",
      "Proxies & rotation d'IP",
      "Automatisation & planification",
    ],
  },
  {
    title: "Développement web",
    // `wide` : le groupe occupe toute la largeur de la grille (voir Skills.jsx)
    wide: true,
    items: [
      "Java",
      "JavaScript",
      "PHP",
      "Symfony",
      "Laravel",
      "CodeIgniter",
      "Spring Boot",
      "Express.js",
      "React",
      "Vue.js",
      "HTML",
      "CSS",
      "WordPress",
    ],
  },
];

export const education = [
  {
    degree: "Doctorat en Physique, spécialité Physique Nucléaire Appliquée",
    school: "Université d'Antananarivo · École Doctorale Physique et Applications",
    period: "Soutenance : 22 juillet 2026",
    location: "Antananarivo",
    current: true,
    details:
      "Recherche menée à l'INSTN-Madagascar, Département Analyses et Techniques Nucléaires. Thèse : « Phénomène d'érosion et de sédimentation dans le contexte du changement climatique : cas du bassin versant de Mandraka ».",
  },
  {
    degree: "TC Fellowship AIEA — Training on catchment hydrological model",
    school:
      "Agence internationale de l'énergie atomique (AIEA) · CNESTEN, Rabat, Maroc",
    period: "1 sept. – 28 nov. 2025",
    location: "Rabat",
    current: false,
    badge: "Certificat AIEA",
    details:
      "Formation de 3 mois à la modélisation hydrologique de bassin versant, validée par un certificat de l'AIEA (domaine : renforcement des capacités, développement des ressources humaines et gestion des connaissances). Références RAF0063, EVT2405929.",
  },
  {
    degree: "Master en Physique et Applications",
    school: "Université d'Antananarivo",
    period: "2015 — 2018",
    location: "Antananarivo",
    current: false,
  },
  {
    degree: "Licence en Physique et Applications",
    school: "Université d'Antananarivo",
    period: "2012 — 2015",
    location: "Antananarivo",
    current: false,
  },
];

export const experiences = [
  {
    role: "Extracteur de données & Développeur Web",
    company: "Géomadagascar",
    period: "2022 — Présent",
    location: "Antananarivo",
    current: true,
    tasks: [
      "Scripts d'extraction de données (web scraping), traitement et stockage",
      "Gestion des proxies et des rotations d'IP, automatisation et planification",
      "Conception et gestion de bases de données (MySQL, PostgreSQL, MongoDB)",
      "Développement, optimisation et déploiement d'applications web",
      "Tests unitaires, documentation et maintenance",
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
      "Développement et maintenance de sites et d'applications web",
      "Création d'API REST",
      "Tests, débogage et revues de code",
    ],
  },
];

export const languages = [
  { name: "Malagasy", level: "Langue maternelle", value: 100 },
  { name: "Français", level: "Bien", value: 80 },
  { name: "Anglais", level: "Intermédiaire", value: 55, note: "Article scientifique publié en anglais" },
];
