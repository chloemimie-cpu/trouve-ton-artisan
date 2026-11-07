// Modèles Sequelize : chaque modèle correspond à une table de la base
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  id_categorie: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom_categorie: { type: DataTypes.STRING(50), allowNull: false },
}, { tableName: 'categorie', timestamps: false });

const Specialite = sequelize.define('Specialite', {
  id_specialite: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom_specialite: { type: DataTypes.STRING(80), allowNull: false },
}, { tableName: 'specialite', timestamps: false });

const Artisan = sequelize.define('Artisan', {
  id_artisan: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
  // DECIMAL est renvoyé en texte par MySQL : on le convertit en nombre
  note: {
    type: DataTypes.DECIMAL(2, 1),
    get() { return parseFloat(this.getDataValue('note')); },
  },
  ville: { type: DataTypes.STRING(80), allowNull: false },
  a_propos: DataTypes.TEXT,
  email: { type: DataTypes.STRING(150), allowNull: false },
  site_web: DataTypes.STRING(255),
  image: DataTypes.STRING(255),
  top: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { tableName: 'artisan', timestamps: false });

// Relations : une catégorie a plusieurs spécialités, une spécialité plusieurs artisans
Categorie.hasMany(Specialite, { foreignKey: 'id_categorie' });
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie' });
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });

module.exports = { sequelize, Categorie, Specialite, Artisan };