/**
 * Hook qui charge des données depuis l'API.
 * Renvoie { data, error, loading }.
 * Si path est null, aucune requête n'est envoyée.
 */
import { useEffect, useState } from 'react'
import { getJson } from '../services/api.js'

export default function useFetch(path) {
  const [state, setState] = useState({ data: null, error: null, loading: Boolean(path) })

  useEffect(() => {
    if (!path) {
      setState({ data: null, error: null, loading: false })
      return undefined
    }

    // Permet d'annuler la requête si on quitte la page avant la réponse
    const controller = new AbortController()
    setState({ data: null, error: null, loading: true })

    getJson(path, controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error, loading: false })
      })

    return () => controller.abort()
  }, [path])

  return state
}
