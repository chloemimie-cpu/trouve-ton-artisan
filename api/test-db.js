// Test de connexion isolé : affiche ce que Node lit dans le .env 
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  console.log(JSON.stringify({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    db: process.env.DB_NAME,
    longueurMdp: (process.env.DB_PASSWORD || '').length,
  }));
  try {
    const c = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    
    });
    console.log('Connexion OK');
    await c.end();
  } catch (e) {
    console.log('Erreur :', e.code, e.message);
  }
})();