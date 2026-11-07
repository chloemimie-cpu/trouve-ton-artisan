const express = require('express');
const { Op } = require('sequelize');
const { Categorie, Specialite, Artisan } = require('../models');

const router = express.Router();

// L'email n'est jamais renvoyé au navigateur : le formulaire de contact
// passera par le serveur, qui enverra le message à l'artisan.
const SANS_EMAIL = { exclude: ['email'] };

// Inclut la spécialité et sa catégorie dans chaque artisan
const avecSpecialite = (filtreCategorie) => [{
  model: Specialite,
  attributes: ['id_specialite', 'nom_specialite'],
  required: true,
  include: [{
    model: Categorie,
    attributes: ['id_categorie', 'nom_categorie'],
    required: true,
    ...(filtreCategorie && { where: filtreCategorie }),
  }],
}];

// Vérifie qu'un identifiant est bien un entier positif
const idValide = (valeur) => /^\d{1,10}$/.test(valeur);

// GET /api/categories : alimente le menu du header
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Categorie.findAll({ order: [['nom_categorie', 'ASC']] });
    res.json(categories);
  } catch (err) { next(err); }
});

// GET /api/categories/:id/artisans : liste d'une catégorie
router.get('/categories/:id/artisans', async (req, res, next) => {
  try {
    if (!idValide(req.params.id)) return res.status(400).json({ message: 'Identifiant invalide' });
    const artisans = await Artisan.findAll({
      attributes: SANS_EMAIL,
      include: avecSpecialite({ id_categorie: req.params.id }),
      order: [['nom', 'ASC']],
    });
    res.json(artisans);
  } catch (err) { next(err); }
});

// GET /api/artisans/top : les 3 artisans du mois (colonne top)
router.get('/artisans/top', async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      attributes: SANS_EMAIL,
      where: { top: true },
      include: avecSpecialite(),
      order: [['nom', 'ASC']],
      limit: 3,
    });
    res.json(artisans);
  } catch (err) { next(err); }
});

// GET /api/artisans/search?q=... : recherche par nom
router.get('/artisans/search', async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim().slice(0, 50);
    if (q.length < 2) return res.status(400).json({ message: 'Saisissez au moins 2 caractères' });
    // On neutralise les jokers SQL saisis par l'utilisateur
    const motif = q.replace(/[%_\\]/g, '\\$&');
    const artisans = await Artisan.findAll({
      attributes: SANS_EMAIL,
      where: { nom: { [Op.like]: `%${motif}%` } },
      include: avecSpecialite(),
      order: [['nom', 'ASC']],
    });
    res.json(artisans);
  } catch (err) { next(err); }
});

// GET /api/artisans/:id : fiche complète (à placer APRÈS /top et /search)
router.get('/artisans/:id', async (req, res, next) => {
  try {
    if (!idValide(req.params.id)) return res.status(400).json({ message: 'Identifiant invalide' });
    const artisan = await Artisan.findByPk(req.params.id, {
      attributes: SANS_EMAIL,
      include: avecSpecialite(),
    });
    if (!artisan) return res.status(404).json({ message: 'Artisan introuvable' });
    res.json(artisan);
  } catch (err) { next(err); }
});

module.exports = router;