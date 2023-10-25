import React from 'react'
import '../NotFound/NotFoundComponent.css'

// componente per la visualizzazione della pagina 404
const NotFoundComponent = () => {
  return (
    <div className='not-found-container'>
      <h2>404 - Pagina non trovata</h2>
      <p>La pagina che stai cercando potrebbe non esistere o essere stata rimossa.</p>
    </div>
  )
}

export default NotFoundComponent
