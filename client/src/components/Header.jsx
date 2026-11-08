/**
 * En-tête présent sur toutes les pages :
 * - logo (lien vers l'accueil)
 * - menu des catégories, alimenté par l'API
 * - barre de recherche d'artisans par nom
 * Sur mobile, le menu s'ouvre avec le bouton « burger ».
 */
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import { ORDRE_CATEGORIES } from '../constants.js'

/** Trie les catégories dans l'ordre de la maquette (les inconnues à la fin). */
function trierCategories(categories) {
  const rang = (c) => {
    const index = ORDRE_CATEGORIES.indexOf(c.nom_categorie)
    return index === -1 ? ORDRE_CATEGORIES.length : index
  }
  return [...categories].sort((a, b) => rang(a) - rang(b))
}

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [terme, setTerme] = useState('')
  const navigate = useNavigate()
  const { data: categories } = useFetch('/categories')

  const fermerMenu = () => setMenuOuvert(false)

  function rechercher(event) {
    event.preventDefault()
    const recherche = terme.trim()
    if (recherche.length < 2) return
    navigate(`/recherche?q=${encodeURIComponent(recherche)}`)
    fermerMenu()
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg" aria-label="Navigation principale">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={fermerMenu}>
            <span className="brand__titre">Trouve ton artisan !</span>
            <span className="brand__sous-titre">Avec la région Auvergne-Rhône-Alpes</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menu-principal"
            aria-expanded={menuOuvert}
            aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOuvert(!menuOuvert)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse${menuOuvert ? ' show' : ''}`}
            id="menu-principal"
          >
            <ul className="navbar-nav me-lg-auto mb-3 mb-lg-0">
              {categories &&
                trierCategories(categories).map((categorie) => (
                  <li className="nav-item" key={categorie.id_categorie}>
                    <NavLink
                      className="nav-link"
                      to={`/categories/${categorie.id_categorie}`}
                      onClick={fermerMenu}
                    >
                      {categorie.nom_categorie}
                    </NavLink>
                  </li>
                ))}
            </ul>

            <form className="d-flex" role="search" onSubmit={rechercher}>
              <label htmlFor="recherche-artisan" className="visually-hidden">
                Rechercher un artisan par son nom
              </label>
              <input
                id="recherche-artisan"
                className="form-control"
                type="search"
                placeholder="Rechercher un artisan..."
                value={terme}
                onChange={(event) => setTerme(event.target.value)}
                required
                minLength={2}
                maxLength={50}
              />
              <button className="btn btn-primary ms-2" type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}
