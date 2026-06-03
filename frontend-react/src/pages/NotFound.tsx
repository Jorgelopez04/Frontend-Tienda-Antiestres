import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-shell">
      <div className="page-card" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Página no encontrada</h1>
        <p className="page-copy">No pudimos encontrar la página que buscabas.</p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default NotFound
