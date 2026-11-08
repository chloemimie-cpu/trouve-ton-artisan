/**
 * Page 404 : affichée pour toute adresse qui n'existe pas.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import { META_404 } from '../constants.js'

export default function NotFound() {
  usePageMeta(META_404.titre, META_404.description)

  return (
    <div className="container section text-center">
      <img
        src="/404.svg"
        alt="Illustration d'erreur 404"
        width="320"
        height="200"
        className="img-fluid mb-4"
      />
      <h1>Page non trouvée</h1>
      <p className="lead">La page que vous avez demandée n&apos;existe pas ou a été déplacée.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
