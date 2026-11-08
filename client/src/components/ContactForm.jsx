/**
 * Formulaire de contact d'un artisan (nom, e-mail, objet, message).
 * - Validation côté navigateur (même règles que l'API) pour guider l'utilisateur
 * - L'API revalide tout : elle seule fait foi
 * - Chaque erreur est écrite en texte, liée à son champ (accessibilité)
 */
import { useState } from 'react'
import { postJson } from '../services/api.js'

const VALEURS_VIDES = { nom: '', email: '', objet: '', message: '' }
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Vérifie les champs et renvoie un objet { champ: "message d'erreur" }. */
function valider(valeurs) {
  const erreurs = {}
  const nom = valeurs.nom.trim()
  const email = valeurs.email.trim()
  const objet = valeurs.objet.trim()
  const message = valeurs.message.trim()

  if (nom.length < 2 || nom.length > 100) {
    erreurs.nom = 'Le nom doit contenir entre 2 et 100 caractères.'
  }
  if (!REGEX_EMAIL.test(email) || email.length > 150) {
    erreurs.email = 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.'
  }
  if (objet.length < 3 || objet.length > 150) {
    erreurs.objet = "L'objet doit contenir entre 3 et 150 caractères."
  }
  if (message.length < 10 || message.length > 2000) {
    erreurs.message = 'Le message doit contenir entre 10 et 2000 caractères.'
  }
  return erreurs
}

export default function ContactForm({ artisanId, artisanNom }) {
  const [valeurs, setValeurs] = useState(VALEURS_VIDES)
  const [erreurs, setErreurs] = useState({})
  // statut : repos | envoi | succes | echec
  const [etat, setEtat] = useState({ statut: 'repos', message: '' })

  function modifier(event) {
    const { name, value } = event.target
    setValeurs((precedentes) => ({ ...precedentes, [name]: value }))
  }

  /** Attributs d'accessibilité d'un champ en erreur. */
  const aria = (champ) => ({
    'aria-invalid': erreurs[champ] ? 'true' : undefined,
    'aria-describedby': erreurs[champ] ? `contact-${champ}-erreur` : undefined,
  })
  const classe = (champ) => `form-control${erreurs[champ] ? ' is-invalid' : ''}`

  async function envoyer(event) {
    event.preventDefault()

    const erreursLocales = valider(valeurs)
    setErreurs(erreursLocales)
    if (Object.keys(erreursLocales).length > 0) {
      setEtat({
        statut: 'echec',
        message: 'Le formulaire contient des erreurs. Corrigez les champs signalés puis réessayez.',
      })
      return
    }

    setEtat({ statut: 'envoi', message: '' })
    try {
      await postJson(`/artisans/${artisanId}/contact`, {
        nom: valeurs.nom.trim(),
        email: valeurs.email.trim(),
        objet: valeurs.objet.trim(),
        message: valeurs.message.trim(),
      })
      setValeurs(VALEURS_VIDES)
      setEtat({
        statut: 'succes',
        message: 'Votre message a bien été envoyé. Une réponse vous sera apportée sous 48 h.',
      })
    } catch (error) {
      // L'API signale les champs invalides : on les affiche sous chaque champ
      if (error.status === 400 && error.details.length > 0) {
        const erreursApi = {}
        error.details.forEach(({ champ, message }) => {
          erreursApi[champ] = message
        })
        setErreurs(erreursApi)
      }
      setEtat({
        statut: 'echec',
        message: error.message || "Le message n'a pas pu être envoyé. Veuillez réessayer.",
      })
    }
  }

  return (
    <form onSubmit={envoyer} noValidate aria-label={`Contacter ${artisanNom}`}>
      <p className="text-muted">Tous les champs sont obligatoires.</p>

      {etat.statut === 'succes' && (
        <div className="alert alert-success" role="status">
          {etat.message}
        </div>
      )}
      {etat.statut === 'echec' && (
        <div className="alert alert-danger" role="alert">
          {etat.message}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contact-nom" className="form-label">
          Nom
        </label>
        <input
          id="contact-nom"
          name="nom"
          type="text"
          className={classe('nom')}
          value={valeurs.nom}
          onChange={modifier}
          autoComplete="name"
          maxLength={100}
          {...aria('nom')}
        />
        {erreurs.nom && (
          <div id="contact-nom-erreur" className="invalid-feedback">
            {erreurs.nom}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="contact-email" className="form-label">
          Adresse e-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className={classe('email')}
          value={valeurs.email}
          onChange={modifier}
          autoComplete="email"
          maxLength={150}
          {...aria('email')}
        />
        {erreurs.email && (
          <div id="contact-email-erreur" className="invalid-feedback">
            {erreurs.email}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="contact-objet" className="form-label">
          Objet
        </label>
        <input
          id="contact-objet"
          name="objet"
          type="text"
          className={classe('objet')}
          value={valeurs.objet}
          onChange={modifier}
          maxLength={150}
          {...aria('objet')}
        />
        {erreurs.objet && (
          <div id="contact-objet-erreur" className="invalid-feedback">
            {erreurs.objet}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="contact-message" className="form-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows="6"
          className={classe('message')}
          value={valeurs.message}
          onChange={modifier}
          maxLength={2000}
          {...aria('message')}
        />
        {erreurs.message && (
          <div id="contact-message-erreur" className="invalid-feedback">
            {erreurs.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={etat.statut === 'envoi'}>
        {etat.statut === 'envoi' ? 'Envoi en cours…' : 'Envoyer'}
      </button>
    </form>
  )
}
