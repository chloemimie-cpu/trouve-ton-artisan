/**
 * Grille de cartes artisans : 1 colonne sur mobile, 2 sur tablette, 3 sur ordinateur.
 */
import ArtisanCard from './ArtisanCard.jsx'

export default function ArtisansGrid({ artisans, niveau }) {
  if (artisans.length === 0) {
    return <p>Aucun artisan trouvé.</p>
  }

  return (
    <ul className="row g-4 list-unstyled">
      {artisans.map((artisan) => (
        <li className="col-12 col-sm-6 col-lg-4" key={artisan.id_artisan}>
          <ArtisanCard artisan={artisan} niveau={niveau} />
        </li>
      ))}
    </ul>
  )
}
