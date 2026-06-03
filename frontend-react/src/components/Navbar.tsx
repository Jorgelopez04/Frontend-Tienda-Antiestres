import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          CalmaPlus
        </NavLink>
        <p className="navbar-slogan">Tu aliado contra el estrés diario</p>
      </div>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/ofertas">Ofertas</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        <NavLink to="/perfil">Perfil</NavLink>
      </nav>

      <div className="navbar-actions">
        <NavLink to="/carrito">🛒 Carrito{cartCount ? ` (${cartCount})` : ''}</NavLink>
        {user ? (
          <>
            <span className="navbar-user">Hola, {user.name}</span>
            {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
            <button className="btn-link" type="button" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink to="/login">👤 Entrar</NavLink>
        )}
      </div>
    </header>
  )
}

export default Navbar
