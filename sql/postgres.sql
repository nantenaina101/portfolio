-- Schéma PostgreSQL pour le formulaire de contact.
-- Créé automatiquement par l'application au premier message envoyé
-- (voir src/lib/db.js) — ce fichier n'est utile que si vous préférez
-- créer la table vous-même à l'avance.

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
