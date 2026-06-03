import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const location = useLocation()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    try {
      await login(email, password)
      // Redirect to the original protected page if present
      const from = (location.state as any)?.from?.pathname || '/perfil'
      navigate(from)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'No se pudo iniciar sesión')
    }
  }

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Iniciar sesión</h1>
          <p className="page-copy">Accede a tu cuenta para gestionar tu carrito y tus pedidos.</p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '24px' }}>
        <div className="page-card">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
              />
            </div>
            <div className="form-field" style={{ alignItems: 'start' }}>
              <label>
                <input type="checkbox" /> Recordar mi sesión
              </label>
            </div>
            {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}
            <button className="btn-primary" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>

        <div className="page-card">
          <h2>¿No tienes una cuenta?</h2>
          <p>
            Regístrate para empezar a comprar y recibir notificaciones sobre promociones exclusivas.
          </p>
          <Link to="/register" className="btn-outlined">
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login
