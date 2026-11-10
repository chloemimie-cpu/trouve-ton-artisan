// Outil ponctuel : charge database/02_alimentation_base.sql dans la base
// configurée dans api/.env (utilisé ici pour la base hébergée TiDB).
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  const fichier = path.join(__dirname, '..', 'database', '02_alimentation_base.sql');
  const sql = fs.readFileSync(fichier, 'utf8');

  // Sécurité : on vérifie qu'il s'agit bien de la nouvelle version du script
  if (!sql.includes('DELETE FROM artisan') || !sql.includes("SELECT 'Boucher'")) {
    console.log("Ce n'est pas la nouvelle version du script : remplace le fichier puis relance.");
    process.exit(1);
  }

  console.log(`Connexion à ${process.env.DB_HOST}:${process.env.DB_PORT} (base ${process.env.DB_NAME})`);

  const connexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
    multipleStatements: true,
    ssl:
      process.env.DB_SSL === 'true'
        ? { minVersion: 'TLSv1.2', rejectUnauthorized: true }
        : undefined,
  });

  try {
    await connexion.query(sql);
    const [[total]] = await connexion.query('SELECT COUNT(*) AS n FROM artisan');
    const [top] = await connexion.query('SELECT nom FROM artisan WHERE top = 1');
    console.log(`Artisans en base : ${total.n} (attendu : 17)`);
    console.log('Artisans du mois :', top.map((a) => a.nom).join(', '));
  } catch (erreur) {
    console.log('Erreur :', erreur.code, erreur.message);
  } finally {
    await connexion.end();
  }
})();