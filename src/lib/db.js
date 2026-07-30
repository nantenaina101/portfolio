// Couche d'accès à la base de données pour le formulaire de contact.
// Pilotée par les variables d'environnement DB_TYPE ("mysql" | "postgres") et
// DATABASE_URL. Si DB_TYPE n'est pas défini, toutes les fonctions sont des
// no-op : le site continue de fonctionner (email uniquement).

let pool;
let schemaReady = false;

function getConfig() {
  const type = process.env.DB_TYPE;
  const url = process.env.DATABASE_URL;
  if (!type || !url) return null;
  if (type !== "mysql" && type !== "postgres") {
    throw new Error(`DB_TYPE invalide : "${type}" (attendu "mysql" ou "postgres")`);
  }
  return { type, url };
}

async function ensureSchema(dbPool, type) {
  if (schemaReady) return;
  const createTable =
    type === "mysql"
      ? `CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(120) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      : `CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(120) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )`;
  await dbPool.query(createTable);
  schemaReady = true;
}

async function getPool() {
  const config = getConfig();
  if (!config) return null;
  if (pool) return pool;

  if (config.type === "mysql") {
    const { createPool } = await import("mysql2/promise");
    pool = createPool(config.url);
  } else {
    const { Pool } = await import("pg");
    pool = new Pool({ connectionString: config.url });
  }

  await ensureSchema(pool, config.type);
  return pool;
}

// Enregistre un message de contact. Retourne { saved: false } si la base
// n'est pas configurée — l'appelant décide alors de se rabattre sur l'email.
export async function saveContactMessage({ name, email, message }) {
  const config = getConfig();
  if (!config) return { saved: false, reason: "not_configured" };

  const dbPool = await getPool();
  const query =
    config.type === "mysql"
      ? "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)"
      : "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)";

  await dbPool.query(query, [name, email, message]);
  return { saved: true };
}
