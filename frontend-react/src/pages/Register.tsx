import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    try {
      // Registrations via UI always create USER accounts
      await register(name, email, password)
      navigate('/perfil')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'No se pudo crear la cuenta')
    }
  }

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Crear cuenta</h1>
          <p className="page-copy">Regístrate para acceder a tus pedidos y ofertas exclusivas.</p>
        </div>
      </div>

      <div className="page-card" style={{ marginTop: '24px' }}>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
            />
          </div>
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
          {/* Tipo de cuenta: las cuentas creadas desde la UI siempre son Usuario */}
          {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}
          <button className="btn-primary" type="submit">
            Crear cuenta
          </button>
        </form>
        <p className="page-copy" style={{ marginTop: '20px' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </section>
  )
}

export default Register
