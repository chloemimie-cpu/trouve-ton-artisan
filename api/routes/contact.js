const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { Artisan } = require('../models');

const router = express.Router();

// Anti-spam : 5 messages par heure et par adresse IP
const limiteContact = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { message: 'Trop de messages envoyés, réessayez plus tard' },
});

// Supprime les retours à la ligne (empêche l'injection d'en-têtes d'e-mail)
const uneLigne = (valeur) => String(valeur).replace(/[\r\n]+/g, ' ');

// Validation de chaque champ du formulaire
const regles = [
  body('nom').customSanitizer(uneLigne).trim()
    .isLength({ min: 2, max: 100 }).withMessage('Nom invalide (2 à 100 caractères)'),
  body('email').trim().isEmail().withMessage('Adresse e-mail invalide')
    .isLength({ max: 150 }).withMessage('Adresse e-mail trop longue'),
  body('objet').customSanitizer(uneLigne).trim()
    .isLength({ min: 3, max: 150 }).withMessage('Objet invalide (3 à 150 caractères)'),
  body('message').trim()
    .isLength({ min: 10, max: 2000 }).withMessage('Message invalide (10 à 2000 caractères)'),
];


// POST /api/artisans/:id/contact
router.post('/artisans/:id/contact', limiteContact, regles, async (req, res, next) => {
  try {
    if (!/^\d{1,10}$/.test(req.params.id)) {
      return res.status(400).json({ message: 'Identifiant invalide' });
    }
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
      return res.status(400).json({
        message: 'Données invalides',
        erreurs: erreurs.array().map((e) => ({ champ: e.path, message: e.msg })),
      });
    }

    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Artisan introuvable' });

    const { nom, email, objet, message } = req.body;
    const t = await getTransport();
    const info = await t.sendMail({
      from: process.env.MAIL_FROM,   // adresse du site, jamais celle du visiteur
      to: artisan.email,
      replyTo: email,                // l'artisan répond directement au visiteur
      subject: `[Trouve ton artisan] ${objet}`,
      text: `Message de ${nom} (${email}) :\n\n${message}`, // texte brut : pas de HTML
    });

    // En mode test, on affiche le lien pour consulter l'e-mail
    if (!process.env.SMTP_HOST) {
      console.log('Aperçu du mail :', nodemailer.getTestMessageUrl(info));
    }
    res.json({ message: 'Votre message a bien été envoyé' });
  } catch (err) { next(err); }
});

module.exports = router;