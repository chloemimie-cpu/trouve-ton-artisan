/**
 * Structure commune à toutes les pages : header, contenu, footer.
 */
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  // À chaque changement de page, on remonte en haut
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {/* Lien d'évitement (accessibilité clavier) : visible seulement au focus */}
      <a className="skip-link" href="#contenu">
        Aller au contenu principal
      </a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
