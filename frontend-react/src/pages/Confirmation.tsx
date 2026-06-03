import { Link } from 'react-router-dom'

function Confirmation() {
  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Compra realizada</h1>
        <p className="page-copy">
          ¡Gracias por tu compra! Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles de tu compra.
        </p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default Confirmation
