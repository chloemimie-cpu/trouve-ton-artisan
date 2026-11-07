// Connexion à MySQL via Sequelize
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
    dialectOptions: { charset: 'utf8mb4' },
    logging: false,
  }
);

module.exports = sequelize;