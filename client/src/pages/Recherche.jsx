/**
 * Résultats de la recherche d'un artisan par son nom (barre de recherche du header).
 * L'adresse est de la forme /recherche?q=nom
 */
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import usePageMeta from '../hooks/usePageMeta.js'
import ArtisansGrid from '../components/ArtisansGrid.jsx'
import { Chargement, MessageErreur } from '../components/Status.jsx'

export default function Recherche() {
  const [params] = useSearchParams()
  const terme = (params.get('q') || '').trim()
  const valide = terme.length >= 2

  usePageMeta(
    'Recherche',
    'Résultats de la recherche d’un artisan par son nom en Auvergne-Rhône-Alpes.',
  )

  // Pas de requête si la recherche est trop courte
  const { data, error, loading } = useFetch(
    valide ? `/artisans/search?q=${encodeURIComponent(terme)}` : null,
  )

  return (
    <div className="container section">
      <h1>{valide ? `Résultats pour « ${terme} »` : 'Recherche'}</h1>

      {!valide && <p>Saisissez au moins 2 caractères dans la barre de recherche.</p>}
      {loading && <Chargement />}
      {error && <MessageErreur error={error} />}
      {data && (
        <>
          <p role="status">
            {data.length === 0
              ? 'Aucun artisan ne correspond à votre recherche.'
              : `${data.length} artisan${data.length > 1 ? 's' : ''} trouvé${data.length > 1 ? 's' : ''}.`}
          </p>
          {data.length > 0 && <ArtisansGrid artisans={data} niveau="h2" />}
        </>
      )}
    </div>
  )
}
