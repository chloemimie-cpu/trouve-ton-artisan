/**
 * Note sur 5 avec des étoiles.
 * - Les étoiles sont décoratives (cachées aux lecteurs d'écran)
 * - Le texte « 4,5 / 5 » et un texte pour lecteurs d'écran donnent la note : jamais la couleur seule
 * - Les demi-notes sont gérées : l'étoile pleine est recoupée à la bonne largeur
 */
export default function Stars({ note }) {
  const valeur = Math.min(5, Math.max(0, Number(note) || 0))
  const texte = String(valeur).replace('.', ',')

  return (
    <span className="stars">
      <span className="stars__visuel" aria-hidden="true">
        <span className="stars__vide">★★★★★</span>
        <span className="stars__plein" style={{ width: `${(valeur / 5) * 100}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="stars__texte" aria-hidden="true">
        {texte} / 5
      </span>
      <span className="visually-hidden">Note : {texte} sur 5</span>
    </span>
  )
}
