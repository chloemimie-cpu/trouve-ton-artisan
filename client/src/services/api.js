/**
 * Communication avec l'API.
 * L'adresse de l'API vient du fichier .env (variable VITE_API_URL).
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/** Erreur renvoyée par l'API (ou réseau), avec le code HTTP et le détail des champs invalides. */
export class ApiError extends Error {
  constructor(message, status, details = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

/** Envoie une requête et renvoie les données JSON, ou lève une ApiError. */
async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...options,
    })
  } catch (err) {
    // Requête annulée volontairement (changement de page) : on laisse passer l'erreur telle quelle
    if (err.name === 'AbortError') throw err
    throw new ApiError(
      'Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez.',
      0,
    )
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // Réponse vide ou qui n'est pas du JSON : on continue avec data = null
  }

  if (!response.ok) {
    throw new ApiError(
      (data && data.message) || 'Une erreur est survenue. Veuillez réessayer.',
      response.status,
      (data && data.erreurs) || [],
    )
  }
  return data
}

/** GET : lecture de données. */
export const getJson = (path, signal) => request(path, { signal })

/** POST : envoi de données (formulaire de contact). */
export const postJson = (path, body) =>
  request(path, { method: 'POST', body: JSON.stringify(body) })
