/**
 * Pied de page présent sur toutes les pages :
 * - liens vers les pages légales
 * - adresse et contacts de l'antenne de Lyon
 */
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-4">
        <div className="row gy-4">
          <nav className="col-md-6" aria-label="Informations légales">
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">Données personnelles</Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </nav>

          <div className="col-md-6">
            <address className="mb-0">
              101 cours Charlemagne
              <br />
              CS 20033
              <br />
              69269 LYON CEDEX 02
              <br />
              France
              <br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>
        </div>
      </div>
    </footer>
  )
}
