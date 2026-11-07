require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const routes = require('./routes/api');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Sécurité : en-têtes HTTP, CORS limité au front, limitation de requêtes
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true }));
app.use(express.json({ limit: '10kb' }));

// Route de test
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);
app.use('/api', contactRoutes);

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Erreurs : journalisées côté serveur, sans détails pour le client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrage : on vérifie d'abord la connexion à la base
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base réussie');
    app.listen(PORT, () => console.log(`API sur http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Erreur de connexion :', err.message));