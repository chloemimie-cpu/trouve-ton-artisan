/**
 * Carte d'un artisan : nom, note, spécialité, ville.
 * Toute la carte est cliquable (lien étiré) et mène à la fiche de l'artisan.
 */
import { Link } from 'react-router-dom'
import Stars from './Stars.jsx'

export default function ArtisanCard({ artisan, niveau = 'h3' }) {
  const Titre = niveau

  return (
    <article className="artisan-card">
      <Titre className="artisan-card__nom h5">
        <Link to={`/artisans/${artisan.id_artisan}`} className="stretched-link">
          {artisan.nom}
        </Link>
      </Titre>
      <Stars note={artisan.note} />
      <p className="artisan-card__specialite">{artisan.Specialite?.nom_specialite}</p>
      <p className="artisan-card__ville">{artisan.ville}</p>
    </article>
  )
}
