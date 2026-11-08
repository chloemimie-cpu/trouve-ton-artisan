/**
 * Fiche complète d'un artisan : nom, image, note, spécialité, ville,
 * « À propos », site web (s'il existe) et formulaire de contact.
 */
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import usePageMeta from '../hooks/usePageMeta.js'
import Stars from '../components/Stars.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { Chargement, MessageErreur } from '../components/Status.jsx'
import NotFound from './NotFound.jsx'
import { META_404 } from '../constants.js'

/** Ajoute https:// si l'adresse du site n'a pas de protocole. */
const urlComplete = (url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`)

export default function Artisan() {
  const { id } = useParams()
  const { data: artisan, error, loading } = useFetch(`/artisans/${id}`)

  const introuvable = Boolean(error) && [400, 404].includes(error.status)
  const specialite = artisan?.Specialite?.nom_specialite
  const categorie = artisan?.Specialite?.Categorie

  usePageMeta(
    introuvable
      ? META_404.titre
      : artisan
        ? `${artisan.nom}, ${specialite} à ${artisan.ville}`
        : 'Fiche artisan',
    introuvable
      ? META_404.description
      : artisan
        ? `${artisan.nom}, ${specialite} à ${artisan.ville}. Découvrez son activité et contactez-le via le formulaire.`
        : "Fiche d'un artisan de la région Auvergne-Rhône-Alpes.",
  )

  if (introuvable) return <NotFound />
  if (loading) return <Chargement />
  if (error) {
    return (
      <div className="container section">
        <MessageErreur error={error} />
      </div>
    )
  }
  if (!artisan) return null

  // L'image est affichée seulement si c'est une adresse web complète
  const imageValide = artisan.image && /^https?:\/\//i.test(artisan.image)

  return (
    <div className="container section">
      <nav aria-label="Fil d'Ariane">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Accueil</Link>
          </li>
          {categorie && (
            <li className="breadcrumb-item">
              <Link to={`/categories/${categorie.id_categorie}`}>{categorie.nom_categorie}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {artisan.nom}
          </li>
        </ol>
      </nav>

      <div className="row g-4 align-items-start">
        <div className="col-md-4">
          {imageValide ? (
            <img
              className="artisan-photo"
              src={artisan.image}
              alt={`Photo de ${artisan.nom}`}
              loading="lazy"
            />
          ) : (
            <div className="artisan-photo artisan-photo--vide" role="img" aria-label="Image non disponible">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="M21 16l-5-5-8 8" />
              </svg>
            </div>
          )}
        </div>

        <div className="col-md-8">
          <h1>{artisan.nom}</h1>
          <p className="fiche__note">
            <Stars note={artisan.note} />
          </p>
          <dl className="fiche__infos">
            <div>
              <dt>Spécialité</dt>
              <dd>{specialite}</dd>
            </div>
            <div>
              <dt>Localisation</dt>
              <dd>{artisan.ville}</dd>
            </div>
            {artisan.site_web && (
              <div>
                <dt>Site web</dt>
                <dd>
                  <a href={urlComplete(artisan.site_web)} target="_blank" rel="noopener noreferrer">
                    Visiter le site web de {artisan.nom}
                    <span className="visually-hidden"> (s&apos;ouvre dans un nouvel onglet)</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="row g-5 mt-1">
        <section className="col-lg-6" aria-labelledby="titre-a-propos">
          <h2 id="titre-a-propos">À propos</h2>
          <p>{artisan.a_propos || 'Aucune description pour le moment.'}</p>
        </section>

        <section className="col-lg-6" aria-labelledby="titre-contact">
          <h2 id="titre-contact">Contacter cet artisan</h2>
          <ContactForm artisanId={artisan.id_artisan} artisanNom={artisan.nom} />
        </section>
      </div>
    </div>
  )
}
