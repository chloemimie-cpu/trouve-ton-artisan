/**
 * Liste des artisans d'une catégorie (Bâtiment, Services, Fabrication, Alimentation).
 * Une seule page sert aux quatre catégories : le titre et les cartes viennent de l'API.
 */
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import usePageMeta from '../hooks/usePageMeta.js'
import ArtisansGrid from '../components/ArtisansGrid.jsx'
import { Chargement, MessageErreur } from '../components/Status.jsx'
import NotFound from './NotFound.jsx'
import { META_404 } from '../constants.js'

export default function Categorie() {
  const { id } = useParams()
  const categories = useFetch('/categories')
  const artisans = useFetch(`/categories/${id}/artisans`)

  const categorie = categories.data?.find((c) => String(c.id_categorie) === id)
  const nom = categorie?.nom_categorie

  // Catégorie inconnue ou identifiant invalide : page 404
  const introuvable =
    (categories.data && !categorie) ||
    (artisans.error && [400, 404].includes(artisans.error.status))

  usePageMeta(
    introuvable ? META_404.titre : nom ? `Artisans : ${nom}` : 'Artisans',
    introuvable
      ? META_404.description
      : nom
        ? `Liste des artisans de la catégorie ${nom} en Auvergne-Rhône-Alpes. Choisissez un artisan et contactez-le.`
        : 'Liste des artisans de la région Auvergne-Rhône-Alpes.',
  )

  if (introuvable) return <NotFound />

  return (
    <div className="container section">
      <h1>{nom || 'Artisans'}</h1>
      {nom && (
        <p>
          Choisissez un artisan de la catégorie {nom} pour consulter sa fiche et le contacter.
        </p>
      )}

      {(artisans.loading || categories.loading) && <Chargement />}
      {artisans.error && <MessageErreur error={artisans.error} />}
      {artisans.data && <ArtisansGrid artisans={artisans.data} niveau="h2" />}
    </div>
  )
}
