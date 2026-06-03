import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Carrito eliminado</h1>
        <p className="page-copy">
          Has eliminado todos los productos del carrito. Puedes regresar a la tienda y elegir nuevos artículos.
        </p>
        <Link to="/products" className="btn-primary">
          Volver a productos
        </Link>
      </div>
    </section>
  )
}

export default EmptyCart
