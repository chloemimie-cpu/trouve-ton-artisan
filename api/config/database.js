// Connexion à MySQL / MariaDB / TiDB via Sequelize
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,
    // Connexion chiffrée uniquement si DB_SSL=true (cas de la base hébergée)
    dialectOptions:
      process.env.DB_SSL === 'true'
        ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } }
        : {},
  }
);

module.exports = sequelize;