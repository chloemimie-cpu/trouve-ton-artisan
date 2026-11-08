/**
 * Messages d'état : chargement et erreur.
 * role="status" / role="alert" : annoncés par les lecteurs d'écran.
 */
export function Chargement() {
  return (
    <p className="text-center my-5" role="status">
      Chargement en cours…
    </p>
  )
}

export function MessageErreur({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      {error?.message || 'Une erreur est survenue. Veuillez réessayer.'}
    </div>
  )
}
