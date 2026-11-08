/**
 * Page légale « vide » : mentions légales, données personnelles, accessibilité, cookies.
 * Le contenu sera rédigé plus tard par un cabinet spécialisé.
 */
import usePageMeta from '../hooks/usePageMeta.js'

export default function Legal({ titre }) {
  usePageMeta(titre, `${titre} du site Trouve ton artisan (page en construction).`)

  return (
    <div className="container section">
      <h1>{titre}</h1>
      <p>Page en construction.</p>
    </div>
  )
}
