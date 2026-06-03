import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchProducts } from '../services/ProductService'

function Profile() {
  const { user, logout } = useAuth()

  const [productCount, setProductCount] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    if (!user) return () => {
      mounted = false
    }
    fetchProducts()
      .then((list) => {
        if (mounted) setProductCount(list.length)
      })
      .catch(() => {
        if (mounted) setProductCount(null)
      })

    return () => {
      mounted = false
    }
  }, [user])

  // If not authenticated, show actions to login or register instead of redirecting.
  if (!user) {
    return (
      <section className="page-shell">
        <div className="page-card">
          <h1 className="page-title">Perfil</h1>
          <p className="page-copy">No has iniciado sesión.</p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <Link to="/login" className="btn-primary">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-outlined">
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Mi perfil</h1>
        <p className="page-copy">Bienvenido de nuevo, {user.name}.</p>
        <div style={{ marginTop: '24px' }}>
          <p>
            <strong>Correo:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
          {productCount !== null && (
            <p>
              <strong>Productos totales:</strong> {productCount}
            </p>
          )}
        </div>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {user.role === 'admin' && (
            <Link to="/admin" className="btn-outlined">
              Ir al panel administrativo
            </Link>
          )}
          <button className="btn-primary" type="button" onClick={() => logout()}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  )
}

export default Profile
