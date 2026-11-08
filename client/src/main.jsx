/**
 * Point d'entrée de l'application React.
 * - BrowserRouter : gère les URL (pages) côté navigateur
 * - main.scss : Bootstrap personnalisé + styles du site
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
