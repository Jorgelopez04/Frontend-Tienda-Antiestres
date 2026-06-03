import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="page-shell">
      <div className="hero-card">
        <div className="section-header">
          <div>
            <h1 className="page-title">Bienvenido a CalmaPlus</h1>
            <p className="page-copy">
              Tu tienda virtual de productos antiestrés. Encuentra pelotas relajantes, bandas de resistencia y accesorios diseñados para cuidar tu bienestar diario.
            </p>
          </div>
          <Link to="/products" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '24px' }}>
        <div className="page-card">
          <h2>Productos destacados</h2>
          <p>
            Descubre nuestra selección de productos hechos para reducir tensión, mejorar la concentración y ayudarte a relajarte en cualquier momento.
          </p>
        </div>
        <div className="page-card">
          <h2>Atención personalizada</h2>
          <p>
            En CalmaPlus te ofrecemos una experiencia de compra sencilla, con asesoría para encontrar el producto indicado según tus necesidades.
          </p>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: '24px' }}>
        <h2>Compra con confianza</h2>
        <p className="page-copy">
          Navega por nuestra tienda y añade productos a tu carrito. Si ya tienes una cuenta, inicia sesión para una experiencia más rápida y personalizada.
        </p>
      </div>
    </section>
  )
}

export default Home
