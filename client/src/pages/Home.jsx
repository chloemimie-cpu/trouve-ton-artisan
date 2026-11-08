/**
 * Page d'accueil :
 * - présentation
 * - « Comment trouver mon artisan ? » (4 étapes numérotées)
 * - les 3 artisans du mois
 */
import useFetch from '../hooks/useFetch.js'
import usePageMeta from '../hooks/usePageMeta.js'
import ArtisansGrid from '../components/ArtisansGrid.jsx'
import { Chargement, MessageErreur } from '../components/Status.jsx'

const ETAPES = [
  "Choisir la catégorie d'artisanat dans le menu.",
  'Choisir un artisan.',
  'Le contacter via le formulaire de contact.',
  'Une réponse sera apportée sous 48h.',
]

export default function Home() {
  usePageMeta(
    'Accueil',
    "Trouvez facilement un artisan près de chez vous en Auvergne-Rhône-Alpes : bâtiment, services, fabrication, alimentation. Contactez-le en quelques clics.",
  )

  const { data, error, loading } = useFetch('/artisans/top')

  // Les 3 meilleures notes parmi les artisans « du mois »
  const artisansDuMois = data ? [...data].sort((a, b) => b.note - a.note).slice(0, 3) : []

  return (
    <>
      <section className="hero" aria-labelledby="titre-accueil">
        <div className="container">
          <h1 id="titre-accueil">Trouvez l&apos;artisan qu&apos;il vous faut, près de chez vous</h1>
          <p className="lead">
            Bâtiment, services, fabrication, alimentation : contactez en quelques clics un
            artisan de la région Auvergne-Rhône-Alpes.
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="titre-etapes">
        <h2 id="titre-etapes">Comment trouver mon artisan ?</h2>
        <ol className="row g-4 list-unstyled etapes">
          {ETAPES.map((texte, index) => (
            <li className="col-12 col-md-6 col-lg-3 etape" key={texte}>
              <span className="etape__numero" aria-hidden="true">
                {index + 1}
              </span>
              <span className="etape__texte">{texte}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section" aria-labelledby="titre-artisans-mois">
        <h2 id="titre-artisans-mois">Les 3 artisans du mois</h2>
        {loading && <Chargement />}
        {error && <MessageErreur error={error} />}
        {data && <ArtisansGrid artisans={artisansDuMois} />}
      </section>
    </>
  )
}
