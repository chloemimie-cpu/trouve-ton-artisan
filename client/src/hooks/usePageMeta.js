/**
 * Référencement : définit le titre et la description de la page courante.
 */
import { useEffect } from 'react'

const NOM_SITE = 'Trouve ton artisan'

export default function usePageMeta(titre, description) {
  useEffect(() => {
    document.title = titre ? `${titre} | ${NOM_SITE}` : NOM_SITE

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)
  }, [titre, description])
}
