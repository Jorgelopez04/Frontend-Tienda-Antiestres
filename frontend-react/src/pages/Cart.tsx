import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, total, clearCart, removeFromCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <section className="page-shell">
        <div className="page-card">
          <h1 className="page-title">Tu carrito está vacío</h1>
          <p className="page-copy">Añade productos a tu carrito para comenzar con tu compra.</p>
          <Link to="/products" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Carrito</h1>
          <p className="page-copy">Revisa los artículos seleccionados antes de finalizar tu compra.</p>
        </div>
      </div>

      <div className="page-card" style={{ marginTop: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 0' }}>Producto</th>
              <th style={{ textAlign: 'right', padding: '12px 0' }}>Precio</th>
              <th style={{ textAlign: 'right', padding: '12px 0' }}>Cantidad</th>
              <th style={{ textAlign: 'center', padding: '12px 0' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '16px 0' }}>
                  <div>{item.name}</div>
                  {item.comboItems && (
                    <div style={{ marginTop: '6px', fontSize: '0.9rem', color: '#6b7280' }}>
                      Incluye: {item.comboItems.map((comboItem) => comboItem.name).join(', ')}
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px 0', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                <td style={{ padding: '16px 0', textAlign: 'right' }}>{item.quantity}</td>
                <td style={{ padding: '16px 0', textAlign: 'center' }}>
                  <button className="btn-outlined" type="button" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p className="page-copy" style={{ margin: 0, fontWeight: 700 }}>
            Total: ${total.toFixed(2)}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn-secondary btn-outlined"
              type="button"
              onClick={() => {
                clearCart()
                navigate('/carrito/vacio')
              }}
            >
              Eliminar todos
            </button>
            <button className="btn-primary" type="button" onClick={() => navigate('/confirmacion')}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
