/**
 * Définition des pages du site (routeur).
 * Toute adresse inconnue (path="*") affiche la page 404.
 */
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Categorie from './pages/Categorie.jsx'
import Recherche from './pages/Recherche.jsx'
import Artisan from './pages/Artisan.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories/:id" element={<Categorie />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="artisans/:id" element={<Artisan />} />

        {/* Pages légales : volontairement vides, remplies plus tard par un cabinet spécialisé */}
        <Route path="mentions-legales" element={<Legal titre="Mentions légales" />} />
        <Route path="donnees-personnelles" element={<Legal titre="Données personnelles" />} />
        <Route path="accessibilite" element={<Legal titre="Accessibilité" />} />
        <Route path="cookies" element={<Legal titre="Cookies" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
